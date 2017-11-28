import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BarcodeScanner } from "@ionic-native/barcode-scanner";

import { LoginPage } from '../login/login';
import { ScanResultPage } from "../scan-result/scan-result.ts";
import { ScanInsertPage } from "../scan-insert/scan-insert.ts";

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


    public scannedText: string;
    public buttonText: string;
    public loading: boolean;
    private eventId: number;
    public eventTitle: string;


    
    constructor(
	private _nav: NavController,
	private _api: Api,
	private _barcodeScanner: BarcodeScanner
    )
    {
    }

    

    ionViewDidLoad() {
	this.buttonText = "Scan";
	this.loading = false;
	this._api.getPlayerObservable()
	    .subscribe(
		(pl) => {
		    this.user = pl;		
		},
		(error) => {}
	    );
    }

    public goToLogin() {
	this._nav.push(LoginPage);
    }
    
    public scanQR() {
	this.buttonText = "Loading..";
	this.loading = true;



	this._barcodeScanner.scan(
	    {showTorchButton: true}).then((barcodeData) => {
		if (barcodeData.cancelled) {
		    console.log("User cancelled the action!");
		    this.buttonText = "Scan";
		    this.loading = false;
		    return false;
		}
		console.log("Scanned successfully!");
		console.log(barcodeData);

		this._api.validateGoal(barcodeData.text);
		this._nav.push(ScanResultPage, {
		    scannedText: barcodeData
		});
		//this.goToInsert(barcodeData.text);
		
		
	    }, (err) => {
		console.log(err);
	    });
    }

    private goToInsert(barcode){
	this._nav.push(ScanInsertPage, { barcode: barcode });
    }


    public setIpAddress() {
	this._api.setIpAddress(this.ip_address, this.port);
    }
}
