import { Livro } from 'src/app/Shared/livro.model';
import { LivroServiceService } from './../../../Shared/livro-service.service';
import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'livros-list',
  templateUrl: './livrolist.component.html',
  styleUrls: ['./livrolist.component.css']
})
export class LivroListComponent implements OnInit {

  constructor(public service: LivroServiceService) { }

  ngOnInit(): void {
    this.service.refreshList();
    this.service.refreshAutores();
    this.service.refreshFornecedores();
  }
  

  populateForm(selectedRecord: Livro) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  deleteLiv() {
    let body = document.querySelector("#modalBody");
    let id = body?.getAttribute("name");
    this.service.deleteLivro(parseInt(id!)).subscribe(
      response => this.service.refreshList()
    );

    // setTimeout(() => {this.service.refreshList();}, 1000)

    body!.innerHTML = '';
  }

  buildModal(livro: Livro) {
    let body = document.querySelector("#modalBody");
    body?.setAttribute("name", livro.id.toString());

    body!.innerHTML = '';

    let pTitulo = document.createElement("p");
    pTitulo.innerText = "Titulo: " + livro.titulo;

    let pValor = document.createElement("p");
    pValor.innerText = "Valor: " + livro.valor;

    let pAutor = document.createElement("p");
    if (livro.autorID != null) {
      pAutor.innerText = "Autor: " + this.service.getAutor(livro.id).nome;
    }
    else{
      pAutor.innerText = "Autor: Nenhum Selecionado";
    }

    let pFornecedor = document.createElement("p");
    if (livro.fornecedorID != null) {
      pFornecedor.innerText = "Fornecedor: " + this.service.getFornecedor(livro.id).nome;
    }
    else{
      pAutor.innerText = "Fornecedor: Nenhum Selecionado";
    }


    body?.appendChild(pTitulo);
    body?.appendChild(pValor);
    body?.appendChild(pAutor);
    body?.appendChild(pFornecedor);
  }

  valorEmReais(valor:string):string{
    return parseFloat(valor).toLocaleString('pt-br',{style: 'currency',currency: 'BRL'});
  }
}
