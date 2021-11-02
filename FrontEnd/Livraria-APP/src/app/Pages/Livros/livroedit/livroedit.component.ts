import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './livroedit.component.html',
  styleUrls: ['./livroedit.component.css']
})
export class LivroEditComponent implements OnInit {

  constructor(private http: HttpClient, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getLivros();
  }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
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

  public Salvar() {
    let titulo = document.querySelector("#txtTitulo")?.nodeValue;
    let valor = document.querySelector("#txtValor")?.nodeValue;
    let autorID = document.querySelector("#cmbAutor")?.nodeValue;
    let fornecedorID = document.querySelector("#cmbFornecedor")?.nodeValue;
    let liv = new Livro(this.ID.toString(), "Teste", "valor", "1", "1")
    this.putLivro(liv);
  }

  public putLivro(liv: Livro): void {
    let resultado: any;

    const data = "{\"ID\": \""+liv.ID+"\",\"Titulo\": \""+liv.Titulo+"\",\"Valor\": \""+liv.Valor+"\",\"AutorID\": \""+liv.AutorID+"\",\"FornecedorID\": \""+liv.FornecedorID+"\"}";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    this.http.put<Livro>('https://localhost:5000/api/Livro/'+liv.ID, liv, httpOptions)
      .subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );

    // this.http.put("https://localhost:5000/api/Livro/"+liv.ID, data, httpOptions)
    // .subscribe(
    //   // data => this.postId = data.id,
    //   // response => {
    //   //   resultado = response.body;
    //   //   console.log(resultado);
    //   // },
    //   error => console.log(error));
  }
}

class Livro {
  ID: string;
  Titulo: string;
  Valor: string;
  AutorID: string;
  FornecedorID: string;

  constructor(Id: string, Titulo: string, Valor: string, AutorId: string, FornecedorId: string) {
    this.ID = Id;
    this.Titulo = Titulo;
    this.Valor = Valor;
    this.AutorID = AutorId;
    this.FornecedorID = FornecedorId;
  }
}
