import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'src/app/Components/delete-modal/delete-modal.component';
import { DetailsModalComponent } from 'src/app/Components/details-modal/details-modal.component';
import { Estoque } from 'src/app/Shared/estoque.model';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';

@Component({
  selector: 'estoques-summary',
  templateUrl: './estoqueresumo.component.html',
  styleUrls: ['./estoqueresumo.component.css']
})
export class EstoqueresumoComponent implements OnInit {

  constructor(
    public service: LivroServiceService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.service.refreshList();
    this.service.refreshFornecedores();
    this.service.refreshEstoque();
    this.service.FilterType = "Livro";
  }

  populateForm(selectedRecord: Estoque) {
    this.service.formDataEstoque = Object.assign({}, selectedRecord);
  }

  modalDeleteSingle(estoque: Estoque) {
    let delModal: DeleteModalComponent = new DeleteModalComponent(this.service);
    //delModal.setAutor(autor);
  }

  modalDeleteMultiple(ids: number[]) {
    if (ids.length > 0) {
      let delModal: DeleteModalComponent = new DeleteModalComponent(this.service);
      // delModal.setIdAutores(ids);
      // (<HTMLButtonElement>document.getElementById("callDeleteModal")).click();
    }
  }

  openDetails(estoque: Estoque){
    this.populateForm(estoque);
    let detailsModal = new DetailsModalComponent(this.service);
    detailsModal.setEstoque();
  }

  selectedAutores: Estoque[] = [];
  selecting: boolean = false;

  startSelection() {
    let btnSelecionar = document.getElementById("btnSelecionarEstoque")!;

    this.selecting = !this.selecting;

    if (this.selecting) {
      btnSelecionar.style.display = "none";
    }
    else {
      btnSelecionar.style.display = "block";
      btnSelecionar.innerHTML = "Selecionar";
      btnSelecionar.style.backgroundColor = "rgb(208, 238, 223)";
    }
  }

  cancelSelection() {
    let btnSelecionar = document.getElementById("btnSelecionarEstoque")!;

    this.selecting = false;
    btnSelecionar.style.display = "block";
    btnSelecionar.innerHTML = "Selecionar";
    btnSelecionar.style.backgroundColor = "rgb(208, 238, 223)";
  }

  selectAll() {
    let checks = document.getElementsByClassName("ckbSelect");
    Array.from(checks).forEach(item => {
      let check = item as HTMLInputElement;
      check.checked = true;
    });
  }

  setExcludeBtn() {
    let btnDelteSelected = document.getElementById("deleteSelectedEstoque");
    if (this.getSelectedIds().length > 0) {
      if (btnDelteSelected?.classList.contains("disabled"))
        btnDelteSelected?.classList.remove("disabled");
    }
    else {
      if (!btnDelteSelected?.classList.contains("disabled"))
        btnDelteSelected?.classList.add("disabled");
    }
  }

  getSelectedIds(): number[] {
    let IDs: number[] = [];
    let checks = document.getElementsByClassName("ckbSelect") as HTMLCollectionOf<HTMLInputElement>;

    Array.from(checks).filter(c => c.checked)!.forEach(item => {
      let id = parseInt(item.value);
      IDs.push(id);
    });
    return IDs;
  }

  confirmDelete(res: DeleteResponse){
    if(res.origin != "estoque"){
      return;
    }

    if(res.ids.length > 1){
      this.deleteEstoques(res.ids);
    }
    else{
      this.deleteEstoque(res.ids[0]);
    }

    this.cancelSelection();
  }

  deleteEstoque(id: number) {
    this.service.deleteEstoque(id).subscribe(
      response => this.service.refreshEstoque()
    );
  }

  deleteEstoques(ids: number[]) {
    let i: number = 0;
    ids.forEach(id => {
      this.service.deleteEstoque(id).subscribe(
        response =>{
          if(i == ids.length-1){this.service.refreshEstoque();}
          i++;
        }
      );
    });
  }

}

class DeleteResponse{
  ids: number[];
  origin: string;
  constructor(ids: number[], origin: string){
    this.ids = ids;
    this.origin = origin;
  }
}
