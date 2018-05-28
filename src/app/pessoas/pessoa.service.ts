import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Pessoa } from '../core/model';

export class PessoaFiltro {
  nome: string;
  codigo: number;
  size = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';
  cabecalho: HttpHeaders;

  constructor(private http: HttpClient) {
    this.cabecalho = new HttpHeaders;
    this.cabecalho = this.cabecalho.set('Content-Type', 'application/json');
    this.cabecalho = this.cabecalho.set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
   }

  listar(filtro: PessoaFiltro): Observable<any> {

    let nome = '';
    let size = '5';

    size = filtro.size.toString();

    if (filtro.nome) {
      nome = filtro.nome;
    }
    const params = new HttpParams()
      .set('nome', nome);
    return this.http.get(`${this.pessoasUrl}`, {headers: this.cabecalho, params});
  }

  excluir(codigo: number) {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`, {headers: this.cabecalho});
  }

  editarAtivo(ativo: boolean, codigo: number) {
    console.log(`Mudar Ativo para ${ativo}: pessoa ${codigo}`);
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, {headers: this.cabecalho});
  }
  adicionar(pessoa: Pessoa): Observable<any> {
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa), {headers: this.cabecalho});
  }

}
