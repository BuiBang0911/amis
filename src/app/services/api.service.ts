import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, EmployeeResponse } from '../interface/employeeResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrlBase = 'https://localhost:7145/api'; // URL API của bạn

  constructor(private http: HttpClient) { }

  GetEmployees(pageSize: number, pageNumber: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrlBase}/Employee?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  }

  CreateEmployee(data: EmployeeResponse): Observable<any> {
    console.log(data)
    return this.http.post<any>(`${this.apiUrlBase}/Employee`, data);
  }

  DuplicateEmployee(id: number): Observable<any> {
    console.log(`${this.apiUrlBase}/Employee/${id}`)
    return this.http.post<any>(`${this.apiUrlBase}/Employee/${id}`, id);
  }

  DeleteEmployee(id: number): Observable<any> {
    console.log(id)
    return this.http.delete<any>(`${this.apiUrlBase}/Employee/${id}`);
  } 

  UpdateEmployee(id: number, data: EmployeeResponse): Observable<any> {
    console.log(data);
    return this.http.put<any>(`${this.apiUrlBase}/Employee/${id}`, data)
  }

  SearchEmployees(query: string, pageSize: number, pageNumber: number): Observable<any> {
    console.log(`${this.apiUrlBase}/Employee/search?code=${query}&PageNumber=${pageNumber}&PageSize=${pageSize}`)
    return this.http.get<any>(`${this.apiUrlBase}/Employee/search?code=${query}&PageNumber=${pageNumber}&PageSize=${pageSize}`);
  }

  isExistCode(code: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlBase}/Employee/isExistCode/${code}`);
  }
}