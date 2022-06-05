import { HttpClient } from '@angular/common/http'
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'
import { Sede } from '../sedes/sedes.component'

export interface Rol {
  id: number
  nombre: String
}

@Component({
  selector: 'app-admin-profile-edit',
  templateUrl: './admin-profile-edit.component.html',
  styleUrls: ['./admin-profile-edit.component.css'],
})
export class AdminProfileEditComponent implements OnInit {
  @ViewChild('vacunasComp') vacunasComp: any
  errorMsg: string = ''
  public id: string
  sedes: Sede[] = [
    { nro: 1, name: 'Centro' },
  ]
  roles: Rol[] = [
    { id: 1, nombre: 'Paciente' },
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
    fechaNac: new Date(),
    sede: this.sedes[1],
    vacunas: {},
    role: 1,
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
        this.nivel = this.getNivel(res.role)
        this.user.role = res.role
        this.user.firstName = res.firstName
        this.user.lastName = res.lastName
        this.user.email = res.email
        this.user.cuil = res.cuil
        this.user.riesgo = res.riesgo
        this.user.fechaNac = new Date(res.fechaNac)
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
        this.user.sede = s ? s : this.sedes[1]
      })
  }

  setSede(s: Sede) {
    this.user.sede = s
  }

  setRol(r: Rol) {
    this.user.role = r.id
  }

  verPerfil() {
    this.router.navigate(['/AdminProfileView', this.getIdPerson()])
  }

  private getNivel(rol: number): string {
    return rol == 1 ? 'Paciente' : rol == 2 ? 'Vacunador' : 'Administrador'
  }

  private formatDate(d: Date): string {
    let y = d.getFullYear()
    let m = d.getMonth() + 1
    let day = d.getDate()
    return `${day}/${m}/${y}`
  }
  private isValidCuil(): Boolean {
    const regex = /^(20|23|24|27)[-]?\d{8}[-]?\d{1}$/
    return regex.test(this.user.cuil)
  }

  updateUser() {
    if (this.isValidCuil()) {
      this.user.vacunas = this.vacunasComp.vacunas
      this.http
        .put<any>(this.URL + '/user/' + this.getIdPerson(), this.user)
        .subscribe(
          (res) => {
            this.router.navigate(['/AdminProfileView', this.getIdPerson()])
          },
          (err) => {
            console.log(err)
          }
        )
    } else
      this.errorMsg =
        'El cuil no posee un formato correcto. CUIL: xx-xxxxxxxx-x'
  }
  redirectToView() {
    this.router.navigate(['/AdminProfileView', this.getIdPerson()])
  }
  public getIdPerson() {
    return this.route.snapshot.paramMap.get('id')
  }
}
