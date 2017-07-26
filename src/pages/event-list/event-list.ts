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
    public team_name: string;
    public id_user: string;
    public user_score: number;
    public team_score: number;
    
    public message: string;
    public ip_address: string;
    public port: string;
    
    constructor(
	private _nav: NavController,
	private _api: Api
    ) { }

    ionViewDidLoad() {
	this.user = this._api.getUserAuth();
	this.team_name = this._api.getTeamName();
	this.user_score = this._api.getUserScore();
	this.team_score = this._api.getTeamScore();
	this.id_user = this._api.getUserID();
    }

    public scanGoal() {
	this._nav.push(ScanPage, {});
    }

    public setIpAddress() {
	this._api.setIpAddress(this.ip_address, this.port);
    }
}
