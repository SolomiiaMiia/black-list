import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TheNavBarModule } from './layout/the-nav-bar/the-nav-bar.module';
import { TheFooterModule } from './layout/the-footer/the-footer.module';
import { EnvServiceProvider } from './shared/providers/env.service.provider';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { NotifierModule } from 'angular-notifier';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { TagInputModule } from 'ngx-chips';
import { Settings } from './shared/settings/settings';

TagInputModule.withDefaults(Settings.TagsSettings());



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
    HttpClientModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    TagInputModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
        },
        vertical: {
          position: 'top',
          distance: 80
        }
      },
      behaviour: { autoHide: 3000, onClick: 'hide', showDismissButton: false }
    })
  ],
  providers: [EnvServiceProvider,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
