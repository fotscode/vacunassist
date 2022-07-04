import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import * as moment from 'moment'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Inject } from '@angular/core'
import {Sede} from '../sedes/sedes.component'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
export interface User {
    firstName: string
    lastName: string
    email: string
    cuil: string
    riesgo: boolean
    sede: string
    password: string
    fecha: Date
    validated: boolean
    vacunas: Object
    createdAt:Date
    fechaNac:number
}



@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  sedes: Sede[] = [
    { nro: 1, name: '13 nº 876 e/ 49 y 50' },
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
    private http:HttpClient,
    @Inject(MatSnackBar) private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getSedes()
  }

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
  private getSedes() {
    this.http
      .get<Array<Sede>>(environment.baseApiUrl + '/sites/')
      .subscribe((res) => {
        res.forEach((s) =>
          this.sedes.push({ nro: this.sedes.length + 1, name: s.name.trim() })
        )
      })
  }
}
