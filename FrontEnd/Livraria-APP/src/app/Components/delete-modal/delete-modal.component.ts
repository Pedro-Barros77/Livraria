import { LivroServiceService } from 'src/app/Shared/livro-service.service';
import { Component, OnInit } from '@angular/core';
import { LivroListComponent } from 'src/app/Pages/Livros/livrolist/livrolist.component';
import { Livro } from 'src/app/Shared/livro.model';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  constructor(list: LivroListComponent, service: LivroServiceService) {
    this.list = list;
    this.service = service;
  }

  public list: LivroListComponent;
  public service: LivroServiceService;

  ngOnInit(): void {
  }

  setLivro(livro: Livro) {
    let body = document.getElementById("modalBodyDelete")!;
    body.setAttribute("name",livro.id.toString());
    body.innerHTML = "";

    let pTitulo = document.createElement("p");
    pTitulo.innerText = "Titulo: " + livro.titulo;

    let pValor = document.createElement("p");
    pValor.innerText = "Valor: " + livro.valor;

    let pAutor = document.createElement("p");
    if(livro.autorID != null){
      pAutor.innerText = "Autor: " + this.service.getAutor(livro.id).nome;
    }
    else{
      pAutor.innerText = "Autor: Não informado.";
    }

    let pFornecedor = document.createElement("p");
    if(livro.fornecedorID != null){
      pFornecedor.innerText = "Fornecedor: " + this.service.getFornecedor(livro.id).nome;
    }
    else{
      pFornecedor.innerText = "Fornecedor: Não informado.";
    }
    body.appendChild(pTitulo);
    body.appendChild(pValor);
    body.appendChild(pAutor);
    body.appendChild(pFornecedor);
  }

  setIds(selectedIds: number[]) {
    let body = document.getElementById("modalBodyDelete")!;
    body.setAttribute("name","multiple");
    let i = 1;

    selectedIds.forEach(id => {
      let livro = this.service.livrosList.find(liv => liv.id == id)!;

      let pIndex = document.createElement("p");
      pIndex.innerText = i + "- " + livro.titulo;
      body.classList.add("b" + livro.id);
      body.appendChild(pIndex);
      i++;
    });
  }

  confirmDelete(){
    let body = document.getElementById("modalBodyDelete")!;
    body.innerHTML = "";
    let isMultiple: boolean = body.getAttribute("name")!.includes("multiple");
    let ids: number[] = [];

    let idList = Array.from(body.classList);

    idList.filter(s => s.startsWith("b")).forEach(id => {
      ids.push(parseInt(id.replace("b","")))
    });

    if(isMultiple){
      this.deleteLivros(ids);
    }
    else{
      this.deleteLivro(parseInt(body.getAttribute("name")!));
    }

    this.list.cancelSelection();
  }

  deleteLivro(id: number) {
    this.service.deleteLivro(id).subscribe(
      response => this.service.refreshList()
    );
  }

  deleteLivros(ids: number[]) {
    let i: number = 0;
    ids.forEach(id => {
      this.service.deleteLivro(id).subscribe(
        response =>{
          if(i == ids.length-1){this.service.refreshList();}
          i++;
        }
      );
    });
  }

}
