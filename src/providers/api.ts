import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Api {
    private userAuth: string;
    private userID: string;
    //private url = "http://192.168.0.21:3000/device";
    private url = '';//= "http://192.168.0.34:8100";

    private ip_address = "";//= "192.168.0.34";
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
	this.ip_address = '192.168.0.45';
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
    
    public setUserAuth(email: string, password: string) {
	//this.userAuth = "Basic " + btoa(`${email}:${password}`);
	this.userAuth = email;
	//this.addHeader("Authorization", this.userAuth);
	const url = `${this.url}/api/player/idFromName`;
	return this._http.post(url, JSON.stringify({ data: this.userAuth}), {headers: this.headers})
	    .map(this.extractData)
	    .catch(this.handleError);
    }

    public setUserID(userID: string) {
	console.log(userID);
	this.userID = userID;
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
	return this.userAuth;
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
