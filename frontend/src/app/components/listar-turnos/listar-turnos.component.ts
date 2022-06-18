import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { DialogRechazarTurnoComponent } from '../dialog-rechazar-turno/dialog-rechazar-turno.component';
import { Router } from '@angular/router'
import { Sede } from '../sedes/sedes.component'

export interface User {
  nro:number,
  nombre:string,
  apellido:string,
  vacuna:string,
  sede:string,
  riesgo:boolean,
}
const USERS: User[] = [
  {nro:1, nombre:'Papu', apellido:'Gómez', vacuna:'Covid', sede: 'Centro', riesgo:true},
  {nro:2, nombre:'Carmen', apellido:'Barbieri', vacuna:'Gripe', sede: 'Estadio', riesgo:true},
  {nro:3, nombre:'Laura', apellido:'De Giusti', vacuna:'Covid', sede: 'Bosque', riesgo:false},
  {nro:4, nombre:'Pablo', apellido:'Thomas', vacuna:'Covid', sede: 'Bosque', riesgo:true},
  {nro:5, nombre:'Rodolfo', apellido:'Bertone', vacuna:'Gripe', sede: 'Centro', riesgo:false},
  {nro:6, nombre:'Viviana', apellido:'Harari', vacuna:'Covid', sede: 'Estadio', riesgo:true},
]

@Component({
  selector: 'app-listar-turnos',
  templateUrl: './listar-turnos.component.html',
  styleUrls: ['./listar-turnos.component.css']
})
export class ListarTurnosComponent implements OnInit {
  data = USERS;
  columnasMostradas: string[] = [
    'nro',
    'nombre',
    'apellido',
    'vacuna',
    'sede',
    'riesgo',
    'borrar',
  ]
  sedes: Sede[] = [
    { nro: 1, name: 'Centro' },
    { nro: 2, name: 'Estadio' },
    { nro: 3, name: 'Bosque' },
  ]
  sede = this.sedes[1];


  constructor(@Inject(MatSnackBar) private snackBar: MatSnackBar,
              public popup: MatDialog,
              private router: Router) { }

  esRiesgo(valor:boolean){
    if (valor)
      return 'Sí'
    else
      return 'No';
  }

  confirmarVisita(row:any){

  }

  ngOnInit(): void {}
}
