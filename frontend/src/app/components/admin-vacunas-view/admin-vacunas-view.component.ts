import { HttpClient } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-admin-vacunas-view',
  templateUrl: './admin-vacunas-view.component.html',
  styleUrls: ['./admin-vacunas-view.component.css']
})
export class AdminVacunasViewComponent implements OnInit {
  @Input() id: string = ''
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
  constructor(private http: HttpClient) {
  }
  ngAfterViewInit(){
    this.http.get<any>(this.URL + '/user/' + this.id).subscribe(
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
