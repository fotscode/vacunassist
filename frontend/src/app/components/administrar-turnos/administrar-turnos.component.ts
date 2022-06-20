import { Component, OnInit, Inject } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { DialogRechazarTurnoComponent } from '../dialog-rechazar-turno/dialog-rechazar-turno.component'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { firstLetterUpper, Vacuna } from '../misturnos/misturnos.component'
import { environment } from 'src/environments/environment'
import { User } from '../register-page/register-page.component'

export const esRiesgo = (riesgo: boolean) => {
  return riesgo ? 'Sí' : 'No'
}

export interface Solicitud {
  id: string
  nro: number
  nombre: string
  apellido: string
  vacuna: string
  sede: string
  riesgo: boolean
  v: Vacuna
}
let SOLICITUDES: Solicitud[] = []

@Component({
  selector: 'app-administrar-turnos',
  templateUrl: './administrar-turnos.component.html',
  styleUrls: ['./administrar-turnos.component.css'],
})
export class AdministrarTurnosComponent implements OnInit {
  private apiURL: string = environment.baseApiUrl
  data = SOLICITUDES
  columnasMostradas: string[] = [
    'nro',
    'nombre',
    'apellido',
    'vacuna',
    'sede',
    'riesgo',
    'accion',
  ]

  constructor(
    @Inject(MatSnackBar) private snackBar: MatSnackBar,
    public popup: MatDialog,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getVacunas()
  }
  private async getVacunas() {
    this.http
      .get<Array<Vacuna>>(this.apiURL + '/usersVaccines/')
      .subscribe(async (res) => {
        console.log(res)
        SOLICITUDES = []
        let arr = res.filter(
          (e) => e.dateConfirmed == 0 && !e.applied
        )
        arr.forEach(async (e) => {
          let u = await this.getUserInfo(e.userId)
          let obj: Solicitud = {
            id: e._id,
            nro: SOLICITUDES.length + 1,
            nombre: u.firstName,
            apellido: u.lastName,
            vacuna: firstLetterUpper(e.vaccineId),
            sede: e.sede,
            riesgo: u.riesgo,
            v: e,
          }
          SOLICITUDES.push(obj)
        })
        setTimeout(() => {
          this.data = SOLICITUDES // TODO mejor hecho pero no lo veo bien
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

  cancelAppointment(id: string, appl: boolean) {
    this.http
      .put(this.apiURL + '/usersVaccines/cancel/' + id, { applied: appl })
      .subscribe((res) => {
        this.ngOnInit()
      })
  }

  aceptarTurno(turno: any) {
    this.router.navigate(['/ConfirmarTurno', turno.v._id])
  }

  rechazarTurno(turno: any) {
    this.http
      .put(this.apiURL + '/usersVaccines/cancel/' + turno.v._id, {
        applied: turno.v.applied,
      })
      .subscribe((res) => {
        this.ngOnInit()
      })
  }

  rechazarTurnoAttempt(turno: any) {
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
}
