import { ToastyService } from 'ng2-toasty';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  filtro = new PessoaFiltro();
  pessoas = [];
  cols: any[];
  loading: boolean;

  selectedPessoa: any;

  @ViewChild('botoesEditarExcluir') botoesEditarExcluir;

  constructor(
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService,
    private toastyService: ToastyService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pessoas');
    this.loading = true;
    this.pesquisar();
    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'logradouro.cidade', header: 'Cidade' },
      { field: 'logradouro.estado', header: 'Estado' },
      { field: 'status', header: 'Status' }
  ];
  }

  pesquisar() {
    this.loading = true;

    this.pessoaService.listar(this.filtro)
    .subscribe(jsonPessoas => {
      this.pessoas = jsonPessoas;
      this.loading = false;
      this.botoesEditarExcluir.nativeElement.style.display = 'none';
    }, erro => {
      this.errorHandler.hendle(erro);
    });
    }

    apagar() {
      this.confirmationService.confirm(
        {
          message: 'Confirma a exclusão de ' + this.selectedPessoa.nome + '?',
          accept: () => {
                        this.pessoaService.excluir(this.selectedPessoa.codigo)
                        .subscribe(
                          () => {
                            this.pessoas = this.pessoas.filter(lancs => lancs.codigo !== this.selectedPessoa.codigo);
                            this.toastyService.success(`Registro de ${this.selectedPessoa.nome} foi excluido com sucesso`);
                            this.botoesEditarExcluir.nativeElement.style.display = 'none';
                          }, erro => {
                            this.errorHandler.hendle(erro);
                          });
                        }
        }
      );
    }

    toggleAtivoInativo(pessoa: any) {
      console.log(pessoa.ativo);
      const tggl = !pessoa.ativo;
      this.pessoaService.editarAtivo(tggl, pessoa.codigo)
      .subscribe(() => {
        const acao = tggl ? 'ativado' : 'desativado';
        pessoa.ativo = tggl;
        this.toastyService.success(`Status de ${pessoa.nome} ${acao} com sucesso!`);
      }, erro => this.errorHandler.hendle(erro));
    }

    onRowSelect(event) {
      this.selectedPessoa = event.data;
      this.botoesEditarExcluir.nativeElement.style.display = 'block';
    }


}
