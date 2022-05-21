import { Component, Inject, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
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
    private router:Router,
    @Inject(MatSnackBar) private snackBar : MatSnackBar
  ) {
  }

  logIn() {
    this.authService.signIn(this.user).subscribe(
      (res) => {
        localStorage.setItem('token', res.token)
        this.router.navigate(["/Home"])
        this.snackBar.open('Se ha iniciado sesion', void 0, { duration: 3000 })
      },
      (err) => {
        this.errorMsg="El cuil o contraseña es invalido";
      }
    )
  }
  ngOnInit(): void {}
}
