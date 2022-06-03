import { HttpClient } from '@angular/common/http'
import { Component, Inject, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'

interface Vacuna {
  _id: string
  applied: boolean
  createdAt: Date
  dateIssued: number
  dateApplied: number
  doseNumber: number
  modifiable: boolean
  vaccineId: string
}

interface Approvable {
  maxDosage: boolean // tiene las dosis maximas
  validated: boolean // esta validado
  maxCount: boolean // cantidad maxima del dia
  pending: boolean // si ya solicito
}

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css'],
})
export class SolicitarTurnoComponent implements OnInit {
  private URL = environment.baseApiUrl + '/usersVaccines'
  errorMsg: string = ''
  covid: Approvable = {
    maxDosage: false,
    validated: false,
    maxCount: false,
    pending: false,
  }

  gripe: Approvable = {
    maxDosage: false,
    validated: false,
    maxCount: false,
    pending: false,
  }
  vacCovid: Vacuna | undefined
  vacGripe: Vacuna | undefined

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(MatSnackBar) private snackBar: MatSnackBar
  ) {
    this.http
      .get<Array<Vacuna>>(this.URL + '/user/' + this.authService.getId())
      .subscribe((res) => {
        this.vacCovid = res.filter((e: Vacuna) => e.vaccineId == 'covid')[0]
        this.setApprovable(this.vacCovid, this.covid, 2)
        this.vacGripe = res.filter((e: Vacuna) => e.vaccineId == 'gripe')[0]
        this.setApprovable(this.vacGripe, this.gripe, 1)
      })
  }

  ngOnInit(): void {}

  private setApprovable(v: Vacuna, a: Approvable, doseMax: number) {
    a.maxDosage = v.doseNumber < doseMax
    this.authService.getUser().subscribe((res) => {
      a.validated = res.validated
    })
    this.isBelowMaxCount().then((r) => (a.maxCount = r))
    a.pending = !v.dateIssued && v.dateIssued==0
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
                this.datesOnSameDay(new Date(v.dateIssued), new Date())
            ).length <= 10
          )
        } else resolve(false)
      })
    })
  }
  private datesOnSameDay(first: Date, second: Date): boolean {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    )
  }

  solicitarTurno(v: Vacuna | undefined, a: Approvable) {
    if (v && this.isApprovable(a)) {
      console.log(v)
      v.dateIssued = new Date().getTime()
      v.modifiable = false
      a.pending = false
      this.http
        .put(this.URL + '/' + v._id, v)
        .toPromise()
        .then((res) => {
          this.snackBar.open(`Turno de ${v.vaccineId} solicitado`, void 0, { duration: 3000 })
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (v) {
      this.errorMsg = this.getErrMsg(a) // TODO hacer mas lindo esto
    }
  }
  private getErrMsg(a: Approvable): string {
    return !a.validated
      ? 'No se encuentra validado'
      : !a.pending
      ? 'Ya tiene un turno pendiente'
      : !a.maxCount
      ? 'No hay mas dosis diarias de vacunas'
      : 'Ya tiene la cantidad de dosis maximas'
  }
}
