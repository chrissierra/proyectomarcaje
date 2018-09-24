import { Injectable } from '@angular/core';

@Injectable()
export class EmpleadoService {
  constructor() {}


  public array_empleado: any[] = [
    {
      label: 'Nombre',
      name: 'nombre',
      tipo: 'text',
      select: false

    },
    {
      label: 'Apellido',
      name: 'apellido',
      tipo: 'text',
      select: false

    },
    {
      label: 'Fecha Nacimiento',
      name: 'apellido',
      tipo: 'date',
      select: false

    },
    {
      label: 'Sexo',
      name: 'apellido',
      tipo: 'select',
      select: true,
      opciones: [ 'Masculino', 'Femenino']

    },

    {
      label: 'Sueldo Líquido',
      name: 'apellido',
      tipo: 'number',
      info: 'Si trabajador tiene sueldo base con comisiones, poner sueldo base',
      select: false

    },
    {
      label: 'Puesto',
      name: 'apellido',
      tipo: 'text',
      select: false

    },
    {
      label: 'Jefatura',
      name: 'apellido',
      tipo: 'text',
      select: false

    },
    {
      label: 'Rut',
      name: 'apellido',
      tipo: 'text',
      select: false
    },
    {
      label: 'Isapre',
      name: 'apellido',
      tipo: 'text',
      select: false
    },
    {
      label: 'AFP',
      name: 'apellido',
      tipo: 'text',
      select: false

    },
    {
      label: 'Horario',
      name: 'apellido',
      tipo: 'number',
      info: 'Debes ingresar las horas semanales a trabajar',
      select: false

    },
    {
      label: 'Nacionalidad',
      name: 'apellido',
      tipo: 'text',
      select: false

    },
    {
      label: 'Dirección',
      name: 'apellido',
      tipo: 'text',
      info: 'No incluyas la comuna',
      select: false

    },
    {
      label: 'Comuna',
      name: 'apellido',
      tipo: 'text',
      select: false

    },
    {
      label: 'Sueldo escrito',
      name: 'apellido',
      tipo: 'text',
      info: 'Procura escribir cuidadosamente el sueldo en palabras',
      select: false

    },
    {
      label: 'Descanso en minutos',
      name: 'apellido',
      tipo: 'number',
      info: 'Escribe la duración del descanso en minutos',
      select: false

    },
    {
      label: 'Comuna sucursal',
      name: 'apellido',
      tipo: 'text',
      info: 'Escribe donde trabajará tu trabajador',
      select: false

    },




  ];

  public empleado: Object = {



    nombre: '',
    apellido: '',
    edad: '',
    sexo: '',
    nacimiento: '',
    direccion: '',
    sueldo: '',
    puesto: '',
    empresa: '',
    jefatura: '',
    ingreso: '',
    rut: '',
    isapre: '',
    afp: '',
    horario: '',
    dummy: '',
    nacionalidad_empleado: '',
    horas_jornada: '',
    empresa_previa: '',
    direccion_sin_comuna_empleado: '',
    comuna_empleado: '',
    sueldo_escrito: '',
    ultimo_dia_semana_jornada: '',
    hora_entrada_jornada: '',
    hora_salida_jornada: '',
    descanso_o_almuerzo_en_minutos: '',
    hora_inicio_descanso: '',
    hora_fin_descanso: '',
    tipo_contrato: '',
    comuna_sucursal: ''
    /*



public array_empleado: any[] = [
    {
      label: 'Nombre',
      name: 'nombre',
      tipo: 'text',
      select: false

    },
    {
      label: 'Apellido',
      name: 'apellido',
      tipo: 'text',
      select: false

    },
        {
      label: 'Sexo',
      name: 'sexo',
      tipo: 'select',
      select: true,
      opciones: [ 'Masculino', 'Femenino']

    },
    {
      label: 'Fecha Nacimiento',
      name: 'nacimiento',
      tipo: 'date',
      select: false

    },
    {
      label: 'Sueldo Líquido',
      name: 'sueldo',
      tipo: 'number',
      info: 'Si trabajador tiene sueldo base con comisiones, poner sueldo base',
      select: false

    },
    {
      label: 'Puesto',
      name: 'puesto',
      tipo: 'text',
      select: false

    },
    {
      label: 'Jefatura',
      name: 'jefatura',
      tipo: 'text',
      select: false

    },
    {
      label: 'Rut',
      name: 'rut',
      tipo: 'text',
      info: 'Si tu rut es 15111999-k debes poner 15111999k ; sin el guión ',
      select: false
    },
    {
      label: 'Isapre',
      name: 'isapre',
      tipo: 'text',
      select: false
    },
    {
      label: 'AFP',
      name: 'afp',
      tipo: 'text',
      select: false

    },
    {
      label: 'Horario',
      name: 'horario',
      tipo: 'number',
      info: 'Debes ingresar las horas semanales a trabajar',
      select: false

    },
    {
      label: 'Nacionalidad Empleado',
      name: 'nacionalidad_empleado',
      tipo: 'text',
      select: false

    },
    {
      label: 'Horas Semanales',
      name: 'horas_jornada',
      tipo: 'number',
      info: 'Debes escribir las horas semanales : 45, 36, 18 horas. ',
      select: false

    },
    {
      label: 'Dirección',
      name: 'direccion_sin_comuna_empleado',
      tipo: 'text',
      info: 'No incluyas la comuna',
      select: false

    },
    {
      label: 'Comuna',
      name: 'comuna_empleado',
      tipo: 'text',
      select: false

    },
    {
      label: 'Sueldo escrito',
      name: 'sueldo_escrito',
      tipo: 'text',
      info: 'Procura escribir cuidadosamente el sueldo en palabras',
      select: false

    },
       {
      label: 'Hora Entrada',
      name: 'hora_entrada_jornada',
      tipo: 'time',
      info: 'Escribe la entrada a trabajar',
      select: false

    },
       {
      label: 'Hora salida',
      name: 'hora_salida_jornada',
      tipo: 'time',
      select: false

    },
    {
      label: 'Descanso en minutos',
      name: 'descanso_o_almuerzo_en_minutos',
      tipo: 'number',
      info: 'Escribe la duración del descanso en minutos',
      select: false

    },
        {
      label: 'Tipo de Contrato',
      name: 'tipo_contrato',
      tipo: 'text',
      info: 'Selecciona el tipo de contrato para tu trabajador',
      select: true,
      opciones: [ 'Fijo', 'Indefinido', 'Plazo']

    },
    {
      label: 'Comuna sucursal', /* Debe extraerse las sucursales del empleador 
      name: 'comuna_sucursal',
      tipo: 'text',
      info: 'Escribe donde trabajará tu trabajador',
      select: false

    },
        {
      label: 'Direccion sucursal', /* Debe extraerse las sucursales del empleador 
      name: 'direccion_sucursal',
      tipo: 'text',
      info: 'Escribe donde trabajará tu trabajador',
      select: false

    },
    { 
      name: 'dia_ingreso',
      tipo: 'hidden',
      select: false,
      valor: 

    },
   {
      name: 'mes_ingreso',
      tipo: 'hidden',
      select: false,
      valor: 

    },
    {
      name: 'ano_ingreso',
      tipo: 'hidden',
      select: false,
      valor: 

    },
    {
      label: 'Estado Civil', /* Debe extraerse las sucursales del empleador 
      name: 'estado_civil',
      tipo: 'text',
      info: 'Escribe donde trabajará tu trabajador',
      select: false
    },
   {
      label: 'Estado Civil', /* Debe extraerse las sucursales del empleador 
      name: 'duracion_contrato',
      tipo: 'text',
      info: 'Escribe donde trabajará tu trabajador',
      select: false
    },
    {
      label: 'Gratificaciones', /* Debe extraerse las sucursales del empleador 
      name: 'gratificaciones',
      tipo: 'text',
      info: '',
      select: false
    },
    {
    
      label: 'Incentivos', /* Debe extraerse las sucursales del empleador 
      name: 'incentivos',
      tipo: 'text',
      info: '',
      select: false
    
    },
    {
      label: 'Bonos', /* Debe extraerse las sucursales del empleador 
      name: 'bonos',
      tipo: 'text',
      info: '',
      select: false
    }


  ];









________________________________________________________________________________________________









nombre
apellido
edad
sexo
nacimiento
direccion
sueldo
puesto
empresa
jefatura
ingreso
rut
isapre
afp
horario
dummy
nacionalidad_empleado
horas_jornada
empresa_previa
direccion_sin_comuna_empleado
comuna_empleado
sueldo_escrito
ultimo_dia_semana_jornada
hora_entrada_jornada
hora_salida_jornada
descanso_o_almuerzo_en_minutos
hora_inicio_descanso
hora_fin_descanso
tipo_contrato
comuna_sucursal
direccion_sucursal
dia_ingreso
mes_ingreso
ano_ingreso
estado_civil
codigo_actividad_economica
servicio_salud_que_aprueba
tecnico_o_profesional
numero_inscripcion
numero_dias_trabajar_semanal
bono_locomocion_mensual
viatico_diario
duracion_contrato
nombre_produccion
locacion_produccion
nombre_de_la_obra
locacion_de_la_obra
comuna_locacion_obra
tipo_de_pago
cantidad_a_pagar
gratificaciones
incentivos
bonos
asignacion_movilizacion_con_sin
monto_asignacion_movilizacion
asignacion_desgaste_herramientas_sin_con
monto_asignacion_desgastes_herramientas
asignacion_matrimonio_sin_con
monto_asignacion_matrimonio
nombre_establecimiento
tiempo_de_pago
transporte_entre
tareas_a_desarrollar
horas_diarias_descanso_chofer
dias_descanso_chofer
monto_pago_colacion_diario
oficio
maestro_o_guia
duracion_contrato_aprendizaje
establecimiento_educacional
docente_coordinador
condiciones_buena_practica
total_horas_cronologicas_practica
tope_reembolsos_a_estudiante
dias_inasistencias_permitidos
cantidad_semanal_minima_horas
monto_por_unidad
nombre_predio_agricola
profesion_oficio_contratado
ubicacion_predio
tipo_pago_agricola
monto_fijo
pago_detalle_y_monto_a_trato
regalias
entrega_racion_tierra
servicios_a_entregar_trabajador
nombre_empresa_usuario_plataforma
capitulos_totales_contemplados
inicio_rodaje
fin_rodaje
forma_de_pago_sueldo
primer_dia_semana_jornada
ciudad_obra_construccion
monto_adelanto
fecha_adelanto
fecha_pago_sueldo
asignacion_colacion_sin_con
monto_asignacion_colacion
pactos
funciones_docentes
fono1
fono2
email1
email2
anexo1
anexo2
anexo3
anexo4
anexo5
anexo6
anexo7
anexo8
anexo9
anexo10
latitud
longitud
estatus
foto
contrato_externo
hora_upload_imagen
fecha_upload_imagen
hora_upload_contrato
fecha_upload_contrato
formato_archivo_imagen
formato_archivo_contrato
numero_cta
tipo_pago_valevista_etc
endpoint
auth
p256dh
horario_con_o_sin_turnos


    */



  };

}




