import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = 'http://localhost:8081/api/message'; 

  constructor(private httpClient: HttpClient) {}

  saveMessage(Message: Message): Observable<Message> {
    return this.httpClient.post<Message>(this.baseUrl, Message);
  }

  getMessageById(id: number): Observable<Message> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Message>(url);
  }

  getAllMessage(): Observable<Message[]> {
    return this.httpClient.get<Message[]>('http://localhost:8081/api/message/all');
  }
 /* getAllReply(email: string): Observable<Reply[]> {
    const url = `${this.baseUrl1}/get/${email}`;
    return this.http.get<Reply[]>(url);
  }
*/


  updateMessage(id: number, Message: Message): Observable<Message> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.put<Message>(url, Message);
  }

  deleteMessage(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
