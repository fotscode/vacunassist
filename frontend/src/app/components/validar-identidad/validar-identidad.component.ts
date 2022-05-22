import { HttpClient } from '@angular/common/http'
import { Component, Inject, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-validar-identidad',
  templateUrl: './validar-identidad.component.html',
  styleUrls: ['./validar-identidad.component.css'],
})
export class ValidarIdentidadComponent implements OnInit {
  validate = {
    front: '',
    reverse: '',
  }

  private URL: string = environment.baseApiUrl + "/users"
  constructor(private http: HttpClient,@Inject(MatSnackBar) private snackBar : MatSnackBar, private authService: AuthService,private router:Router) {}

  ngOnInit(): void {}

  validateIdentity() {
    this.http
      .put(this.URL + '/user/validate/' + this.authService.getId(), this.validate)
      .subscribe(
        (res) => {
          console.log(res)
          this.snackBar.open('Se ha validado su identidad con éxito', void 0, { duration: 3000 })
          this.router.navigate(['/Home'])
        },
        (err) => {
          console.log(err)
          this.snackBar.open('Ha ocurrido un error, por favor intentelo de nuevo mas tarde', void 0, { duration: 3000 })
        }
      )
  }
}
