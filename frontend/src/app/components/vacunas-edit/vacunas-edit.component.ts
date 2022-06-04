import { HttpClient } from '@angular/common/http'
import { Component, Input, OnInit, SimpleChanges } from '@angular/core'
  import { AuthService } from 'src/app/services/auth.service'
  import { environment } from 'src/environments/environment'

  @Component({
    selector: 'app-vacunas-edit',
    templateUrl: './vacunas-edit.component.html',
    styleUrls: ['./vacunas-edit.component.css'],
  })
  export class VacunasEditComponent implements OnInit {
    vacunas = {
      covid: {
        dosis: 0,
        modifiable: false,
        fecha: new Date(),
      },
      gripe: {
        dosis: 0,
        modifiable: false,
        fecha: new Date(),
      },
      fiebreA: {
        dosis: 0,
        modifiable: false,
        fecha: new Date(),
      },
    }
    private URL = environment.baseApiUrl + '/usersVaccines'
    @Input() v:any
    constructor(private http: HttpClient, private authService: AuthService) {
      this.http.get<any>(this.URL + '/user/' + authService.getId()).subscribe(
        (res) => {
          res.forEach((el: any) => {
            Object.entries(this.vacunas).forEach(([k, v]) => {
              if (k === el.vaccineId) {
                v.dosis = el.doseNumber
                v.modifiable = !el.applied && el.modifiable
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
