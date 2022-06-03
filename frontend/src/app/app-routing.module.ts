import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { PasswordRecoveryPageComponent } from './components/password-recovery-page/password-recovery-page.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { AuthGuard } from './auth.guard';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { MisturnosComponent } from './components/misturnos/misturnos.component';
import { NuevaNoticiaComponent } from './components/nueva-noticia/nueva-noticia.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { ValidarIdentidadComponent } from './components/validar-identidad/validar-identidad.component';
import { BuscarPersonaComponent } from './components/buscar-persona/buscar-persona.component';
import { AdminProfileEditComponent } from './components/admin-profile-edit/admin-profile-edit.component';
import { AdminProfileViewComponent } from './components/admin-profile-view/admin-profile-view.component';
import { VacunasEditComponent } from './components/vacunas-edit/vacunas-edit.component';
import { AdminGuard } from './admin.guard';
import { LoggedInGuard } from './logged-in.guard';
import { ValidatedGuard } from './validated.guard';
import { SedesComponent } from './components/sedes/sedes.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component'

const routes: Routes=[
  {path: 'Home', component:HomeComponent},
  {path: 'Login', component:LoginPageComponent,canActivate:[LoggedInGuard]},
  {path: 'Register', component:RegisterPageComponent,canActivate:[LoggedInGuard]},
  {path: 'Perfil', component:ProfileViewComponent, canActivate: [AuthGuard]},
  {path: 'EditarPerfil', component:ProfileEditComponent, canActivate:[AuthGuard]},
  {path: 'Recover', component:PasswordRecoveryPageComponent,canActivate:[LoggedInGuard]},
  {path: 'Certificado', component:CertificadoComponent, canActivate:[AuthGuard]},
  {path: 'Turnos', component:MisturnosComponent},
  {path: 'NuevaNoticia', component:NuevaNoticiaComponent, canActivate:[AuthGuard,AdminGuard]},
  {path: 'Noticia', component:NoticiaComponent},
  {path: 'ValidarIdentidad', component:ValidarIdentidadComponent, canActivate:[AuthGuard,ValidatedGuard]},
  {path: 'BuscarPersona', component:BuscarPersonaComponent, canActivate:[AuthGuard,AdminGuard]},
  {path: 'AdminProfileEdit/:id', component:AdminProfileEditComponent, canActivate:[AuthGuard,AdminGuard]},
  {path: 'AdminProfileView/:id', component:AdminProfileViewComponent, canActivate:[AuthGuard,AdminGuard]},
  {path: 'VacunasEdit', component:VacunasEditComponent, canActivate:[AuthGuard]},
  {path: 'Sedes', component:SedesComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'SolicitarTurno', component:SolicitarTurnoComponent, canActivate:[AuthGuard]},
  {path: '', redirectTo:'/Home', pathMatch:'full'},
  {path: '**', pathMatch:'full', component:ErrorPageComponent}
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
