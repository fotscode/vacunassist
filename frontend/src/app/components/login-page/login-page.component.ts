import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    cuil: '',
    riesgo: '',
    sede: '',
    password: '',
    role: 1,
  }

  errorMsg="";

  public constructor(
    private authService: AuthService,
    private titleService: Title,
    private router:Router
  ) {
    this.titleService.setTitle('Log-In')
  }

  logIn() {
    this.authService.signIn(this.user).subscribe(
      (res) => {
        localStorage.setItem('token', res.token)
        this.router.navigate(["/Home"])
      },
      (err) => {
        this.errorMsg="El cuil o contraseña es invalido";
      }
    )
  }
  ngOnInit(): void {}
}
