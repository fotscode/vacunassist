import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { DialogCancelTurnoComponent } from '../dialog-cancel-turno/dialog-cancel-turno.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { Router } from '@angular/router'

export interface Vacuna {
  _id: string
  applied: boolean
  createdAt: Date
  dateIssued: number
  dateApplied: number
  dateConfirmed: number
  doseNumber: number
  modifiable: boolean
  vaccineId: string
  sede:string
}

export interface Persona {
  _id: string
  cuil: string
  firstName: string
  lastName: string
  email: string
  fechaNac: string
  riesgo: string
  sede: string
}

interface Turno {
  id: string
  estado: string
  vacuna: string
  fecha: string
  applied: boolean
  sede:string
}

@Component({
  selector: 'app-admin-turnos-view',
  templateUrl: './admin-turnos-view.component.html',
  styleUrls: ['./admin-turnos-view.component.css']
})



export class AdminTurnosViewComponent implements OnInit {

  public id: string
  usuario: Persona | undefined

  private URL = environment.baseApiUrl + '/usersVaccines'

  turnos: Array<Turno> = []
  columnasMostradas: string[] = [
    'nro',
    'nombre',
    'accion',
  ]

  constructor(public popup: MatDialog,
              private http: HttpClient,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
    this.id = this.getIdPerson() || ''
  }
  public getIdPerson() {
    return this.route.snapshot.paramMap.get('id')
  }
  private formatDate(d: Date): string {
    let y = d.getFullYear()
    let m = d.getMonth() + 1
    let day = d.getDate()
    return `${day}/${m}/${y}`
  }

  private firstLetterUpper(s: string): string {
    return s.substring(0, 1).toUpperCase() + s.substring(1)
  }

  private getEstado(dConfirmed: number, applied: boolean): string {
    return !dConfirmed ? 'Pendiente' : !applied ? 'Confirmado' : 'Aplicado'
  }

  cancelAttempt(id:string,appl:boolean){
    const dialogConfig = new MatDialogConfig()
      dialogConfig.disableClose = true
      dialogConfig.autoFocus = false
      dialogConfig.width = '500px'
      const referencia = this.popup.open(
        DialogCancelTurnoComponent,
        dialogConfig
      )
      referencia.afterClosed().subscribe((result) => {
        if (result) {
          this.cancelAppointment(id, appl)
        }
      })
  }


  cancelAppointment(id: string,appl:boolean) {
    this.http.put(this.URL + '/cancel/' + id, {applied:appl}).subscribe((res) => {
      this.turnos=[]
      this.ngOnInit()
    })
  }

  solicitarTurno(){
    this.router.navigate(['/SolicitarTurno'])
  }

  ngOnInit(): void {
    this.http
      .get<Array<Vacuna>>(this.URL + '/user/' + this.getIdPerson())
      .subscribe((res) => {
        res
          .filter((v) => !v.modifiable && v.dateIssued != 0)
          .forEach((v) => {
            let turno: Turno = {
              id: v._id,
              applied:v.applied,
              estado: this.getEstado(v.dateConfirmed, v.applied),
              vacuna: this.firstLetterUpper(v.vaccineId),
              fecha: !v.dateConfirmed
                ? 'A confirmar'
                : this.formatDate(new Date(v.dateConfirmed)),
              sede: v.dateConfirmed ? v.sede : 'A confirmar',
            }
            this.turnos.push(turno)
          })
      })
  }
}
