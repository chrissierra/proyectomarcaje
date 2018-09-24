import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pasouno',
  templateUrl: './pasouno.component.html'
})
export class PasounoComponent implements OnInit {

  constructor(  private router: Router, 
  				private param: ActivatedRoute,) { }

  formato:any;

  ngOnInit() {
  }


  funcion_paso2(){
    this.router.navigate(['./Ingresa/paso2/'+this.formato]);
  }
}
