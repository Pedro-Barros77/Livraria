import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroServiceService } from './Shared/livro-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Livraria-APP';
  constructor(
    router: Router,
    public service: LivroServiceService,
    private _Activatedroute: ActivatedRoute
    )
    {
      this.router = router;
      router.navigate(["/client-home"])
    }
    router: Router;

    isHomePage(): boolean{
    return this.router.url.toString().includes("client");
  }
}
