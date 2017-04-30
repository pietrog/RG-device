import { Injectable } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ServerService {

    serverUrl: "192.168.0.45:3000/device";

    constructor(private http: Http) {}
    

    isServerConnected(): Observable<any> {
	const url = `${this.serverUrl}/isConnected`;
	return this.http.get(this.serverUrl)
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
