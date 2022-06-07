import { DossierStatus, DossierType } from "./enums";
import { FileDto } from "./fileDto";

export class DossierSmallDto {
  constructor() {
    this.photo = null;
  }

  public id: number = 0;
  public photo: FileDto | null;
  public fullName: string = ''
  public position: string = '';
  public placeOfWork: string = '';
  public address: string = '';
  public date: Date = new Date();
  public status!: DossierStatus;
  public type!: DossierType;
}
