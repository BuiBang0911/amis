import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { EmployeeResponse } from "../../../interface/employeeResponse.interface";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../../services/api.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component ({
    selector: 'create-employee',
    templateUrl: './create-employee.component.html',
    standalone: true,
    imports: [
        FormsModule
    ]
})

export class CreateEmployeeComponent implements AfterViewInit{
    @ViewChild('createEmployeeModal', { static: false }) modalElement!: ElementRef<any>;

    constructor(private apiService: ApiService, private modalService: NgbModal) {}
    
    ngAfterViewInit(): void {
        if (this.modalElement?.nativeElement) {
            this.modalService.open(this.modalElement.nativeElement, { size: 'lg', centered: true });
          } else {
            console.error("Modal element not found!");
          }
    }
    
    employee: EmployeeResponse = {  
        id: 0,
        name: "",
        code: "",
        sex: "",
        birthday: "",
        identificationCard: "",
        position: "",
        accountNumber: "",
        bankName: "",
        bankBranch: "",
        email: "", 
        phoneNumber: "", 
        placeOfIssue: "", 
        landlineNumber: "", 
        dateOfIssue: "", 
        department: "", 
        address: ""
    };

    openModal() {
        if (!this.modalElement) {
            console.error("Modal element not found!");
            return;
          }
          this.modalService.open(this.modalElement, { size: 'lg', centered: true });

    }

    CloseModal() {
        console.log(888)
        this.modalService.dismissAll();
        this.employee.name= "";
        this.employee.code= "",
        this.employee.sex= "",
        this.employee.birthday= "",
        this.employee.identificationCard= "",
        this.employee.position= "",
        this.employee.accountNumber= "",
        this.employee.bankName= "",
        this.employee.bankBranch= "",
        this.employee.email= "", 
        this.employee.phoneNumber= "", 
        this.employee.placeOfIssue= "", 
        this.employee.landlineNumber= "", 
        this.employee.dateOfIssue= "", 
        this.employee.department= "", 
        this.employee.address= ""
    }

    SaveModal() {
        this.modalService.dismissAll();
    }

    onSubmit(): void {
        this.apiService.CreateEmployee(this.employee).subscribe({
            next: (response) => {
                this.SaveModal();
                console.log('Tạo thành công:', response);
            },
            error: (error) => {
            console.error('Lỗi khi tạo:', error);
            }
        });
    }
}