import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { chartService } from 'src/app/Services/chart.service';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
import { ChartModule } from 'primeng/chart';  // Import ChartModule

describe('ChartComponent', () => {
    let component: ChartComponent;  
    let fixture: ComponentFixture<ChartComponent>;
    let chartServiceSpy: jasmine.SpyObj<chartService>;


    beforeEach(() => {
        chartServiceSpy = jasmine.createSpyObj('ChartService', ['getData']);
  
        TestBed.configureTestingModule({
          declarations: [ChartComponent],
          imports: [
            ChartModule,  
          ],
          providers: [
            { provide: chartService, useValue: chartServiceSpy },
            DatePipe,
          ],
        }).compileComponents();
      
        fixture = TestBed.createComponent(ChartComponent);
        component = fixture.componentInstance;
      
  });




  it('should call ngOnChanges when inputs change', () => {
    spyOn(component, 'ngOnChanges').and.callThrough();
    chartServiceSpy.getData.and.returnValue(of({ quotes: [] })); 
  
    component.selectedFromCurrency = 'USD';
    component.selectedToCurrency = 'EUR';
    component.currencyNames = [component.selectedFromCurrency, component.selectedToCurrency];
  
    component.ngOnChanges({});
    fixture.detectChanges();
  
    expect(component.ngOnChanges).toHaveBeenCalled();
  });
  it('should call getDailyData with duration 7 when selectedInterval is 1W', () => {
    component.selectedInterval = '1W';
    spyOn(component, 'getDailyData');
    component.getSelectedData();
    expect(component.getDailyData).toHaveBeenCalledWith(7);
  });

  it('should call getDailyData with duration 30 when selectedInterval is 1M', () => {
    component.selectedInterval = '1M';
    spyOn(component, 'getDailyData');
    component.getSelectedData();
    expect(component.getDailyData).toHaveBeenCalledWith(30);
  });

  it('should call getHourlyData with duration 24 when selectedInterval is 1D', () => {
    component.selectedInterval = '1D';
    spyOn(component, 'getHourlyData');
    component.getSelectedData();
    expect(component.getHourlyData).toHaveBeenCalledWith(24);
  });

 
 
  
});
