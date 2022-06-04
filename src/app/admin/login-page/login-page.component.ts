import { Component, OnInit, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';
import { APIService } from '../../shared/services/api.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  @Input() public loginForm: FormGroup = new FormGroup({});

  public submitted: boolean = false;

  constructor(private fb: FormBuilder,
    private apiService: APIService,
    private adminService: AdminService,
    @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.createForm();
  }


  private createForm() {
    this.loginForm = this.fb.group({
      username: this.fb.control('', { validators: [Validators.required] }),
      password: this.fb.control('', { validators: [Validators.required] }),
    });
  }

  public submit() {

    this.submitted = true;


    if (this.loginForm.valid) {

      let dto = this.loginForm.value;

      console.log(dto);

      this.apiService.login(dto.username, dto.password).subscribe(res => {
        this.adminService.grantAccess(res);
        this.document.location.replace(this.document.location.origin + '/admin/manage');  
      });

    }

  }

}
