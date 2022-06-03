import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'

interface Vacuna {
  _id: string
  applied: boolean
  createdAt: Date
  dateIssued: number
  dateApplied: number
  dateConfirmed: number
  doseNumber: number
  modifiable: boolean
  vaccineId: string
}

interface Turno {
  estado: string
  vacuna: string
  fecha: string
}

@Component({
  selector: 'app-misturnos',
  templateUrl: './misturnos.component.html',
  styleUrls: ['./misturnos.component.css'],
})
export class MisturnosComponent implements OnInit {
  private URL = environment.baseApiUrl + '/usersVaccines'

  turnos: Array<Turno> = []

  constructor(private http: HttpClient, private authService: AuthService) {
    this.http
      .get<Array<Vacuna>>(this.URL + '/user/' + this.authService.getId())
      .subscribe((res) => {
        res
          .filter((v) => !v.modifiable)
          .forEach((v) => {
            console.log(v)
            let turno: Turno = {
              estado: this.getEstado(v.dateConfirmed, v.applied),
              vacuna: this.firstLetterUpper(v.vaccineId),
              fecha: !v.dateConfirmed
                ? 'No hay fecha'
                : this.formatDate(new Date(v.dateConfirmed)),
            }
            this.turnos.push(turno)
          })
      })
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
  ngOnInit(): void {}
}
