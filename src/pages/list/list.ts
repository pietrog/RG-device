import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {

    public scannedText: string;
    public buttonText: string;
    public loading: boolean;
    private eventId: number;
    public eventTitle: string;

    
    constructor(
	private _barcodeScanner: BarcodeScanner,
	public navCtrl: NavController,
	public navParams: NavParams
    ) {
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
	    //this.goToResult(barcodeData);
	}, (err) => {
	    console.log(err);
	});
    }


    
}
