import { Routes } from '@angular/router';
import { AppEmployeeComponent } from './component/employee/getAll/app-employee.component';
import { AppAboutComponent } from './component/about/app-about.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: AppEmployeeComponent},
    { path: 'employee', component: AppEmployeeComponent },
    { path: 'about', component: AppAboutComponent }
];
