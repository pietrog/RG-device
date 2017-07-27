import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ScanPage } from "../scan/scan";
import { BattleMapPage } from '../battle-map/battle-map';
import { StatsPage } from '../stats/stats';

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
	console.log("cstro");
    }

    ionViewDidLoad() {
	console.log("viweload");
	this._api.getPlayerObservable()
	    .subscribe((pl) => {
		this.user = pl;
	    });
    }

    public scanGoal() {
	this._nav.push(ScanPage, {});
    }

    public setIpAddress() {
	this._api.setIpAddress(this.ip_address, this.port);
    }
}
