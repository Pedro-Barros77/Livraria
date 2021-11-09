import { Livro } from 'src/app/Shared/livro.model';
import { LivroServiceService } from './../../../Shared/livro-service.service';
import { Component, Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form, NgForm } from '@angular/forms';
import { DuplicateModalComponent } from 'src/app/Components/duplicate-modal/duplicate-modal.component';
import { DuplicateModalEditComponent } from 'src/app/Components/duplicate-modal/duplicate-modal-edit.component';

@Component({
  selector: 'app-edit',
  templateUrl: './livroedit.component.html',
  styleUrls: ['./livroedit.component.css']
})
export class LivroEditComponent implements OnInit {

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

  file: any = null;

  public thisForm: NgForm | undefined;
  public fileForm: FormData | null = null;

  selectFile(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.fileForm = new FormData();
      this.fileForm.append('file', this.file);
    }
  }

  onSubmit(form: NgForm) {
    this.thisForm = form;

    let duplicatas: Livro[] = this.getDuplicates(form);
    if (duplicatas.length > 0) {
      let btnModal = document.getElementById("callModal") as HTMLButtonElement;
      let duplicateModal: DuplicateModalEditComponent = new DuplicateModalEditComponent(this.service, this);
      duplicateModal.setDuplicates(duplicatas, form);

      btnModal.click();
    }
    else {
      this.confirmUpdate();
    }
  }

  confirmUpdate() {
    this.setUpperCase();

    this.service.formData.valor = parseFloat(this.service.formData.valor.toString().replace(',', '.'));
    if(this.file != null){
      let ext = "." + this.file?.name.toString()!.split(".")[1];
      this.service.formData.imageExt = ext;
    }

    this.updateRecord(this.thisForm!);
  }

  updateRecord(form: NgForm) {
    let hasFile: boolean = !(this.fileForm == null || this.fileForm == undefined);
    this.service.fileData = this.fileForm!;



    this.service.putLivro().subscribe(
      response => {
        let id = this.service.formData.id;

        if (hasFile) {
          this.service.postImage(id).subscribe(
            res => {
              console.log(res);
            },
            err => { console.log(err); }
          );
        }

        this.resetForm(form);
        this.router.navigate(["/livros-list"])
        this.fileForm = null;
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Livro();
  }

  setUpperCase() {
    let palavras: string[] = this.thisForm!.controls["titulo"].value.toString().split(" ");
    let novoTitulo: string = "";

    palavras.forEach(palavra => {
      let novaPalavra: string = "";
      if (palavra.length > 3 || palavras.indexOf(palavra) == 0) {
        novaPalavra = palavra[0].toLocaleUpperCase() + palavra.substring(1);
      }
      else {
        novaPalavra = palavra;
      }
      if (palavras.indexOf(palavra) > 0) {
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

        let thisLivro =this.service.livrosList.find(liv => liv.id == this.service.formData.id)!;

        if(livrosRepetidos.includes(thisLivro)){
            livrosRepetidos.splice(livrosRepetidos.indexOf(thisLivro),1);
          }

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

  getValor(): number {
    return this.service.formData.valor;
  }
}
