import { chartService } from "./chart.service";
import {HttpTestingController,HttpClientTestingModule} from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { inject } from "@angular/core";

describe ('Chart Service',()=>{
    let service : chartService ;

    let httpTestingController: HttpTestingController;
    beforeEach(()=>{
        
           
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DatePipe, chartService],
          });

          
          service = TestBed.inject(chartService);
          httpTestingController = TestBed.inject(HttpTestingController);
        

    });

    it('should be created', () => {
        expect(service).toBeTruthy();
      });  




describe('getData', () => {

  
      
    it('should make an HTTP GET request with correct parameters', () => {
      const currentDate = new Date('2023-11-30');
      spyOn(service, 'calculateDate').and.returnValue('2023-11-29');

      const request = {
        currency: 'USD',
        interval: 'daily',
        duration: 1,
      };

      service.getData(request).subscribe();

      const req = httpTestingController.expectOne(
        'https://marketdata.tradermade.com/api/v1/timeseries?currency=USD&start_date=2023-11-29&end_date=2023-11-29-15:58&api_key=QMMEq626xQOvF-UQPqBm&interval=daily&format=records&period=1'
      );

      expect(req.request.method).toEqual('GET');

      req.flush({});  
    });
  });

   
describe('calculateDate', () => {
    it('should calculate the date correctly for daily interval', () => {
      const endDate = new Date('2023-11-30');
      const result = service.calculateDate(endDate, 'daily', 2);
      expect(result).toBe('2023-11-28');
    });

    it('should calculate the date correctly for hourly interval', () => {
      const endDate = new Date('2023-11-30-12:00');
      const result = service.calculateDate(endDate, 'hourly', 3);
      expect(result).toBe('2023-11-30-09:00');
    });

    it('should calculate the date correctly for minute interval', () => {
      const endDate = new Date('2023-11-30-12:34');
      const result = service.calculateDate(endDate, 'minute', 15);
      expect(result).toBe('2023-11-30-12:19');
    });
  });


});