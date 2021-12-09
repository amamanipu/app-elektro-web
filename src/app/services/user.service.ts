import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient
  ) { }

  __be_login(data: any) {
    return this.http.post<any>(`${environment.apiNetFashion}/api/user/login`, data);
  }

  __be_insert(data: any, headers: any) {
    return this.http.post<any>(`${environment.apiNetFashion}/api/user/insert`, data, { headers });
  }

  __be_insert_client(data: any) {
    return this.http.post<any>(`${environment.apiNetFashion}/api/user/insertclient`, data);
  }

  __be_get_user(headers: any, params: any) {
    return this.http.get(`${environment.apiNetFashion}/api/user/getuser`, { headers, params });
  }

  __be_get_users(headers: any) {
    return this.http.get(`${environment.apiNetFashion}/api/user/getusers`, { headers });
  }
}
