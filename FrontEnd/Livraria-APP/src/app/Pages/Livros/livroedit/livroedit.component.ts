import { Livro } from 'src/app/Shared/livro.model';
import { LivroServiceService } from './../../../Shared/livro-service.service';
import { Component, Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './livroedit.component.html',
  styleUrls: ['./livroedit.component.css']
})
export class LivroEditComponent implements OnInit {

  constructor(
    public service: LivroServiceService,
    router: Router) { this.router = router}

  router: Router;

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.putLivro().subscribe(
      res => {
        this.resetForm(form);
        this.router.navigate(["/livros-list"])
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Livro();
  }
    
  getValor(): number{
    return parseFloat(this.service.formData.valor);
  }
}
