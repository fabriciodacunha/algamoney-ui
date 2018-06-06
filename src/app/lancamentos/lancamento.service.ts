import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpResponse} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import { Lancamento } from '../core/model';
import { AuthHttp } from 'angular2-jwt';
import { URLSearchParams } from '@angular/http';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  page = 0;
  size = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl: string;

  constructor(private http: AuthHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }

  listar(filtro: LancamentoFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.page.toString());
    params.set('size', filtro.size.toString());


    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoDe) {
      params.set('dataVencimentoDe',
        moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoAte) {
      params.set('dataVencimentoAte',
        moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, {search: params})
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const lancamentos = responseJson.content;

        const resultado = {
          lancamentos,
          total: responseJson.totalElements
        };

        return resultado;
});
  }

  excluir(codigo: number) {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`);
  }

  adicionar(lancamento: Lancamento): Observable<any> {
    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento));
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,
        JSON.stringify(lancamento))
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
}

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
}

  converterStringsParaDatas(lancamentos: Lancamento[]) {
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
