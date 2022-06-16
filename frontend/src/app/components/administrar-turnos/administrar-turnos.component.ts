import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { DialogRechazarTurnoComponent } from '../dialog-rechazar-turno/dialog-rechazar-turno.component';
import { Router } from '@angular/router'

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

  constructor(@Inject(MatSnackBar) private snackBar: MatSnackBar,
              public popup: MatDialog,
              private router: Router) { }

  aceptarTurno(turno:any){
    this.router.navigate(['/ConfirmarTurno'])
  }

  rechazarTurno(turno:any){

  }

  rechazarTurnoAttempt(turno:any){
    const dialogConfig = new MatDialogConfig()
      dialogConfig.disableClose = true
      dialogConfig.autoFocus = false
      dialogConfig.width = '500px'
      const referencia = this.popup.open(
        DialogRechazarTurnoComponent,
        dialogConfig
      )
      referencia.afterClosed().subscribe((result) => {
        if (result) {
          this.rechazarTurno(turno)
          this.snackBar.open('El turno ha sido rechazado', void 0, {
            duration: 3000,
          })
        }
      })
  }

  ngOnInit(): void {}
}
