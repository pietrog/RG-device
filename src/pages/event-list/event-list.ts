import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner";

import { LoginPage } from '../login/login';
import { ScanResultPage } from "../scan-result/scan-result.ts";
import { ScanInsertPage } from "../scan-insert/scan-insert.ts";
import { ScanPage } from '../scan/scan';

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
	private _qrScanner: QRScanner
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

	this._nav.push(ScanPage);
	


	/*this._qrScanner.scan().subscribe((code: string) => {

	    alert("scanned: " + code);
	    console.log("OKKK !! : " + code);
	    //this._qrScanner.show();
	    this._api.validateGoal(code);
	    this._nav.push(ScanResultPage, { barcode: code});

	});*/

	/*this._qrScanner.show().then((data: QRScannerStatus) => {
	    alert('camera is showwwing !! ');
	});*/

	/*this._qrScanner.prepare()
	    .then((status: QRScannerStatus) => {
		if (status.authorized) {
		    this._qrScanner.scan().subscribe((code: string) => {
			/*if (err)
			{
			    console.log("error !! : " + err);
			}
			else
			{
			    console.log("OKKK !! : " + code);
			    this._qrScanner.show();
			    this._api.validateGoal(code);
			    this._nav.push(ScanResultPage, { barcode: code});

			//}
		    });
		    
		}
		else if (status.denied)
		{
		    console.log("c la merde");
		}
		else
		{
		    console.log("on sait pas");
		}
		
	    });*/

    }		    

    public setIpAddress() {
	this._api.setIpAddress(this.ip_address, this.port);
    }
}
