import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationInfo } from '../models/registrationInfo';
@Injectable({
  providedIn: 'root'
})
export class RegistrationInfoService {
  private rid!:number;
  private userName!:string | null;

  private rData: any;

  setrid(id:number){
    this.rid = id;
  }

  getrid(){
    return this.rid;
  }
  private baseUrl = 'http://localhost:8081/api/rege';
  constructor(private httpClient: HttpClient) { }

  createRegistration(register: RegistrationInfo): Observable<RegistrationInfo> {
    return this.httpClient.post<RegistrationInfo>(this.baseUrl, register);
  }

  getRegistrationById(id: number): Observable<RegistrationInfo> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.httpClient.get<RegistrationInfo>(url);
  }

  getAllRegistrations(): Observable<RegistrationInfo[]> {
    return this.httpClient.get<RegistrationInfo[]>(this.baseUrl);
  }

  findByUserName(userName: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/username/${userName}`);
  }

  findByEmail(email: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/email/${email}`);
  }

  updateRegistration(id: number, updatedInfo: RegistrationInfo): Observable<RegistrationInfo> {
    return this.httpClient.put<RegistrationInfo>(`${this.baseUrl}/${id}`, updatedInfo);
  }
  
  deleteUser(rid: number): Observable<any>{
    return this.httpClient.delete(`${this.baseUrl}/${rid}`)
  }

}
