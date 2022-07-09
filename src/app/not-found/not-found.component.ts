import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routingAnimation } from '../shared/animations/routing-animation';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class NotFoundComponent {

  public message?: string;
  constructor(private router: Router  ) {

    const navigation = this.router.getCurrentNavigation()!;
    const state = navigation.extras.state as {
      message?: string
    };

    this.message = state?.message;

  }

}
