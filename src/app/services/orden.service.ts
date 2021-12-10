import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private readonly http: HttpClient) { }

  __be_insert(data: any, headers: any) {
    return this.http.post<any>(`${environment.apiNetFashion}/api/orden/insert`, data, { headers });
  }
}
