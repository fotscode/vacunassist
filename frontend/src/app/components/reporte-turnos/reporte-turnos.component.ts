import { Component, OnInit, Inject } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { FormControl } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { firstLetterUpper, Vacuna } from '../misturnos/misturnos.component'
import { User } from '../register-page/register-page.component'

export interface TurnoUsuario {
  cuil: string
  nombre: string
  apellido: string
  vacuna: string
  sede: string
  riesgo: boolean
  vacunador: string
  fecha: string
}

@Component({
  selector: 'app-reporte-turnos',
  templateUrl: './reporte-turnos.component.html',
  styleUrls: ['./reporte-turnos.component.css'],
})
export class ReporteTurnosComponent implements OnInit {
  private apiURL: string = environment.baseApiUrl
  USERS: TurnoUsuario[] = []
  data = this.USERS
  columnasMostradas: string[] = [
    'cuil',
    'nombre',
    'apellido',
    'riesgo',
    'vacuna',
    'sede',
    'vacunador',
    'fecha',
  ]
  hoy = new FormControl(new Date())

  constructor(
    @Inject(MatSnackBar) private snackBar: MatSnackBar,
    public popup: MatDialog,
    private router: Router,
    private http: HttpClient
  ) {}

  esRiesgo(valor: boolean) {
    if (valor) return 'Sí'
    else return 'No'
  }

  private formatDate(d: Date): string {
    let y = d.getFullYear()
    let m = d.getMonth() + 1
    let day = d.getDate()
    return `${day}/${m}/${y}`
  }

  ngOnInit(): void {
    this.getVacunas()
  }
  private async getVacunas() {
    this.http
      .get<Array<Vacuna>>(this.apiURL + '/usersVaccines/')
      .subscribe(async (res) => {
        let arr = res.filter((e) => e.dateConfirmed!=undefined && e.dateConfirmed != 0)
        this.USERS=[]
        arr.forEach(async (e) => {
          let u = await this.getUserInfo(e.userId)
          let obj: TurnoUsuario = {
            cuil:u.cuil,
            nombre:u.firstName,
            apellido:u.lastName,
            vacuna:firstLetterUpper(e.vaccineId),
            sede:e.sede,
            riesgo:u.riesgo,
            vacunador:'xd',
            fecha:this.formatDate(new Date(e.dateConfirmed))
          }
          this.USERS.push(obj)
        })
        setTimeout(() => {
          this.data=this.USERS
        }, 100)
      })
  }

  private async getUserInfo(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http
        .get<User>(this.apiURL + '/users/user/' + id)
        .subscribe((res) => {
          if (res) resolve(res)
        })
    })
  }
}
