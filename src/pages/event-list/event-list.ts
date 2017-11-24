import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ScanPage } from "../scan/scan";
import { LoginPage } from '../login/login';

import { Api } from '../../providers/api';

import { RTPlayer } from '../../providers/player';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'page-event-list',
    templateUrl: 'event-list.html'
})
export class EventListPage {

    public user: RTPlayer;
    
    public message: string;
    public ip_address: string;
    public port: string;
    
    constructor(
	private _nav: NavController,
	private _api: Api
    )
    {
    }

    ionViewDidLoad() {
	this._api.getPlayerObservable()
	    .subscribe((pl) => {
		
		this.user = pl;
		
	    },
		       (error) =>
		       {});
    }

    public scanGoal() {
	this._nav.push(ScanPage, {});
    }

    public goToLogin() {
	this._nav.push(LoginPage);
    }


    public setIpAddress() {
	this._api.setIpAddress(this.ip_address, this.port);
    }
}
