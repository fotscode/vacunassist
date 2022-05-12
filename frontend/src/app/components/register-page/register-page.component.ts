import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import * as moment from 'moment'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    cuil: '',
    riesgo: '',
    sede: '',
    password: '',
    role:1,
  } // 1 paciente, 2 vacunador, 3 admin
  // TODO cambiar esto para generar los primeros admins

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signUp() {
    this.authService.signUp(this.user).subscribe(
      (res) => {
        const expires = moment().add(res.expiresIn)
        localStorage.setItem('token', res.token)
        localStorage.setItem('expires', JSON.stringify(expires.valueOf()))
        this.router.navigate(["/Home"])
      },
      (err) => {
        console.log(err)
      }
    )
  }
}
