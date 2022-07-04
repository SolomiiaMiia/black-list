import { Component, OnInit } from '@angular/core';
import { routingAnimation } from '../shared/animations/routing-animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
