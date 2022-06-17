import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import {FormControl} from '@angular/forms'

export interface Paciente {
  cuil:string,
  nombre:string,
  apellido:string
  vacuna:string,
  dosis:number,
  fecha:FormControl,
  riesgo:boolean
}

@Component({
  selector: 'app-confirmar-turno',
  templateUrl: './confirmar-turno.component.html',
  styleUrls: ['./confirmar-turno.component.css']
})
export class ConfirmarTurnoComponent implements OnInit {
  hoy = new FormControl(new Date());
  user : Paciente = {
    cuil:'20-28673854-5',
    nombre:'Pepe',
    apellido:'Grillo',
    vacuna:'Covid',
    dosis:1,
    fecha: new FormControl(new Date()),
    riesgo:true,
  }

  constructor(@Inject(MatSnackBar) private snackBar: MatSnackBar,
              private router: Router) { }

  confirmarTurno(){
    this.snackBar.open('Turno confirmado', void 0, {
      duration: 2000,
    })
    this.router.navigate(['/AdministrarTurnos'])
  }

  ngOnInit(): void {}
}
