import { Component, DoCheck, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { CommonModule } from "@angular/common";
import { ApiResponse, EmployeeResponse } from "../../../interface/employeeResponse.interface";
import { CreateEmployeeComponent } from "../create/create-employee.component";
import { NgbDropdownModule, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UtilsService } from "../../../utils/utils.service";
import { UpdateEmployeeComponent } from "../update-employee/update-employee.component";

@Component({
    selector:'app-employee',
    templateUrl:'./app-employee.component.html',
    standalone: true,
    imports: [
        CommonModule,
        CreateEmployeeComponent,
        UpdateEmployeeComponent,
        NgbDropdownModule,
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
              console.log(this.pageArray); // Log dữ liệu để kiểm tra
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
      this.fetchData();
  }

  nextPageNumber(): void {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.fetchData()
    }
  }

  prePageNumber(): void {
    if(this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchData();
    }
      
  }

  nextToPageNumber(idx: number): void {
    this.pageNumber = idx;
    this.fetchData();
    console.log(this.pageNumber)
  }

  Duplicate(id: number): void {
    this.apiService.DuplicateEmployee(id).subscribe({
      next: (response) => {
          console.log('Tạo thành công:', response);
          this.fetchData();
      },
        error: (error) => {
        console.error('Lỗi khi tạo:', error);
      }
    });
    
  }

  Delete(id: number): void {
    this.apiService.DeleteEmployee(id).subscribe({
      next: (response) => {
        console.log('Tạo thành công:', response);
        this.fetchData();
      },
        error: (error) => {
        console.error('Lỗi khi tạo:', error);
      }
    });
  }
}