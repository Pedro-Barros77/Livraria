import { LivroDetailsComponent } from './Pages/Livros/livrodetails/livrodetails.component';
import { LivroDeleteComponent } from './Pages/Livros/livrodelete/livrodelete.component';
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
  {path: "livros-edit/:id", component: LivroEditComponent},
  {path: "livros-detail/:id", component: LivroDetailsComponent},
  {path: "livros-delete/:id", component: LivroDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
