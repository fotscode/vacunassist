import { Component, OnInit, ViewChild } from '@angular/core';

export interface Sede {
  nro:number,
  nombre:string
}
const SEDES: Sede[] = [
  {nro:1, nombre:'Bosque'},
  {nro:2, nombre:'Centro'},
  {nro:3, nombre:'Estadio'},
]

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements OnInit {
  data = SEDES;
  columnasMostradas: string[] = [
    'nro',
    'nombre',
    'accion',
  ]

  constructor() {}

  addRowData(row_obj:any){
    var d = new Date();
    this.data.push({
      nro:d.getTime(),
      nombre:row_obj.nombre
    });

  }

  borrarRenglon(row_obj:any){
    this.data = this.data.filter((value,key)=>{
      return value.nro != row_obj.id;
    });
  }

  ngOnInit(): void {
  }
}
