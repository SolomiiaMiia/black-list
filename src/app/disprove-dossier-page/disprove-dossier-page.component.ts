import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DisproveDossierPageDto } from '../models/disproveDossierPageDto';
import { APIService } from '../shared/services/api.service'

@Component({
  templateUrl: './disprove-dossier-page.component.html',
  styleUrls: ['./disprove-dossier-page.component.scss']
})
export class DisproveDossierPageComponent implements OnInit {

  @Input() public dossierForm: FormGroup = new FormGroup({});

  public submitted: boolean = false;

  constructor(private fb: FormBuilder,
    private apiService: APIService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
  }


  private createForm() {
    this.dossierForm = this.fb.group({
      lastName: this.fb.control('', { validators: [Validators.required] }),
      firstName: this.fb.control('', { validators: [Validators.required] }),
      thirdName: this.fb.control('', { validators: [Validators.required] }),
      ipn: this.fb.control(''),
      fileText: this.fb.control('', { validators: [Validators.required] }), //can be multiple attachtments
      text: this.fb.control('', { validators: [Validators.required] }),
      author: this.fb.control('', { validators: [Validators.required] }),
      phone: this.fb.control('', { validators: Validators.pattern(new RegExp('^\\+?3?8?(0[5-9][0-9]\\d{7})$')) }),
      email: this.fb.control('', { validators: [Validators.email] }),
      agreeForData: this.fb.control('', { validators: [Validators.required] })
    });

    this.dossierForm.get('agreeForData')?.setValue(false);


  }

  canSubmit(): boolean {
    return this.dossierForm.get('agreeForData')?.value == true;
  }

  public submit() {

    this.submitted = true;


    if (this.dossierForm.valid) {

      const navigationExtras: NavigationExtras = {
        state: {
          isNew: false
        }
      };

      let dto = this.dossierForm.value as DisproveDossierPageDto;

      console.log(dto);

      this.apiService.disproveDossier(dto).subscribe(res => {
        this.router.navigate(['/add-dossier/complete'], navigationExtras);
      }, err => {
        this.router.navigate(['/add-dossier/complete'], navigationExtras);
      });

    }

  }

}
