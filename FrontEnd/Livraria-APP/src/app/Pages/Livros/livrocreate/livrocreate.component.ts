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
    router: Router) { this.router = router}

  router: Router;

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.service.formData.id = 0;
    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postLivro().subscribe(
      res => {
        this.resetForm(form);
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