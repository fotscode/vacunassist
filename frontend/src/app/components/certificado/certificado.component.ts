import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas"
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})



export class CertificadoComponent implements OnInit {

  @ViewChild('htmlData') htmlData!:ElementRef;

  user={
    nombre: '',
    apellido: '',
    cuil:'',
    vacunas:['covid 2 dosis', 'gripe 1 dosis', 'No tiene fiebre amarilla']
  }

  private URL: string = environment.apiUrl
  
  constructor(private http: HttpClient, private authService: AuthService) {
    this.http.get<any>(this.URL + '/user/' + this.authService.getId()).subscribe(
      (res) => {
        this.user.nombre = res.firstName
        this.user.apellido = res.lastName
        this.user.cuil = res.cuil
      },
      (err) => {
        console.log(err)
      }
    )
   }
  

  public generatePDF() : void{
    let data: any = document.getElementById('htmlData');

    html2canvas(data).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('CertificadoVacunacion.pdf'); 
    })
  }

  ngOnInit(): void {
  }

}
