import { LivroDetailsComponent } from './Pages/Livros/livrodetails/livrodetails.component';
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
  {path: "livros-detail", component: LivroDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
