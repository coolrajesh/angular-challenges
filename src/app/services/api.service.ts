import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse,HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = environment.apiBaseUrl;
  private apiProdURL = environment.apiProdUrl;
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

  //GET API method to fetch data from the server for product
  getProdAPI(endPoint: any, page: number = 0, limit: number = 10): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(`${this.apiProdURL}${endPoint}?offset=${page}&limit=${limit}`, { observe: 'response' }).pipe(
      tap((data) => data),
      catchError((error) => {
        console.error('Error fetching posts:', error);
        return throwError(() => new Error('API fetch failed!'));
      })
    );
  }

  //generic GET API method to fetch data from the server
  getGenericAPI<T>(endpoint: string, paramsObj?: { [key: string]: any }): Observable<HttpResponse<T[]>> {
    let params = new HttpParams();
    console.log('Params:', paramsObj);
    if (paramsObj) {
      for (const key in paramsObj) {
        if (paramsObj[key] != null) {
          params = params.set(key, paramsObj[key]);
        }
      }
    }   
    return this.http.get<T[]>(`${this.apiProdURL}${endpoint}`, {params,
      observe: 'response'
    }).pipe(
      tap((data) => console.log('Fetched all data:', data)),
      catchError(this.handleError)
    );
  }

 // ✅ Get all items (List API)
  getAll<T>(endPoint: string, page: number = 0, limit: number = 10): Observable<HttpResponse<T[]>> {
    return this.http.get<T[]>(`${this.apiProdURL}${endPoint}?offset=${page}&limit=${limit}`, {      
      observe: 'response'
    }).pipe(
      tap((data) => console.log('Fetched all data:', data)),
      catchError(this.handleError)
    );
  }


  //GET API method to fetch data from the server for product
  getByIdAPI<T>(endPoint: any,id=0): Observable<HttpResponse<T>> {
    return this.http.get<T>(`${this.apiProdURL}${endPoint}/${id}`, { observe: 'response' }).pipe(
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

  getMockData(endPoint: any): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(`/assets/mock-data/${endPoint}.json`, { observe: 'response' }).pipe(
      tap((data) => data),
      catchError((error) => {
        console.error('Error fetching posts:', error);
        return throwError(() => new Error('Mock Data Not Available!'));
      })
    );
  }

  // ✅ Error Handling
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong with the API.'));
  }

//test code

  // ✅ Get all items (List API)
  // getAll<T>(endPoint: string, params: any = {}): Observable<HttpResponse<T[]>> {
  //   return this.http.get<T[]>(`${this.baseURL}${endPoint}`, {
  //     params,
  //     observe: 'response'
  //   }).pipe(
  //     tap((data) => console.log('Fetched all data:', data)),
  //     catchError(this.handleError)
  //   );
  // }

  // // ✅ Get single item by ID
  // getById<T>(endPoint: string, id: number): Observable<HttpResponse<T>> {
  //   return this.http.get<T>(`${this.baseURL}${endPoint}/${id}`, { observe: 'response' }).pipe(
  //     tap((data) => console.log('Fetched single data:', data)),
  //     catchError(this.handleError)
  //   );
  // }

  // // ✅ Create new item
  // create<T>(endPoint: string, payload: T): Observable<HttpResponse<T>> {
  //   return this.http.post<T>(`${this.baseURL}${endPoint}`, payload, { observe: 'response' }).pipe(
  //     tap((data) => console.log('Created:', data)),
  //     catchError(this.handleError)
  //   );
  // }

  // // ✅ Update existing item
  // update<T>(endPoint: string, id: number, payload: T): Observable<HttpResponse<T>> {
  //   return this.http.put<T>(`${this.baseURL}${endPoint}/${id}`, payload, { observe: 'response' }).pipe(
  //     tap((data) => console.log('Updated:', data)),
  //     catchError(this.handleError)
  //   );
  // }

  // // ✅ Delete item
  // delete(endPoint: string, id: number): Observable<HttpResponse<any>> {
  //   return this.http.delete(`${this.baseURL}${endPoint}/${id}`, { observe: 'response' }).pipe(
  //     tap((data) => console.log('Deleted:', data)),
  //     catchError(this.handleError)
  //   );
  // }

  // // ✅ Error Handling
  // private handleError(error: any) {
  //   console.error('API Error:', error);
  //   return throwError(() => new Error('Something went wrong with the API.'));
  // }
}
