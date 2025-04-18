import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  
  //GET API method to fetch data from the server
  getAPI(endPoint: any,page:number=1,limit:number=10): Observable<HttpResponse<any[]>> {    
    return this.http.get<any[]>(`${this.apiURL}${endPoint}?_page=${page}&_limit=${limit}`,{observe:'response'}).pipe(
      tap((data) => data),
      catchError((error) => {
        console.error('Error fetching posts:', error);
        return throwError(() => new Error('API fetch failed!'));
      })
    );
  }
 
  //POST API method to send data to the server

  postAPI(endPoint: any, data: any): Observable<HttpResponse<any[]>> {
    return this.http.post<any[]>(`${this.apiURL}${endPoint}`, data, { observe: 'response' }).pipe(
      tap((data) => data),
      catchError((error) => {
        console.error('Error posting data:', error);
        return throwError(() => new Error('API post failed!'));
      })
    );
  }
  
  //PUT API method to update data on the server
  putAPI(endPoint: any, data: any): Observable<HttpResponse<any[]>> {
    return this.http.put<any[]>(`${this.apiURL}${endPoint}`, data, { observe: 'response' }).pipe(
      tap((data) => data),
      catchError((error) => {
        console.error('Error updating data:', error);
        return throwError(() => new Error('API update failed!'));
      })
    );
  }

  //delete API method to delete data from the server
  deleteAPI(endPoint: any): Observable<HttpResponse<any[]>> {
    return this.http.delete<any[]>(`${this.apiURL}${endPoint}`, { observe: 'response' }).pipe(
      tap((data) => data),
      catchError((error) => {
        console.error('Error deleting data:', error);
        return throwError(() => new Error('API delete failed!'));
      })
    );
  }
}
