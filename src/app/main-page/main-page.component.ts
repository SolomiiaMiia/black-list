import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  searchString: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  public create(): void{
    this.router.navigate(['/add-dossier']);
    
  }



}
