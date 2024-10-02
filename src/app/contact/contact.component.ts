import { Component, OnInit } from '@angular/core';
import { routingAnimation } from '../shared/animations/routing-animation';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class ContactComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Контакти | BLACKLIST.UA");
  }

}
