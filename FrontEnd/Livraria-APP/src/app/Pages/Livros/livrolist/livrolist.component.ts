import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'livros-list',
  templateUrl: './livrolist.component.html',
  styleUrls: ['./livrolist.component.css']
})
export class LivroListComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getLivros();
    this.ReOrder();
    this.ReOrder();
  }

  private _FilterType: string = 'Titulo';

  public get FilterType(): string {
    return this._FilterType;
  }
  public set FilterType(value: string) {
    this._FilterType = value;

  }

  private _SearchFilter: string = '';
  public get SearchFilter(): string {
    return this._SearchFilter;
  }
  public set SearchFilter(value: string) {
    this._SearchFilter = value;
    this.LivrosFiltrados = this.SearchFilter ? this.FiltrarLivros(this.SearchFilter) : this.Livros;
  }
  FiltrarLivros(value: string): any {
    value = value.toLocaleLowerCase();

    switch (this.FilterType) {
      case "Titulo":
        return this.Livros.filter(
          (livro: { titulo: string }) => livro.titulo.toLocaleLowerCase().indexOf(value) !== -1
        )
        break;

      case "Autor":
        return this.Livros.filter(
          (livro: { autorID: number }) => this.GetAutor(livro.autorID)?.nome.toLocaleLowerCase().indexOf(value) !== -1
        )
        break;

      case "Fornecedor":
        return this.Livros.filter(
          (livro: { fornecedorID: number }) => this.GetFornecedor(livro.fornecedorID)?.nome.toLocaleLowerCase().indexOf(value) !== -1
        )
        break;
    }
  }

  public Livros: any = [];
  public LivrosFiltrados: any = [];

  public Autores: any = [];
  public Fornecedores: any = [];

  public imprimir(item: any): void {
    console.log(item);
  }

  public getLivros(): void {
    this.http.get('https://localhost:5000/api/Livro').subscribe(
      response => {
        this.Livros = response;
        this.LivrosFiltrados = this.Livros;
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

  public GetAutor(livroId: number): any {
    return this.Autores.find((aut: { id: number }) => aut.id == livroId);;
  }
  public GetFornecedor(livroId: number): any {
    return this.Fornecedores.find((forn: { id: number }) => forn.id == livroId);;
  }

  private OrdemCrescente: boolean = true;
  private Alpha: boolean = true;

  public setOrdem(alpha:boolean){
    this.Alpha = alpha;
    this.OrdemCrescente = false;
    this.ReOrder();
  }

  public ReOrder() {
    this.OrdemCrescente = !this.OrdemCrescente;

    if (this.OrdemCrescente) {
      if(this.Alpha){
        this.LivrosFiltrados.sort((a:any, b:any) => a.titulo.localeCompare(b.titulo));
        document.querySelector("#ordemIcon")!.className = "fas fa-sort-alpha-down";
      }
      else{
        this.LivrosFiltrados.sort((n1: any, n2: any) => n1.titulo.length - n2.titulo.length);
        document.querySelector("#ordemIcon")!.className = "fas fa-sort-amount-down-alt";
      }
    }
    else {
      if(this.Alpha){
        this.LivrosFiltrados.sort((a:any, b:any) => b.titulo.localeCompare(a.titulo));
        document.querySelector("#ordemIcon")!.className = "fas fa-sort-alpha-down-alt";
      }
      else{
        this.LivrosFiltrados.sort((n1: any, n2: any) => n2.titulo.length - n1.titulo.length);
        document.querySelector("#ordemIcon")!.className = "fas fa-sort-amount-down";
      }
    }
  }
}
