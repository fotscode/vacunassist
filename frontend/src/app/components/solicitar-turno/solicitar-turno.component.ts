import { HttpClient } from '@angular/common/http'
import { Component, Inject, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'

export const datesOnSameDay = (first: Date, second: Date): boolean =>{
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    )
  }
interface Vacuna {
  _id: string
  applied: boolean
  createdAt: Date
  dateIssued: number
  dateApplied: number
  doseNumber: number
  modifiable: boolean
  vaccineId: string
  sede:string
}

interface Approvable {
  maxDosage: boolean // tiene las dosis maximas
  validated: boolean // esta validado
  maxCount: boolean // cantidad maxima del dia
  pending: boolean // si ya solicito
  ageAllowed?: boolean // si es mayor/igual a 18 anios en covid
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
    ageAllowed: false,
  }

  gripe: Approvable = {
    maxDosage: false,
    validated: false,
    maxCount: false,
    pending: false,
  }

  vacCovid:     Vacuna | undefined
  vacGripe:     Vacuna | undefined
  vacFAmarilla: Vacuna | undefined

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(MatSnackBar) private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.http
      .get<Array<Vacuna>>(this.URL + '/user/' + this.authService.getId())
      .subscribe((res) => {
        this.vacCovid = res.find((e: Vacuna) => e.vaccineId == 'covid')
        this.setApprovable(this.vacCovid, this.covid, 2)
        this.vacGripe = res.find((e: Vacuna) => e.vaccineId == 'gripe')
        this.setApprovable(this.vacGripe, this.gripe, 1)
      })
  }

  private setApprovable(v: Vacuna | undefined, a: Approvable, doseMax: number) {
    if (v) {
      a.maxDosage = v.doseNumber < doseMax
      this.authService.getUser().subscribe((res) => {
        a.validated = res.validated
        if (typeof a.ageAllowed !== 'undefined') {
          a.ageAllowed =
            (new Date().getTime() - res.fechaNac) / 1000 / 60 / 60 / 24 / 365 >=
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
      await this.getSede().then((res)=>v.sede=res);
      this.http
        .put(this.URL + '/' + v._id, v)
        .toPromise()
        .then((res) => {
          this.snackBar.open(`Turno de ${v.vaccineId} solicitado`, void 0, {
            duration: 3000,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (v) {
      this.snackBar.open(
        'Error al solicitar turno',
        void 0,{duration: 3000,})
      this.errorMsg = this.getErrMsg(a)
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

  private async getSede():Promise<string>{
    return new Promise((resolve,reject)=>{
      this.authService.getUser().subscribe((res)=>{
        resolve(res.sede)
      },(err)=>reject(err))

    })

  }

  isVacunador() {
    return this.authService.getRol() == (3 || 2)
  }
}
