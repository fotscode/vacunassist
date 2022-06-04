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
import { VacunasEditComponent } from '../vacunas-edit/vacunas-edit.component'
import { MatDatepickerModule } from '@angular/material/datepicker'

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
  @ViewChild('vacunasEdit') myId: any
  errorMsg: string = ''
  sedes: Sede[] = [
    { id: 1, nombre: 'Bosque' },
    { id: 2, nombre: 'Centro' },
    { id: 3, nombre: 'Estadio' },
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
  ) {
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
