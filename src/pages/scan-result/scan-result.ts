import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EventListPage } from "../event-list/event-list";

import { Api } from '../../providers/api';

/*
  Generated class for the ScanResult page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-scan-result',
  templateUrl: 'scan-result.html'
})
export class ScanResultPage {

    public scannedText: string;
    public barcode;

    constructor(
	private _api: Api,
	public _nav: NavController,
	private _navParams: NavParams) {}

    ionViewDidLoad() {
	this._api.getScoreObservable()
	    .subscribe((pl) => {
		
		this.scannedText = pl;
		this.barcode = this._navParams.get('barcode');
		
	    },
		       (error) =>
		       {});
	
	setTimeout(() => {this._nav.push(EventListPage);}, 6000);
    }

    
}
