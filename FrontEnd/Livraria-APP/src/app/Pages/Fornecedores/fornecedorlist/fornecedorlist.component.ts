import { Fornecedor } from './../../../Shared/fornecedor.model';
import { Router } from '@angular/router';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';
import { Component, OnInit } from '@angular/core';
import { DeleteModalComponent } from 'src/app/Components/delete-modal/delete-modal.component';
import { Autor } from 'src/app/Shared/autor.model';

@Component({
  selector: 'fornecedores-list',
  templateUrl: './fornecedorlist.component.html',
  styleUrls: ['./fornecedorlist.component.css']
})
export class FornecedorlistComponent implements OnInit {

  constructor(
    public service: LivroServiceService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.service.refreshList();
    this.service.refreshAutores();
    this.service.refreshFornecedores();
    this.service.FilterType = "Nome do Fornecedor";
  }

  populateForm(selectedRecord: Fornecedor) {
    this.service.formDataFornecedor = Object.assign({}, selectedRecord);
  }

  modalDeleteSingle(fornecedor: Fornecedor) {
    let delModal: DeleteModalComponent = new DeleteModalComponent(this.service);
    delModal.setFornecedor(fornecedor);
  }

  modalDeleteMultiple(ids: number[]) {
    if (ids.length > 0) {
      let delModal: DeleteModalComponent = new DeleteModalComponent(this.service);
      delModal.setIdFornecedores(ids);
      (<HTMLButtonElement>document.getElementById("callDeleteModal")).click();
    }
  }

  openDetails(fornecedor: Fornecedor){
    this.populateForm(fornecedor);
    //let detailsModal = new DetailsModalComponent(this, this.service);
    //detailsModal.setImage();
  }

  selectedFornecedores: Fornecedor[] = [];
  selecting: boolean = false;

  startSelection() {
    let btnSelecionar = document.getElementById("btnSelecionarFornecedor")!;

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
    let btnSelecionar = document.getElementById("btnSelecionarFornecedor")!;

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
    let btnDelteSelected = document.getElementById("deleteSelectedFornecedor");
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
    if(res.origin != "fornecedor"){
      return;
    }

    if(res.ids.length > 1){
      this.deleteFornecedores(res.ids);
    }
    else{
      this.deleteFornecedor(res.ids[0]);
    }

    this.cancelSelection();
  }

  deleteFornecedor(id: number) {
    this.service.deleteFornecedor(id).subscribe(
      response => this.service.refreshFornecedores()
    );
  }

  deleteFornecedores(ids: number[]) {
    let i: number = 0;
    ids.forEach(id => {
      this.service.deleteFornecedor(id).subscribe(
        response =>{
          if(i == ids.length-1){this.service.refreshFornecedores();}
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
