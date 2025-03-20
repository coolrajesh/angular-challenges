import { Routes } from '@angular/router';
import { ReactiveFormValidationComponent } from './pages/reactive-form-validation/reactive-form-validation.component';
import { FetchApiDataComponent } from './pages/fetch-api-data/fetch-api-data.component';
import { ComponentCommunicationComponent } from './pages/component-communication/component-communication.component';
import { DynamicTableComponent } from './pages/dynamic-table/dynamic-table.component';
import { LazyLoadingComponent } from './pages/lazy-loading/lazy-loading.component';
import { RxjsObservablesComponent } from './pages/rxjs-observables/rxjs-observables.component';
import { CustomDirectivesComponent } from './pages/custom-directives/custom-directives.component';
import { TemplateFormValidationComponent } from './pages/template-form-validation/template-form-validation.component';
import { PipesComponent } from './pages/pipes/pipes.component';
import { StateManagementComponent } from './pages/state-management/state-management.component';
import { DynamicFormHandlingComponent } from './pages/dynamic-form-handling/dynamic-form-handling.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';

export const routes: Routes = [
    //{ path: '', component: ReactiveFormValidationComponent },
    { path: 'reactive-form-validation', component: ReactiveFormValidationComponent },
    { path: 'dynamic-form-handling', component: DynamicFormHandlingComponent },
    { path: 'todo-list-with-filtering-persistence', component: TodoListComponent },
    { path: 'fetch-api-data', component: FetchApiDataComponent },
    { path: 'component-communication', component: ComponentCommunicationComponent },
    { path: 'dynamic-table', component: DynamicTableComponent },
    { path: 'lazy-loading', component: LazyLoadingComponent },
    { path: 'rxjs-observables', component: RxjsObservablesComponent },
    { path: 'custom-directives', component: CustomDirectivesComponent },
    { path: 'template-form-validation', component: TemplateFormValidationComponent },
    { path: 'pipes', component: PipesComponent },
    { path: 'state-management', component: StateManagementComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect unknown paths to Home

];
