import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { ChartComponent } from './components/chart/chart.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from "@angular/common/http/testing"; 
import { DatePipe } from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";



describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, DropDownComponent, ChartComponent],
      imports: [HttpClientTestingModule],
      providers :[DatePipe],
      schemas :[CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize  currencies', () => {
    expect(component.selectedFromCurrency).toBe('usd');
    expect(component.selectedToCurrency).toBe('eur');
  });

  it('should update selectedFromCurrency when onSelectedFromChanged is called', () => {
    const newCurrency = 'aed';
    component.onSelectedFromChanged(newCurrency);
    expect(component.selectedFromCurrency).toBe(newCurrency);
  });

  it('should update selectedToCurrency when onSelectedToChanged is called', () => {
    const newCurrency = 'egp';
    component.onSelectedToChanged(newCurrency);
    expect(component.selectedToCurrency).toBe(newCurrency);
  });

  it('should update chart  when dropdowns  currencies emitted change', () => {
    const fromCurrencyDropdown = fixture.debugElement.query(By.directive(DropDownComponent));
    const toCurrencyDropdown = fixture.debugElement.queryAll(By.directive(DropDownComponent))[1];
    const chartComponent = fixture.debugElement.query(By.directive(ChartComponent));

    fromCurrencyDropdown.componentInstance.currencySelected.emit('usd');
    toCurrencyDropdown.componentInstance.currencySelected.emit('eur');

    fixture.detectChanges();

    expect(chartComponent.componentInstance.selectedFromCurrency).toBe('usd');
    expect(chartComponent.componentInstance.selectedToCurrency).toBe('eur');



  });


  



});