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
import * as moment from 'moment';
@Component({
  selector: 'app-visualizarturnos',
  templateUrl: './visualizarturnos.component.html'
})
export class VisualizarturnosComponent implements OnInit {
//public imagenes: Observable<any>; 
public calendario:any;
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


	

this.FuncionActualizarTabla(this._crudService.diasTranscurridas(new Date().getTime()));



  }

  ngOnInit() {
  }




private getURL(minutos, fecha , rut){
  this.db.collection('urlImagenes', ref => ref.where('rut', '==', rut).where('minuto', '==', minutos)).valueChanges().subscribe(data => {

        this.imagenes= data;
        
        for (let i = 0; i < data.length; ++i) {

               this.imagArray.push(this.storage.ref(data[i]['url']).getDownloadURL());
   
        }
        })
} // Fin función getURL


visualizarImagenes(fecha, rut){
this.imagArray = [];
 
let minutos= this._crudService.minutosTranscurridas(fecha);


this.db.collection('urlImagenes', ref => ref.where('rut', '==', rut).where('minuto', '==', minutos)).valueChanges().subscribe(data => {
console.log(data)
this.imagenes= data;
for (let i = 0; i < data.length; ++i) {

 this.imagArray.push(this.storage.ref(data[i]['url']).getDownloadURL());
   
}
})
this.getURL(minutos + 2 , fecha, rut)
this.getURL(minutos + 1 , fecha, rut)
this.getURL(minutos - 1 , fecha, rut)
this.getURL(minutos - 2 , fecha, rut)
}


  VisualizandoMapa(lat, long){
  	this.lat = lat;
  	this.long=long;
  } // FIn función VisualizandoMapa


  FuncionActualizarTabla(fec){
this.movimientos = [];
    this._crudService.getMovimientos().subscribe(data => {
      
      console.log('data', data);
      

      for (var i = 0; i < data.length; ++i) {
        console.log(data[i].nombre);
        if(fec == this._crudService.diasTranscurridas(data[i].fecha)){
            this.movimientos.push(data[i])
        }
      }
      
    

      });
  }

  ActualizarFecha(){
    
    const FORMATO_ENTRADA = 'MM-DD-YYYY';
    const FORMATO_SALIDA = 'MM-DD-YYYY';
    const fecha1 = moment(this.calendario,FORMATO_ENTRADA);
    const diasTranscurridosDataPicker = this._crudService.diasTranscurridas(new Date(fecha1.format(FORMATO_SALIDA)).getTime()) + 1;

    this.FuncionActualizarTabla(diasTranscurridosDataPicker);
  }

}
