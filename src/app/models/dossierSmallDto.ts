import { DossierStatus, DossierType } from "./enums";

export class DossierSmallDto {
  public id: number = 0;
  public img: string = '';
  public fullName: string = ''
  public position: string = '';
  public placeOfWork: string = '';
  public address: string = '';
  public date: Date = new Date();
  public status!: DossierStatus;
  public type!: DossierType;
  public hasDisprove: boolean = false;
}
