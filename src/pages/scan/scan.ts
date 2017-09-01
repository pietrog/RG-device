import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { ScanResultPage } from "../scan-result/scan-result.ts";
import { ScanInsertPage } from "../scan-insert/scan-insert.ts";

import { Api } from '../../providers/api';

@Component({
    selector: 'page-scan',
    templateUrl: 'scan.html'
})
export class ScanPage {
    public scannedText: string;
    public buttonText: string;
    public loading: boolean;
    private eventId: number;
    public eventTitle: string;

    constructor(
	private _api: Api,
	private _nav: NavController,
	private _navParams: NavParams,
	private _barcodeScanner: BarcodeScanner) {
    }

    ionViewDidLoad() {
	//this.eventId = this._navParams.get('eventId');
	//this.eventTitle = this._navParams.get('eventTitle');

	this.buttonText = "Scan";
	this.loading = false;
    }

    public scanQR() {
	this.buttonText = "Loading..";
	this.loading = true;

	this._barcodeScanner.scan().then((barcodeData) => {
	    if (barcodeData.cancelled) {
		console.log("User cancelled the action!");
		this.buttonText = "Scan";
		this.loading = false;
		return false;
	    }
	    console.log("Scanned successfully!");
	    console.log(barcodeData);

	    this._api.validateGoal(barcodeData.text);
	    this.goToResult("");
	    //this.goToInsert(barcodeData.text);

	}, (err) => {
	    console.log(err);
	});
    }

    private goToResult(barcodeData) {
	this._nav.push(ScanResultPage, {
	    scannedText: barcodeData
	});
    }

    private goToInsert(barcode){
	this._nav.push(ScanInsertPage, { barcode: barcode });
    }

    private checkPass(data) {
    }
}
