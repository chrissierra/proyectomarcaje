import { Injectable } from '@angular/core';
// Importamos angular firestore y angular collection
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/observable';
import { Mensaje } from "../interface/mensaje.interface";
import { Movimientos, Trabajador } from "../interface/trabajador.interface";
@Injectable()
export class CrudService {

	private itemsCollection: AngularFirestoreCollection<Mensaje>;
	private trabajadorCollection: AngularFirestoreCollection<Trabajador>;
	private MovimientosCollection: AngularFirestoreCollection<Movimientos>;

  
  trabajadores: Observable<Trabajador[]>;
// Creamos un alias para el AngularFirestore, en este caso se llamará AFS
constructor(private afs: AngularFirestore) {
// Esta impresion es opcional, la agrego para confirmar que el servicio funcione correctamente
console.log('Service CRUD On');
}

agregarMensajes(){
	    this.itemsCollection = this.afs.collection<Mensaje>('items' );
				  let mensaje: Mensaje = {
			      nombre:  'prueba cares',
			      mensaje: 'texto',
			      fecha: new Date().getTime(),
			      uid: 'asdffd'
			    }
	return this.itemsCollection.add( mensaje );
} // Fin Función agregarMensajes


ingresarTrabajador(nombre_, apellido_, rut_, cargo_){

let trabajador: Trabajador = {
	nombre: nombre_,
	apellido: apellido_,
	rut: rut_,
  cargo: cargo_

}

this.trabajadorCollection = this.afs.collection<Trabajador>('trabajadores' );
return this.trabajadorCollection.add( trabajador );
}


ingresarTurno(nombre_, apellido_, rut_, lat_, long_, movimiento_, fecha_){

let movimiento: Movimientos = {
      nombre: nombre_,
      apellido: apellido_,
      rut: rut_,
      locacion: {
              lat: lat_,
              long:long_
      },
      movimiento:movimiento_,
      fecha:fecha_

}



this.MovimientosCollection = this.afs.collection<Movimientos>('movimientos' );
return this.MovimientosCollection.add( movimiento );
}



ingresarUrlaDB( rut_, t, url_){

let urls: any = {
      rut: rut_,
      minuto: this.minutosTranscurridas(t),
      url: url_

}



this.MovimientosCollection = this.afs.collection('urlImagenes' );
return this.MovimientosCollection.add( urls );
}

 horasTranscurridasPorParametro(t) {
    let  minutes = 1000 * 60;
    let  hours = minutes * 60;
    let  days = hours * 24;
    let  years = days * 365;
    //let  d = new Date();
    //var t= d.getTime();

    let y = Math.round(t / hours);

    return y;
}

 horasTranscurridas(t) {
    let  minutes = 1000 * 60;
    let  hours = minutes * 60;
    let  days = hours * 24;
    let  years = days * 365;
   // let  d = new Date();
    //var t= d.getTime();

    let y = Math.round(t / hours);

    return y;
}


diasTranscurridas(t) {
    let  minutes = 1000 * 60;
    let  hours = minutes * 60;
    let  days = hours * 24;
    let  years = days * 365;
   // let  d = new Date();
    //var t= d.getTime();

    let y = Math.round(t / days);

    return y;
}


minutosTranscurridas(t) {
    let  minutes = 1000 * 60;
    let  hours = minutes * 60;
    let  days = hours * 24;
    let  years = days * 365;
   // let  d = new Date();
    //var t= d.getTime();

    let y = Math.round(t / minutes);

    return y;
}

getTrabajadores(rut){
   return  this.afs.collection<Trabajador>('trabajadores', ref => ref.where('rut', '==', rut)).valueChanges();
}

getTrabajadoresTodos(){
   return  this.afs.collection<Trabajador>('trabajadores').valueChanges();
}

getMovimientos(){
  return this.afs.collection<Movimientos>('movimientos' ).valueChanges();
  
}

}