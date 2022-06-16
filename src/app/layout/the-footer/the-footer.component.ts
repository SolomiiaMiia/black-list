import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-the-footer',
  templateUrl: './the-footer.component.html',
  styleUrls: ['./the-footer.component.scss']
})
export class TheFooterComponent implements OnInit {

  public Year: number = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
