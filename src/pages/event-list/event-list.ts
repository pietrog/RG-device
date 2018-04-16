import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ScanPage } from '../scan/scan';
import { Api } from '../../providers/api';

import { Observable } from 'rxjs/Observable';

import { RTPlayer } from '../../providers/player';

@Component({
    selector: 'page-event-list',
    templateUrl: 'event-list.html'
})

export class EventListPage {

    public user: RTPlayer;
    
    constructor(
	private _nav: NavController,
	private _api: Api
    )
    {}

    

    ionViewDidLoad() {
	this._api.getPlayerObservable()
	    .subscribe(
		(pl) => {
		    this.user = pl;		
		},
		(error) => {}
	    );
    }

    public goToLogin() {
	this._nav.pop();
    }
    
    public scanQR() {
	this._nav.push(ScanPage);	
    }		    

}
