import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DropDownComponent } from "./drop-down.component";
import { CurrencyService } from "src/app/Services/currency.service";
import {of} from 'rxjs'
import {By} from '@angular/platform-browser'


describe('header component tests', () => {
    let component: DropDownComponent;
    let fixture: ComponentFixture<DropDownComponent>;
    let currencyServiceSpy: jasmine.SpyObj<CurrencyService>;
    const mockCurrencyService = jasmine.createSpyObj('CurrencyService', ['getCurrencies']);

    let testCurrencies = { "AED":"UAE Dirham",
     
    "EUR":"Euro",
"USD":"US Dollar"}



    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DropDownComponent],
            providers: [
                { provide: CurrencyService, useValue: mockCurrencyService },
              ],
        });

        fixture = TestBed.createComponent(DropDownComponent);
        component = fixture.componentInstance;
        currencyServiceSpy = TestBed.inject(CurrencyService) as jasmine.SpyObj<CurrencyService>;
       

    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it ('should create lis of currencies',()=>{
        mockCurrencyService.getCurrencies.and.returnValue(of(testCurrencies));
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('select option')).length).toBe(3);
    });



    it('should fetch initial  currencies', () => {
        const testData = { USD: 'US Dollar', EUR: 'Euro' };
        currencyServiceSpy.getCurrencies.and.returnValue(of(testData));
       fixture.detectChanges();
        expect(fixture.componentInstance.currencies.length).toBe(Object.keys(testData).length);
    });
    
    it('should emit selected currency on selection change', () => {
        const testCurrency = 'USD';
        spyOn(component.currencySelected, 'emit');
    
        component.selectCurrency({ target: { value: testCurrency } });
    
        expect(component.currencySelected.emit).toHaveBeenCalledWith(testCurrency);
      });
    });