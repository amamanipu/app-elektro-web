import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private readonly http: HttpClient
  ) { }

  
  __be_insert_contact(data: any) {
    return this.http.post<any>(`${environment.apiNetFashion}/api/contact/insert`, data);
  }

}
