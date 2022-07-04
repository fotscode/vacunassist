import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'
import { Sede } from '../sedes/sedes.component'

export interface Rol {
  id: number
  nombre: String
}

export interface Persona {
  _id: string
  cuil: string
  firstName: string
  lastName: string
  email: string
  fechaNac: string
  riesgo: string
  sede: string
}

@Component({
  selector: 'app-admin-profile-view',
  templateUrl: './admin-profile-view.component.html',
  styleUrls: ['./admin-profile-view.component.css'],
})
export class AdminProfileViewComponent implements OnInit {
  public id: string
  usuario: Persona | undefined
  sedes: Sede[] = [
    { nro: 1, name: '13 nº 876 e/ 49 y 50' },
  ]
  roles: Rol[] = [
    { id: 1, nombre: 'Usuario' },
    { id: 2, nombre: 'Vacunador' },
    { id: 3, nombre: 'Administrador' },
  ]
  dosis = ['Gripe: 1', 'COVID: 2']

  nivel = ''
  user = {
    firstName: '',
    lastName: '',
    email: '',
    cuil: '',
    riesgo: false,
    fechaNac: this.formatDate(new Date()),
    sede: this.sedes[0],
  }

  private URL = environment.baseApiUrl + '/users'
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.getIdPerson() || ''
  }

  ngOnInit(): void {
    this.http.get<any>(this.URL + '/user/' + this.getIdPerson()).subscribe(
      (res) => {
        this.usuario = res
        this.nivel = this.getNivel(res.role)
        this.user.firstName = res.firstName
        this.user.lastName = res.lastName
        this.user.email = res.email
        this.user.cuil = res.cuil
        this.user.riesgo = res.riesgo
        this.user.fechaNac = this.formatDate(new Date(res.fechaNac))
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
        this.user.sede = s ? s : this.sedes[0]
      })
  }

  setSede(s: Sede) {
    this.user.sede = s
  }

  setRol(r: Rol) {}

  private getNivel(rol: number): string {
    return rol == 1 ? 'Paciente' : rol == 2 ? 'Vacunador' : 'Administrador'
  }

  private formatDate(d: Date): string {
    let y = d.getFullYear()
    let m = d.getMonth() + 1
    let day = d.getDate()
    return `${day}/${m}/${y}`
  }

  editarPerfil() {
    this.router.navigate(['/AdminProfileEdit', this.usuario?._id])
  }

  updateUser() {
    this.http
      .put<any>(this.URL + '/user/' + this.getIdPerson(), this.user)
      .subscribe(
        (res) => {
          this.router.navigate(['/Perfil'])
        },
        (err) => {
          console.log(err)
        }
      )
  }
  public getIdPerson() {
    return this.route.snapshot.paramMap.get('id')
  }
}
