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


  {path: "fornecedores-list", component: FornecedorlistComponent},




  {path: "client-home", component: HomeComponent},
  {path: "client-about", component: QuemSomosComponent},
  {path: "client-contact", component: ContatoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
