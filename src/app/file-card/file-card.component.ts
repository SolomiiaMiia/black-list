import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent implements OnInit {

public files:Files[] = [
  { 
    header: 'Header',
    title: 'Title',
    description: 'Some quick example text to build on the card title and make up the bulk of the cards content.'
  }
]


  constructor() { }

  ngOnInit(): void {
  }


}

export class Files {
  public header: string = ''
  public title: string = '';
  public description: string = '';
}
