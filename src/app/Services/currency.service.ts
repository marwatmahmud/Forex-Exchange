import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import {catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private http: HttpClient) { }

   apiUrl = 'https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=QMMEq626xQOvF-UQPqBm'
 
  getCurrencies(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(catchError( (error) => {
      return throwError(() => 'Error Occurred!')
    }),
      map(response => {
       return  response.available_currencies
      })
    );
  }
}
  
