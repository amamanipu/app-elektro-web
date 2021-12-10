import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private readonly http: HttpClient
  ) { }

  __be_upload(file: Blob): Observable<HttpEvent<void>>{
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${environment.apiNetFashion}/api/file/upload`, formData, {
      reportProgress: true
    });
  }
}
