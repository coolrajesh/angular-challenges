import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { loaderInterceptor } from './interceptor/loader.interceptor'; // Import the loader interceptor

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([loaderInterceptor])), // HTTP client with interceptors
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ]
};
