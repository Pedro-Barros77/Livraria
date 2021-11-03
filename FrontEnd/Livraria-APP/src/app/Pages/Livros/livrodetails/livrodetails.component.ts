import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './livrodetails.component.html',
  styleUrls: ['./livrodetails.component.css']
})
export class LivroDetailsComponent implements OnInit {
  constructor(private http: HttpClient,
    private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getLivros();
  }

  public idString = this._Activatedroute.snapshot.paramMap.get("id");
  public ID: number = parseInt(this.idString!);

  public Livros: any = [];

  public Autores: any = [];
  public Fornecedores: any = [];

  public getLivros(): void {
    this.http.get('https://localhost:5000/api/Livro').subscribe(
      response => {
        this.Livros = response;
      },
      error => console.log(error))


    this.http.get('https://localhost:5000/api/Autor').subscribe(
      response => {
        this.Autores = response;
      },
      error => console.log(error))


    this.http.get('https://localhost:5000/api/Fornecedor').subscribe(
      response => {
        this.Fornecedores = response;
      },
      error => console.log(error))
  }

  public GetLivro(): any {
    return this.Livros.find((liv: { id: number }) => liv.id == this.ID);
  }

  public GetAutor(livroId: number): any {
    return this.Autores.find((aut: { id: number }) => aut.id == livroId);
  }
  public GetFornecedor(livroId: number): any {
    return this.Fornecedores.find((forn: { id: number }) => forn.id == livroId);
  }


}
