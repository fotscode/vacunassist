import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css'],
})
export class CertificadoComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef

  user = {
    nombre: '',
    apellido: '',
    cuil: '',
    vacunas: {
      covid: {
        nombre: 'Covid',
        dosis: 0,
        fecha: '',
      },
      gripe: {
        nombre: 'Gripe',
        dosis: 0,
        fecha: '',
      },
      fiebreA: {
        nombre: 'Fiebre Amarilla',
        dosis: 0,
        fecha: '',
      },
    },
  }

  private URL = environment.baseApiUrl + '/users'
  private URLVaccines = environment.baseApiUrl + '/usersVaccines'

  constructor(private http: HttpClient, private authService: AuthService) {
    this.http
      .get<any>(this.URL + '/user/' + this.authService.getId())
      .subscribe(
        (res) => {
          this.user.nombre = res.firstName
          this.user.apellido = res.lastName
          this.user.cuil = res.cuil
        },
        (err) => {
          console.log(err)
        }
      )
    this.http
      .get<any>(this.URLVaccines + '/user/' + this.authService.getId())
      .subscribe(
        (res) => {
          res.forEach((el: any) => {
            Object.entries(this.user.vacunas).forEach(([k, v]) => {
              if (k === el.vaccineId) {
                v.dosis = el.doseNumber
                if (v.dosis>0)
                  v.fecha=', Fecha de aplicacion: '+this.formatDate(new Date(el.dateApplied))
              }
            })
          })
        },
        (err) => {
          console.log(err)
        }
      )
  }

  public generatePDF(): void {
    let data: any = document.getElementById('htmlData')

    html2canvas(data).then((canvas) => {
      let fileWidth = 208
      let fileHeight = (canvas.height * fileWidth) / canvas.width
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4')
      let position = 0
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      PDF.save('CertificadoVacunacion.pdf')
    })
  }

  private formatDate(d: Date): string{
    let y=d.getFullYear()
    let m=d.getMonth()+1
    let day=d.getDate()
    return `${day}/${m}/${y}`
  }
  ngOnInit(): void {}
}
