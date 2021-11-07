import { DuplicateModalComponent } from './../../../Components/duplicate-modal/duplicate-modal.component';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';
import { NgForm } from '@angular/forms';
import { Livro } from 'src/app/Shared/livro.model';

declare var jQuery: any;

@Component({
  selector: 'app-create',
  templateUrl: './livrocreate.component.html',
  styleUrls: ['./livrocreate.component.css']
})
export class LivroCreateComponent implements OnInit {

  constructor(
    service: LivroServiceService,
    router: Router
  ) {
    this.router = router;
    this.service = service;
  }

  router: Router;

  ngOnInit(): void {
  }

  //files: Set<File> | undefined;

  public service: LivroServiceService;
  selectedFiles: FileList | undefined;

  onChange(event: any) {
    this.selectedFiles = <FileList>event?.srcElement.files;
    // this.files = new Set();
    // this.files.add(selectedFiles[0]);
  }

  public thisForm: NgForm | undefined;

  onSubmit(form: NgForm) {
    this.thisForm = form;

    let duplicatas: Livro[] = this.getDuplicates(form);
    if (duplicatas.length > 0) {
      let btnModal = document.getElementById("callModal") as HTMLButtonElement;
      let duplicateModal: DuplicateModalComponent = new DuplicateModalComponent(this.service, this);
      duplicateModal.setDuplicates(duplicatas, form);

      btnModal.click();
    }
    else {
      this.confirmCreate();
    }
  }

  confirmCreate() {
    this.setUpperCase();

    this.service.formData.id = 0;
    this.service.formData.valor = this.service.formData.valor.toString().replace(',', '.');

    this.insertRecord(this.thisForm!, this.selectedFiles!);
  }

  setUpperCase(){
    let palavras: string[] = this.thisForm!.controls["titulo"].value.toString().split(" ");
    let novoTitulo: string = "";

    palavras.forEach(palavra => {
      let novaPalavra: string = "";
      if(palavra.length > 3 || palavras.indexOf(palavra) == 0){
        novaPalavra = palavra[0].toLocaleUpperCase() + palavra.substring(1);
      }
      else{
        novaPalavra = palavra;
      }
      if(palavras.indexOf(palavra) > 0){
        novoTitulo += " ";
      }
      novoTitulo += novaPalavra;
    });

    this.service.formData.titulo = novoTitulo;
  }

  getDuplicates(form: NgForm): Livro[] {
    let hasDuplicate: boolean = false;
    //Variável que receberá os livros com mais de 49% de duplicatas
    let livrosRepetidos: Livro[] = [];

    let palavras: string[] = Array.from(form.controls["titulo"].value.toString().toLocaleLowerCase().split(" ").filter(
      (p: string) => p.length >= 3
    ));

    //Para cada palavra do livro cadastrado
    palavras.forEach(palavra => {

      //Se houver um livro que inclua a palavra atual
      if (this.service.livrosList.some(liv =>
        liv.titulo.toLocaleLowerCase().includes(
          palavra.toLocaleLowerCase()))) {

        //Armazena o livro encontrado com ao menos uma palavra repetida
        let livrosEncontrados: Livro[] = this.service.livrosList.filter(
          liv => liv.titulo.toLocaleLowerCase().includes(palavra));

        //Para cada livro com ao menos uma palavra repetida
        livrosEncontrados.forEach(liv => {
          let duplicatas: number = 0;

          let livPalavras: string[] = liv.titulo.toLocaleLowerCase().split(" ").filter(
            (p: string) => p.length >= 3
          );

          //Para cada palavra deste livro
          livPalavras.forEach(livPalavra => {
            //Se existe essa palavra no array de palavras
            if (palavras.includes(livPalavra)) {
              duplicatas++;
            }
          });

          //Se o número de palavras repetidas deste livro >= 50%
          //do número de palavras do livro cadastrado
          if (duplicatas >= livPalavras.length / 2 && !livrosRepetidos.includes(liv)) {
            livrosRepetidos.push(liv);
          }
        });

        if (livrosRepetidos.length > 0) {
          hasDuplicate = true;
        }
      }
    });

    if (hasDuplicate) {
      return livrosRepetidos;
    }
    else {
      return [];
    }
  }

  insertRecord(form: NgForm, files: FileList) {
    this.service.postLivro().subscribe(
      res => {
        this.resetForm(form);
        console.log(res);
        this.router.navigate(["/livros-list"]);
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Livro();
  }
}
