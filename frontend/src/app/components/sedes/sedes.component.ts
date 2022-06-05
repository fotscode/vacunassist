import { HttpClient } from '@angular/common/http'
import { Component, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'
import { User } from '../register-page/register-page.component'

export interface Sede {
  nro: number
  name: string
}

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css'],
})
export class SedesComponent implements OnInit {
  private URL: string = environment.baseApiUrl + '/sites/'
  sedes: Sede[] = [
    { nro: 1, name: 'Bosque' },
    { nro: 2, name: 'Centro' },
    { nro: 3, name: 'Estadio' },
  ]

  data = new MatTableDataSource<Sede>()
  columnasMostradas: string[] = ['nro', 'name', 'accion']
  sedeName: string = ''
  errorMsg: string = ''
  constructor(private http: HttpClient) {}

  addSede() {
    if (this.sedeName) {
      this.http.post<Sede>(this.URL, { sedeName: this.sedeName }).subscribe(
        (res) => {
          let temp = this.data.data.slice()
          temp.push({ nro: temp.length + 1, name: res.name })
          this.errorMsg = this.sedeName = ''
          this.data.data = temp
          // TODO snackbar
        },
        (err) => {
          this.errorMsg = 'Ya existe una sede con el mismo nombre'
          this.sedeName = ''
        }
      )
    } else {
      this.errorMsg = 'No se puede agregar una sede vacia'
    } // TODO cambiar HU
  }

  async borrarRenglon(sedeName: string) {
    if (await this.isUsed(sedeName)) {
      this.http.delete(this.URL + sedeName).subscribe((res) => {
        /* TODO snackbar
         *res tambien responde un
         * error si no pudo eliminar la sede
         */
        this.data.data = this.sedes
        this.ngOnInit()
      })
    } else {
      this.errorMsg =
        'No se pudo borrar la sede ya que hay usuarios utilizandola'
    }
  }
  private isUsed(s: string): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .get<Array<User>>(environment.baseApiUrl + '/users/user/')
        .subscribe((res) => {
          if (res.every((u) => u.sede.trim() !== s)) resolve(true)
          else resolve(false)
        })
    })
  }

  ngOnInit(): void {
    this.http.get<Array<Sede>>(this.URL).subscribe((res) => {
      let temp = this.sedes.slice()
      res.forEach((s) => {
        temp.push({ nro: temp.length + 1, name: s.name })
      })
      this.data.data = temp
    })
  }
}
