export interface EmployeeResponse {
    id: number,
    name: string,
    code: string,
    sex?: string,
    birthday: string | null ,
    identificationCard?: string,
    position: string,
    accountNumber?: string,
    bankName?: string,
    bankBranch?: string,
    email?: string, 
    phoneNumber?: string, 
    placeOfIssue?: string, 
    landlineNumber?: string, 
    dateOfIssue?: string | null, 
    department?: string, 
    address?: string
}

export interface ApiResponse {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    data: EmployeeResponse[];
  }