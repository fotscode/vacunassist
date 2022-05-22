import { HttpClient } from '@angular/common/http'
import { Component, Inject, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
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
      let binary = ''
      let bytes = new Uint8Array(e.target.result)
      let len = bytes.byteLength
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      const base64String = btoa(binary)
      this.article.img = 'data:image/png;base64,' + base64String
    }

    reader.readAsArrayBuffer(inputNode.files[0])
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(MatSnackBar) private snackBar: MatSnackBar
  ) {}

  uploadArticle() {
    this.http.post<any>(this.URL + '/uploadArticle', this.article).subscribe(
      (res) => {
        this.router.navigate(['/Home'])
        this.snackBar.open('Se ha agregado una noticia', void 0, {
          duration: 3000,
        })
      },
      (err) => {
        this.snackBar.open('Ya existe una noticia con ese título', void 0, {
          duration: 3000,
        })
      }
    )
  }

  ngOnInit(): void {}
}
