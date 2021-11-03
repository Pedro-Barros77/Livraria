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
import { LivroDetailsComponent } from './Pages/Livros/livrodetails/livrodetails.component';
import { LivroDeleteComponent } from './Pages/Livros/livrodelete/livrodelete.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LivroListComponent,
    LivroEditComponent,
    LivroCreateComponent,
    LivroDetailsComponent,
    LivroDeleteComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,  
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
