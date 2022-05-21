import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'

interface Sede {
  id: number
  nombre: String
}

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
    { id: 1, nombre: 'Bosque' },
    { id: 2, nombre: 'Centro' },
    { id: 3, nombre: 'Estadio' },
  ]
  sede: Sede = this.sedes[1]
  dosis = ['Gripe: 1', 'COVID: 2']

  private URL = environment.baseApiUrl + '/users'
  constructor(private http: HttpClient, private authService: AuthService) {
    this.http.get<any>(this.URL + '/user/' + authService.getId()).subscribe(
      (res) => {
        this.nivel = this.getNivel()
        this.nombre = res.firstName
        this.apellido = res.lastName
        this.email = res.email
        this.cuil = res.cuil
        this.fechaNac = this.formatDate(new Date(res.fechaNac))
        this.riesgo = res.riesgo
        let sede = this.sedes.find((s) => s.nombre == res.sede)
        // si no encuentra la sede guardada pone la primera
        this.sede = sede ? sede : this.sedes[1]
      },
      (err) => {
        console.log(err)
      }
    )
  }

  ngOnInit(): void {}

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
