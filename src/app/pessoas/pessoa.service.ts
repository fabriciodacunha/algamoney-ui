import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Pessoa } from '../core/model';
import { AuthHttp } from 'angular2-jwt';

export class PessoaFiltro {
  nome: string;
  codigo: number;
  size = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;

  constructor(private http: AuthHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
   }

  listar(filtro: PessoaFiltro): Observable<any> {

    let nome = '';
    let size = '5';

    size = filtro.size.toString();

    if (filtro.nome) {
      nome = filtro.nome;
    }

    return this.http.get(`${this.pessoasUrl}`);
  }

  excluir(codigo: number) {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`);
  }

  editarAtivo(ativo: boolean, codigo: number) {
    console.log(`Mudar Ativo para ${ativo}: pessoa ${codigo}`);
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo);
  }
  adicionar(pessoa: Pessoa): Observable<any> {
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa));
  }

}
