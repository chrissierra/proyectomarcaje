import { Component, OnInit } from '@angular/core';
import { PlanillaservicesService } from '../../../services/planillaservices.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CrudService } from '../../../services/crud.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visualizarturnos',
  templateUrl: './visualizarturnos.component.html'
})
export class VisualizarturnosComponent implements OnInit {
//public imagenes: Observable<any>; 

public imagenes:any;
public lat: any;
public long:any;
imagArray: any[] = [];		
movimientos: any[] = [];
  constructor(private param: ActivatedRoute,
              private _formBuilder: FormBuilder, 
              public _crudService:  CrudService,
              public  db: AngularFirestore,
              private storage: AngularFireStorage) { 


	this._crudService.getMovimientos().subscribe(data => {
			
			console.log('data', data);
			

			for (var i = 0; i < data.length; ++i) {
				console.log(data[i].nombre);
				if(this._crudService.diasTranscurridas(new Date().getTime()) == this._crudService.diasTranscurridas(data[i].fecha)){
						this.movimientos.push(data[i])
				}
			}
			
		

			});





  }

  ngOnInit() {
  }


visualizarImagenes(fecha, rut){
let minutos= this._crudService.minutosTranscurridas(fecha);
console.log(minutos)

this.db.collection('urlImagenes', ref => ref.where('rut', '==', rut).where('minuto', '==', minutos)).valueChanges().subscribe(data => {
console.log(data)
this.imagenes= data;
for (let i = 0; i < data.length; ++i) {
console.log(data[i]['url']);
 this.imagArray.push(this.storage.ref(data[i]['url']).getDownloadURL());
   
}
})



}


  VisualizandoMapa(lat, long){
  	this.lat = lat;
  	this.long=long;
  }

}
