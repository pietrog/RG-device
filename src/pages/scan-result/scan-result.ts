import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EventListPage } from "../event-list/event-list";

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

    constructor(
	public _nav: NavController,
	private _navParams: NavParams) {}

    ionViewDidLoad() {
	this.scannedText = this._navParams.get("scannedText");
	setTimeout(() => {this._nav.push(EventListPage);}, 6000);
  }

}
