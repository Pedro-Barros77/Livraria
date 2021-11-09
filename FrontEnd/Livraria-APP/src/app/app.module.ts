import { DuplicateModalEditComponent } from 'src/app/Components/duplicate-modal/duplicate-modal-edit.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LivroListComponent } from './Pages/Livros/livrolist/livrolist.component';
import { LivroEditComponent } from './Pages/Livros/livroedit/livroedit.component';
import { LivroCreateComponent } from './Pages/Livros/livrocreate/livrocreate.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { CurrencyPipe } from '@angular/common';
import { HomeComponent } from './Pages/Cliente/home/home.component';
import { ContatoComponent } from './Pages/Cliente/contato/contato.component';
import { QuemSomosComponent } from './Pages/Cliente/quem-somos/quem-somos.component';
import { ClientNavBarComponent } from './Components/client-nav-bar/client-nav-bar.component';
import { CardLivroComponent } from './Components/card-livro/card-livro.component';
import { DeleteModalComponent } from './Components/delete-modal/delete-modal.component';
import { DuplicateModalComponent } from './Components/duplicate-modal/duplicate-modal.component';
import { DetailsModalComponent } from './Components/details-modal/details-modal.component';
import { AutorlistComponent } from './Pages/Autores/autorlist/autorlist.component';
import { AutorcreateComponent } from './Pages/Autores/autorcreate/autorcreate.component';
import { FornecedorlistComponent } from './Pages/Fornecedores/fornecedorlist/fornecedorlist.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CardLivroComponent,
    DeleteModalComponent,
    DuplicateModalComponent,
    DuplicateModalEditComponent,
    DetailsModalComponent,

    LivroListComponent,
    LivroCreateComponent,
    LivroEditComponent,
    
    AutorlistComponent,
    AutorcreateComponent,

    ClientNavBarComponent,
    HomeComponent,
    ContatoComponent,
    QuemSomosComponent,
    FornecedorlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
