import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas"

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})



export class CertificadoComponent implements OnInit {

  @ViewChild('htmlData') htmlData!:ElementRef;

  user={
    nombre: "Pepe",
    apellido: "Garcia",
    cuil:"12-12345678-9",
    vacunas:["covid 2 dosis", "gripe", "No tiene fiebre amarilla"]
  }
  constructor() { }

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
