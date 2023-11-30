import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ChartRequest } from '../models/chart-request';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class chartService {
  baseUrl = 'https://marketdata.tradermade.com/api/v1/';

  constructor(private http: HttpClient ,private datePipe : DatePipe) {}



  calculateDate(endDate: Date, interval: string, duration: number): string {
    const startDate = new Date(endDate);
  
    switch (interval) {
      case 'daily':
        startDate.setDate(startDate.getDate() - duration);
        break;
      case 'hourly':
        startDate.setHours(startDate.getHours() - duration);
        break;
      case 'minute':
        startDate.setMinutes(startDate.getMinutes() - duration);
        break;
      default:
        return '';
    }
  
    return this.datePipe.transform(startDate, 'yyyy-MM-dd-HH:mm') || '';
  }
  
  getData(request: ChartRequest): Observable<any> {
    const currentDate= new Date ();
    const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() - 1);
    const startDate = this.calculateDate(endDate,request.interval,request.duration)
    const url = `${this.baseUrl}timeseries`;

    const params = {
      currency: request.currency,
      start_date: startDate,
      end_date:  this.datePipe.transform(endDate, 'yyyy-MM-dd-HH:mm') || '',
      api_key: 'QMMEq626xQOvF-UQPqBm',
      interval: request.interval,
      format:'records',
      period: 1 
    };

     console.log(params)
    return this.http.get(url, { params }).pipe(
      tap((data) => console.log(JSON.stringify(data))),
    
    );
  }
}





   
