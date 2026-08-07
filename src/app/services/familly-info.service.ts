import { Injectable } from '@angular/core';
import { FamilyInfo } from '../models/familyInfo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FamillyInfoService {
  rid: number | undefined;
  
  private baseUrl = 'http://localhost:8081/api/family';

  constructor(private httpClient: HttpClient) { }

  createFamilyInfo(familyInfo: FamilyInfo): Observable<FamilyInfo> {
    return this.httpClient.post<FamilyInfo>(this.baseUrl, familyInfo);
  }

  getFamilyInfoById(id: number): Observable<FamilyInfo> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<FamilyInfo>(url);
  }

  getAllFamily(): Observable<FamilyInfo[]> {
    return this.httpClient.get<FamilyInfo[]>(this.baseUrl);
  }

  updateFamilyInfo(id: number, familyInfo: FamilyInfo): Observable<FamilyInfo> {
    return this.httpClient.put<FamilyInfo>(`${this.baseUrl}/${id}`, familyInfo);
  }
 
  // Method to delete user info
  deleteFamilyInfo(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
