import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
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
