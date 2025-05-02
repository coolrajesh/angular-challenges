import { Component,inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Required for *ngFor
import { Router, NavigationEnd } from '@angular/router';
import { LoaderService } from './services/loader.service'; // Import the loader service
import { LoaderComponent } from './loader/loader.component'; // Import the loader component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-challenges';
  challenges = [
    { name: 'Home', path: '/' },
    { name: 'Reactive Forms', path: '/reactive-form-validation' },
    { name: 'Dynamic Form Handling', path: 'dynamic-form-handling' },
    { name: 'Todo List with Filtering & Persistence', path:'todo-list-with-filtering-persistence'},
    { name: 'API Fetching', path: '/fetch-api-data' },
    { name: 'Crud', path: '/crud' },
    { name: 'Infinite Scroll', path: '/infinite-scroll' },
    { name: 'Drag & Drop', path: '/drag-drop' },
    { name: 'Dynamic Form Generation', path: '/dynamic-form-generation' },
    { name: 'Image Upload With Preview', path: '/image-uplaod-with-preview' },
    {name: 'Shopping Cart', path: '/product-list'}, // A
    { name: 'Component Comm.', path: '/component-communication' },
    { name: 'Dynamic Table', path: '/dynamic-table' },
    { name: 'Lazy Loading', path: '/lazy-loading' },
    { name: 'RxJS Observables', path: '/rxjs-observables' },
    { name: 'Custom Directives', path: '/custom-directives' },
    { name: 'Template Forms', path: '/template-form-validation' },
    { name: 'Pipes', path: '/pipes' },
    { name: 'State Mgmt.', path: '/state-management' }
  ];
  isHomePage = true;
  private loaderService = inject(LoaderService);
  isLoading$ = this.loaderService.loading$;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.onRouteChange();
      }
    });
  }
  onRouteChange() {    
    this.isHomePage = this.router.url === '/';   
  }
  
}
