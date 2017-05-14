import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
	    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
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
	    duration: 10
	});

	loading.present();

	//Take the values from  the form control
	this.newUser.email = this.loginFormControl.get("email").value.trim();
	this.newUser.password = this.loginFormControl.get("password").value;

	this._api.setUserAuth(this.newUser.email, this.newUser.password)
	    .subscribe(
		(data) => {
		    this._api.setUserID(data);
		    this._nav.push(EventListPage);
		},
		error => alert("Identifiants inconnus chez Reality Game! Demandez au staff de vous inscrire." + error)
	    );
    }

}
