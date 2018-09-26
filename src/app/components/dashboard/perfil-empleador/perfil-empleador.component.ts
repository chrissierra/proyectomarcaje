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
@Component({
  selector: 'app-perfil-empleador',
  templateUrl: './perfil-empleador.component.html'
})
export class PerfilEmpleadorComponent implements OnInit {
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

  
  constructor(private param: ActivatedRoute,
              private _formBuilder: FormBuilder, 
              public _crudService:  CrudService,
              public  db: AngularFirestore,
              private storage: AngularFireStorage) {

 this.rut = this.param.parent.snapshot.paramMap.get('rut');
    
     this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

   const ref = this.storage.ref('179614936/1.jpg');
     this.meta = ref.getDownloadURL();
     console.log( this.meta)

 navigator.geolocation.getCurrentPosition( pos => {
        this.long = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });

   } // Fin constructor

  public ngOnInit(): void {
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
       


              try{
                           const horas = this._crudService.horasTranscurridas(new Date().getTime()) 
                           const horas_server = this._crudService.horasTranscurridas(action[0].fecha); 
                           this.UltimoMovimiento = action[0].movimiento
                           this.diferenciaUltimoRegistro= (horas - horas_server);
                           this.nombreTrabajador = action[0].nombre;
                           this.apellidoTrabajador = action[0].apellido;
                           this.rutTrabajador = action[0].rut;
this.getMovimiento( this.diferenciaUltimoRegistro, this.UltimoMovimiento ,this.nombreTrabajador, this.apellidoTrabajador,  this.rutTrabajador )
                          // this.RealizarMarcaje(diferenciaHoras, movimiento, action[0].nombre, action[0].apellido, action[0].rut );
                           
                          
              }catch(err){

                console.log("NO HAY REGISTROS")
              
              }

    
     
    }); // Fin Subscribe
  } // Fin función BuscarRutMovimientosAsociados

  GuardarFotos(){
      this.trigger.next();

      const filePath = this.webcamImage.imageAsBase64;
      const ref = this.storage.ref(filePath);
    //const task = ref.putString(filePath);
     const img = 'data:image/jpeg;base64,' + filePath;
     this.storage.ref( this.rut+'/'+new Date().getTime() + '.jpeg').putString(img, 'data_url', { customMetadata: { blah: 'blah' } });
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
      
     }else if ( diferenciaHoras > 13){
      //marca entrada
      
      this.currentMov = 'entrada'
     }else{
       console.log("Caso que ya marcó bien los turnos del día")
       this.currentMov = 'salida'
     }
  

    
  } // Fin función RealizarMarcaje

  FuncionMarcarEntrada(){
    this.RealizarMarcaje(this.diferenciaUltimoRegistro, this.UltimoMovimiento ,this.nombreTrabajador, this.apellidoTrabajador,  this.rutTrabajador);
  }

}
