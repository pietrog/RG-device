import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Api } from '../../providers/api';
import { ScanResultPage } from '../scan-result/scan-result';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

import { ToastController } from 'ionic-angular'; 

import { Platform } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'scan.html'
})
export class ScanPage {


    private backButtonPressedOnceToExit: boolean;

    constructor(public navCtrl: NavController,
		public androidPermissions: AndroidPermissions,
		private platform: Platform,
		private _api: Api,
		public qrScanner: QRScanner,
		private toastCtrl: ToastController) {
        
        this.qrscanner();
	this.backButtonPressedOnceToExit = false;

	/*platform.ready().then(() => {
            platform.registerBackButtonAction(() => {

                //uncomment this and comment code below to to show toast and exit app
                if (this.backButtonPressedOnceToExit) {
                    this.platform.exitApp();
                } else if (this.navCtrl.canGoBack()) {
                    this.navCtrl.pop({});
                } else {
                    setTimeout(() => {
			
			this.backButtonPressedOnceToExit = false;
                    },2000)
                }
		
                if(this.navCtrl.canGoBack()){
                    this.navCtrl.pop();
                }

            });
	    
	});*/
    }
    
			     

    qrscanner() {
	
	// Optionally request the permission early
	this.qrScanner.enableLight()
	    .then((status: QRScannerStatus) => {

		setTimeout(() => {
		    this.qrScanner.disableLight()
                },5000);
		
		if (status.authorized) {
		    // camera permission was granted
		    // start scanning
		    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
			//console.log('Scanned something', text);
			this._api.validateGoal(text);
			this.qrScanner.hide(); // hide camera preview
			scanSub.unsubscribe(); // stop scanning
			this.qrScanner.disableLight();
			//this.navCtrl.pop();
			//alert('scanned: ' + text);
			//this.navCtrl.push(ScanResultPage, { barcode: text});
			
			this._api.getScoreObservable()
			    .subscribe(
				(resultMessage) => {
				    this.presentToast(resultMessage);
				}
				,(error) => {
				    this.presentToast("Problème pendant la récupération du résultat: " + error);
				}
			    );
			
		    });
		    
		    this.qrScanner.resumePreview();

		    // show camera preview
		    this.qrScanner.show()
			.then((data : QRScannerStatus)=> { 
			    //alert('preview: ' + data.showing);
			    
			},err => {
			    //alert('cam showing: ' +err);

			});

		    // wait for user to scan something, then the observable callback will be called
		} else if (status.denied) {
		    alert('Camera interdite pour l\'application RGScoring. Contacter les administreteurs');
		    this.qrScanner.disableLight();
		    // camera permission was permanently denied
		    // you must use QRScanner.openSettings() method to guide the user to the settings page
		    // then they can grant the permission from there
		} else {
		    // permission was denied, but not permanently. You can ask for permission again at a later time.
		    alert('Activer la camera');
		    this.qrScanner.disableLight();
		}
	    })
	    .catch((e: any) => {
		alert('Impossible de charger le scanner: ' + e);
	    });

	

    }


    presentToast(msg: string)
    {
	let toast = this.toastCtrl.create({
	    message: msg,
	    duration: 5000,
	    position: 'middle',
	    showCloseButton: true,
	    closeButtonText: 'OK'
	});
	
	toast.onDidDismiss(() => {	    
	    this.navCtrl.pop();
	});
					
	toast.present();
    }

}
