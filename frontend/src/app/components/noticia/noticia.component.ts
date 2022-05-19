import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
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

  constructor(private authService: AuthService, private http: HttpClient) {
    this.fetchData()

  }

  ngOnInit(): void {}

  private fetchData(){
    this.articles=[]
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
        console.log(res)
        this.fetchData()
      },
      (err) => {
        console.log(err)
      }
    )
  }

  isAdmin(): Boolean {
    return this.authService.loggedIn() && this.authService.getRol() == 3
  }
}
