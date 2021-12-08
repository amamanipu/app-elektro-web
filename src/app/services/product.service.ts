import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private readonly http: HttpClient
  ) { }

  __be_insert(data: any, headers: any) {
    return this.http.post<any>(`${environment.apiNetFashion}/api/product/insert`, data, { headers });
  }

  __be_get_products() {
    return this.http.get(`${environment.apiNetFashion}/api/product/getproducts`);
  }

  __be_get_product(params: any) {
    return this.http.get(`${environment.apiNetFashion}/api/product/getproduct`, { params });
  }

  __be_delete(headers: any, params: any) {
    return this.http.delete<any>(`${environment.apiNetFashion}/api/product/delete`, { headers, params });
  }

}
