import {HttpClient} from '@angular/common/http'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getLivros();
  }

  private _FilterType: string = 'Titulo';
  public get FilterType(): string{
    return this._FilterType;
  }
  public set FilterType(value: string){
    this._FilterType = value;

  }

  private _SearchFilter: string = '';
  public get SearchFilter(): string{
    return this._SearchFilter;
  }
  public set SearchFilter(value: string){
    this._SearchFilter = value;
    this.LivrosFiltrados = this.SearchFilter ? this.FiltrarLivros(this.SearchFilter) : this.Livros;
  }
  FiltrarLivros(value: string): any{
    value = value.toLocaleLowerCase();
    return this.Livros.filter(
      (livro:{titulo: string}) => livro.titulo.toLocaleLowerCase().indexOf(value) !== -1
    )
  }

  public Livros: any = [];
  public LivrosFiltrados: any = [];

  public getLivros(): void {
    this.http.get('https://localhost:5000/api/Livro').subscribe(
      response => {
        this.Livros = response;
        this.LivrosFiltrados = this.Livros;
      },
      error => console.log(error))
  }

}
