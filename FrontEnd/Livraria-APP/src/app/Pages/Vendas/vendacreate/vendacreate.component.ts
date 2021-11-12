import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DetailsModalComponent } from 'src/app/Components/details-modal/details-modal.component';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';
import { Livro } from 'src/app/Shared/livro.model';
import { Venda } from 'src/app/Shared/venda.model';

@Component({
  selector: 'vendas-create',
  templateUrl: './vendacreate.component.html',
  styleUrls: ['./vendacreate.component.css']
})
export class VendacreateComponent implements OnInit {

  constructor(
    service: LivroServiceService,
    router: Router
  ) {
    this.router = router;
    this.service = service;
  }

  router: Router;
  public service: LivroServiceService;

  Carrinho: ItemCarrinho[] = [];
  quantidadeTotal: number = 0;

  ngOnInit(): void {
  }

  public thisForm: NgForm | undefined;

  onSubmit(form: NgForm) {
    this.thisForm = form;
    this.confirmCreate();
  }

  confirmCreate() {
    this.setUpperCase();

    this.service.formDataVenda.id = 0;

    this.insertRecord(this.thisForm!);
  }

  insertRecord(form: NgForm) {

    this.service.postVenda().subscribe(
      response => {
        this.resetForm(form);

        this.router.navigate(["/vendas-list"]);
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataVenda = new Venda();
  }

  setUpperCase() {
    let palavras: string[] = this.thisForm!.controls["nome"].value.toString().split(" ");
    let novoNome: string = "";

    palavras.forEach(palavra => {
      let novaPalavra: string = "";
      if (palavra.length > 3 || palavras.indexOf(palavra) == 0) {
        novaPalavra = palavra[0].toLocaleUpperCase() + palavra.substring(1);
      }
      else {
        novaPalavra = palavra;
      }
      if (palavras.indexOf(palavra) > 0) {
        novoNome += " ";
      }
      novoNome += novaPalavra;
    });
    //this.service.formDataVenda.nome = novoNome;
  }

  valorEmReais(valor: string): string {
    return parseFloat(valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }

  openDetails(livro: Livro) {
    this.populateForm(livro);
    let detailsModal = new DetailsModalComponent(this.service);
    detailsModal.setVenda();
    detailsModal.setLivro();
  }

  maisUmItem(livro: Livro) {
    if (livro.quantidadeTotal >= 1) {
      this.receiveItem(new ItemCarrinho(livro, 1));
    }
    else {
      console.log("Quantidade indisponível!");
    }
  }

  menosUmItem() {
      this.quantidadeTotal--;
  }

  removerItem(item: ItemCarrinho){
    this.Carrinho.splice(this.Carrinho.indexOf(item),1);
    this.quantidadeTotal -= item.quantidade;
  }

  populateForm(selectedRecord: Livro) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  receiveItem(item: ItemCarrinho) {

    if (!this.Carrinho.some(i => i.livro.id == item.livro.id)) {
      this.Carrinho.push(item);
    }
    else {
      this.Carrinho.find(i => i.livro.id == item.livro.id)!.quantidade += item.quantidade;
    }

    this.quantidadeTotal += item.quantidade;
    //this.cancelSelection();
  }

  getItem(livroID: number): ItemCarrinho {

    if (this.Carrinho && this.Carrinho.length > 0) {
      if (this.Carrinho.find(i => i.livro.id == livroID)!) {
        return this.Carrinho.find(i => i.livro.id == livroID)!;
      }
      else {
        return new ItemCarrinho(new Livro(), 0);
      }
    }
    else {
      return new ItemCarrinho(new Livro(), 0);
    }
  }

}

class ItemCarrinho {
  livro: Livro = new Livro();
  quantidade: number = 0;

  constructor(livro: Livro, quantidade: number) {
    this.livro = livro;
    this.quantidade = quantidade;
  }
}
