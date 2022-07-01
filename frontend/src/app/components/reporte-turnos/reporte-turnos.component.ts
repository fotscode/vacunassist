import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { FormControl } from '@angular/forms'

export interface User {
  cuil:string,
  nombre:string,
  apellido:string,
  vacuna:string,
  sede:string,
  riesgo:boolean,
  vacunador:string,
  fecha:string
}

@Component({
  selector: 'app-reporte-turnos',
  templateUrl: './reporte-turnos.component.html',
  styleUrls: ['./reporte-turnos.component.css']
})
export class ReporteTurnosComponent implements OnInit {
  USERS: User[] = [
    {cuil:'20-15972648-5', nombre:'Papu',     apellido:'Gómez',     vacuna:'Covid', sede: 'Liberosky nº 459'   ,  riesgo:true,  vacunador:"Tévez",      fecha: this.formatDate(new Date('07/08/2022'))},
    {cuil:'20-25267164-5', nombre:'Carmen',   apellido:'Barbieri',  vacuna:'Gripe', sede: 'Chechnya nº 692'    ,  riesgo:true,  vacunador:"Gago",       fecha: this.formatDate(new Date('07/08/2022'))},
    {cuil:'20-30218655-5', nombre:'Laura',    apellido:'De Giusti', vacuna:'Covid', sede: 'Nestor K. nº 1942'  ,  riesgo:false, vacunador:"Sabatella",  fecha: this.formatDate(new Date('07/08/2022'))},
    {cuil:'20-10643098-5', nombre:'Pablo',    apellido:'Thomas',    vacuna:'Covid', sede: 'Nestor K. nº 1942'  ,  riesgo:true,  vacunador:"Sabatella",  fecha: this.formatDate(new Date('07/08/2022'))},
    {cuil:'20-24601387-5', nombre:'Rodolfo',  apellido:'Bertone',   vacuna:'Gripe', sede: 'Liberosky nº 459'   ,  riesgo:false, vacunador:"Tévez",      fecha: this.formatDate(new Date('07/08/2022'))},
    {cuil:'20-19083230-5', nombre:'Viviana',  apellido:'Harari',    vacuna:'Covid', sede: 'Chechnya nº 692'    ,  riesgo:true,  vacunador:"Gago",       fecha: this.formatDate(new Date('07/08/2022'))},
  ]
  data = this.USERS;
  columnasMostradas: string[] = [
    'cuil',
    'nombre',
    'apellido',
    'riesgo',
    'vacuna',
    'sede',
    'vacunador',
    'fecha',
  ]
  hoy = new FormControl(new Date());

  constructor(@Inject(MatSnackBar) private snackBar: MatSnackBar,
              public popup: MatDialog,
              private router: Router) { }

  esRiesgo(valor:boolean){
    if (valor)
      return 'Sí'
    else
      return 'No';
  }

  private formatDate(d: Date): string {
    let y = d.getFullYear()
    let m = d.getMonth() + 1
    let day = d.getDate()
    return `${day}/${m}/${y}`
  }

  ngOnInit(): void {
  }

}
