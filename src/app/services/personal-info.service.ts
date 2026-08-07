import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PersonalInfo } from '../models/personalInfo';
@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  rid: number | undefined;
  
  private baseUrl = 'http://localhost:8081/api';

  constructor(private httpClient: HttpClient) { }

  // Updated to accept FormData
  createPersonalInfo(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, formData);
  }

  getPhoto(personalInfoId: number): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/${personalInfoId}/photo`, { responseType: 'blob' });
  }

  // Method to get all personal information
  getAllPersonalInfo(): Observable<PersonalInfo[]> {
    return this.httpClient.get<PersonalInfo[]>(this.baseUrl);
  }

  updatePersonalInfo(id: number, formData: FormData): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, formData);
  }
 
}
