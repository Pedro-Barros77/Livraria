import { Livro } from 'src/app/Shared/livro.model';
import { LivroServiceService } from './../../../Shared/livro-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './livroedit.component.html',
  styleUrls: ['./livroedit.component.css']
})
export class LivroEditComponent implements OnInit {

  constructor(
    private _Activatedroute: ActivatedRoute,
    public service: LivroServiceService) {
  }

  ngOnInit(): void {
    this.service.refreshList();
  }

  public idString = this._Activatedroute.snapshot.paramMap.get("id");
  public ID: number = parseInt(this.idString!);

  onSubmit(form: NgForm) {
      this.updateRecord(form);
  }

  populateForm(selectedRecord: Livro) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  updateRecord(form: NgForm) {
    this.service.putLivro().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Livro();
  }
}
