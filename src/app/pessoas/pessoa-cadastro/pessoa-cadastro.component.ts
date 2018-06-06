import { ToastyService } from 'ng2-toasty';
import { PessoaService } from './../pessoa.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova de Pessoa');
  }
  salvar(form: FormControl) {
    console.log(this.pessoa);
    this.pessoaService.adicionar(this.pessoa).subscribe(() => {
      form.reset();
      this.pessoa = new Pessoa;
      this.toasty.success('Lançamento adicionado com sucesso!');
    }, erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.pessoa.nome}`);
  }

}
