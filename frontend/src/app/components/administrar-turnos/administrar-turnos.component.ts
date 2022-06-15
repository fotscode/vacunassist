import { Component, OnInit } from '@angular/core';

export interface Sede {
  nro:number,
  nombre:string,
  apellido:string,
  vacuna:string,
  sede:string,
}
const SEDES: Sede[] = [
  {nro:1, nombre:'Papu', apellido:'Gómez', vacuna:'Covid', sede: 'Centro'},
  {nro:2, nombre:'Carmen', apellido:'Barbieri', vacuna:'Gripe', sede: 'Estadio'},
  {nro:3, nombre:'Laura', apellido:'De Giusti', vacuna:'Covid', sede: 'Bosque'},
  {nro:4, nombre:'Pablo', apellido:'Thomas', vacuna:'Covid', sede: 'Bosque'},
  {nro:5, nombre:'Rodolfo', apellido:'Bertone', vacuna:'Gripe', sede: 'Centro'},
  {nro:6, nombre:'Viviana', apellido:'Harari', vacuna:'Covid', sede: 'Estadio'},
]

@Component({
  selector: 'app-administrar-turnos',
  templateUrl: './administrar-turnos.component.html',
  styleUrls: ['./administrar-turnos.component.css']
})
export class AdministrarTurnosComponent implements OnInit {

  data = SEDES;
  columnasMostradas: string[] = [
    'nro',
    'nombre',
    'apellido',
    'vacuna',
    'sede',
    'accion',
  ]

  aceptarTurno(turno:any){

  }

  rechazarTurno(turno:any){
    this.data = this.data.filter((value,key)=>{
      return value.nro != turno.id;
    });
  }
  constructor() { }

  ngOnInit(): void {
  }
}
