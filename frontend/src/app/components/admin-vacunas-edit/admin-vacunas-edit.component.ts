import { HttpClient } from '@angular/common/http'
import { Component, Input, OnInit, SimpleChanges } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'
import { AdminProfileEditComponent } from '../admin-profile-edit/admin-profile-edit.component'

@Component({
  selector: 'app-admin-vacunas-edit',
  templateUrl: './admin-vacunas-edit.component.html',
  styleUrls: ['./admin-vacunas-edit.component.css'],
})
export class AdminVacunasEditComponent implements OnInit {
  @Input() id: string = ''
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
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.http.get<any>(this.URL + '/user/' + this.id).subscribe(
      (res) => {
        res.forEach((el: any) => {
          Object.entries(this.vacunas).forEach(([k, v]) => {
            if (k === el.vaccineId) {
              v.dosis = el.doseNumber
              v.modifiable = el.modifiable
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
}
