import { HttpClient } from '@angular/common/http'
import { Component, Inject, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'
import { DialogCancelTurnoComponent } from '../dialog-cancel-turno/dialog-cancel-turno.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { Router } from '@angular/router'
import {
  Approvable,
  datesOnSameDay,
  Vacuna,
} from '../solicitar-turno/solicitar-turno.component'
import { MatSnackBar } from '@angular/material/snack-bar'
import { User } from '../register-page/register-page.component'

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
  sede: string
}

@Component({
  selector: 'app-admin-turnos-view',
  templateUrl: './admin-turnos-view.component.html',
  styleUrls: ['./admin-turnos-view.component.css'],
})
export class AdminTurnosViewComponent implements OnInit {
  public id: string
  usuario: Persona | undefined
  errorMsg = ''

  private apiURL: string = environment.baseApiUrl
  private URL = environment.baseApiUrl + '/usersVaccines'

  covid: Approvable = {
    maxDosage: false,
    validated: false,
    maxCount: false,
    pending: false,
    ageAllowed: false,
  }

  gripe: Approvable = {
    maxDosage: false,
    validated: false,
    maxCount: false,
    pending: false,
  }
  fAmarilla: Approvable = {
    maxDosage: false,
    validated: false,
    maxCount: false,
    pending: false,
  }

  vacCovid: Vacuna | undefined
  vacGripe: Vacuna | undefined
  vacFAmarilla: Vacuna | undefined

  turnos: Array<Turno> = []
  columnasMostradas: string[] = ['nro', 'nombre', 'accion']

  constructor(
    public popup: MatDialog,
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    @Inject(MatSnackBar) private snackBar: MatSnackBar,
    private router: Router
  ) {
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
    return !dConfirmed
      ? 'Pendiente'
      : dConfirmed != 0
      ? 'Confirmado'
      : 'Aplicado'
  }

  cancelAttempt(id: string, appl: boolean) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = false
    dialogConfig.width = '500px'
    const referencia = this.popup.open(DialogCancelTurnoComponent, dialogConfig)
    referencia.afterClosed().subscribe((result) => {
      if (result) {
        this.cancelAppointment(id, appl)
      }
    })
  }

  cancelAppointment(id: string, appl: boolean) {
    this.http
      .put(this.URL + '/cancel/' + id, { applied: appl })
      .subscribe((res) => {
        this.turnos = []
        this.ngOnInit()
      })
  }

  ngOnInit(): void {
    this.http
      .get<Array<Vacuna>>(this.URL + '/user/' + this.getIdPerson())
      .subscribe((res) => {
        this.turnos = []
        this.vacCovid = res.find((e: Vacuna) => e.vaccineId == 'covid')
        this.setApprovable(this.vacCovid, this.covid, 2)
        this.vacGripe = res.find((e: Vacuna) => e.vaccineId == 'gripe')
        this.setApprovable(this.vacGripe, this.gripe, 1)
        this.vacFAmarilla = res.find((e: Vacuna) => e.vaccineId == 'fiebreA')
        this.setApprovable(this.vacFAmarilla, this.fAmarilla, 1)
        res
          .filter((v) => !v.modifiable && v.dateIssued != 0)
          .forEach((v) => {
            let turno: Turno = {
              id: v._id,
              applied: v.applied,
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

  private setApprovable(v: Vacuna | undefined, a: Approvable, doseMax: number) {
    if (v) {
      a.maxDosage = v.doseNumber < doseMax
      this.http
        .get<User>(`${this.apiURL}/users/user/${this.getIdPerson()}`)
        .subscribe((res) => {
          a.validated = res.validated
          if (typeof a.ageAllowed !== 'undefined') {
            a.ageAllowed =
              (new Date().getTime() - res.fechaNac) /
                1000 /
                60 /
                60 /
                24 /
                365 >=
              18
          }
        })
      this.isBelowMaxCount().then((r) => (a.maxCount = r))
      a.pending = !v.dateIssued || v.dateIssued == 0
    } else this.errorMsg = 'No se encontraron vacunas'
  }

  isApprovable(a: Approvable) {
    return Object.values(a).every((v) => v)
  }

  private async isBelowMaxCount(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<Array<Vacuna>>(this.URL).subscribe((res) => {
        if (res) {
          resolve(
            res.filter(
              (v) =>
                v.dateApplied == -1 &&
                v.dateIssued &&
                datesOnSameDay(new Date(v.dateIssued), new Date())
            ).length <= 10
          )
        } else resolve(false)
      })
    })
  }

  async solicitarTurno(v: Vacuna | undefined, a: Approvable) {
    if (v && this.isApprovable(a)) {
      v.dateIssued = new Date().getTime()
      v.modifiable = false
      a.pending = false
      await this.getSede(v.userId).then((res) => (v.sede = res))
      console.log(v.sede)
      this.http
        .put(this.URL + '/' + v._id, v)
        .toPromise()
        .then((res) => {
          let name = v.vaccineId
          if (name == 'fiebreA') name = 'fiebre amarilla'
          this.snackBar.open(`Turno de ${name} solicitado`, void 0, {
            duration: 3000,
          })
          this.ngOnInit()
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (v) {
      this.snackBar.open(this.getErrMsg(a), void 0, { duration: 3000 })
    }
  }
  private getErrMsg(a: Approvable): string {
    return !a.validated
      ? 'No se encuentra validado'
      : !a.pending
      ? 'Ya tenés un turno pendiente para esta vacuna'
      : !a.maxCount
      ? 'No hay mas dosis diarias de vacunas'
      : !a.maxDosage
      ? 'Ya tenés la cantidad de dosis máxima'
      : 'Los menores de edad no pueden solicitar turnos'
  }

  private async getSede(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http
        .get<User>(this.apiURL + '/users/user/' + id)
        .subscribe((res) => {
          if (res) resolve(res.sede)
        })
    })
  }

  notificarTurno() {
    this.http
      .get<Array<Vacuna>>(`${this.URL}/user/${this.getIdPerson()}`)
      .subscribe((vaccines) => {
        vaccines.forEach((vaccine) => {
          let { _id, ...obj } = vaccine
          if (vaccine.dateConfirmed != 0) {
            this.http
              .put(`${this.apiURL}/usersVaccines/confirm/${_id}`, obj)
              .subscribe((res) => {
              })
          }
        })
        this.snackBar.open(
          `Recordatorio de turno enviado al usuario via email`,
          void 0,
          {
            duration: 3000,
          }
        )
      })
  }
}
