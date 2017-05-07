import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ScanPage } from "../scan/scan";
import { BattleMapPage } from '../battle-map/battle-map';
import { StatsPage } from '../stats/stats';

import { Api } from '../../providers/api';


@Component({
    selector: 'page-event-list',
    templateUrl: 'event-list.html'
})
export class EventListPage {

    public user: string;
    public id_user: string;
    public message: string;
    
    constructor(
	private _nav: NavController,
	private _api: Api
    ) { }

    ionViewDidLoad() {
	this.user = this._api.getUserAuth();
	this.id_user = this._api.getUserID();
    }

    public scanGoal() {
	this._nav.push(ScanPage, {});
    }

    public healBoy() {
    }

    public checkMap() {
	this._nav.push(BattleMapPage, {});
    }

    public checkStats() {
	this._nav.push(StatsPage, {});
    }
}
