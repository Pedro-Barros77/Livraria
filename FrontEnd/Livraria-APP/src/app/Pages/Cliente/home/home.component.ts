import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/Shared/livro.model';
import { LivroServiceService } from './../../../Shared/livro-service.service';

@Component({
  selector: 'client-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public service: LivroServiceService) { }

  ngOnInit(): void {
    this.service.refreshList();
    this.service.refreshAutores();
    this.service.refreshFornecedores();
  }

  getLivros(array: any[]): any[]{
    return array.slice(4);
  }
}
