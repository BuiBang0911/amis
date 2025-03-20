import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { EmployeeResponse } from "../../../interface/employeeResponse.interface";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../../services/api.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component ({
    selector: 'update-employee',
    templateUrl: './update-employee.component.html',
    standalone: true,
    imports: [
        FormsModule
    ]
})

export class UpdateEmployeeComponent implements AfterViewInit{
    @ViewChild('updateEmployeeModal', { static: false }) modalElement!: ElementRef<any>;
    @Input() employee!: any;

    constructor(private apiService: ApiService, private modalService: NgbModal) {}
    
    ngAfterViewInit(): void {
        if (this.modalElement?.nativeElement) {
            this.modalService.open(this.modalElement.nativeElement, { size: 'lg', centered: true });
          } else {
            console.error("Modal element not found!");
          }
    }
    
    // employee: EmployeeResponse = {  
    //     id: 0,
    //     name: "",
    //     code: "",
    //     sex: "", 
    //     birthday: "",
    //     identificationCard: "",
    //     position: "",
    //     accountNumber: "",
    //     bankName: "",
    //     bankBranch: "",
    //     email: "", 
    //     phoneNumber: "", 
    //     placeOfIssue: "", 
    //     landlineNumber: "", 
    //     dateOfIssue: "", 
    //     department: "", 
    //     address: ""
    // };

    openModal() {
        if (!this.modalElement) {
            console.error("Modal element not found!");
            return;
        }
        //console.log(this.employee)
        this.modalService.open(this.modalElement, { size: 'lg', centered: true });
    }

    CloseModal() {
        console.log(888)
        this.modalService.dismissAll();
    }

    SaveModal() {
        this.modalService.dismissAll();
    }

    onSubmit(): void {
        this.apiService.UpdateEmployee(this.employee.id, this.employee).subscribe({
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