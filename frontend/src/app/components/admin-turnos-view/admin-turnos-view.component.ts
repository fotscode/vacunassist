import { Component, OnInit } from '@angular/core';

export interface Sede {
  nro:number,
  nombre:string
}
const TURNOS: Sede[] = [
  {nro:1, nombre:'Gripe'},
  {nro:2, nombre:'Covid'},
]

@Component({
  selector: 'app-admin-turnos-view',
  templateUrl: './admin-turnos-view.component.html',
  styleUrls: ['./admin-turnos-view.component.css']
})
export class AdminTurnosViewComponent implements OnInit {

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
  data = TURNOS;
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
