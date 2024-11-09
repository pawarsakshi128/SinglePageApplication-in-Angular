// people.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private apiUrl = 'http://localhost:4200/api';  // Replace with actual API endpoint

  constructor(private http: HttpClient) {}

  getPeople(): Observable<any> {
    return this.http.get(`${this.apiUrl}/people`);
  }

  getPersonById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/person/${id}`);
  }

  createPerson(person: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/person`, person);
  }

  updatePerson(id: string, person: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/person/${id}`, person);
  }

  deletePerson(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/person/${id}`);
  }
}
