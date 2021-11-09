import { DeleteModalComponent } from './../Components/delete-modal/delete-modal.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Autor } from './autor.model';
import { Fornecedor } from './fornecedor.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LivroServiceService {

  formData: Livro = new Livro();
  formDataAutor: Autor = new Autor();
  formDataFornecedor: Fornecedor = new Fornecedor();

  fileData: FormData | null | undefined = new FormData();

  readonly baseURL = 'https://localhost:5000/api/Livro';
  readonly autorURL = 'https://localhost:5000/api/Autor';
  readonly fornecedorURL = 'https://localhost:5000/api/Fornecedor';
  readonly imageURL = 'https://localhost:5000/uploads/';

  livrosList: Livro[] = [];
  autoresList: Autor[] = [];
  fornecedoresList: Fornecedor[] = [];

  constructor(
    private http: HttpClient,
    router: Router) {
    this.router = router;
  }
  router: Router;

  //LIVROS####################

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res => {
        this.livrosList = res as Livro[];
        this.filteredLivros = res as Livro[];

        if (!this.router.url.toString().includes("client")) {
          this.ReOrder();
          this.ReOrder();
        }
      });
  }

  postImage(id: number) {
    return this.http.post(this.baseURL + "/image/" + id, this.fileData);
  }

  postLivro() {
    return this.http.post(this.baseURL, this.formData);
  }

  putLivro() {
    return this.http.put(`${this.baseURL}/${this.formData.id}`, this.formData);
  }
  deleteLivro(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }



  //AUTORES###############

  refreshAutores() {
    this.http.get(this.autorURL)
      .toPromise()
      .then(res => {
        this.autoresList = res as Autor[];
        this.filteredAutores = res as Autor[];
      });
  }

  postAutor() {
    return this.http.post(this.autorURL, this.formDataAutor);
  }

  putAutor() {
    return this.http.put(`${this.autorURL}/${this.formDataAutor.id}`, this.formDataAutor);
  }
  deleteAutor(id: number) {
    return this.http.delete(`${this.autorURL}/${id}`);
  }





  //FORNECEDORES###################

  refreshFornecedores() {
    this.http.get(this.fornecedorURL)
      .toPromise()
      .then(res => {
        this.fornecedoresList = res as Fornecedor[];
        this.filteredFornecedores = res as Fornecedor[];
      });
  }










  //Minhas funções____________

  getAutor(idLivro: number): any {
    let livro = this.livrosList.find(liv => liv.id == idLivro);

    if (livro?.autorID != null) {
      return this.autoresList.find(aut => aut.id == livro?.autorID)!;
    }
    else {
      return null;
    }
  }

  getFornecedor(idLivro: number): any {
    let livro = this.livrosList.find(liv => liv.id == idLivro);
    if (livro?.autorID != null) {
      return this.fornecedoresList.find(forn => forn.id == livro?.fornecedorID)!;
    }
    else {
      return null;
    }
  }



  //toLocaleString("pt-br",{style: "currency",currency: "BRL"})

  //Funções de filtro da lista \/ \/ \/


  public filteredLivros: Livro[] = this.livrosList;
  public filteredAutores: Autor[] = this.autoresList;
  public filteredFornecedores: Fornecedor[] = this.fornecedoresList;

  private OrdemCrescente: boolean = true;
  private Alpha: boolean = true;

  public setOrdem(alpha: boolean) {
    this.Alpha = alpha;
    this.OrdemCrescente = false;
    this.ReOrder();
  }

  public ReOrder() {
    this.OrdemCrescente = !this.OrdemCrescente;

    if (this.OrdemCrescente) {
      if (this.Alpha) {
        this.filteredLivros.sort((a: any, b: any) => a.titulo.localeCompare(b.titulo));
        document.querySelector("#ordemIcon")!.className = "fas fa-sort-alpha-down";

        this.filteredAutores.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
      }
      else {
        this.filteredLivros.sort((n1: any, n2: any) => n1.titulo.length - n2.titulo.length);
        document.querySelector("#ordemIcon")!.className = "fas fa-sort-amount-down-alt";

        this.filteredAutores.sort((n1: any, n2: any) => n1.nome.length - n2.nome.length);
      }
    }
    else {
      if (this.Alpha) {
        this.filteredLivros.sort((a: any, b: any) => b.titulo.localeCompare(a.titulo));
        document.querySelector("#ordemIcon")!.className = "fas fa-sort-alpha-down-alt";

        this.filteredAutores.sort((a: any, b: any) => b.nome.localeCompare(a.nome));
      }
      else {
        this.filteredLivros.sort((n1: any, n2: any) => n2.titulo.length - n1.titulo.length);
        document.querySelector("#ordemIcon")!.className = "fas fa-sort-amount-down";

        this.filteredAutores.sort((n1: any, n2: any) => n2.nome.length - n1.nome.length);
      }
    }
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
    this.filteredLivros = this.SearchFilter ? this.FiltrarLivros(this.SearchFilter) : this.livrosList;
  }
  FiltrarLivros(value: string): any {
    value = value.toLocaleLowerCase();

    switch (this.FilterType) {
      case "Titulo":
        return this.livrosList.filter(
          (livro: { titulo: string }) => livro.titulo.toLocaleLowerCase().indexOf(value) !== -1
        )
        break;

      case "Autor":
        return this.livrosList.filter(
          (livro: { id: number }) => this.getAutor(livro.id)?.nome.toLocaleLowerCase()
            .indexOf(value) !== -1 && this.getAutor(livro.id)?.nome.toLocaleLowerCase() != null
        )
        break;

      case "Fornecedor":
        return this.livrosList.filter(
          (livro: { id: number }) => this.getFornecedor(livro.id)?.nome.toLocaleLowerCase()
            .indexOf(value) !== -1 && this.getFornecedor(livro.id)?.nome.toLocaleLowerCase() != null
        )
        break;

      case "Nome do Autor":
        return this.autoresList.filter(
          (autor: { nome: string }) => autor?.nome.toLocaleLowerCase()
            .indexOf(value) !== -1
        )
        break;

        case "Nome do Fornecedor":
        return this.fornecedoresList.filter(
          (fornecedor: { nome: string }) => fornecedor?.nome.toLocaleLowerCase()
            .indexOf(value) !== -1
        )
        break;
    }
  }

}
