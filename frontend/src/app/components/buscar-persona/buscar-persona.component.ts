import { HttpClient } from '@angular/common/http'
import { Component, Injectable, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'

export interface Persona {
  _id:string
  cuil: string
  firstName: string
  lastName: string
  email: string
  fechaNac: string
  riesgo: string
  sede: string
}

@Component({
  selector: 'app-buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: ['./buscar-persona.component.css'],
})
export class BuscarPersonaComponent implements OnInit {
  personas: Persona[] = []
  private URL: string = environment.baseApiUrl + '/users'
  cuilToSearch:string=''
  columnasMostradas: string[] = [
    'cuil',
    'firstName',
    'lastName',
    'email',
    'fechaNac',
    'riesgo',
    'sede',
  ]
  data: any
  constructor(private router: Router, private http: HttpClient) {
    this.http.get<any>(this.URL + '/user').subscribe(
      (res) => {
        res.forEach((element: any) => {
          element.fechaNac=this.formatDate(new Date(element.fechaNac))
          element.riesgo=(element.riesgo) ? 'Si' : 'No'
          this.personas.push(element)
        })
        this.data=this.personas
      },
      (err) => {
        console.log(err)
      }
    )
  }
  ngOnInit(): void {}
  searchPerson(){
    this.data=this.personas.filter((e)=>e.cuil.startsWith(this.cuilToSearch))
  }

  abrirPerfil(persona: Persona) {
    this.router.navigate(['/AdminProfileEdit',persona._id])
  }
  private formatDate(d: Date): string{
    let y=d.getFullYear()
    let m=d.getMonth()+1
    let day=d.getDate()
    return `${day}/${m}/${y}`
  }

}
