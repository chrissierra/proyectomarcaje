import { Component, OnInit } from '@angular/core';
import { PlanillaservicesService } from '../../services/planillaservices.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CrudService } from '../../services/crud.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html'
})
export class PlanillaComponent {
empleados: any;
buscador: any;
rut:any;
  constructor(private param: ActivatedRoute, public _crudService:  CrudService, db: AngularFirestore) {

 this.rut = this.param.snapshot.paramMap.get('rut');
                
			this._crudService.getTrabajadores().subscribe(data => {
			
			console.log('data', data);
			
			this.empleados = data;

			});

   } // Fin constructor


  ir_perfil_empleado(){
			alert("asdf")
  }

}
