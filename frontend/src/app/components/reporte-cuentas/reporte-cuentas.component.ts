import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import {FormControl} from '@angular/forms'

export interface Cuenta {
  fecCreada:string,
  nombre:string,
  apellido:string,
  email:string,
  cuil:string,
  fecNac:string,
  riesgo:boolean,
  sede:string,
}

@Component({
  selector: 'app-reporte-cuentas',
  templateUrl: './reporte-cuentas.component.html',
  styleUrls: ['./reporte-cuentas.component.css']
})
export class ReporteCuentasComponent implements OnInit {
  CUENTAS: Cuenta[] = [
    {fecCreada:this.formatDate(new Date('07/08/2022')),  nombre:'Papu',     apellido:'Gómez',     email:'aaaaa@gmail.com',   cuil:'20-15972648-5', fecNac:this.formatDate(new Date('07/08/2022')),  riesgo:true,   sede: 'Chechnya nº 692',  },
    {fecCreada:this.formatDate(new Date('07/08/2022')),  nombre:'Carmen',   apellido:'Barbieri',  email:'bbbbb@gmail.com',   cuil:'20-25267164-5', fecNac:this.formatDate(new Date('07/08/2022')),  riesgo:true,   sede: 'Nestor K. nº 1942',},
    {fecCreada:this.formatDate(new Date('07/08/2022')),  nombre:'Laura',    apellido:'De Giusti', email:'ccccc@gmail.com',   cuil:'20-30218655-5', fecNac:this.formatDate(new Date('07/08/2022')),  riesgo:false,  sede: 'Chechnya nº 692',  },
    {fecCreada:this.formatDate(new Date('07/08/2022')),  nombre:'Pablo',    apellido:'Thomas',    email:'ddddd@gmail.com',   cuil:'20-10643098-5', fecNac:this.formatDate(new Date('07/08/2022')),  riesgo:true,   sede: 'Chechnya nº 692',  },
    {fecCreada:this.formatDate(new Date('07/08/2022')),  nombre:'Rodolfo',  apellido:'Bertone',   email:'eeeee@gmail.com',   cuil:'20-24601387-5', fecNac:this.formatDate(new Date('07/08/2022')),  riesgo:false,  sede: 'Liberosky nº 459',        },
    {fecCreada:this.formatDate(new Date('07/08/2022')),  nombre:'Viviana',  apellido:'Harari',    email:'fffff@gmail.com',   cuil:'20-19083230-5', fecNac:this.formatDate(new Date('07/08/2022')),  riesgo:true,   sede: 'Nestor K. nº 1942',},
  ]
  data = this.CUENTAS;
  columnasMostradas: string[] = [
    'fecCreada',
    'nombre',
    'apellido',
    'email',
    'cuil',
    'fecNac',
    'riesgo',
    'sede',
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
