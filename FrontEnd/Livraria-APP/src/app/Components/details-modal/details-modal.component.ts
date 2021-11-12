import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Autor } from 'src/app/Shared/autor.model';
import { Estoque } from 'src/app/Shared/estoque.model';
import { Fornecedor } from 'src/app/Shared/fornecedor.model';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';
import { Livro } from 'src/app/Shared/livro.model';

@Component({
  selector: 'details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent implements OnInit {

  constructor(service: LivroServiceService) {
    this.service = service;
  }

  @Input() origin: any;
  @Input() Carrinho: ItemCarrinho[] | undefined;

  @Output() adicionarItem = new EventEmitter<ItemCarrinho>();

  public service: LivroServiceService;

  public livro: Livro | undefined;

  quantidade: number = 1;

  ngOnInit(): void {
    this.service.refreshEstoque();
  }

  getLivro(id: number): Livro{
    return this.service.livrosList.find(liv => liv.id == id)!;
  }

  setLivro() {
    document.getElementById("modalDetailsDialog")!.classList.add("modal-lg");
    if(this.service.formData.imageExt != null && this.service.formData.imageExt.length > 0){
      document.getElementById("imgPlaceholder")!.setAttribute("src",
        this.service.imageURL + this.service.formData.id + this.service.formData.imageExt);
    }
    else{
      document.getElementById("imgPlaceholder")!.setAttribute("src","assets/img/img-placeholder.jpg");
    }
  }

  setRowNumeroOff(){
    document.getElementById("rowNumero")!.style.display = "none";
  }

  setEstoque() {
    document.getElementById("modalDetailsDialog")!.classList.add("modal-lg");
    let livro = this.service.livrosList.find(liv => liv.id == this.service.formDataEstoque.livroID)!

    if(livro.imageExt != null && livro.imageExt.length > 0){
      document.getElementById("imgPlaceholder")!.setAttribute("src",
        this.service.imageURL + livro.id  + livro.imageExt);
    }
    else{
      document.getElementById("imgPlaceholder")!.setAttribute("src","assets/img/img-placeholder.jpg");
    }
  }

  setVenda(){
    document.getElementById("btnEdit")!.setAttribute("style","display:none");
  }

  alterarValor(x:boolean){
    if(x){
      if(this.quantidade < 100){
        this.quantidade++;
      }
    }
    else{
      if(this.quantidade > 1){
        this.quantidade--;
      }
    }
  }

  confirmarItem(){
    console.log(this.service.formData.quantidadeTotal);
    if(this.service.formData!.quantidadeTotal >= this.quantidade){
      this.adicionarItem.emit(new ItemCarrinho(this.service.formData, this.quantidade));
      (<HTMLButtonElement>document.getElementById("btnFecharDetail")!).click();
    }
    else{
      console.log("Quantidade indisponível!");
    }
    this.resetar();
  }

  getItem(): ItemCarrinho {

    if (this.Carrinho && this.Carrinho.length > 0) {
      if (this.Carrinho.find(i => i.livro.id == this.service.formData.id)!) {
        return this.Carrinho.find(i => i.livro.id == this.service.formData.id)!;
      }
      else {
        return new ItemCarrinho(new Livro(), 0);
      }
    }
    else {
      return new ItemCarrinho(new Livro(), 0);
    }
  }

  resetar() {
    this.service.formData = new Livro();
    this.service.formDataAutor = new Autor();
    this.service.formDataFornecedor = new Fornecedor();
    this.service.formDataEstoque = new Estoque();
    this.quantidade = 1;
  }
}

class ItemCarrinho{
  livro: Livro = new Livro();
  quantidade: number = 0;

  constructor(livro: Livro, quantidade: number){
    this.livro = livro;
    this.quantidade = quantidade;
  }
}
