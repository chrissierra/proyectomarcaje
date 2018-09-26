import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
cargo:string;
nombre:string;
apellido:string;
rut:string;
rut_empresa: string = localStorage.getItem('rut_empresa');
nombre_empresa: string = localStorage.getItem('nombre_empresa');
nombre_rep: string = localStorage.getItem('nombre_rep');
public items: Observable<any[]>;

constructor(public _crudService:  CrudService, db: AngularFirestore) {
 
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
  }

IngresarTrabajador(){
this._crudService.ingresarTrabajador(this.nombre, this.apellido, this.rut, this.cargo);
} // Fin función IngresarTrabajador


}

