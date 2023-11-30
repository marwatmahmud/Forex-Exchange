import { TestBed } from "@angular/core/testing";
import { CurrencyService } from "./currency.service";
import{HttpClientTestingModule,HttpTestingController} from "@angular/common/http/testing";
import { inject } from "@angular/core";


describe('CurrencyService',()=>{

    let httpTestingController: HttpTestingController;
    let service:CurrencyService;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[
                CurrencyService
            ]
        })

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(CurrencyService);

    });


describe('get currencies',()=>{

    it('should call get with correct API ',()=>{
        service.getCurrencies().subscribe();
       
        const req= httpTestingController.expectOne(service.apiUrl);
        req.flush({"AED":"UAE Dirham",
     
        "EUR":"Euro",
    "USD":"US Dollar"});
    expect(req.request.method).toBe('GET');

    httpTestingController.verify();
    });
})
});