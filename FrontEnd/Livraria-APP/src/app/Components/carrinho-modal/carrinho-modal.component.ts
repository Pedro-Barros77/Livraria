import { ItemVenda } from './../../Shared/itemVenda.model';
import { NgForm } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';
import { Livro } from 'src/app/Shared/livro.model';
import { Venda } from 'src/app/Shared/venda.model';

@Component({
  selector: 'carrinho-modal',
  templateUrl: './carrinho-modal.component.html',
  styleUrls: ['./carrinho-modal.component.css']
})
export class CarrinhoModalComponent implements OnInit {

  constructor(service: LivroServiceService) {
    this.service = service;
  }

  public service: LivroServiceService;

  ngOnInit(): void {
  }

  @Output() comprar = new EventEmitter();
  @Output() adicionarItem = new EventEmitter<ItemCarrinho>();
  @Output() subtrairItem = new EventEmitter();
  @Output() removerItem = new EventEmitter<ItemCarrinho>();

  @Input() carrinho: any;

  setIdLivros(selectedIds: number[]) {
    let body = document.getElementById("modalBodyCarrinho")!;
    let i = 1;

    selectedIds.forEach(id => {
      let livro = this.service.livrosList.find(liv => liv.id == id)!;

      let pIndex = document.createElement("p");
      pIndex.innerText = i + "- " + livro.titulo;
      body.classList.add("b" + livro.id);
      body.appendChild(pIndex);
      i++;
    });
  }

  confirmDelete() {
    let body = document.getElementById("modalBodyDelete")!;
    body.innerHTML = "";
    let isMultiple: boolean = body.getAttribute("name")!.includes("multiple");
    let ids: number[] = [];

    let idList = Array.from(body.classList);

    idList.filter(s => s.startsWith("b")).forEach(id => {
      ids.push(parseInt(id.replace("b", "")))
    });

    if (!isMultiple) {
      ids = [parseInt(body.getAttribute("name")!)];
    }

    this.comprar.emit();
  }

  maisUmItem(livro: Livro) {
    if (livro.quantidadeTotal >= 1) {
      this.adicionarItem.emit(new ItemCarrinho(livro, 1));
    }
    else {
      console.log("Quantidade indisponível!");
    }
  }

  menosUmItem(item: ItemCarrinho) {
    if (item.quantidade > 1) {
      item.quantidade--;
      this.subtrairItem.emit();
    }
  }

  excluirItem(item: ItemCarrinho) {
    this.removerItem.emit(item);
  }

  getLivro(livroID: number) {
    return this.service.livrosList.find(liv => liv.id == livroID)!;
  }

  getItem(livroID: number): ItemCarrinho {

    if (this.carrinho && this.carrinho.length > 0) {
      if (this.carrinho.find((i: ItemCarrinho) => i.livro.id == livroID)!) {
        return this.carrinho.find((i: ItemCarrinho) => i.livro.id == livroID)!;
      }
      else {
        return new ItemCarrinho(new Livro(), 0);
      }
    }
    else {
      return new ItemCarrinho(new Livro(), 0);
    }
  }

  getTotal() {
    let total = 0;
    this.carrinho.forEach((item: ItemCarrinho) => {
      total += (item.quantidade * this.getLivro(item.livro.id).valor);
    });

    return total;
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.service.formDataVenda.valorTotal = this.getTotal();
    this.service.formDataVenda.id = 0;

    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {

    this.service.postVenda().subscribe(
      response => {
        this.resetForm(form);
        let responseVenda = response as Venda;
        console.log("ResponseVenda: " + responseVenda);

        this.carrinho.forEach((item: ItemCarrinho) => {
          this.service.formDataItemVenda.livroID = item.livro.id;
          this.service.formDataItemVenda.qtdVenda = item.quantidade;
          this.service.formDataItemVenda.vendaID = responseVenda.id;

          this.service.postItemVenda().subscribe(
            res => {
              console.log("itemVenda: " + res);
            },
            erro => { console.log(erro); }
          );
        });
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataVenda = new Venda();
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
