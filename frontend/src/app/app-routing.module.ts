import { NgModule } from '@angular/core';
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

const routes: Routes=[
  {path: 'Home', component:HomeComponent},
  {path: 'Login', component:LoginPageComponent},
  {path: 'Register', component:RegisterPageComponent},
  {path: 'Perfil', component:ProfileViewComponent, canActivate: [AuthGuard]},
  {path: 'EditarPerfil', component:ProfileEditComponent},
  {path: 'Recover', component:PasswordRecoveryPageComponent},
  {path: 'Certificado', component:CertificadoComponent, canActivate:[AuthGuard]},
  {path: 'Turnos', component:MisturnosComponent},
  {path: 'NuevaNoticia', component:NuevaNoticiaComponent},
  {path: 'Noticia', component:NoticiaComponent},
  {path: 'ValidarIdentidad', component:ValidarIdentidadComponent},
  {path: 'BuscarPersona', component:BuscarPersonaComponent},
  {path: 'AdminProfileEdit', component:AdminProfileEditComponent},
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
