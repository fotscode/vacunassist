import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
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
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {}

  validateIdentity() {
    this.http
      .put(this.URL + '/user/validate/' + this.authService.getId(), this.validate)
      .subscribe(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        }
      )
  }
}
