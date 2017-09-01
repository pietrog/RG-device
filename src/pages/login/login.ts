import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Api } from '../../providers/api';

import { EventListPage } from "../event-list/event-list";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    public newUser = {
	email: '',
	password: ''
    };
    public loginFormControl: FormGroup;
    public ip_address: string;
    public port: string;
    public player;

    constructor(
	private _nav: NavController,
	public navParams: NavParams,
	private _loadingController: LoadingController,
	private _formBuilder: FormBuilder,
	private _api: Api
    ) {
	// Create FormControl to validate fields
	this.loginFormControl = new FormGroup({
	    email: new FormControl('', [Validators.required]),
	});
    }

    ionViewDidLoad() {
	console.log('ionViewDidLoad LoginPage');
    }

    public login() {

	// Validation
	if (!this.loginFormControl.valid) {
	    alert("Identifiants inconnus chez Reality Game! Demandez au staff de vous inscrire.");
	    return;
	}

	let loading = this._loadingController.create({
	    content: "Connexion...",
	    duration: 5
	});

	loading.present();

	//Take the values from  the form control
	this.newUser.email = this.loginFormControl.get("email").value.trim();	

	this._api.doesUserExist(this.newUser.email)
	    .subscribe(
		(data) => {
		    console.log("login status: "+data.status);
		    if (data.status === "success"){			
			this._nav.push(EventListPage);
		    }
		    else
			alert("Vous devez etre inscrit ");		    
		}
		,
		(error) => { alert("Erreur de connexion:  "+ error);}
	    );

    }

    public setIpAddress() {
	this._api.setIpAddress(this.ip_address, this.port);
    }
    
    
}
