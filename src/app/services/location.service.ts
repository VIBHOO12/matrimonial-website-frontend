import { Injectable } from '@angular/core';
import { Location } from '../models/location';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl = 'http://localhost:8081/api/location'; 


  constructor(private httpClient: HttpClient) { }

  saveLocation(Location: Location): Observable<Location> {
    return this.httpClient.post<Location>(this.baseUrl, Location);
  }

  getLocationById(id: number): Observable<Location> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Location>(url);
  }

  getAllLocation(): Observable<Location[]> {
    return this.httpClient.get<Location[]>('http://localhost:8081/api/location/all');
  }
 /* getAllReply(email: string): Observable<Reply[]> {
    const url = `${this.baseUrl1}/get/${email}`;
    return this.http.get<Reply[]>(url);
  }
*/


  updateLocation(id: number, Location: Location): Observable<Location> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.put<Location>(url, Location);
  }

  deleteLocation(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
