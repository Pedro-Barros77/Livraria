import { DeleteModalComponent } from './../Components/delete-modal/delete-modal.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Autor } from './autor.model';
import { Fornecedor } from './fornecedor.model';
import { Router } from '@angular/router';
import { Estoque } from './estoque.model';
import { Venda } from './venda.model';
import { ItemVenda } from './itemVenda.model';

@Injectable({
  providedIn: 'root'
})
export class LivroServiceService {

  formData: Livro = new Livro();
  fileData: FormData | null | undefined = new FormData();

  formDataAutor: Autor = new Autor();
  formDataFornecedor: Fornecedor = new Fornecedor();
  formDataEstoque: Estoque = new Estoque();
  formDataVenda: Venda = new Venda();
  formDataItemVenda: ItemVenda = new ItemVenda();

  public set _formDataMinQuantidade(value: any) {
    if (value) {
      if (value.toString().length > 6) {
        (<HTMLInputElement>document.getElementById("minQuantidade")!).value =
          (<HTMLInputElement>document.getElementById("minQuantidade")!).value.toString().slice(0, -1);
      }
      this.formData.minQuantidade = parseInt((<HTMLInputElement>document.getElementById("minQuantidade")!).value);
    }
  }
  public set _formDataEstoqueQuantidade(value: any) {
    if (value) {
      if (value.toString().length > 6) {
        (<HTMLInputElement>document.getElementById("quantidade")!).value =
          (<HTMLInputElement>document.getElementById("quantidade")!).value.toString().slice(0, -1);
      }
      this.formDataEstoque.quantidade = parseInt((<HTMLInputElement>document.getElementById("quantidade")!).value);
    }
  }
  public set _formDataValor(value: any) {
    if (value) {
      if (value.toString().length > 10) {
        (<HTMLInputElement>document.getElementById("txtValor")!).value =
          (<HTMLInputElement>document.getElementById("txtValor")!).value.toString().slice(0, -1);
      }
      this.formData.valor = parseInt((<HTMLInputElement>document.getElementById("txtValor")!).value);
    }
  }


  readonly baseURL = 'https://localhost:5000/api/Livro';
  readonly autorURL = 'https://localhost:5000/api/Autor';
  readonly fornecedorURL = 'https://localhost:5000/api/Fornecedor';
  readonly imageURL = 'https://localhost:5000/uploads/';
  readonly estoqueURL = 'https://localhost:5000/api/Estoque';
  readonly vendaURL = 'https://localhost:5000/api/Venda';
  readonly itemVendaURL = 'https://localhost:5000/api/ItemVEnda';

  livrosList: Livro[] = [];
  autoresList: Autor[] = [];
  fornecedoresList: Fornecedor[] = [];
  estoquesList: Estoque[] = [];
  vendasList: Venda[] = [];
  ItensVendaList: ItemVenda[] = [];

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

        if (!this.router.url.toString().includes("client")
          && !this.router.url.toString().includes("estoques")) {
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

  postFornecedor() {
    return this.http.post(this.fornecedorURL, this.formDataFornecedor);
  }

  putFornecedor() {
    return this.http.put(`${this.fornecedorURL}/${this.formDataFornecedor.id}`, this.formDataFornecedor);
  }
  deleteFornecedor(id: number) {
    return this.http.delete(`${this.fornecedorURL}/${id}`);
  }


  //Estoque############################

  refreshEstoque() {
    this.http.get(this.estoqueURL)
      .toPromise()
      .then(res => {

        this.estoquesList = res as Estoque[];
        let estoqueComTitulo = Object.assign(res as Estoque[]);
        estoqueComTitulo.forEach((est: any) => {
          est.titulo = this.livrosList.find(liv => liv.id == est.livroID)!.titulo;
        });

        this.filteredEstoques = estoqueComTitulo;
      });
  }

  postEstoque() {
    return this.http.post(this.estoqueURL, this.formDataEstoque);
  }

  putEstoque() {
    return this.http.put(`${this.estoqueURL}/${this.formDataEstoque.id}`, this.formDataEstoque);
  }
  deleteEstoque(id: number) {
    return this.http.delete(`${this.estoqueURL}/${id}`);
  }


  //Venda############################

  refreshVendas() {
    this.http.get(this.vendaURL)
      .toPromise()
      .then(res => {
        this.vendasList = res as Venda[];
        this.filteredVendas = res as Venda[];
      });
  }

  postVenda() {
    return this.http.post(this.vendaURL, this.formDataVenda);
  }

  putVenda() {
    return this.http.put(`${this.vendaURL}/${this.formDataVenda.id}`, this.formDataVenda);
  }
  deleteVenda(id: number) {
    return this.http.delete(`${this.vendaURL}/${id}`);
  }


  //ItemVenda###########################

  refreshItemVenda() {
    this.http.get(this.itemVendaURL)
      .toPromise()
      .then(res => {
        this.ItensVendaList = res as ItemVenda[];
      });
  }

  postItemVenda() {
    return this.http.post(this.itemVendaURL, this.formDataItemVenda);
  }

  putItemVenda() {
    return this.http.put(`${this.itemVendaURL}/${this.formDataItemVenda.id}`, this.formDataItemVenda);
  }
  deleteItemVenda(id: number) {
    return this.http.delete(`${this.itemVendaURL}/${id}`);
  }










  //Minhas funções____________

  getAutor(idLivro: number): any {
    let livro = this.livrosList.find(liv => liv.id == idLivro);

    if (livro?.autorID != null) {
      return this.autoresList.find(aut => aut.id == livro?.autorID)!;
    }
    else {
      let autor: Autor = { id: 0, nome: '' };
      return autor;
    }
  }

  getFornecedor(idLivro: number): any {
    let livro = this.livrosList.find(liv => liv.id == idLivro);
    if (livro?.fornecedorID != null) {
      return this.fornecedoresList.find(forn => forn.id == livro?.fornecedorID)!;
    }
    else {
      let fornecedor: Fornecedor = { id: 0, nome: '', telefone: '', email: '' };
      return fornecedor;
    }
  }

  getLivrosByAutor(idAutor: number): any {
    return this.livrosList.find(liv => liv.autorID == idAutor)!;
  }

  getLivro(idLivro: number): any {
    return this.livrosList.find(liv => liv.id == idLivro)!;
  }




  //toLocaleString("pt-br",{style: "currency",currency: "BRL"})

  //Funções de filtro da lista \/ \/ \/


  public filteredLivros: Livro[] = this.livrosList;
  public filteredAutores: Autor[] = this.autoresList;
  public filteredFornecedores: Fornecedor[] = this.fornecedoresList;
  public filteredEstoques: Estoque[] = this.estoquesList;
  public filteredVendas: Venda[] = this.vendasList;

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
        document.querySelector("#ordemIcon")!.className = "fas fa-sort-alpha-down";

        this.filteredLivros.sort((a: any, b: any) => a.titulo.localeCompare(b.titulo));

        this.filteredAutores.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
        this.filteredFornecedores.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
        this.filteredEstoques.sort((a: any, b: any) => a.titulo.localeCompare(b.titulo));
      }
      else {
        document.querySelector("#ordemIcon")!.className = "fas fa-sort-amount-down-alt";

        this.filteredLivros.sort((n1: any, n2: any) => n1.titulo.length - n2.titulo.length);

        this.filteredAutores.sort((n1: any, n2: any) => n1.nome.length - n2.nome.length);
        this.filteredFornecedores.sort((n1: any, n2: any) => n1.nome.localeCompare(n2.nome));
        this.filteredEstoques.sort((n1: any, n2: any) => n1.titulo.localeCompare(n2.titulo));
      }
    }
    else {
      if (this.Alpha) {
        this.filteredLivros.sort((a: any, b: any) => b.titulo.localeCompare(a.titulo));
        document.querySelector("#ordemIcon")!.className = "fas fa-sort-alpha-down-alt";

        this.filteredAutores.sort((a: any, b: any) => b.nome.localeCompare(a.nome));
        this.filteredFornecedores.sort((a: any, b: any) => b.nome.localeCompare(a.nome));
        this.filteredEstoques.sort((a: any, b: any) => b.titulo.localeCompare(a.titulo));
      }
      else {
        this.filteredLivros.sort((n1: any, n2: any) => n2.titulo.length - n1.titulo.length);
        document.querySelector("#ordemIcon")!.className = "fas fa-sort-amount-down";

        this.filteredAutores.sort((n1: any, n2: any) => n2.nome.length - n1.nome.length);
        this.filteredFornecedores.sort((n1: any, n2: any) => n2.nome.length - n1.nome.length);
        this.filteredEstoques.sort((n1: any, n2: any) => n2.titulo.localeCompare(n1.titulo));
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
    if (this.FilterType == "Titulo" || this.FilterType == "Autor" || this.FilterType == "Fornecedor") {
      this.filteredLivros = this.SearchFilter ? this.FiltrarLivros(this.SearchFilter) : this.livrosList;
    }
    else if (this.FilterType == "Nome do Autor") {
      this.filteredAutores = this.SearchFilter ? this.FiltrarLivros(this.SearchFilter) : this.autoresList;
    }
    else if (this.FilterType == "Nome do Fornecedor") {
      this.filteredFornecedores = this.SearchFilter ? this.FiltrarLivros(this.SearchFilter) : this.fornecedoresList;
    }
    else if (this.FilterType == "Livro") {
      this.filteredEstoques = this.SearchFilter ? this.FiltrarLivros(this.SearchFilter) : this.estoquesList;
    }
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
        );
        break;

      case "Livro":
        let estoqueComTitulo = Object.assign(this.estoquesList);
        estoqueComTitulo.forEach((est: any) => {
          est.titulo = this.livrosList.find(liv => liv.id == est.livroID)!.titulo;
        });

        let estoqueOrdenado = estoqueComTitulo.filter(
          (estoque: { titulo: string }) => estoque.titulo.toLocaleLowerCase().indexOf(value) !== -1
        );

        //var result = estoqueOrdenado.map((est:any) => ({id: est.id, quantidade: est.quantidade, dataRegistro: est.dataRegistro, livroID: est.livroID}));
        return estoqueOrdenado;
        break;
    }
  }

  getSingleEstoque(): any {
    let ids: number[] = [];
    this.filteredEstoques.forEach(est => {
      ids.push(est.livroID);
    });

    let ids2 = ids.filter((element, i) => i === ids.indexOf(element));
    let idsFiltrados: number[] = [];

    let estoque: Estoque[] = [];

    ids2.forEach(id => {
      if (!idsFiltrados.includes(id)) {
        idsFiltrados.push(id);
        estoque.push(this.filteredEstoques.find(est => est.livroID == id)!);
      }
    });
    return estoque;
  }

  limitValue(e: Event, min: number, max: number) {
    //console.log("changed");
  }
}
