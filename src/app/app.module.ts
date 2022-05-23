import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TheNavBarModule } from './layout/the-nav-bar/the-nav-bar.module';
import { TheFooterModule } from './layout/the-footer/the-footer.module';
import { EnvServiceProvider } from './shared/providers/env.service.provider';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    TheNavBarModule,
    TheFooterModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
