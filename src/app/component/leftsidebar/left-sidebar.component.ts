import { Component } from "@angular/core";
//import { AppEmployeeComponent } from "../employee/getAll/app-employee.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AppEmployeeComponent } from "../employee/getAll/app-employee.component";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";

@Component ({
    selector: 'left-sidebar',
    templateUrl: './left-sidebar.component.html',
    imports: [
        AppEmployeeComponent,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        NgbCollapseModule,
        CommonModule
    ]
})

export class LeftSidebarComponent {
    isCollapsed: boolean = false;

    setSidebarCollapsed() {
        this.isCollapsed = true; 
        console.log(this.isCollapsed)
    }
}