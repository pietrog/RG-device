import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { EventListPage } from '../pages/event-list/event-list';
import { LoginPage } from '../pages/login/login';
import { ScanPage } from '../pages/scan/scan';
import { ScanResultPage } from '../pages/scan-result/scan-result';
import { ScanInsertPage } from '../pages/scan-insert/scan-insert';

import { Api } from '../providers/api';
import { User } from '../providers/user';
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

@NgModule({
    declarations: [
	MyApp,
	EventListPage,
	LoginPage,
	ScanPage,
	ScanResultPage,
	ScanInsertPage
    ],
    imports: [
	BrowserModule,
	HttpModule,
	IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
	MyApp,
	EventListPage,
	LoginPage,
	ScanPage,
	ScanResultPage,
	ScanInsertPage
    ],
    providers: [
	{ provide: ErrorHandler, useClass: IonicErrorHandler },
	Api,
	User,
	StatusBar,
	SplashScreen,
	BarcodeScanner
    ]
})
export class AppModule { }
