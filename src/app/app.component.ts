import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppEmployeeComponent } from './component/employee/getAll/app-employee.component';
import { LeftSidebarComponent } from './component/leftsidebar/left-sidebar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    AppEmployeeComponent,
    LeftSidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'four-angular';
}
