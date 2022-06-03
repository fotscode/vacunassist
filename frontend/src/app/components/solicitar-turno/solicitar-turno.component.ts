import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'

interface Vacuna {
  _id: string
  applied: boolean
  createdAt: Date
  dateIssued: Date
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

  constructor(private http: HttpClient, private authService: AuthService) {
    this.http
      .get<Array<Vacuna>>(this.URL + '/user/' + this.authService.getId())
      .subscribe((res) => {
        this.vacCovid = res.filter((e: Vacuna) => e.vaccineId == 'covid')[0]
        this.setApprovableCovid(this.vacCovid)
        this.vacGripe = res.filter((e: Vacuna) => e.vaccineId == 'gripe')[0]
        this.setApprovableGripe(this.vacGripe)
        // caso 10 del dia
      })
  }

  ngOnInit(): void {}

  private setApprovableGripe(v: Vacuna) {
    this.gripe.maxDosage = v.doseNumber < 1
    this.authService.getUser().subscribe((res) => {
      this.gripe.validated = res.validated
    })
    this.isBelowMaxCount().then((r) => (this.gripe.maxCount = r))

    this.gripe.pending = !v.dateIssued
  }

  private setApprovableCovid(v: Vacuna) {
    this.covid.maxDosage = v.doseNumber < 2
    this.authService.getUser().subscribe((res) => {
      this.covid.validated = res.validated
    })
    this.isBelowMaxCount().then((r) => (this.covid.maxCount = r))
    this.covid.pending = !v.dateIssued
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
                this.datesOnSameDay(v.dateIssued, new Date())
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

  solicitarTurno(v:Vacuna | undefined){
    if (v){
      v.dateIssued = new Date()
      v.modifiable = false
      this.gripe.pending = false
      this.http
        .put(this.URL + '/' + v._id, v)
        .toPromise()
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
