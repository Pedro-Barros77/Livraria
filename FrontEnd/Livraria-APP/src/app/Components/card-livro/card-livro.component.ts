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

}
