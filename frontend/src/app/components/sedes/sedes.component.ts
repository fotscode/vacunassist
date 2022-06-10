import { HttpClient } from '@angular/common/http'
import { Component, Inject, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'
import { User } from '../register-page/register-page.component'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { DialogSedeDeleteComponent } from '../dialog-sede-delete/dialog-sede-delete.component'

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
    { nro: 1, name: 'Centro' },
  ]

  data = new MatTableDataSource<Sede>()
  columnasMostradas: string[] = ['nro', 'name', 'accion']
  sedeName: string = ''
  errorMsg: string = ''
  constructor(public popup: MatDialog, private http: HttpClient,
    @Inject(MatSnackBar) private snackBar: MatSnackBar
    ) {}

  addSede() {
    if (this.sedeName) {
      this.http.post<Sede>(this.URL, { sedeName: this.sedeName }).subscribe(
        (res) => {
          let temp = this.data.data.slice()
          let nuevaSede = this.sedeName
          temp.push({ nro: temp.length + 1, name: res.name })
          this.errorMsg = this.sedeName = ''
          this.data.data = temp
          this.snackBar.open(
            `Sede ${nuevaSede} agregada con éxito`,
            void 0,{duration: 3000,})
        },
        (err) => {
          this.errorMsg = 'Ya existe una sede con el mismo nombre'
          this.sedeName = ''
        }
      )
    } else {
      this.errorMsg = 'No se puede agregar una sede vacia'
    }
  }

  async borrarRenglon(sedeName: string) {
    if (await this.isUsed(sedeName)) {
      this.http.delete(this.URL + sedeName).subscribe((res) => {
        this.snackBar.open(
          `Se ha eliminado con éxito la sede ${sedeName}`,
          void 0,{duration: 3000,})
        this.data.data = this.sedes
        this.ngOnInit()
      })
    } else {
      this.errorMsg =
        'No se pudo borrar la sede ya que hay usuarios utilizandola';
      this.snackBar.open(
        `No se pudo eliminar la sede ${sedeName}`,
        void 0,{duration: 3000,})
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

  deleteAttempt(name: string): void {
    const dialogConfig = new MatDialogConfig()
      dialogConfig.disableClose = true
      dialogConfig.autoFocus = false
      dialogConfig.width = '500px'
      const referencia = this.popup.open(
        DialogSedeDeleteComponent,
        dialogConfig
      )
      referencia.afterClosed().subscribe((result) => {
        if (result) {
          this.borrarRenglon(name)
        }
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
