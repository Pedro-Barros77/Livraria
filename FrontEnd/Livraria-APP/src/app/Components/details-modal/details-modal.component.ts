import { Component, OnInit } from '@angular/core';
import { LivroListComponent } from 'src/app/Pages/Livros/livrolist/livrolist.component';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';
import { Livro } from 'src/app/Shared/livro.model';

@Component({
  selector: 'details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent implements OnInit {

  constructor(list: LivroListComponent, service: LivroServiceService) {
    this.list = list;
    this.service = service;
  }

  public list: LivroListComponent;
  public service: LivroServiceService;

  public livro: Livro | undefined;

  ngOnInit(): void {
  }

  populateForm(selectedRecord: Livro) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  setImage(){
    document.getElementById("imgPlaceholder")!.setAttribute("src",
    this.service.imageURL + this.service.formData.id + this.service.formData.imageExt);
  }

  resetar(){
    this.service.formData = new Livro();
  }
}
