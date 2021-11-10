import { Component, Input, OnInit } from '@angular/core';
import { Autor } from 'src/app/Shared/autor.model';
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

  public service: LivroServiceService;

  public livro: Livro | undefined;

  ngOnInit(): void {
  }

  setLivro() {
    document.getElementById("modalDetailsDialog")!.classList.add("modal-lg");
    document.getElementById("imgPlaceholder")!.setAttribute("src",
      this.service.imageURL + this.service.formData.id + this.service.formData.imageExt);
  }

  resetar() {
    this.service.formData = new Livro();
    this.service.formDataAutor = new Autor();
    this.service.formDataFornecedor = new Fornecedor();
  }
}
