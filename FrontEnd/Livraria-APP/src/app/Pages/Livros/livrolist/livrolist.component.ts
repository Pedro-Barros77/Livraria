import { Livro } from 'src/app/Shared/livro.model';
import { LivroServiceService } from './../../../Shared/livro-service.service';
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'livros-list',
  templateUrl: './livrolist.component.html',
  styleUrls: ['./livrolist.component.css']
})
export class LivroListComponent implements OnInit {

  constructor(private http: HttpClient,
    public service: LivroServiceService) {}

  ngOnInit(): void {
    this.service.refreshList();
    this.service.refreshAutores();
    this.service.refreshFornecedores();
  }

  // populateForm(selectedRecord: Livro) {
  //   this.service.formData = Object.assign({}, selectedRecord);
  // }
}
