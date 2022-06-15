import { Component, OnInit } from '@angular/core';

export interface Sede {
  nro:number,
  nombre:string
}
const SEDES: Sede[] = [
  {nro:1, nombre:'Centro'},
]

@Component({
  selector: 'app-administrar-turnos',
  templateUrl: './administrar-turnos.component.html',
  styleUrls: ['./administrar-turnos.component.css']
})
export class AdministrarTurnosComponent implements OnInit {

  turnos=[{
    id:'12',
    vacuna:" covid",
    fecha:" 10 de enero del 2022"
  },
  {
    id:'15',
    vacuna:"gripe",
    fecha:" 20 de mayo del 2022"
  }]
  data = SEDES;
  columnasMostradas: string[] = [
    'nro',
    'nombre',
    'accion',
  ]

  rechazarTurno(turno:any){
    this.data = this.data.filter((value,key)=>{
      return value.nro != turno.id;
    });
  }
  constructor() { }

  ngOnInit(): void {
  }
}
