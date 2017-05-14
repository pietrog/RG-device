import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Api } from '../../providers/api';
import { EventListPage } from "../event-list/event-list";

/*
  Generated class for the ScanResult page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-scan-insert',
  templateUrl: 'scan-insert.html'
})
export class ScanInsertPage {
    public barcode: string;

    public goal = {
	name: '',
	code: '',
	number_of_points: 0
    };


    public sendCodeFormControl: FormGroup;
    
    constructor(
	private _nav: NavController,
	private _navParams: NavParams,
	private _api: Api
    )
    {
	this.sendCodeFormControl = new FormGroup({
	    name: new FormControl('', [Validators.required]),
	    nb_points: new FormControl('', [Validators.required]),
	});

    }

    public sendCode() {
	if (!this.sendCodeFormControl.valid) {
	    alert("Propriété d'objectif non valide.");
	    return;
	}

	//Take the values from  the form control
	this.goal.code = this.barcode;
	this.goal.name = this.sendCodeFormControl.get("name").value;
	this.goal.number_of_points = this.sendCodeFormControl.get("nb_points").value;

	this._api.sendCode(this.goal.code, this.goal.name, this.goal.number_of_points)
	    .subscribe(
		(data) => {
		    alert("Objectif ajouté !");
		    //this._nav.push(EventListPage);
		},
		error => alert("Erreur durant l'ajout d'objectif" + error)
	    );

    }
    
    ionViewDidLoad() {
	this.barcode = this._navParams.get("barcode");
    }
    
}
