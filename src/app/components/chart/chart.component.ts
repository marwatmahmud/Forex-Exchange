import { Component, Input, OnInit ,OnChanges,SimpleChanges} from '@angular/core';

import { Chart, ChartType } from 'chart.js';
import { ChartRequest } from 'src/app/models/chart-request';
import { chartService } from 'src/app/Services/chart.service';
import { DatePipe } from '@angular/common';
 

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit ,OnChanges {

  @Input() selectedFromCurrency: string = '';
  @Input() selectedToCurrency: string = '';

  currencyNames = [this.selectedFromCurrency, this.selectedToCurrency];
  selectedInterval = '';
  intervals = ['15M', '1H', '1D', '1W', '1M'];
  basicData: any
  chartOptions: any;
  exchangeRate:number= 1.000830;
  exchangePercentage =  this.exchangeRate  * 100;
 

  constructor(private chartService: chartService , private datePipe:DatePipe ) { 
   
  }

ngOnChanges(changes: SimpleChanges): void {
  console.log("onchanges called");
  
  this.getSelectedData();
  this.currencyNames = [this.selectedFromCurrency, this.selectedToCurrency];
  this.exchangePercentage =  this.exchangeRate  * 100;
  console.log(` exchange rate : ${this.exchangeRate}  , exchange percentage : ${this.exchangePercentage}`)
 
}
  ngOnInit(): void {

    
    this.selectedInterval='1D';
    this.getDailyData(7);
    this.chartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      aspectRatio: 1,
      scales: {
        x: {
          display: false,
          grid: {
            display: false
          }
        },
        y: {
          display: false,
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    };
  }
  


  getDailyData(duration: number) { 
    if (this.chartService.getData) {
      console.log(this.chartService.getData);  // Add this line
      this.chartService.getData({
        currency: this.currencyNames.join('').toUpperCase(),
        interval: 'daily',
        duration: duration
      }).subscribe((data: any) => {
        this.updateChartData(data);
      });
    }
  }
  

getHourlyData(duration:number){
   
  this.chartService.getData({
    currency:this.currencyNames.join('').toUpperCase(),
    interval:'hourly',
    duration:duration,
    
    }).subscribe((data: any) => {
      console.log(chartService.toString)
      this.updateChartData(data);
    });    }



getMinuteData(duration:number){
  this.chartService.getData({
    currency:this.currencyNames.join('').toUpperCase(),
    interval:'minute',
    duration:duration,
    
    }).subscribe((data: any) => {
      this.updateChartData(data);
    });    }

 


    setSelectedInterval(interval: string) {
      this.selectedInterval = interval;
      this.getSelectedData();
    }

    getExchangeRate(data: any): number {
      const close = data.quotes[data.quotes.length - 1].close;
      const open = data.quotes[data.quotes.length - 1].open;
      const value = open / close;
      console.log(value);  
      return value;
    }
    

getSelectedData() {
  switch (this.selectedInterval) {
    case '15M':
      this.getMinuteData(15);
      break;
    case '1H':
      this.getMinuteData(60);
      break;
    case '1D':
      this.getHourlyData(24);
      break;
    case '1W':
      this.getDailyData(7);
      break;
    case '1M':
      this.getDailyData(30);
      break;
  }
}


  updateChartData(data: any) {
    if (data && data.quotes) {
      this.basicData = {
        labels: data.quotes.map((entry: any) => entry.date),
        datasets: [
          {
            data: data.quotes.map((entry: any) => entry.close),
            fill: true,
            tension: 0,
            borderColor: 'green',
            backgroundColor: 'rgba(184, 233, 148, 0.3)',
            pointRadius: 0,
          },
        ],
      };
      this.exchangeRate=this.getExchangeRate(data);
     this.exchangePercentage =  this.exchangeRate  * 100;
    }
  }
}



 



 