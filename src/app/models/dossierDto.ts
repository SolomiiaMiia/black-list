import { DossierStatus } from "./enums";

export class DossierDto {
  public id: number = 0;
  public img: string = '';
  public lastName: string = '';
  public firstName: string = ''
  public thirdName: string = ''
  public position: string = '';
  public placeOfWork: string = '';
  public address: string = '';
  public date: Date = new Date();
  public status!: DossierStatus;
  public text: string = '';
  public isAnonymous: boolean = false;
  public author: string = ''
  public phone: string = ''
  public email: string = ''
}
