import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactInfo } from '../models/contactInfo';
import { Observable } from 'rxjs';
import { Reply } from '../models/reply';

@Injectable({
  providedIn: 'root'
})
export class ContactinfoService {

  private baseUrl = 'http://localhost:8081/api/contact';
  private apiUrl1 = 'http://localhost:8081/reply/';
  constructor(private httpClient: HttpClient) {}

  createContact(contact: ContactInfo): Observable<ContactInfo> {
    return this.httpClient.post<ContactInfo>(this.baseUrl, contact);
  }

  saveReply(reply: Reply): Observable<Reply> {
    return this.httpClient.post<Reply>(this.apiUrl1, reply);
  }
  getAllContacts(): Observable<ContactInfo[]> {
    return this.httpClient.get<ContactInfo[]>(this.baseUrl);
  }

  getContactById(id: number): Observable<ContactInfo> {
    return this.httpClient.get<ContactInfo>(`${this.baseUrl}/${id}`);
  }

  updateContact(id: number, contact: ContactInfo): Observable<ContactInfo> {
    return this.httpClient.put<ContactInfo>(`${this.baseUrl}/${id}`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }
}
