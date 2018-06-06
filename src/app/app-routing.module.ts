import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { AuthGuard } from './seguranca/auth.guard';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';

const routes: Routes = [
  {path: '', redirectTo: 'lancamentos', pathMatch: 'full'},
  {path: 'login', component: LoginFormComponent},
  {
    path: 'lancamentos',
    component: LancamentosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  },
  {
    path: 'lancamentos/novo',
    component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  },
  {
    path: 'lancamentos/:codigo',
    component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  },
  {
    path: 'pessoas',
    component: PessoasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
  },
  {
    path: 'pessoas/novo',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  },
  {
    path: 'pessoas/:codigo',
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
  },
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  {path: 'nao-autorizado', component: NaoAutorizadoComponent},
  {path: '**', redirectTo: 'pagina-nao-encontrada'}
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
