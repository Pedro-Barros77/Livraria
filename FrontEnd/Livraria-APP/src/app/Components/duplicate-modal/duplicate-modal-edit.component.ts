import { LivroEditComponent } from '../../Pages/Livros/livroedit/livroedit.component';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';
import { Livro } from 'src/app/Shared/livro.model';

@Component({
  selector: 'duplicate-modal-edit',
  templateUrl: './duplicate-modal.component.html',
  styleUrls: ['./duplicate-modal.component.css']
})
export class DuplicateModalEditComponent implements OnInit {

  constructor(
    service: LivroServiceService,
    livroEdit: LivroEditComponent
  ) {
    this.service = service;
    this.livroEdit = livroEdit!;
  }

  ngOnInit(): void {
  }

  public livroEdit: LivroEditComponent;

  public service: LivroServiceService;
  public createForm: NgForm | undefined;

  setDuplicates(duplicates: Livro[], form: NgForm) {
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

  confirmCreate() {
    let body = document.getElementById("modalBodyDuplicate")!;
    body.innerHTML = "";
    this.livroEdit!.confirmUpdate();
  }
}
