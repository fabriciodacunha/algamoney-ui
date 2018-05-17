import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [
    { nome: 'Maria Eduarda', cidade: 'Belo Horizonte', estado: 'MG',
      status: true },
    { nome: 'Maria Luisa', cidade: 'Porto Velho', estado: 'RO',
    status: true },
    { nome: 'Melissa', cidade: 'Porto Velho', estado: 'RO',
      status: true },
    { nome: 'Jorge', cidade: 'Vilhena', estado: 'RO',
    status: true },
    { nome: 'Clarice', cidade: 'Vilhena', estado: 'RO',
      status: true },
    { nome: 'Júlia Bárbara', cidade: 'Porto Velho', estado: 'RO',
    status: true },
    { nome: 'Bianca Selau', cidade: 'Três Cachoeiras', estado: 'RS',
      status: false },
    { nome: 'Lucas Linhares', cidade: 'Três Cachoeiras', estado: 'RS',
    status: false },
    { nome: 'Gabriela', cidade: 'Porto Alegre', estado: 'RS',
      status: true },
    { nome: 'Rose', cidade: 'Pinheiro', estado: 'MA',
    status: false },
    { nome: 'André', cidade: 'Curitiba', estado: 'PR',
      status: false },
    { nome: 'Tainá', cidade: 'Praia Grande', estado: 'SC',
    status: true }
];

}
