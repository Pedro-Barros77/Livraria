import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivroServiceService } from 'src/app/Shared/livro-service.service';
import { Livro } from 'src/app/Shared/livro.model';

@Component({
  selector: 'app-details',
  templateUrl: './livrodetails.component.html',
  styleUrls: ['./livrodetails.component.css']
})
export class LivroDetailsComponent implements OnInit {
  constructor(public service: LivroServiceService) { }

  ngOnInit(): void {
  }

  populateForm(selectedRecord: Livro) {
    this.service.formData = Object.assign({}, selectedRecord);
  }
}
