import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ConfirmationService } from 'primeng/components/common/api';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';

import { ToastyModule } from 'ng2-toasty';
import { JwtHelper } from 'angular2-jwt';

import { PessoaService, PessoaFiltro } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { CategoriaService } from '../categorias/categoria.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { AuthService } from '../seguranca/auth.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  exports: [NavbarComponent, ToastyModule, ConfirmDialogModule],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    PessoaFiltro,
    ConfirmationService,
    JwtHelper,
    CategoriaService,
    Title,
    AuthService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}]
})
export class CoreModule { }
