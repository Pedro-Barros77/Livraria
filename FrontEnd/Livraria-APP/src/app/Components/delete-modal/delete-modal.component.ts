import { LivroServiceService } from 'src/app/Shared/livro-service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Livro } from 'src/app/Shared/livro.model';
import { Autor } from 'src/app/Shared/autor.model';
import { Fornecedor } from 'src/app/Shared/fornecedor.model';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  constructor(service: LivroServiceService) {
    this.service = service;
  }

  public service: LivroServiceService;

  ngOnInit(): void {
  }

  @Output() delete = new EventEmitter<DeleteResponse>();

  setLivro(livro: Livro) {
    let body = document.getElementById("modalBodyDelete")!;
    body.setAttribute("name",livro.id.toString());
    body.innerHTML = "";

    let title = document.getElementById("deleteModalLabel")!;
    title.innerText = "Tem certeza que deseja excluir o livro?";
    title.setAttribute("name","livro");

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

  setIdLivros(selectedIds: number[]) {
    let body = document.getElementById("modalBodyDelete")!;
    body.setAttribute("name","multiple");
    let i = 1;

    let title = document.getElementById("deleteModalLabel")!;
    title.innerText = "Tem certeza que deseja excluir "+selectedIds.length+" livros?";
    title.setAttribute("name","livro");

    selectedIds.forEach(id => {
      let livro = this.service.livrosList.find(liv => liv.id == id)!;

      let pIndex = document.createElement("p");
      pIndex.innerText = i + "- " + livro.titulo;
      body.classList.add("b" + livro.id);
      body.appendChild(pIndex);
      i++;
    });
  }

  setAutor(autor: Autor) {
    let body = document.getElementById("modalBodyDelete")!;
    body.setAttribute("name",autor.id.toString());
    body.innerHTML = "";

    let title = document.getElementById("deleteModalLabel")!;
    title.innerText = "Tem certeza que deseja excluir o autor?";
    title.setAttribute("name","autor");

    let pNome = document.createElement("p");
    pNome.innerText = "Nome: " + autor.nome;

    body.appendChild(pNome);
  }

  setIdAutores(selectedIds: number[]) {
    let body = document.getElementById("modalBodyDelete")!;
    body.setAttribute("name","multiple");
    let i = 1;

    let title = document.getElementById("deleteModalLabel")!;
    title.innerText = "Tem certeza que deseja excluir "+selectedIds.length+" autores?";
    title.setAttribute("name","autor");

    selectedIds.forEach(id => {
      let autor = this.service.autoresList.find(aut => aut.id == id)!;

      let pIndex = document.createElement("p");
      pIndex.innerText = i + "- " + autor.nome;
      body.classList.add("b" + autor.id);
      body.appendChild(pIndex);
      i++;
    });
  }

  setFornecedor(fornecedor: Fornecedor) {
    let body = document.getElementById("modalBodyDelete")!;
    body.setAttribute("name",fornecedor.id.toString());
    body.innerHTML = "";

    let title = document.getElementById("deleteModalLabel")!;
    title.innerText = "Tem certeza que deseja excluir o fornecedor?";
    title.setAttribute("name","fornecedor");

    let pNome = document.createElement("p");
    pNome.innerText = "Nome: " + fornecedor.nome;

    let pTelefone = document.createElement("p");
    pTelefone.innerText = "Telefone: " + fornecedor.telefone;

    let pEmail = document.createElement("p");
    pEmail.innerText = "E-Mail: " + fornecedor.email;

    body.appendChild(pNome);
    body.appendChild(pTelefone);
    body.appendChild(pEmail);
  }

  setIdFornecedores(selectedIds: number[]) {
    let body = document.getElementById("modalBodyDelete")!;
    body.setAttribute("name","multiple");
    let i = 1;

    let title = document.getElementById("deleteModalLabel")!;
    title.innerText = "Tem certeza que deseja excluir "+selectedIds.length+" fornecedores?";
    title.setAttribute("name","fornecedor");

    selectedIds.forEach(id => {
      let fornecedor = this.service.fornecedoresList.find(forn => forn.id == id)!;

      let pIndex = document.createElement("p");
      pIndex.innerText = i + "- " + fornecedor.nome;
      body.classList.add("b" + fornecedor.id);
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

    if(!isMultiple){
      ids = [parseInt(body.getAttribute("name")!)];
    }

    let title = document.getElementById("deleteModalLabel")!;
    this.delete.emit(new DeleteResponse(ids, title.getAttribute("name")!));
    console.log("Emitting: " + title.getAttribute("name")!);
  }
}

class DeleteResponse{
  ids: number[];
  origin: string;
  constructor(ids: number[], origin: string){
    this.ids = ids;
    this.origin = origin;
  }
}
