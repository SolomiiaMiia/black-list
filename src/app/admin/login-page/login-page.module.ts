import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule} from '@angular/forms';

import { LoginPageComponent } from './login-page.component';




@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LoginPageComponent}]),
    ReactiveFormsModule,
  
  ],
  exports:
  [

  ]
})
export class LoginPageModule { }
