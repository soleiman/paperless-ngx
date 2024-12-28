import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err))

// Add this code to conditionally load RTL styles
const locale = document.documentElement.lang;
if (locale === 'ar' || locale === 'he' || locale === 'fa' || locale === 'fa-IR' || locale === 'fa-ir') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'rtl-styles.css';
  document.head.appendChild(link);
}
