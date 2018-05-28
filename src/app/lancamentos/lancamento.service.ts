import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  page = 0;
  size = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';
  cabecalho: HttpHeaders;

  constructor(private http: HttpClient) {
    this.cabecalho = new HttpHeaders;
    this.cabecalho = this.cabecalho.set('Content-Type', 'application/json');
    this.cabecalho = this.cabecalho.set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
   }

  listar(filtro: LancamentoFiltro): Observable<any> {

    let descricao = '';
    let dataVencimentoDe = '';
    let dataVencimentoAte = '';
    let page = '0';
    let size = '5';

    page = filtro.page.toString();
    size = filtro.size.toString();

    if (filtro.descricao) {
      descricao = filtro.descricao;
    }
    if (filtro.dataVencimentoDe) {
      dataVencimentoDe = moment(filtro.dataVencimentoDe).format('YYYY-MM-DD');
    }
    if (filtro.dataVencimentoAte) {
      dataVencimentoAte = moment(filtro.dataVencimentoAte).format('YYYY-MM-DD');
    }
    const params = new HttpParams()
      .set('descricao', descricao)
      .set('dataVencimentoDe', dataVencimentoDe)
      .set('dataVencimentoAte', dataVencimentoAte)
      .set('page', page)
      .set('size', size) ;
    return this.http.get(`${this.lancamentosUrl}?resumo`, {headers: this.cabecalho, params});
  }

  excluir(codigo: number) {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, {headers: this.cabecalho});
  }

  adicionar(lancamento: Lancamento): Observable<any> {
    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento), {headers: this.cabecalho});
  }

  atualizar(lancamento: Lancamento) {
    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,
        JSON.stringify(lancamento), { headers: this.cabecalho })
        .subscribe(response => {
        const lancamentoAlterado = response as Lancamento;
        this.converterStringsParaDatas([lancamentoAlterado]);
        return lancamentoAlterado;
        });
  }

  buscarPorCodigo(codigo: number): Observable<any> {
    return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers: this.cabecalho });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
}

}
