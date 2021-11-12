import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteModalComponent } from 'src/app/Components/delete-modal/delete-modal.component';
import { DetailsModalComponent } from 'src/app/Components/details-modal/details-modal.component';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';
import { Venda } from 'src/app/Shared/venda.model';

@Component({
  selector: 'vendas-list',
  templateUrl: './vendalist.component.html',
  styleUrls: ['./vendalist.component.css']
})
export class VendalistComponent implements OnInit {

  constructor(
    public service: LivroServiceService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.service.refreshVendas();
    //this.service.FilterType = "Nome do Autor"; /* ??? */
  }

  populateForm(selectedRecord: Venda) {
    this.service.formDataVenda = Object.assign({}, selectedRecord);
  }

  modalDeleteSingle(venda: Venda) {
    let delModal: DeleteModalComponent = new DeleteModalComponent(this.service);
    //delModal.setVenda(venda);
  }

  modalDeleteMultiple(ids: number[]) {
    if (ids.length > 0) {
      let delModal: DeleteModalComponent = new DeleteModalComponent(this.service);
      //delModal.setIdVendas(ids);
      //(<HTMLButtonElement>document.getElementById("callDeleteModal")).click();
    }
  }

  openDetails(venda: Venda){
    this.populateForm(venda);
    let detailsModal = new DetailsModalComponent(this.service);
  }

  selectedVendas: Venda[] = [];
  selecting: boolean = false;

  startSelection() {
    let btnSelecionar = document.getElementById("btnSelecionarVenda")!;

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
    let btnSelecionar = document.getElementById("btnSelecionarVenda")!;

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
    let btnDelteSelected = document.getElementById("deleteSelectedVenda");
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
    if(res.origin != "venda"){
      return;
    }

    if(res.ids.length > 1){
      this.deleteVendas(res.ids);
    }
    else{
      this.deleteVenda(res.ids[0]);
    }

    this.cancelSelection();
  }

  deleteVenda(id: number) {
    this.service.deleteVenda(id).subscribe(
      response => this.service.refreshVendas()
    );
  }

  deleteVendas(ids: number[]) {
    let i: number = 0;
    ids.forEach(id => {
      this.service.deleteVenda(id).subscribe(
        response =>{
          if(i == ids.length-1){this.service.refreshVendas();}
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
