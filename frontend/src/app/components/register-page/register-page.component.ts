import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import * as moment from 'moment'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Inject } from '@angular/core'

interface Sede {
  id: number
  nombre: String
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  sedes: Sede[] = [
    { id: 1, nombre: 'Bosque' },
    { id: 2, nombre: 'Centro' },
    { id: 3, nombre: 'Estadio' },
  ]
  dosisCovid: number = 1
  dosisGripe: number = 0
  dosisFiebre: number = 0

  user = {
    firstName: '',
    lastName: '',
    email: '',
    cuil: '',
    riesgo: false,
    sede: this.sedes[0],
    password: '',
    fecha: new Date(),
    validated: false,
    vacunas: {
      covid: {
        nombre: 'covid',
        dosis: 0,
        fecha: new Date(),
      },
      gripe: {
        nombre: 'gripe',
        dosis: 0,
        fecha: new Date(),
      },
      fiebreA: {
        nombre: 'fiebreA',
        dosis: 0,
        fecha: new Date(),
      },
    },
    role: 1,
  } // 1 paciente, 2 vacunador, 3 admin
  // TODO cambiar esto para generar los primeros admins

  errorMsg = ''

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(MatSnackBar) private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  setSede(s: Sede) {
    this.user.sede = s
  }

  signUp() {
    if (this.isValidCuil()) {
      this.authService.signUp(this.user).subscribe(
        (res) => {
          const expires = moment().add(res.expiresIn)
          localStorage.setItem('token', res.token)
          localStorage.setItem('expires', JSON.stringify(expires.valueOf()))
          this.router.navigate(['/Home'])
          this.snackBar.open('Usuario registrado', void 0, { duration: 3000 })
        },
        (err) => {
          this.errorMsg = 'El cuil ya se encuentra registrado'
          console.log(err)
        }
      )
    }
    else
          this.errorMsg = 'El cuil no posee un formato correcto. CUIL: xx-xxxxxxxx-x'
  }
  private isValidCuil(): Boolean{
    const regex= /^(20|23|24|27)[-]?\d{8}[-]?\d{1}$/
    return regex.test(this.user.cuil)
  }
}
