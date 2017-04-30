import { Component, OnInit } from '@angular/core';
import { NavController, Platform, Alert } from 'ionic-angular';
import { ServerService } from '../../app/server-com.service';


import { Player } from '../../app/player';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})


export class HomePage implements OnInit {


    serverStatus: string;
    
    static get parameters() {
        return [[Platform], [NavController]];
    }
    
    constructor(
	private serverService: ServerService,
	public platform: Platform,
	public navCtrl: NavController
    ) {
    }

    getServerStatus(): void {

	/*this.serverService.isServerConnected()
	    .subscribe(
		(status) => {	
		    this.serverStatus = "blah";
		},
		error => this.serverStatus = error
	    );*/
    }
    

    ngOnInit(): void {
	this.getServerStatus();
	this.serverStatus = "Connected !";
    }
    
}
