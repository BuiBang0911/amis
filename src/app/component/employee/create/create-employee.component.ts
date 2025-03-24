import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { EmployeeResponse } from "../../../interface/employeeResponse.interface";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../../services/api.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { ConfirmDialogComponent } from "../../common/confirm-dialog/confirm-dialog.component";
import { WarningModalComponent } from "../../common/warning-modal/warning-modal.component";

@Component ({
    selector: 'create-employee',
    templateUrl: './create-employee.component.html',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule
    ]
})

export class CreateEmployeeComponent implements AfterViewInit{
    @ViewChild('createEmployeeModal', { static: false }) modalElement!: ElementRef<any>;

    isSubmit: boolean = false;
    messageError: string = "";


    constructor(private apiService: ApiService, private modalService: NgbModal) {}

    
    ngAfterViewInit(): void {
        if (this.modalElement?.nativeElement) {
            this.modalService.open(this.modalElement.nativeElement, { size: 'lg', centered: true });
            console.log(111111111111111111111111)
        }
    }
    
    employee: EmployeeResponse = {  
        id: 0,
        name: "",
        code: "",
        sex: "",
        birthday: null,
        identificationCard: "",
        position: "",
        accountNumber: "",
        bankName: "",
        bankBranch: "",
        email: "", 
        phoneNumber: "", 
        placeOfIssue: "", 
        landlineNumber: "", 
        dateOfIssue: null, 
        department: "", 
        address: ""
    };

    openModal() {
        if (!this.modalElement) {
            console.error("Modal element not found!");
            return;
        }
            this.modalService.open(this.modalElement, { size: 'lg', centered: true });
        // console.log(this._inputElement)

        // this._inputElement.nativeElement.focus();

    }

    ReloadForm() {
        this.employee.name= "";
        this.employee.code= "",
        this.employee.sex= "",
        this.employee.birthday = "",
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

    CloseModal() {
        this.modalService.dismissAll();
        this.ReloadForm();
    }

    SaveModal() {
        this.modalService.dismissAll();
    }

    onSubmit(form: any): void {
        console.log(this.employee);
        this.apiService.isExistCode(this.employee.code).subscribe({
            next: (response) => {
                if(response == true) {
                    this.messageError = `Mã nhân viên <${this.employee.code}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại`
                    var modalWarning = this.modalService.open(WarningModalComponent);
                    modalWarning.componentInstance.message = this.messageError;
                } else {
                    if (form.invalid) {
                        console.log('invalid form');
                        this.isSubmit = true;
                        return;
                    }
                    var modalRef = this.modalService.open(ConfirmDialogComponent);
                    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn thêm?';
                    modalRef.result.then(
                        (result) => {
                            if(result === 'confirm') {
                                this.apiService.CreateEmployee(this.employee).subscribe({
                                    next: (response) => {
                                        this.CloseModal();
                                        //this.messageError = '';
                                        console.log('Tạo thành công:', response);
                                    },
                                    error: (err) => {
                                        console.error('Lỗi khi tạo:', err);
                                        // this.messageError = err.error.message;
                                        
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
        })
        
    }
}