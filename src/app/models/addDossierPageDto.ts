export class AddDossierPageDto {
  lastName: string = '';
  firstName: string = '';
  thirdName: string = '';
  position: string = '';
  placeOfWork: string = '';
  address: string = '';
  region: string = '';
  locality: string = '';
  phone: string = '';
  email: string = '';
  text: string = '';
  author: string = '';
  isAnonymous: boolean = false;
  authorPhoto: any;
  attachtments: any;
  tags: string | null = '';
  relatedDossiers: number[] | undefined;
}

