import { Observable } from 'rxjs/Observable';
import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { FormControl } from '@angular/forms';
import { PessoaService, PessoaFiltro } from './../../pessoas/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Lancamento } from '../../core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private pessoaFiltro: PessoaFiltro,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Laçamento');

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregaPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(response => {
      this.lancamento = response;
      this.atualizarTituloEdicao();
    }, erro => this.errorHandler.handle(erro)
    );
  }

  salvar(form: FormControl) {
    if (this.lancamento.codigo) {
      console.log('Salvando lançamento editado...');
      this.lancamentoService.atualizar(this.lancamento)
      .then(response => {
        const lancamentoAlterado = response;
        this.toasty.success('Lançamento editado com sucesso!');
        this.router.navigate(['/lancamentos']);
        this.atualizarTituloEdicao();
        }, erro => this.errorHandler.handle(erro)
      );
    } else {
      console.log('Salvando novo lançamento...');
      this.lancamentoService.adicionar(this.lancamento)
      .subscribe(() => {
        this.toasty.success('Lançamento adicionado com sucesso!');
        this.router.navigate(['/lancamentos']);
      }, erro => this.errorHandler.handle(erro)
      );
    }
  }
  novo(form: FormControl) {

      form.reset();
      setTimeout(() => {
        this.lancamento = new Lancamento();
      }, 1);
      this.router.navigate(['/lancamentos/novo']);

  }

  carregaPessoas() {
    return this.pessoaService.listar(this.pessoaFiltro).subscribe(pessoas => {
      this.pessoas = pessoas.json().map(p => {
        return {label: p.nome, value: p.codigo};
      });
    }, erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas().subscribe(categorias => {
      this.categorias = categorias.json().map(c => {
        return {label: c.nome, value: c.codigo};
      });
    }, erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
