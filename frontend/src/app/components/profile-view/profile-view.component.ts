import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'
import { Sede } from '../sedes/sedes.component'

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent implements OnInit {
  nivel = ''
  nombre = ''
  apellido = ''
  email = ''
  cuil = ''
  riesgo = false
  fechaNac = this.formatDate(new Date())
  sedes: Sede[] = [
    { nro: 1, name: '13 nº 876 e/ 49 y 50' },
  ]
  sede: Sede = this.sedes[0]
  dosis = ['Gripe: 1', 'COVID: 2']

  private URL = environment.baseApiUrl + '/users'
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.http
      .get<any>(this.URL + '/user/' + this.authService.getId())
      .subscribe(
        (res) => {
          this.nivel = this.getNivel()
          this.nombre = res.firstName
          this.apellido = res.lastName
          this.email = res.email
          this.cuil = res.cuil
          this.fechaNac = this.formatDate(new Date(res.fechaNac))
          this.riesgo = res.riesgo
          this.getSedes(res.sede)
        },
        (err) => {
          console.log(err)
        }
      )
  }

  private getSedes(sede: string) {
    this.http
      .get<Array<Sede>>(environment.baseApiUrl + '/sites/')
      .subscribe((res) => {
        res.forEach((s) =>
          this.sedes.push({ nro: this.sedes.length + 1, name: s.name.trim() })
        )
        let s = this.sedes.find((s) => s.name == sede)
        this.sede = s ? s : this.sedes[1]
      })
  }

  setSede(s: Sede) {
    this.sede = s
  }

  private formatDate(d: Date): string {
    let y = d.getFullYear()
    let m = d.getMonth() + 1
    let day = d.getDate()
    return `${day}/${m}/${y}`
  }
  private getNivel(): string {
    let rol = this.authService.getRol()
    return rol == 1 ? 'Paciente' : rol == 2 ? 'Vacunador' : 'Administrador'
  }
}
