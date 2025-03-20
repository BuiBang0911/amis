import { Component } from "@angular/core";
//import { AppEmployeeComponent } from "../employee/getAll/app-employee.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AppEmployeeComponent } from "../employee/getAll/app-employee.component";

@Component ({
    selector: 'left-sidebar',
    templateUrl: './left-sidebar.component.html',
    imports: [
        AppEmployeeComponent,
        RouterOutlet,
        RouterLink,
        RouterLinkActive
    ]
})

export class LeftSidebarComponent {}