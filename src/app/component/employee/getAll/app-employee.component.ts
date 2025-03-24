import { Component, DoCheck, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { CommonModule } from "@angular/common";
import { ApiResponse, EmployeeResponse } from "../../../interface/employeeResponse.interface";
import { CreateEmployeeComponent } from "../create/create-employee.component";
import { NgbDropdownModule, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UtilsService } from "../../../utils/utils.service";
import { UpdateEmployeeComponent } from "../update-employee/update-employee.component";
import { ConfirmDialogComponent } from "../../common/confirm-dialog/confirm-dialog.component";
import { FormsModule } from "@angular/forms";

@Component({
    selector:'app-employee',
    templateUrl:'./app-employee.component.html',
    standalone: true,
    imports: [
        CommonModule,
        CreateEmployeeComponent,
        UpdateEmployeeComponent,
        NgbDropdownModule,
        FormsModule
    ]

})

export class AppEmployeeComponent implements OnInit{
    @ViewChild('createEmployee') createEmployeeComponent!: CreateEmployeeComponent;
    @ViewChild('updateEmployee') updateEmployeeComponent!: UpdateEmployeeComponent;

    
    
    response: ApiResponse | null = null;
    employees: EmployeeResponse[] = [];
    currentEmployee!: EmployeeResponse;
    pageArray: number[] = [];


    pageNumber = 1;
    pageSize = 10;
    totalRecords = 1;
    totalPages = 1;
    searchQuery: string = '';


    constructor(private apiService: ApiService, private utilsService: UtilsService, private modalService: NgbModal) {
    }

    fetchData(): void {
        this.apiService.GetEmployees(this.pageSize, this.pageNumber).subscribe({
            next: (res: ApiResponse) => {
              this.response = res;  
              this.employees = res.data;
              this.totalPages = res.totalPages;
              this.totalRecords = res.totalRecords;
              this.pageArray = this.utilsService.createRangeArray(1, this.totalPages);
            },
            error: (err) => {
              console.error('Có lỗi khi gọi API:', err); // Xử lý lỗi
            }
          });
    }



  ngOnInit(): void {
    this.fetchData();
  }

  openCreateEmployeeModal(): void {
    console.log(this.createEmployeeComponent);

    this.createEmployeeComponent.openModal();
  }

  openUpdateEmployeeModal(employee: any): void {
    console.log(this.updateEmployeeComponent);
    this.currentEmployee = employee;
    console.log(this.currentEmployee  )
    this.updateEmployeeComponent.openModal();
  }


  setPageSize(pz: number): void {
      this.pageSize = pz;
      this.pageNumber = 1;
      console.log(this.pageSize)
      this.Search();
  }

  nextPageNumber(): void {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.Search()
    }
  }

  prePageNumber(): void {
    if(this.pageNumber > 1) {
      this.pageNumber--;
      this.Search();
    }
      
  }

  nextToPageNumber(idx: number): void {
    this.pageNumber = idx;
    this.Search();
    console.log(this.pageNumber)
  }

  Duplicate(id: number): void {
    this.apiService.DuplicateEmployee(id).subscribe({
      next: (response) => {
          console.log('Tạo thành công:', response);
          this.Search();
      },
        error: (error) => {
        console.error('Lỗi khi tạo:', error);
      }
    });
    
  }

  Delete(id: number): void {
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa?'; // Truyền thông báo tùy chỉnh
    console.log(modalRef);
    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          console.log('Xác nhận xóa');
          this.apiService.DeleteEmployee(id).subscribe({
            next: (response) => {
              console.log('Tạo thành công:', response);
              this.Search();
            },
              error: (error) => {
              console.error('Lỗi khi tạo:', error);
            }
          });
        }
      },
      (reason) => {
        console.log('Hủy bỏ', reason);
      }
    );

  }

  Search() {
    this.apiService.SearchEmployees(this.searchQuery, this.pageSize, this.pageNumber).subscribe({
      next: (res) => {
        this.response = res;  
        this.employees = res.data;
        this.totalPages = res.totalPages;
        this.totalRecords = res.totalRecords;
        this.pageArray = this.utilsService.createRangeArray(1, this.totalPages);
        console.log(res); // Log dữ liệu để kiểm tra
      },
      error: (err) => {
        console.error('Có lỗi khi gọi API:', err); // Xử lý lỗi
      }
    });
  }

  onSearch() {
    this.pageNumber = 1;
    this.Search();
  }
}