import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as io from "socket.io-client";
import { RTPlayer } from './player';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class Api {
    private userName: string;
    private userID: string;
    private userScore: number;
    private teamName: string;
    private teamScore: number;
    private otherTeamName: string;
    private otherTeamScore: number;

    private m_player;
    private m_player_observer;

    private m_score_observable;
    private m_score_observer;
    
    private _socket;
    private url;

    private ip_address;
    private port;

    private last_score: number;
    
    private headers = new Headers(
	{
	    'Content-Type': 'application/json',
	    'Accept': 'application/json'
	}
    );

    
    constructor(
	private _http: Http
    ) {
	this.ip_address = '192.168.1.109';
	//this.ip_address = '192.168.0.45';
	this.port = "3000";

	this.url = `http://${this.ip_address}:${this.port}`;
	//this.url = '';
	this._socket = io(this.url);

	const url = `${this.url}/api/device/idFromName`;

	this.m_player = Observable.create(
	    (observer) => {
		this.m_player_observer = observer;
		this.getPlayer(this.userName).subscribe(
		    (data) => {
			this.setUserDatas(data);
			observer.next(data);
		    }
		);
	    });

	this.m_score_observable = Observable.create(
	    (observer) => {
		this.m_score_observer = observer;
	    });

	
	this._socket.on('goal_scanned_answer', (data) => {
	    if (data.status === 'success')
	    {
		this.m_score_observer.next("Bon travail, cet objectif vous fait gagner " + data.score_target + ' !!!');
	    }
	    else
	    {
		this.m_score_observer.next("Dommage, cet objectif ne vous a rien fait gagne...");
	    }
	    this.getPlayer(this.userName)
		.subscribe((data) => {
		    this.m_player_observer.next(data);
		});
	})
	
	this._socket.on('goal_scanned_broadcast', (data) => {
	    this.getPlayer(this.userName)
		.subscribe((data) => {
		    this.m_player_observer.next(data);
		});
	})
	
    }
    
    public getPlayerObservable() {
	return this.m_player;
    }

    public getScoreObservable() {
	return this.m_score_observable;
    }
    
    public addHeader(headerKey: string, headerContent) {
	this.headers.append(headerKey, headerContent);
    }

    public setIpAddress(ip_addr: string, port: string) {
	this.ip_address = ip_addr;
	this.port = port;
	this.url = `http://${this.ip_address}:${this.port}`;
    }
    
    getPlayer(name: string): Observable<RTPlayer> {
	const url = `${this.url}/api/device/idFromName`;
	let body = { user_name: name };
	return this._http.post(url, body, {headers: this.headers})
	    .map(this.extractData2)
	    .catch(this.handleError);
    }

    public doesUserExist(name: string) {
	const url = `${this.url}/api/device/nameExists`;
	this.userName = name;
	let body = { user_name: name };
	return this._http.post(url, body, {headers: this.headers})
	    .map(this.extractData)
	    .catch(this.handleError);
    }

    
    public setUserDatas(datas) {
	this.userID = datas.user_id;
	this.userName = datas.user_name;
	this.teamName = datas.team_name;
	this.userScore = datas.user_score;
	this.teamScore = datas.team_score;
	this.otherTeamScore = datas.other_team_score;
	this.otherTeamName = datas.other_team_name;
    }

    public sendCode(code: string, name: string, nb_points: number) {
	let goal = {
	    name: name,
	    code: code,
	    number_of_points: nb_points
	};
	
	const url = `${this.url}/api/goals/create`;
	return this._http.post(url, JSON.stringify(goal), {headers: this.headers})
	    .map(this.extractData)
	    .catch(this.handleError);
	
    }
    
    
    public getUserID() {
	return this.userID;
    }

    public getUserAuth() {
	return this.userName;
    }

    public getTeamName() {
	return this.teamName;
    }

    public getUserScore(){
	return this.userScore;
    }

    public getTeamScore(){
	return this.teamScore;
    }

    public validateGoal(barcodeData: string) {
	const url = `${this.url}/api/device/validateGoal`;
	this._socket.emit('goal_scanned', { player_id: this.userID, scanned_code: barcodeData});
	
    }

    private extractData(res: Response) {
	let body = res.json();
	return body || {};
    }    

    private extractData2(res: Response) {
	let body = res.json();
	return body.data || {};
    }    

    
    private handleError(error: any): Promise<any> {
	console.error('an error occured', error);
	return Promise.reject(error.message || error);
    }


    
}
