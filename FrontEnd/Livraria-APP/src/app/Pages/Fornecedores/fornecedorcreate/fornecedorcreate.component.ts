import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DuplicateModalComponent } from 'src/app/Components/duplicate-modal/duplicate-modal.component';
import { Fornecedor } from 'src/app/Shared/fornecedor.model';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';

@Component({
  selector: 'fornecedor-create',
  templateUrl: './fornecedorcreate.component.html',
  styleUrls: ['./fornecedorcreate.component.css']
})
export class FornecedorcreateComponent implements OnInit {

  constructor(
    service: LivroServiceService,
    router: Router
  ) {
    this.router = router;
    this.service = service;
  }

  router: Router;
  public service: LivroServiceService;

  ngOnInit(): void {
  }

  public thisForm: NgForm | undefined;

  onSubmit(form: NgForm) {
    this.thisForm = form;

    if(!form.form.controls["telefone"].value && form.form.controls["telefone"].value.toString().length == 0){
      this.service.formDataFornecedor.telefone = null;
    }
    else{
      this.service.formDataFornecedor.telefone = form.form.controls["telefone"].value.toString()
      .replace("(","").replace(")","").replace("-","").replace(" ","");
    }

    if(form.form.controls["email"].value.toString().length == 0){
      this.service.formDataFornecedor.email = null;
    }

    let duplicatas: Fornecedor[] = this.getDuplicates(form);
    if (duplicatas.length > 0) {
      let btnModal = document.getElementById("callModal") as HTMLButtonElement;
      let duplicateModal: DuplicateModalComponent = new DuplicateModalComponent(this.service);
      duplicateModal.setFornecedores(duplicatas, form);

      btnModal.click();
    }
    else {
      this.confirmCreate();
    }
  }

  confirmCreate() {
    this.setUpperCase();

    this.service.formDataFornecedor.id = 0;

    this.insertRecord(this.thisForm!);
  }

  insertRecord(form: NgForm) {

    this.service.postFornecedor().subscribe(
      response => {
        this.resetForm(form);

        this.router.navigate(["/fornecedores-list"]);
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataFornecedor = new Fornecedor();
  }

  setUpperCase() {
    let palavras: string[] = this.thisForm!.controls["nome"].value.toString().split(" ");
    let novoNome: string = "";

    palavras.forEach(palavra => {
      let novaPalavra: string = "";
      if (palavra.length > 3 || palavras.indexOf(palavra) == 0) {
        novaPalavra = palavra[0].toLocaleUpperCase() + palavra.substring(1);
      }
      else {
        novaPalavra = palavra;
      }
      if (palavras.indexOf(palavra) > 0) {
        novoNome += " ";
      }
      novoNome += novaPalavra;
    });

    this.service.formDataFornecedor.nome = novoNome;
  }

  getDuplicates(form: NgForm): Fornecedor[] {
    let hasDuplicate: boolean = false;
    //Variável que receberá os livros com mais de 49% de duplicatas
    let fornecedoresRepetidos: Fornecedor[] = [];

    let palavras: string[] = Array.from(form.controls["nome"].value.toString().toLocaleLowerCase().split(" ").filter(
      (p: string) => p.length >= 3
    ));

    //Para cada palavra do livro cadastrado
    palavras.forEach(palavra => {

      //Se houver um livro que inclua a palavra atual
      if (this.service.fornecedoresList.some(forn =>
        forn.nome.toLocaleLowerCase().includes(
          palavra.toLocaleLowerCase()))) {

        //Armazena o livro encontrado com ao menos uma palavra repetida
        let fornecedoresEncontrados: Fornecedor[] = this.service.fornecedoresList.filter(
          aut => aut.nome.toLocaleLowerCase().includes(palavra));

        //Para cada livro com ao menos uma palavra repetida
        fornecedoresEncontrados.forEach(forn => {
          let duplicatas: number = 0;

          let fornPalavras: string[] = forn.nome.toLocaleLowerCase().split(" ").filter(
            (p: string) => p.length >= 3
          );

          //Para cada palavra deste livro
          fornPalavras.forEach(fornPalavra => {
            //Se existe essa palavra no array de palavras
            if (palavras.includes(fornPalavra)) {
              duplicatas++;
            }
          });

          //Se o número de palavras repetidas deste livro >= 50%
          //do número de palavras do livro cadastrado
          if (duplicatas >= fornPalavras.length / 2 && !fornecedoresRepetidos.includes(forn)) {
            fornecedoresRepetidos.push(forn);
          }
        });

        if (fornecedoresRepetidos.length > 0) {
          hasDuplicate = true;
        }
      }
    });

    if (hasDuplicate) {
      return fornecedoresRepetidos;
    }
    else {
      return [];
    }
  }

  lastLength: number = 0;

  public set tel(value: any) {
    this.service.formDataFornecedor.telefone = value;
    let txtTel = document.getElementById("txtTelefone") as HTMLInputElement;

    if(txtTel.value.length < this.lastLength){
      txtTel.value = '';
      this.lastLength = 0;
      return;
    }

    let chars = ['(',')','-',' '];
    let newString = '';

    Array.from(txtTel.value.toString()).forEach(letra => {
      if(!chars.includes(letra)){
        newString += letra;
      }
    });

    if(newString.length == 2 && !txtTel.value.toString().includes('(')){
      txtTel.value = "(" + newString + ") ";
    }

    if(newString.length == 6){
      txtTel.value += "-";
    }

    if(newString.length == 11){
      let splitTel: string[] = txtTel.value.split('-');
      txtTel.value = splitTel[0] + splitTel[1][0] + '-' + splitTel[1].substr(1);
    }

    this.lastLength = txtTel.value.length;
  }
}
