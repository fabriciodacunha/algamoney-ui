import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { HttpEventType } from '@angular/common/http';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro = new LancamentoFiltro();
  totalRecords: number;
  lancamentos = [];
  loading: boolean;

  selectedLancamento: number;

  @ViewChild('botoesEditarExcluir') botoesEditarExcluir;

  constructor(
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.loading = true;
    this.title.setTitle('Pesquisa de Lançamentos');
  }

  pesquisar(pagina = 0) {
    this.loading = true;
    this.filtro.page = pagina;

    this.lancamentoService.listar(this.filtro)
    .subscribe(jsonLancamentos => {
      this.totalRecords = jsonLancamentos.totalElements;
      this.lancamentos = jsonLancamentos.content;
      this.loading = false;
      this.botoesEditarExcluir.nativeElement.style.display = 'none';
    }, erro => {
      this.errorHandler.hendle(erro);
    });
    }

    apagar() {
      this.confirmationService.confirm(
        {
          message: 'Confirma a exclusão do Lancamento ' + this.selectedLancamento + '?',
          accept: () => {
                        this.lancamentoService.excluir(this.selectedLancamento)
                        .subscribe(
                          () => {
                            this.lancamentos = this.lancamentos.filter(lancs => lancs.codigo !== this.selectedLancamento);
                            this.toastyService.success(`Lançamento ${this.selectedLancamento} excluido com sucesso`);
                            this.botoesEditarExcluir.nativeElement.style.display = 'none';
                          }, erro => {
                            this.errorHandler.hendle(erro);
                          });
                        }
        }
      );
    }

    onRowSelect(event) {
      this.selectedLancamento = event.data.codigo;
      this.botoesEditarExcluir.nativeElement.style.display = 'block';
    }


  loadLancamentosLazy(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
