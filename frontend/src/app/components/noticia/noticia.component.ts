import { HttpClient } from '@angular/common/http'
import { Component, Inject, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { AuthService } from 'src/app/services/auth.service'
import { environment } from 'src/environments/environment'

interface Noticia {
  title: String
  body: String
  img: String
}

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css'],
})
export class NoticiaComponent implements OnInit {
  private URL = environment.baseApiUrl + '/articles'
  articles: Noticia[] = []

  constructor(
    private authService: AuthService,
    @Inject(MatSnackBar) private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.fetchData()
  }

  ngOnInit(): void {}

  private fetchData() {
    this.articles = []
    this.http.get<any>(this.URL + '/getArticles').subscribe(
      (res) => {
        res.forEach((element: any) => {
          const { title, img, body } = element
          let obj = { title, img, body }
          this.articles.push(obj)
        })
      },
      (err) => {
        console.log(err)
      }
    )
  }

  delete(title: String): void {
    this.http.delete(this.URL + '/deleteArticle/' + title).subscribe(
      (res) => {
        this.fetchData()
        this.snackBar.open('Se ha eliminado la noticia con exito', void 0, {
          duration: 3000,
        })
      },
      (err) => {
this.snackBar.open('Hubo un problema al borrar la noticia', void 0, {
          duration: 3000,
        })
      }
    )
  }

  isAdmin(): Boolean {
    return this.authService.loggedIn() && this.authService.getRol() == 3
  }
}
