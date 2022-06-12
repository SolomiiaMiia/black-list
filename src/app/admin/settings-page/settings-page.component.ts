import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { AdminSettingsDto } from '../../models/adminSettingsDto';
import { AdminService } from '../../shared/services/admin.service';
import { APIService } from '../../shared/services/api.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  @Input() public settingsForm: FormGroup = new FormGroup({});

  public submitted: boolean = false;

  constructor(private fb: FormBuilder,
    private apiService: APIService,
    private adminService: AdminService,
    private  infoMess: NotifyService) {
  }

  ngOnInit(): void {
    this.createForm();
  }


  private createForm() {
    this.settingsForm = this.fb.group({
      videoLink: this.fb.control('',),
      newDossierText: this.fb.control('', { validators: [Validators.required] }),
      disproveDossierText: this.fb.control('', { validators: [Validators.required] })
    });

    this.adminService.loadSettings((response) => { this.setSettings(response); });


  }

  private setSettings(settings: AdminSettingsDto) {
    this.settingsForm.get("videoLink")?.setValue(settings.videoLink);
    this.settingsForm.get("newDossierText")?.setValue(settings.newDossierText);
    this.settingsForm.get("disproveDossierText")?.setValue(settings.disproveDossierText);
  }


  public submit() {

    this.submitted = true;

    if (this.settingsForm.valid) {

      let dto = this.settingsForm.value as AdminSettingsDto;

      console.log(dto);

      this.apiService.saveSettings(dto).subscribe(res => {
        this.adminService.saveSettings(dto);
        if( confirm('Зберегти зміни?')){
          this.infoMess.info('Збережено')
        }
      });

    }

  }

}
