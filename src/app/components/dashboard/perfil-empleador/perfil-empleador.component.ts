import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CrudService } from '../../../services/crud.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginservicesService } from './../../../services/loginservices.service';
@Component({
  selector: 'app-perfil-empleador',
  templateUrl: './perfil-empleador.component.html',
  styleUrls: ['./perfil-empleador.css']
})
export class PerfilEmpleadorComponent implements OnInit {
  public imagenes:any;
public DeteccionRostro:boolean=false;
imagArray: any[] = [];
      public secondFormGroup : any;
      meta: Observable<any>;
      public rut:any;
      public currentMov: any;
      public lat:any;
      public long:any;
      isLinear = false;
      firstFormGroup: FormGroup;
      public movimientos: Observable<any[]>;	
      public UltimoMovimiento:string;
      public diferenciaUltimoRegistro:number;
      public primerTurno:boolean = true;
      public nombreTrabajador:string;
      public apellidoTrabajador:string;
      public rutTrabajador:string;
      // toggle webcam on/off
      public showWebcam = true;
      public allowCameraSwitch = true;
      public multipleWebcamsAvailable = false;
      public deviceId: string;
      public videoOptions: MediaTrackConstraints = {
          // width: {ideal: 1024},
          // height: {ideal: 576}
       };
  
       public errors: WebcamInitError[] = [];

        // latest snapshot
       public webcamImage: WebcamImage = null;

        // webcam snapshot trigger
       private trigger: Subject<void> = new Subject<void>();
        // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
       private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  
  constructor(private reconocerFacialServices:LoginservicesService,
              private param: ActivatedRoute,
              private _formBuilder: FormBuilder, 
              public _crudService:  CrudService,
              public  db: AngularFirestore,
              private storage: AngularFireStorage) {

 this.rut = this.param.parent.snapshot.paramMap.get('rut');
    
     this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
/*
   const ref = this.storage.ref('179614936');
     this.meta = ref.getDownloadURL();
     console.log( this.meta)
*/
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



   } // Fin constructor

  public ngOnInit(): void {
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

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();

    const filePath = this.webcamImage.imageAsBase64;
    const ref = this.storage.ref(filePath);
    //const task = ref.putString(filePath);
     const img = 'data:image/jpeg;base64,' + filePath;
     this.storage.ref("1818/"+new Date().getTime() + '.jpeg').putString(img, 'data_url');
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  BuscarRutMovimientosAsociados(){
  	
    this.movimientos = this.db.collection('movimientos',  ref => ref.where('rut', '==', this.firstFormGroup.value['firstCtrl']).orderBy('fecha', 'desc')).valueChanges();

    this.movimientos.subscribe(action => {  // console.log(action[0].nombre); Así se obtienen los datos 
       

console.log(action)
              try{
                           const horas = this._crudService.horasTranscurridas(new Date().getTime()) 
                           const horas_server = this._crudService.horasTranscurridas(action[0].fecha); 
                           this.UltimoMovimiento = action[0].movimiento
                           this.diferenciaUltimoRegistro= (horas - horas_server);
                           this.nombreTrabajador = action[0].nombre;
                           this.apellidoTrabajador = action[0].apellido;
                           this.rutTrabajador = action[0].rut;
                           this.primerTurno = false;
this.getMovimiento( this.diferenciaUltimoRegistro, this.UltimoMovimiento ,this.nombreTrabajador, this.apellidoTrabajador,  this.rutTrabajador )
                          // this.RealizarMarcaje(diferenciaHoras, movimiento, action[0].nombre, action[0].apellido, action[0].rut );
                           
                          
              }catch(err){

                console.log("NO HAY REGISTROS", err)
               this.currentMov = 'entrada'
              }

    
     
    }); // Fin Subscribe


     //**** ACA DEBO HACER LO QUE CORRESPONDE A RECONOCIMIENTO FACIAL:
 

     this.visualizarImagenes(new Date().getTime(), this.rut);

   
/*
this.reconocerFacialServices.reconocimiento( JSON.stringify(arrayURLS) ).subscribe(datos => {
         console.log(datos)
     })
*/


     //¨**** FIN REC. FACIAL



  } // Fin función BuscarRutMovimientosAsociados

  GuardarFotos(){
      this.trigger.next();

      const filePath = this.webcamImage.imageAsBase64;
      const ref = this.storage.ref(filePath);
    //const task = ref.putString(filePath);
     const img = 'data:image/jpeg;base64,' + filePath;
     console.log(this._crudService.diasTranscurridas(new Date().getTime()));
     let url = this.rut+'/'+this._crudService.diasTranscurridas(new Date().getTime())+'/'+this._crudService.minutosTranscurridas(new Date().getTime())+'/'+new Date().getTime() + '.jpeg';
     this.storage.ref( this.rut+'/'+this._crudService.diasTranscurridas(new Date().getTime())+'/'+this._crudService.minutosTranscurridas(new Date().getTime())+'/'+new Date().getTime() + '.jpeg').putString(img, 'data_url', { customMetadata: { blah: 'blah' } });
     this._crudService.ingresarUrlaDB(this.rut, new Date().getTime(),url )



  } // Fin función GuardarFotos




  private RealizarMarcaje(diferenciaHoras, movimiento, nombre_, apellido_, rut_){
     
     if(diferenciaHoras < 13 && movimiento == 'entrada'){
      // marca salida
       this._crudService.ingresarTurno(nombre_, apellido_, rut_, this.lat, this.long, 'salida', new Date().getTime());
     }else if ( diferenciaHoras > 13){
      //marca entrada
       this._crudService.ingresarTurno(nombre_, apellido_, rut_, this.lat, this.long, 'entrada', new Date().getTime());

     }else{
       console.log("Caso que ya marcó bien los turnos del día")
     }
  

    
  } // Fin función RealizarMarcaje


    private getMovimiento(diferenciaHoras, movimiento, nombre_, apellido_, rut_){
     
     if(diferenciaHoras < 13 && movimiento == 'entrada'){
      // marca salida
       this.currentMov = 'salida'
     }else if ( diferenciaHoras > 13){
      //marca entrada
      
      this.currentMov = 'entrada'
     }else{
       console.log("Caso que ya marcó bien los turnos del día aver")
      this.currentMov = 'listo'
      console.log(this.currentMov)
     }
  

    
  } // Fin función RealizarMarcaje

  FuncionMarcarEntrada(){
//alert("empenando en funcion marcar...")
    if(this.primerTurno){
//alert("realizar marcaje no primero");
this._crudService.getTrabajadores(this.rut).subscribe(data => {
   console.log(data[0])   
 this.RealizarMarcaje(15, 'salida' ,data[0].nombre, data[0].apellido,  data[0].rut);


      });

    }else{
//alert("realizar marcaje no primero");
          this.RealizarMarcaje(this.diferenciaUltimoRegistro, this.UltimoMovimiento ,this.nombreTrabajador, this.apellidoTrabajador,  this.rutTrabajador);

    }


    if(this.currentMov == 'salida')
      this.currentMov == 'listo';

    //alert(this.currentMov);
  } // Fin función FuncionMarcarEntrada









  private getURL(minutos, fecha , rut){
  this.db.collection('urlImagenes', ref => ref.where('rut', '==', rut).where('minuto', '==', minutos)).valueChanges().subscribe(data => {

        this.imagenes= data;
        
        for (let i = 0; i < data.length; ++i) {

                this.storage.ref(data[i]['url']).getDownloadURL().subscribe(downloadURL => {
  const imageUrl = downloadURL;
  //console.log('URL:' + imageUrl);
                    
                    this.reconocerFacialServices.reconocimiento( JSON.stringify({url: imageUrl}) ).subscribe(datos => {
                           console.log("yapo.. y", datos)
                           let peo = JSON.stringify(datos)
                           if(peo.search('x')>-1){
                             this.DeteccionRostro = true;
                           }
                       })

  this.imagArray.push(imageUrl);
}); 
   
        }
        })
} // Fin función getURL


visualizarImagenes(fecha, rut){
//this.imagArray = [];
 
let minutos= this._crudService.minutosTranscurridas(fecha);


this.db.collection('urlImagenes', ref => ref.where('rut', '==', rut).where('minuto', '==', minutos)).valueChanges().subscribe(data => {
console.log(data)
this.imagenes= data;
for (let i = 0; i < data.length; ++i) {


                   this.storage.ref(data[i]['url']).getDownloadURL().subscribe(downloadURL => {
  const imageUrl = downloadURL;
  //console.log('URL:' + imageUrl);

   this.reconocerFacialServices.reconocimiento( JSON.stringify({url: imageUrl}) ).subscribe(datos => {
                           console.log("yapo.. y", datos)
                           let peo = JSON.stringify(datos)
                           if(peo.search('x')>-1){
                             this.DeteccionRostro = true;
                           }
                       })

  this.imagArray.push(imageUrl);
}); 
}
})
this.getURL(minutos + 2 , fecha, rut)
this.getURL(minutos + 1 , fecha, rut)
this.getURL(minutos - 1 , fecha, rut)
this.getURL(minutos - 2 , fecha, rut)
}

}
