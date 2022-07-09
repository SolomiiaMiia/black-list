import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { serialize } from 'object-to-formdata';
import { routingAnimation } from 'src/app/shared/animations/routing-animation';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { AdminSettingsDto } from '../../models/adminSettingsDto';
import { FileDto } from '../../models/fileDto';
import { AdminService } from '../../shared/services/admin.service';
import { APIService } from '../../shared/services/api.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class SettingsPageComponent implements OnInit {

  @Input() public settingsForm: FormGroup = new FormGroup({});

  public submitted: boolean = false;
  private attachtments: File[] = [];
  public pictures: FileDto[] | null;

  constructor(private fb: FormBuilder,
    private apiService: APIService,
    private adminService: AdminService,
    private infoMess: NotifyService) {
    this.pictures = null;
  }

  ngOnInit(): void {
    this.createForm();
  }


  private createForm() {
    this.settingsForm = this.fb.group({
      videoLink: this.fb.control('',),
      newDossierText: this.fb.control('', { validators: [Validators.required] }),
      disproveDossierText: this.fb.control('', { validators: [Validators.required] }),
      attachtments: this.fb.control('', {  }), //can be multiple attachtments
    });

    this.adminService.loadSettings((response) => { this.setSettings(response); });


  }

  private setSettings(settings: AdminSettingsDto) {
    this.settingsForm.get("videoLink")?.setValue(settings.videoLink);
    this.settingsForm.get("newDossierText")?.setValue(settings.newDossierText);
    this.settingsForm.get("disproveDossierText")?.setValue(settings.disproveDossierText);
    this.pictures = settings.pictures;
  }

  onFileChange(event: any,) {
    this.attachtments = [];
    for (var i = 0; i < event.target.files.length; i++) {
      this.attachtments.push(event.target.files[i]);
    }
  }


  public submit() {

    this.submitted = true;

    if (this.settingsForm.valid) {

      let dto = this.settingsForm.value as AdminSettingsDto;

      const formData = serialize(
        dto
      );

      formData.delete('attachtments');
      Array.from(this.attachtments).map((file) => {
        return formData.append('attachtments', file, file.name);
      });

      if (confirm('Зберегти зміни?')) {
        this.apiService.saveSettings(formData).subscribe(response => {
          this.adminService.saveSettings(response);
          this.pictures = [];
          this.pictures = response.pictures;
          this.infoMess.info('Збережено')
        });
      }
    }
  }

}
