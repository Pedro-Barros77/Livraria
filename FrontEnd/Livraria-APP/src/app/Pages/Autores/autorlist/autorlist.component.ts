import { Router } from '@angular/router';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';
import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/Shared/autor.model';
import { DeleteModalComponent } from 'src/app/Components/delete-modal/delete-modal.component';

@Component({
  selector: 'autores-list',
  templateUrl: './autorlist.component.html',
  styleUrls: ['./autorlist.component.css']
})
export class AutorlistComponent implements OnInit {

  constructor(
    public service: LivroServiceService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.service.refreshList();
    this.service.refreshAutores();
    this.service.refreshFornecedores();
  }

  populateForm(selectedRecord: Autor) {
    this.service.formDataAutor = Object.assign({}, selectedRecord);
  }

  modalDeleteSingle(autor: Autor) {
    //let delModal: DeleteModalComponent = new DeleteModalComponent(this, this.service);
    //delModal.setAutor(autor);
  }

  modalDeleteMultiple(ids: number[]) {
    if (ids.length > 0) {
      //let delModal: DeleteModalComponent = new DeleteModalComponent(this, this.service);
      //delModal.setIds(ids);
      //(<HTMLButtonElement>document.getElementById("Autor")).click();
    }
  }

  openDetails(autor: Autor){
    this.populateForm(autor);
    //let detailsModal = new DetailsModalComponent(this, this.service);
    //detailsModal.setImage();
  }

  selectedAutores: Autor[] = [];
  selecting: boolean = false;

  startSelection() {
    let btnSelecionar = document.getElementById("btnSelecionarAutor")!;

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
    let btnSelecionar = document.getElementById("btnSelecionarAutor")!;

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
    let btnDelteSelected = document.getElementById("deleteSelectedAutor");
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
}
