import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CreateDisproveDossierPageDto } from '../models/createDisproveDossierPageDto';
import { APIService } from '../shared/services/api.service'
import { serialize } from 'object-to-formdata';
import { routingAnimation } from '../shared/animations/routing-animation';

@Component({
  templateUrl: './disprove-dossier-page.component.html',
  styleUrls: ['./disprove-dossier-page.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class DisproveDossierPageComponent implements OnInit {

  @Input() public dossierForm: FormGroup = new FormGroup({});

  public id: number;
  public submitted: boolean = false;
  public hasFileSizeError:boolean = false;
  private attachtments: File[] = [];

  constructor(private fb: FormBuilder,
    private apiService: APIService,
    private route: ActivatedRoute,
    private router: Router) {
    this.id = Number(this.route.snapshot.parent?.url.filter(v => !isNaN(Number(v.path)))[0].path);
  }

  ngOnInit(): void {
    this.createForm();
  }


  private createForm() {
    this.dossierForm = this.fb.group({
      attachtments: this.fb.control('', { validators: [Validators.required] }), //can be multiple attachtments
      text: this.fb.control('', { validators: [Validators.required] }),
      author: this.fb.control('', { validators: [Validators.required] }),
      phone: this.fb.control('', { validators: Validators.pattern(new RegExp('^\\+?3?8?(0[5-9][0-9]\\d{7})$')) }),
      email: this.fb.control('', { validators: [Validators.email] }),
      agreeForData: this.fb.control('', { validators: [Validators.required] })
    });

    this.dossierForm.get('agreeForData')?.setValue(false);
  }

  onFileChange(event: any) {
      this.attachtments = [];
      for (var i = 0; i < event.target.files.length; i++) {
        if(event.target.files[i].size > 1024 * 1024 * 10){
          this.hasFileSizeError = true;
        }
        else{
          this.attachtments.push(event.target.files[i]);
          this.hasFileSizeError = false;
        }
      }
  }

  canSubmit(): boolean {
    return this.dossierForm.get('agreeForData')?.value == true;
  }

  public submit() {

    this.submitted = true;


    if (this.dossierForm.valid && !this.hasFileSizeError) {
      let dto = <CreateDisproveDossierPageDto>this.dossierForm.value;


      const formData = serialize(
        dto
      );

      formData.delete('attachtments');
      Array.from(this.attachtments).map((file) => {
        return formData.append('attachtments', file, file.name);
      });

      formData.delete('agreeForData');

      this.apiService.addDisproveDossier(this.id, formData).subscribe(id => {

        const navigationExtras: NavigationExtras = {
          state: {
            isNew: false,
            id: id
          }
        };

        this.router.navigate(['/add-dossier/complete'], navigationExtras);
      });

    }

  }

}
