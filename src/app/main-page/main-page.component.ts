import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  searchString: string = '';

  constructor(private router: Router, public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.isLoading$;
    this.loaderService.setLoading(true);
  }


  public create(): void{
    this.router.navigate(['/add-dossier']);
    
  }



}
