import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullNameDossierDto } from '../models/fullNameDossierDto';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent implements OnInit {


  

public  dossierShort: FullNameDossierDto [] = [

  {
    id: 1,
    fullName: 'Садовий Андрій Іванович',
    date: new Date(),
  },
  {
    id: 2,
    fullName: 'Порошенко Петро Олексійович',
    date: new Date(),
  },
  {
    id: 3,
    fullName: 'Янукович Віктор Федорович',
    date: new Date(),
  }, 
  {
    id: 4,
    fullName: 'Тимошенко Юлія Володимирівна',
    date: new Date(),
  },
  {
    id: 4,
    fullName: 'Медведчук Віктор Володимирович',
    date: new Date(),
  },
]

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

}
