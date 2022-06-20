import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'
import { DialogCancelTurnoComponent } from '../dialog-cancel-turno/dialog-cancel-turno.component'

export const firstLetterUpper = (s: string): string => {
    return s.substring(0, 1).toUpperCase() + s.substring(1)
}

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
  userId:string
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
  selector: 'app-misturnos',
  templateUrl: './misturnos.component.html',
  styleUrls: ['./misturnos.component.css'],
})
export class MisturnosComponent implements OnInit {
  private URL = environment.baseApiUrl + '/usersVaccines'

  turnos: Array<Turno> = []

  constructor(public popup: MatDialog,private http: HttpClient, private authService: AuthService) {}
  private formatDate(d: Date): string {
    let y = d.getFullYear()
    let m = d.getMonth() + 1
    let day = d.getDate()
    return `${day}/${m}/${y}`
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

  ngOnInit(): void {
    this.http
      .get<Array<Vacuna>>(this.URL + '/user/' + this.authService.getId())
      .subscribe((res) => {
        res
          .filter((v) => !v.modifiable && v.dateIssued != 0)
          .forEach((v) => {
            let turno: Turno = {
              id: v._id,
              applied:v.applied,
              estado: this.getEstado(v.dateConfirmed, v.applied),
              vacuna: firstLetterUpper(v.vaccineId),
              fecha: !v.dateConfirmed
                ? 'A confirmar'
                : this.formatDate(new Date(v.dateConfirmed)),
              sede: v.dateConfirmed ? v.sede : 'A confirmar',
            }
            this.turnos.push(turno)
          })
      })
  }

  isLogged(){
    return this.authService.loggedIn();
  }
}
