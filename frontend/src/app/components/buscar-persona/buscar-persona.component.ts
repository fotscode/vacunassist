import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Persona {
  cuil: string;
  nombre: string;
  apellido: string;
  email: string;
  fNacim: string;
  pacRiesgo: boolean;
  sede: string;
}

const DATOS_PERSONAS: Persona[] = [
  {cuil: '1',  nombre: 'Pedro',       apellido: 'Gutierrez',  email: 'p.guti@gmail.com',    fNacim: '12/05/1964', pacRiesgo: false, sede: 'Bosque'},
  {cuil: '2',  nombre: 'Candelaria',  apellido: 'Villegas',   email: 'cande99gmail.com',    fNacim: '07/04/1999', pacRiesgo: true,  sede: 'Centro'},
  {cuil: '3',  nombre: 'María',       apellido: 'Menendez',   email: 'm.m.654gmail.com',    fNacim: '12/09/2002', pacRiesgo: true,  sede: 'Estadio'},
  {cuil: '4',  nombre: 'Guillermo',   apellido: 'Cáseres',    email: 'gui_villagmail.com',  fNacim: '28/11/1975', pacRiesgo: false, sede: 'Bosque'},
  {cuil: '5',  nombre: 'Bruno',       apellido: 'Vázquez',    email: 'bvazquez1gmail.com',  fNacim: '13/01/1994', pacRiesgo: false, sede: 'Centro'},
];

@Component({
  selector: 'app-buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: ['./buscar-persona.component.css']
})
export class BuscarPersonaComponent implements OnInit {
  columnasMostradas: string[] = ['cuil', 'nombre', 'apellido', 'email', 'fNacim', 'pacRiesgo', 'sede'];
  datos = DATOS_PERSONAS;

  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  abrirPerfil(persona: Persona){
    this.router.navigate(['AdminProfileEdit'])
  }
}
