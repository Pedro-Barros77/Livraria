import { Component, Input, OnInit } from '@angular/core';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';

@Component({
  selector: 'card-livro',
  templateUrl: './card-livro.component.html',
  styleUrls: ['./card-livro.component.css']
})
export class CardLivroComponent implements OnInit {

  constructor(public service: LivroServiceService) { }

  ngOnInit(): void {
  }

  @Input() Livro: any;

  @Input() imageID: any;

  images: string[] = [
    "assets/img/Livros/O livro dos espiritos.jpeg",
    "assets/img/Livros/O ceu e o inferno.jpeg",
    "assets/img/Livros/Nosso Lar.jpeg",
    "assets/img/Livros/A caminho da luz.jpeg"
  ];
}
