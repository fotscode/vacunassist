import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.component.html',
  styleUrls: ['./vacunas.component.css'],
})
export class VacunasComponent implements OnInit {
  vacunas = {
    covid: {
      dosis: 0,
      fecha: new Date(),
    },
    gripe: {
      dosis: 0,
      fecha: new Date(),
    },
    fiebreA: {
      dosis: 0,
      fecha: new Date(),
    },
  }
  private URL = environment.baseApiUrl + '/usersVaccines'
  constructor(private http: HttpClient, private authService: AuthService) {
    this.http.get<any>(this.URL + '/user/' + authService.getId()).subscribe(
      (res) => {
        res.forEach((el: any) => {
          Object.entries(this.vacunas).forEach(([k, v]) => {
            if (k === el.vaccineId) {
              v.dosis = el.doseNumber
              v.fecha = new Date(el.dateApplied)
            }
          })
        })
      },
      (err) => {
        console.log(err)
      }
    )
  }

  ngOnInit(): void {}
}
