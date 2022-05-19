import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import * as moment from 'moment'

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

  user = {
    firstName: '',
    lastName: '',
    email: '',
    cuil: '',
    riesgo: false,
    sede: this.sedes[0],
    password: '',
    role: 3,
    fecha: new Date(),
  } // 1 paciente, 2 vacunador, 3 admin
  // TODO cambiar esto para generar los primeros admins

  errorMsg="";

  constructor(private authService: AuthService, private router: Router) {
  }


  ngOnInit() {

  }

  setSede(s: Sede) {
    this.user.sede = s
  }

  signUp() {
    this.authService.signUp(this.user).subscribe(
      (res) => {
        const expires = moment().add(res.expiresIn)
        localStorage.setItem('token', res.token)
        localStorage.setItem('expires', JSON.stringify(expires.valueOf()))
        this.router.navigate(['/Home'])
      },
      (err) => {
        this.errorMsg="El cuil ya se encuentra registrado"
        console.log(err)
      }
    )
  }
}
