import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';
import { NgForm } from '@angular/forms';
import { Livro } from 'src/app/Shared/livro.model';

@Component({
  selector: 'app-create',
  templateUrl: './livrocreate.component.html',
  styleUrls: ['./livrocreate.component.css']
})
export class LivroCreateComponent implements OnInit {

  constructor(
    public service: LivroServiceService,
    router: Router) { this.router = router }

  router: Router;

  ngOnInit(): void {
  }

  //files: Set<File> | undefined;

  selectedFiles: FileList | undefined;

  onChange(event:any) {
    this.selectedFiles = <FileList>event?.srcElement.files;
    // this.files = new Set();
    // this.files.add(selectedFiles[0]);
  }

  onSubmit(form: NgForm) {
  
    this.service.formData.id = 0;
    this.service.formData.valor = this.service.formData.valor.toString().replace(',', '.');

    this.insertRecord(form, this.selectedFiles!);
  }

  insertRecord(form: NgForm, files: FileList) {
    this.service.postLivro(files).subscribe(
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