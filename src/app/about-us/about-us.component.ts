import { Component, OnInit } from '@angular/core';
import { routingAnimation } from '../shared/animations/routing-animation';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class AboutUsComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Про проєкт | BLACKLIST.UA");
  }

}
