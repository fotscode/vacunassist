import { Component, OnInit, Inject } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { FormControl } from '@angular/forms'
import { Sede } from '../sedes/sedes.component'
import { HttpClient } from '@angular/common/http'
import { firstLetterUpper, Vacuna } from '../misturnos/misturnos.component'
import { environment } from 'src/environments/environment'
import { User } from '../register-page/register-page.component'

export interface Paciente {
  cuil: string
  nombre: string
  apellido: string
  vacuna: string
  dosis: number
  fecha: FormControl
  riesgo: boolean
  vac?: Vacuna
  edad: number
}

@Component({
  selector: 'app-confirmar-turno',
  templateUrl: './confirmar-turno.component.html',
  styleUrls: ['./confirmar-turno.component.css'],
})
export class ConfirmarTurnoComponent implements OnInit {
  private apiURL: string = environment.baseApiUrl
  hoy = new Date()
  user: Paciente = {
    cuil: '20-28673854-5',
    nombre: 'Pepe',
    apellido: 'Grillo',
    vacuna: 'Covid',
    dosis: 1,
    riesgo: true,
    fecha: new FormControl(new Date()),
    edad: 20,
  }

  startDate = new Date()
  minDate = new Date(
    this.startDate.getFullYear(),
    this.startDate.getMonth(),
    this.startDate.getDate()
  )

  sedes: Sede[] = [{ nro: 1, name: '13 nº 876 e/ 49 y 50' }]
  sede = this.sedes[0]

  constructor(
    @Inject(MatSnackBar) private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getVacuna()
  }
  confirmarTurno() {
    this.user.vac!.dateConfirmed = new Date(this.user.fecha.value).getTime()
    this.user.vac!.sede = this.sede.name
    console.log(this.user.vac)
    this.http
      .put(
        `${this.apiURL}/usersVaccines/confirm/${this.getIdVaccine()}`,
        this.user.vac
      )
      .subscribe((res) => {
        console.log(res)
        this.snackBar.open('Turno confirmado', void 0, {
          duration: 2000,
        })
        this.router.navigate(['/AdministrarTurnos'])
      })
  }

  setSede(s: Sede) {
    this.sede = s 
  }

  private async getVacuna() {
    this.http
      .get<Vacuna>(`${this.apiURL}/usersVaccines/${this.getIdVaccine()}`)
      .subscribe(async (res) => {
        let u = await this.getUserInfo(res.userId)
        this.user.cuil = u.cuil
        this.user.nombre = u.firstName
        this.user.apellido = u.lastName
        this.user.vacuna = firstLetterUpper(res.vaccineId)
        this.user.dosis = res.doseNumber
        this.user.riesgo = u.riesgo
        this.user.vac = res
        this.user.edad = Math.floor(
          (new Date().getTime() - new Date(u.fechaNac).getTime()) /
            (1000 * 60 * 60 * 24 * 365)
        )
        this.user.fecha = new FormControl(this.setDate())
        this.getSedes(res.sede)
      })
  }

  private getSedes(sede: string) {
    this.http
      .get<Array<Sede>>(environment.baseApiUrl + '/sites/')
      .subscribe((res) => {
        res.forEach((s) =>
          this.sedes.push({ nro: this.sedes.length + 1, name: s.name.trim() })
        )
        let s = this.sedes.find((s) => s.name == sede)
        this.sede = s ? s : this.sedes[0]
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

  private setDate() {
    switch (this.user.vacuna) {
      case 'Covid':
        if (!this.user?.riesgo) {
          return new Date(
            this.startDate.getFullYear(),
            this.startDate.getMonth(),
            this.startDate.getDate() + 7
          )
        } else {
          return new Date(
            this.startDate.getFullYear(),
            this.startDate.getMonth() + 6,
            this.startDate.getDate()
          )
        }
      case 'Gripe':
        let meses = 6
        if (this.user.edad > 60) {
          meses = 3
        }
        return new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + meses,
          this.startDate.getDate()
        )
    }
    return new Date()
  }

  public getIdVaccine() {
    return this.route.snapshot.paramMap.get('id')
  }
}
