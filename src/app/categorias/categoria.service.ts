import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CategoriaService {

  categoriasUrl: string;

  constructor(private http: AuthHttp) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
   }

  listarTodas(): Observable<any> {
    return this.http.get(this.categoriasUrl);
  }

}
