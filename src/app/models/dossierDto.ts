import { DossierStatus, DossierType } from "./enums";
import { FileDto } from "./fileDto";

export class DossierDto {

  constructor() {
    this.photo = null;
    this.dossierFiles = null;
  }

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
  public type!: DossierType;

  photo: FileDto | null;
  dossierFiles: FileDto[] | null;
}
