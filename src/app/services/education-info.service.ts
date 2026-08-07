import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EducationInfo } from '../models/educationInfo';

@Injectable({
  providedIn: 'root'
})
export class EducationInfoService {

  private baseUrl = 'http://localhost:8081/api/edu';

  constructor(private httpClient: HttpClient) { }

  createEduInfo(eduInfo: EducationInfo): Observable<EducationInfo> {
    return this.httpClient.post<EducationInfo>(this.baseUrl, eduInfo);
  }

  getAllEducation(): Observable<EducationInfo[]> {
    return this.httpClient.get<EducationInfo[]>(this.baseUrl);
  }

  updateEducationInfo(rid: number, educationInfo: EducationInfo): Observable<EducationInfo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<EducationInfo>(`${this.baseUrl}/${rid}`, educationInfo, { headers });
  }
  
  deleteEducationInfo(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
