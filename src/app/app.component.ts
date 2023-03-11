import { Component } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { routingAnimation } from './shared/animations/routing-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class AppComponent {
  title = 'black-list';

  constructor(public loaderService: LoaderService) {
  }
  
}
