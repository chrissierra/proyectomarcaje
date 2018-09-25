export interface Movimientos {
  nombre: string;
  apellido: string;
  rut: string;
  locacion: {
    lat:any;
    long:any;
  };

  movimiento:string;

  fecha:number;
}

export interface Trabajador {
  nombre: string;
  apellido: string;
  rut: string;
  url?:string;
}

