import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Api {
    private userAuth: string;
    private userID: string;
    //private url = "http://192.168.0.21:3000/device";
    private url = "http://192.168.0.21:8100";
    
    private headers = new Headers(
	{
	    'Content-Type': 'application/json',
	    'Accept': 'application/json'
	}
    );

    
    constructor(private _http: Http) {
	console.log('Hello Api Provider');
    }
    
    public addHeader(headerKey: string, headerContent) {
	this.headers.append(headerKey, headerContent);
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
