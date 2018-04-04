import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from "@ionic-native/status-bar";
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { LoginPage } from '../pages/login/login';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage = LoginPage;

    constructor(platform: Platform,
		private _statusBar: StatusBar,
		private androidFullScreen: AndroidFullScreen
	       ) {
	platform.ready().then(() => {
	    // Okay, so the platform is ready and our plugins are available.
	    // Here you can do any higher level native things you might need.
	    this._statusBar.styleDefault();
	    this.androidFullScreen.isImmersiveModeSupported()
		.then(() => this.androidFullScreen.immersiveMode())
		.catch((error: any) => {
		    console.log(error);
		    alert("Problème pendant le passage au mode immersif: "+error);
		});
	});
    }
}
