import { Component, OnInit } from '@angular/core';
import { routingAnimation } from '../shared/animations/routing-animation';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
