import { HttpClient } from '@angular/common/http'
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'
import { Sede } from '../sedes/sedes.component'

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  @ViewChild('vacunasEdit') myId: any
  errorMsg: string = ''
  sedes: Sede[] = [
    { nro: 1, name: 'Bosque' },
    { nro: 2, name: 'Centro' },
    { nro: 3, name: 'Estadio' },
  ]

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
  }

  private URL = environment.baseApiUrl + '/users'
  constructor(
    private http: HttpClient,
    @Inject(MatSnackBar) private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http
      .get<any>(this.URL + '/user/' + this.authService.getId())
      .subscribe(
        (res) => {
          this.nivel = this.getNivel()
          this.user.firstName = res.firstName
          this.user.lastName = res.lastName
          this.user.email = res.email
          this.user.cuil = res.cuil
          this.user.riesgo = res.riesgo
          this.user.fechaNac = new Date(res.fechaNac)
          this.getSedes(res.sede)
          // si no encuentra la sede guardada pone la primera
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

  private getNivel(): string {
    let rol = this.authService.getRol()
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
      this.user.vacunas = this.myId.vacunas
      this.http
        .put<any>(this.URL + '/user/' + this.authService.getId(), this.user)
        .subscribe(
          (res) => {
            this.router.navigate(['/Perfil'])
            this.snackBar.open(
              'Se ha actualizado su perfil con éxito',
              void 0,
              {
                duration: 3000,
              }
            )
          },
          (err) => {
            console.log(err)
          }
        )
    } else
      this.errorMsg =
        'El cuil no posee un formato correcto. CUIL: xx-xxxxxxxx-x'
  }
}
