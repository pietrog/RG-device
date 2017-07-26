import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

class RTData
{
    _id: number;
    email: string;
    team_id: string;
    team_name: string;
    score_player: number;
    score_team: number;
    party_name: string;
};

@Injectable()
export class Api {
    private userName: string;
    private userID: string;
    private userScore: number;
    private teamName: string;
    private teamScore: number;
    private _rt_data: RTData;
    
    /*private rt_data_observer = Observable.create((observer) => {
	
    });*/
    
    private url = '';//= "http://192.168.1.109:8100";

    private ip_address = "";//= "192.168.1.109";
    private port = ""; //= "8100";
    
    private headers = new Headers(
	{
	    'Content-Type': 'application/json',
	    'Accept': 'application/json'
	}
    );

    
    constructor(
	private _http: Http
    ) {
	this.ip_address = '192.168.0.34';
	this.port = "3000";
	this.url = `http://${this.ip_address}:${this.port}`;
    }
    
    public addHeader(headerKey: string, headerContent) {
	this.headers.append(headerKey, headerContent);
    }

    public setIpAddress(ip_addr: string, port: string) {
	this.ip_address = ip_addr;
	this.port = port;
	this.url = `http://${this.ip_address}:${this.port}`;
    }
    
    public setUserAuth(email: string) {
	//this.userAuth = "Basic " + btoa(`${email}:${password}`);
	this.userName = email;
	//this.addHeader("Authorization", this.userAuth);
	const url = `${this.url}/api/player/idFromName`;
	return this._http.post(url, JSON.stringify({ data: this.userName}), {headers: this.headers})
	    .map(this.extractData)
	    .catch(this.handleError);
    }

    public setUserDatas(datas) {
	this.userID = datas.user_id;
	this.userName = datas.user_name;
	this.teamName = datas.team_name;
	this.userScore = datas.user_score;
	this.teamScore = datas.team_score;
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
	return this._http.post(url, JSON.stringify({ player_id: this.userID, scanned_code: barcodeData}), {headers: this.headers})
	    .map(this.extractData)
	    .catch(this.handleError);
    }

    
    private extractData(res: Response) {

	let body = res.json();
	return body.data || {};
    }    

    private handleError(error: any): Promise<any> {
	//console.error('an error occured', error);
	return Promise.reject(error.message || error);
    }

}
