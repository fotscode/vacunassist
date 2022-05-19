import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-nueva-noticia',
  templateUrl: './nueva-noticia.component.html',
  styleUrls: ['./nueva-noticia.component.css'],
})
export class NuevaNoticiaComponent implements OnInit {
  private URL = environment.baseApiUrl + '/articles'
  article = {
    title: '',
    img: '',
    body: '',
  }

  onFileChange(event: any) {
    this.article.img = URL.createObjectURL(event.target.files[0])
    const inputNode: any = document.querySelector('#file')
    const reader = new FileReader()

    reader.onload = (e: any) => {
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(e.target.result))
      )
      this.article.img = 'data:image/png;base64,' + base64String
    }

    reader.readAsArrayBuffer(inputNode.files[0])
  }

  constructor(private http: HttpClient,private router:Router) {}

  uploadArticle() {
    this.http.post<any>(this.URL + '/uploadArticle', this.article).subscribe(
      (res) => {
        this.router.navigate(["/Home"])
      },
      (err) => {
        // TODO error mas amigable
        console.log(err)
      }
    )
  }

  ngOnInit(): void {}
}
