import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (window['__env'] && window['__env']['production']) {
  enableProdMode();
  // check if window exists, if you render backend window will not be available 
  if (window) {
    window.console.log = function () { };
  }
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
