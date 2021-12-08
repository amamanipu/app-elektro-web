import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private readonly http: HttpClient
  ) { }

  __be_insert(data: any) {
    return this.http.post<any>(`${environment.apiAWSFashion}/tablageneral`, data);
  }

  __be_get_table_general(params: any) {
    return this.http.get(`${environment.apiAWSFashion}/tablageneral`, { params });
  }
}
