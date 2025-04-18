import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  private apiURL = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  
  getAPI(endPoint:any): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiURL}${endPoint}`);
  }
}
