import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';
  cabecalho: HttpHeaders;

  constructor(private http: HttpClient) {
    this.cabecalho = new HttpHeaders;
    this.cabecalho = this.cabecalho.set('Content-Type', 'application/json');
    this.cabecalho = this.cabecalho.set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
   }

  listarTodas(): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.categoriasUrl, { headers: this.cabecalho });
  }

}
