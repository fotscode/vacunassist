import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'

interface Sede {
  id: number
  nombre: String
}

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  sedes: Sede[] = [
    { id: 1, nombre: 'Bosque' },
    { id: 2, nombre: 'Centro' },
    { id: 3, nombre: 'Estadio' },
  ]
  dosis = ['Gripe: 1', 'COVID: 2']

  nivel = ''
  user = {
    firstName: '',
    lastName: '',
    email: '',
    cuil: '',
    riesgo: false,
    fechaNac:this.formatDate(new Date()),
    sede: this.sedes[1],
  }

  private URL = environment.apiUrl
  constructor(private http: HttpClient, private authService: AuthService, private router:Router) {
    this.http
      .get<any>(this.URL + '/user/' + this.authService.getId())
      .subscribe(
        (res) => {
          this.nivel = this.getNivel()
          this.user.firstName = res.firstName
          this.user.lastName = res.lastName
          this.user.email = res.email
          this.user.cuil = res.cuil
          this.user.riesgo = res.riesgo==='true' ? true : false
          this.user.fechaNac=this.formatDate(new Date(res.fechaNac))
          let sede = this.sedes.find((s) => s.nombre == res.sede)
          // si no encuentra la sede guardada pone la primera
          this.user.sede = sede ? sede : this.sedes[1]
        },
        (err) => {
          console.log(err)
        }
      )
  }

  ngOnInit(): void {}

  setSede(s: Sede) {
    this.user.sede = s
  }

  private getNivel(): string {
    let rol = this.authService.getRol()
    return rol == 1 ? 'Paciente' : rol == 2 ? 'Vacunador' : 'Administrador'
  }

  private formatDate(d: Date): string{
    let y=d.getFullYear()
    let m=d.getMonth()
    let day=d.getDate()
    return `${day}/${m}/${y}`
  }

  updateUser() {
    this.http
      .put<any>(this.URL + '/user/' + this.authService.getId(), this.user)
      .subscribe(
        (res) => {
          this.router.navigate(["/Perfil"])
        },
        (err) => {
          console.log(err)
        }
      )
  }
}
