import { Component, OnInit, Inject } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { FormControl } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { User } from '../register-page/register-page.component'

export interface Cuenta {
  fecCreada: string
  fecCreadaNum: number
  nombre: string
  apellido: string
  email: string
  cuil: string
  fecNac: string
  riesgo: boolean
  sede: string
}

@Component({
  selector: 'app-reporte-cuentas',
  templateUrl: './reporte-cuentas.component.html',
  styleUrls: ['./reporte-cuentas.component.css'],
})
export class ReporteCuentasComponent implements OnInit {
  private apiURL: string = environment.baseApiUrl + '/users/'
  CUENTAS: Cuenta[] = []
  data = this.CUENTAS
  columnasMostradas: string[] = [
    'fecCreada',
    'nombre',
    'apellido',
    'email',
    'cuil',
    'fecNac',
    'riesgo',
    'sede',
  ]
  fechaDesde = new FormControl(new Date())
  fechaHasta = new FormControl(new Date())

  constructor(
    @Inject(MatSnackBar) private snackBar: MatSnackBar,
    public popup: MatDialog,
    private http: HttpClient,
    private router: Router
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
  filterUsers() {
    this.data=this.CUENTAS.filter(
      (u) =>
        u.fecCreadaNum <= this.fechaHasta.value.getTime() &&
        u.fecCreadaNum >= this.fechaDesde.value.getTime()
    )
  }

  ngOnInit(): void {
    this.http.get<Array<User>>(`${this.apiURL}user/`).subscribe((res) => {
      this.CUENTAS = []
      res.forEach((u) => {
        let temp: Cuenta = {
          fecCreada: this.formatDate(new Date(u.createdAt)),
          fecCreadaNum: new Date(u.createdAt).getTime(),
          nombre: u.firstName,
          apellido: u.lastName,
          email: u.email,
          cuil: u.cuil,
          fecNac: this.formatDate(new Date(u.fechaNac)),
          riesgo: u.riesgo,
          sede: u.sede,
        }
        this.CUENTAS.push(temp)
      })
      this.data = this.CUENTAS
    })
  }
}
