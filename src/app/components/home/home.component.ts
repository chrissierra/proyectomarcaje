import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { mergeMapTo } from 'rxjs/operators';
import { SwPush } from '@angular/service-worker';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public message: any;
  long:any;
  lat:any;
cargo:string;
nombre:string;
apellido:string;
rut:string;
rut_empresa: string = localStorage.getItem('rut_empresa');
nombre_empresa: string = localStorage.getItem('nombre_empresa');
nombre_rep: string = localStorage.getItem('nombre_rep');
public items: Observable<any[]>;

constructor( swPush: SwPush, public _crudService:  CrudService, db: AngularFirestore, private param: ActivatedRoute, private router : Router) {
 
  	this.items = db.collection('items',  ref => ref.where('nombre', '==', 'uno').where('nombre', '==', 'uno')).valueChanges();
  	console.log(this.items);
    this.rut_empresa = localStorage.getItem('rut_empresa');

   let nombre = {
   	nombre: 'christopher',
   	documento:'sierra',
   	ciudad:'asdf',
   	url:'asdf'
   };

    this._crudService.agregarMensajes();

   }

  ngOnInit() {

      


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( pos => {
 //alert(" funciona geo")

        this.long = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;

        //alert(this.long + " /  " + this.lat)
      });
    } else {
        //alert("no funciona geo")
    }
  }

IngresarTrabajador(){
this._crudService.ingresarTrabajador(this.nombre, this.apellido, this.rut, this.cargo);
this.router.navigate(['./']);
} // Fin función IngresarTrabajador




}

