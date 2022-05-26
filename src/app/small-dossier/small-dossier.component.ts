import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-small-dossier',
  templateUrl: './small-dossier.component.html',
  styleUrls: ['./small-dossier.component.scss']
})
export class SmallDossierComponent implements OnInit {


  public info: DossierInfoSmall[] = [
    {
      img: 'assets/images/1.png',
      fullName: 'ПІБ',
      position: 'Посада',
      placeOfWork: 'Місце роботи',
      text: 'Текст, що викриває особу, підозрювану у корупції',
      date: new Date,
      status: 'Не спростовано',
    },
    {
      img: 'assets/images/1.png',
      fullName: 'ПІБ',
      position: 'Посада',
      placeOfWork: 'Місце роботи',
      text: 'Текст, що викриває особу, підозрювану у корупції',
      date: new Date,
      status: 'Не спростовано',
    },
    {
      img: 'assets/images/1.png',
      fullName: 'ПІБ',
      position: 'Посада',
      placeOfWork: 'Місце роботи',
      text: 'Текст, що викриває особу, підозрювану у корупції',
      date: new Date,
      status: 'Не спростовано',
    }
  ]

  constructor() {

  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

}

export class DossierInfoSmall {
  public img: string = '';
  public fullName: string = ''
  public position: string = '';
  public placeOfWork: string = '';
  public text: string = '';
  public date: any = '';
  public status: string = '';
}
