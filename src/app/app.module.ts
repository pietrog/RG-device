import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { EventListPage } from '../pages/event-list/event-list';
import { LoginPage } from '../pages/login/login';
import { ScanResultPage } from '../pages/scan-result/scan-result';
import { ScanInsertPage } from '../pages/scan-insert/scan-insert';
import { ScanPage } from '../pages/scan/scan';

import { Api } from '../providers/api';
import { User } from '../providers/user';
import { StatusBar } from "@ionic-native/status-bar";
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner";
import { AndroidPermissions } from '@ionic-native/android-permissions';

@NgModule({
    declarations: [
	MyApp,
	EventListPage,
	LoginPage,
	ScanResultPage,
	ScanInsertPage,
	ScanPage
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
	ScanResultPage,
	ScanInsertPage,
	ScanPage
    ],
    providers: [
	{ provide: ErrorHandler, useClass: IonicErrorHandler },
	Api,
	User,
	StatusBar,
	AndroidPermissions,
	QRScanner,
	AndroidFullScreen
    ]
})
export class AppModule { }
