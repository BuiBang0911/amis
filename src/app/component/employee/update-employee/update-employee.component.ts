import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { EmployeeResponse } from "../../../interface/employeeResponse.interface";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../../services/api.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { ConfirmDialogComponent } from "../../common/confirm-dialog/confirm-dialog.component";

@Component ({
    selector: 'update-employee',
    templateUrl: './update-employee.component.html',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule
    ]
})

export class UpdateEmployeeComponent implements AfterViewInit{
    @ViewChild('updateEmployeeModal', { static: false }) modalElement!: ElementRef<any>;
    @Input() employee!: any;
    @ViewChild('codeInputElement', { static: false })
    set codeInputElement(element: ElementRef<HTMLInputElement>) {
        if(element) {
          element.nativeElement.focus()
        }
     }

    isSubmit: boolean = false;

    constructor(private apiService: ApiService, private modalService: NgbModal) {}
    
    ngAfterViewInit(): void {
        if (this.modalElement?.nativeElement) {
            console.log(this.employee.birthday);
            this.modalService.open(this.modalElement.nativeElement, { size: 'lg', centered: true });
          }
    }


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

    onSubmit(form: any): void {
        if (form.invalid) {
            console.log('invalid form');
            this.isSubmit = true;
            return;
        }
        var modalRef = this.modalService.open(ConfirmDialogComponent);
        modalRef.componentInstance.message = 'Bạn có chắc chắn muốn sửa?';
        modalRef.result.then(
            (result) => {
                if(result === 'confirm') {
                    this.apiService.UpdateEmployee(this.employee.id, this.employee).subscribe({
                        next: (response) => {
                            this.SaveModal();
                            console.log('Tạo thành công:', response);
                        },
                        error: (error) => {
                        console.error('Lỗi khi tạo:', error);
                        }
                    });
                    this.isSubmit = false;
                }
            },
            (reason) => {
                console.log('Hủy bỏ', reason);
            }
        )
    }
}