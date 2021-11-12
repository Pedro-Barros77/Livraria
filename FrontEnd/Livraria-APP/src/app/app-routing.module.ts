import { VendacreateComponent } from './Pages/Vendas/vendacreate/vendacreate.component';
import { VendalistComponent } from './Pages/Vendas/vendalist/vendalist.component';
import { EstoqueresumoComponent } from './Pages/Estoque/estoqueresumo/estoqueresumo.component';
import { EstoquecreateComponent } from './Pages/Estoque/estoquecreate/estoquecreate.component';
import { EstoquelistComponent } from './Pages/Estoque/estoquelist/estoquelist.component';
import { FornecedoreditComponent } from './Pages/Fornecedores/fornecedoredit/fornecedoredit.component';
import { AutoreditComponent } from './Pages/Autores/autoredit/autoredit.component';
import { FornecedorcreateComponent } from './Pages/Fornecedores/fornecedorcreate/fornecedorcreate.component';
import { FornecedorlistComponent } from './Pages/Fornecedores/fornecedorlist/fornecedorlist.component';
import { AutorcreateComponent } from './Pages/Autores/autorcreate/autorcreate.component';
import { AutorlistComponent } from './Pages/Autores/autorlist/autorlist.component';
import { ContatoComponent } from './Pages/Cliente/contato/contato.component';
import { QuemSomosComponent } from './Pages/Cliente/quem-somos/quem-somos.component';
import { HomeComponent } from './Pages/Cliente/home/home.component';
import { AppComponent } from './app.component';
import { LivroCreateComponent } from './Pages/Livros/livrocreate/livrocreate.component';
import { LivroEditComponent } from './Pages/Livros/livroedit/livroedit.component';
import { LivroListComponent } from './Pages/Livros/livrolist/livrolist.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "app-component", component: AppComponent},
  {path: "livros-list", component: LivroListComponent},
  {path: "livros-create", component: LivroCreateComponent},
  {path: "livros-edit", component: LivroEditComponent},


  {path: "autores-list", component: AutorlistComponent},
  {path: "autores-create", component: AutorcreateComponent},
  {path: "autores-edit", component: AutoreditComponent},


  {path: "fornecedores-list", component: FornecedorlistComponent},
  {path: "fornecedores-create", component: FornecedorcreateComponent},
  {path: "fornecedores-edit", component: FornecedoreditComponent},


  {path: "estoques-summary", component: EstoqueresumoComponent},
  {path: "estoques-list", component: EstoquelistComponent},
  {path: "estoques-create", component: EstoquecreateComponent},

  {path: "vendas-list", component: VendalistComponent},
  {path: "vendas-create", component: VendacreateComponent},




  {path: "client-home", component: HomeComponent},
  {path: "client-about", component: QuemSomosComponent},
  {path: "client-contact", component: ContatoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
