import { NgForm } from '@angular/forms';
import { LivroCreateComponent } from './../../Pages/Livros/livrocreate/livrocreate.component';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';
import { Livro } from 'src/app/Shared/livro.model';
import { Autor } from 'src/app/Shared/autor.model';
import { Fornecedor } from 'src/app/Shared/fornecedor.model';

@Component({
  selector: 'duplicate-modal',
  templateUrl: './duplicate-modal.component.html',
  styleUrls: ['./duplicate-modal.component.css']
})
export class DuplicateModalComponent implements OnInit {

  constructor(
    service: LivroServiceService
  ) {
    this.service = service;
  }

  ngOnInit(): void {
  }

  @Output() confirm = new EventEmitter();

  public service: LivroServiceService;
  public createForm: NgForm | undefined;

  confirmCreate() {
    let body = document.getElementById("modalBodyDuplicate")!;
    body.innerHTML = "";
    this.confirm.emit();
  }

  setLivros(duplicates: Livro[], form: NgForm) {
    this.createForm = form;
    let body = document.getElementById("modalBodyDuplicate")!;
    body.innerHTML = "";
    let i = 1;
    let header = document.getElementById("duplicateModalLabel")!;

    if (duplicates.length == 1) {
      header.innerText = "Existe um livro com o título parecido"
    }
    else {
      header.innerText = "Existem " + duplicates.length + " livros com o título parecido"
    }

    duplicates.forEach(livro => {
      let pIndex = document.createElement("p");
      pIndex.innerHTML = i + "-";

      livro.titulo.split(" ").forEach(palavra => {
        if ((<Livro>form.form.value).titulo.toLocaleLowerCase().split(" ").filter(x => x.length >= 3).includes(palavra.toLocaleLowerCase())) {
          let boldSpan = document.createElement("span");
          boldSpan.style.fontWeight = "bold";
          boldSpan.innerText = " " + palavra;
          pIndex.appendChild(boldSpan);
        }
        else {
          pIndex.innerHTML += " " + palavra;
        }
      });


      body.classList.add("b" + livro.id);
      body.appendChild(pIndex);
      i++;
    });

    let pSubHeader = document.createElement("p");
    pSubHeader.innerText = "Deseja cadastrar mesmo assim?";
    pSubHeader.classList.add("display-6");
    pSubHeader.style.fontSize = "larger";
    body.appendChild(pSubHeader);
  }

  setAutores(duplicates: Autor[], form: NgForm) {
    this.createForm = form;
    let body = document.getElementById("modalBodyDuplicate")!;
    body.innerHTML = "";
    let i = 1;
    let header = document.getElementById("duplicateModalLabel")!;

    if (duplicates.length == 1) {
      header.innerText = "Existe um autor com o nome parecido"
    }
    else {
      header.innerText = "Existem " + duplicates.length + " autores com o nome parecido"
    }

    duplicates.forEach(autor => {
      let pIndex = document.createElement("p");
      pIndex.innerHTML = i + "-";

      autor.nome.split(" ").forEach(palavra => {
        if ((<Autor>form.form.value).nome.toLocaleLowerCase().split(" ").filter(x => x.length >= 3).includes(palavra.toLocaleLowerCase())) {
          let boldSpan = document.createElement("span");
          boldSpan.style.fontWeight = "bold";
          boldSpan.innerText = " " + palavra;
          pIndex.appendChild(boldSpan);
        }
        else {
          pIndex.innerHTML += " " + palavra;
        }
      });


      body.classList.add("b" + autor.id);
      body.appendChild(pIndex);
      i++;
    });

    let pSubHeader = document.createElement("p");
    pSubHeader.innerText = "Deseja cadastrar mesmo assim?";
    pSubHeader.classList.add("display-6");
    pSubHeader.style.fontSize = "larger";
    body.appendChild(pSubHeader);
  }

  setFornecedores(duplicates: Fornecedor[], form: NgForm) {
    this.createForm = form;
    let body = document.getElementById("modalBodyDuplicate")!;
    body.innerHTML = "";
    let i = 1;
    let header = document.getElementById("duplicateModalLabel")!;

    if (duplicates.length == 1) {
      header.innerText = "Existe um fornecedor com o nome parecido"
    }
    else {
      header.innerText = "Existem " + duplicates.length + " fornecedores com o nome parecido"
    }

    duplicates.forEach(fornecedor => {
      let pIndex = document.createElement("p");
      pIndex.innerHTML = i + "-";

      fornecedor.nome.split(" ").forEach(palavra => {
        if ((<Fornecedor>form.form.value).nome.toLocaleLowerCase().split(" ").filter(x => x.length >= 3).includes(palavra.toLocaleLowerCase())) {
          let boldSpan = document.createElement("span");
          boldSpan.style.fontWeight = "bold";
          boldSpan.innerText = " " + palavra;
          pIndex.appendChild(boldSpan);
        }
        else {
          pIndex.innerHTML += " " + palavra;
        }
      });


      body.classList.add("b" + fornecedor.id);
      body.appendChild(pIndex);
      i++;
    });

    let pSubHeader = document.createElement("p");
    pSubHeader.innerText = "Deseja cadastrar mesmo assim?";
    pSubHeader.classList.add("display-6");
    pSubHeader.style.fontSize = "larger";
    body.appendChild(pSubHeader);
  }
}
