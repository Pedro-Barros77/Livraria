import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as jquery from 'jquery';
import { DuplicateModalComponent } from 'src/app/Components/duplicate-modal/duplicate-modal.component';
import { Estoque } from 'src/app/Shared/estoque.model';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';

@Component({
  selector: 'estoques-create',
  templateUrl: './estoquecreate.component.html',
  styleUrls: ['./estoquecreate.component.css']
})
export class EstoquecreateComponent implements OnInit {

  constructor(
    service: LivroServiceService,
    router: Router,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.router = router;
    this.service = service;
  }

  router: Router;
  public service: LivroServiceService;

  ngOnInit(): void {
    this.service.refreshList();

    let script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.text = `
      $(document).ready(function() {
      $('.select2').select2();
      });
    `;
    this._renderer2.appendChild(this._document.body, script);
  }

  public thisForm: NgForm | undefined;

  onSubmit(form: NgForm) {
    this.thisForm = form;
    this.service.formDataEstoque.id = 0;
    this.service.formDataEstoque.livroID = parseInt((<HTMLInputElement>document.getElementById("livroID")).value);
    this.insertRecord(this.thisForm!);
  }

  insertRecord(form: NgForm) {

    this.service.postEstoque().subscribe(
      response => {
        this.resetForm(form);

        this.router.navigate(["/estoques-list"]);
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataEstoque = new Estoque();
  }
}
