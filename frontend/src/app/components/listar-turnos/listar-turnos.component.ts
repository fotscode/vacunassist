import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Sede } from '../sedes/sedes.component'
import { firstLetterUpper, Vacuna } from '../misturnos/misturnos.component'
import { DialogBorrarTurnoComponent } from '../dialog-borrar-turno/dialog-borrar-turno.component'
import { DialogConfirmarVisitaComponent } from '../dialog-confirmar-visita/dialog-confirmar-visita.component'
import { HttpClient } from '@angular/common/http'
import { User } from '../register-page/register-page.component'
import { environment } from 'src/environments/environment'
import { datesOnSameDay } from '../solicitar-turno/solicitar-turno.component'


export interface Solicitud {
  nro: number
  nombre: string
  apellido: string
  vacuna: string
  sede: string
  riesgo: boolean
  hoy: boolean
  vac?: Vacuna
}
let USERS: Solicitud[] = []



@Component({
  selector: 'app-listar-turnos',
  templateUrl: './listar-turnos.component.html',
  styleUrls: ['./listar-turnos.component.css'],
})
export class ListarTurnosComponent implements OnInit {
  private apiURL: string = environment.baseApiUrl
  data = USERS
  hoy: boolean
  columnasMostradas: string[] = [
    'nro',
    'nombre',
    'apellido',
    'vacuna',
    'sede',
    'riesgo',
    'acciones',
  ]
  sedes: Sede[] = [{ nro: 1, name: 'Centro' }]
  sede = this.sedes[1]

  constructor(
    @Inject(MatSnackBar) private snackBar: MatSnackBar,
    public popup: MatDialog,
    private router: Router,
    private http: HttpClient
  ) {
    this.hoy = false
  }


  esRiesgo(valor: boolean) {
    if (valor) return 'Sí'
    else return 'No'
  }

  confirmarVisita(row: any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false
    dialogConfig.width = '500px'
    const referencia = this.popup.open(
      DialogConfirmarVisitaComponent,
      dialogConfig
    )
    referencia.afterClosed().subscribe((result) => {
      if (result) {
        let obj={
          doseNumber:row.vac.doseNumber+1,
          dateApplied:Date.now(),
          dateConfirmed:0,
          applied:true,
          dateIssued:0,
        }
        this.http
          .put(`${this.apiURL}/usersVaccines/confirm/${row.vac._id}`, obj)
          .subscribe((res) => {
            console.log(res)
            this.snackBar.open('Visita confirmada', void 0, {
              duration: 3000,
            })
          })
      }
    })
  }

  borrarTurno(turno: any) {}

  borrarTurnoAttempt(turno: any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false
    dialogConfig.width = '500px'
    const referencia = this.popup.open(DialogBorrarTurnoComponent, dialogConfig)
    referencia.afterClosed().subscribe((result) => {
      if (result) {
        this.borrarTurno(turno)
        this.snackBar.open('El turno ha sido borrado', void 0, {
          duration: 3000,
        })
      }
    })
  }

  getData(sede: string) {
    return this.data.filter(
      (u) => u.sede == sede && (u.hoy == this.hoy || !this.hoy)
    )
  }

  ngOnInit(): void {
    this.getVacunas()
    this.getSedes()
  }
  private async getVacunas() {
    this.http
      .get<Array<Vacuna>>(this.apiURL + '/usersVaccines/')
      .subscribe(async (res) => {
        USERS = []
        console.log(res)
        let arr = res.filter((e) => e.dateConfirmed != 0)
        arr.forEach(async (e) => {
          let u = await this.getUserInfo(e.userId)
          let obj: Solicitud = {
            nro: USERS.length + 1,
            nombre: u.firstName,
            apellido: u.lastName,
            vacuna: firstLetterUpper(e.vaccineId),
            sede: e.sede,
            riesgo: u.riesgo,
            hoy: datesOnSameDay(new Date(e.dateConfirmed), new Date()),
            vac: e,
          }
          USERS.push(obj)
        })
        setTimeout(() => {
          this.data = USERS // TODO mejor hecho pero no lo veo bien
        }, 100)
      })
  }

  private async getUserInfo(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http
        .get<User>(this.apiURL + '/users/user/' + id)
        .subscribe((res) => {
          if (res) resolve(res)
        })
    })
  }
  private getSedes() {
    this.http
      .get<Array<Sede>>(environment.baseApiUrl + '/sites/')
      .subscribe((res) => {
        res.forEach((s) =>
          this.sedes.push({ nro: this.sedes.length + 1, name: s.name.trim() })
        )
      })
  }

}
