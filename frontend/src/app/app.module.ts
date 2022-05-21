import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import {
  HttpClientModule,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'

import { AuthGuard } from './auth.guard'
import { TokenInterceptorService } from './services/token-interceptor.service';
import { PasswordRecoveryPageComponent } from './components/password-recovery-page/password-recovery-page.component';
import { PasswordRecoveryMessageComponent } from './components/password-recovery-message/password-recovery-message.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { MaterialModule } from './material/material.module';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { CertificadoComponent } from './components/certificado/certificado.component';
import { MisturnosComponent } from './components/misturnos/misturnos.component';
import { NuevaNoticiaComponent } from './components/nueva-noticia/nueva-noticia.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { ValidarIdentidadComponent } from './components/validar-identidad/validar-identidad.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BuscarPersonaComponent } from './components/buscar-persona/buscar-persona.component';
import { AdminProfileEditComponent } from './components/admin-profile-edit/admin-profile-edit.component';
import { DialogDeleteAccountComponent } from './components/dialog-delete-account/dialog-delete-account.component';
import { VacunasEditComponent } from './components/vacunas-edit/vacunas-edit.component';
import { VacunasViewComponent } from './components/vacunas-view/vacunas-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationHeaderComponent,
    HomeComponent,
    RegisterPageComponent,
    LoginPageComponent,
    ErrorPageComponent,
    PasswordRecoveryPageComponent,
    PasswordRecoveryMessageComponent,
    ProfileViewComponent,
    ProfileEditComponent,
    CertificadoComponent,
    MisturnosComponent,
    NuevaNoticiaComponent,
    NoticiaComponent,
    ValidarIdentidadComponent,
    BuscarPersonaComponent,
    AdminProfileEditComponent,
    DialogDeleteAccountComponent,
    VacunasEditComponent,
    VacunasViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {provide:MatDialogRef , useValue:{} },

    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
