import { Component , EventEmitter,OnInit,Output  } from '@angular/core';
import { CurrencyService } from '../../Services/currency.service';
@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {

  @Output() currencySelected: EventEmitter<string> = new EventEmitter<string>();


  constructor(private currencyService: CurrencyService) { }


  currencies: any[] =[];

  ngOnInit(): void {
    this.fetchCurrencies();
  }
fetchCurrencies() {
  this.currencyService.getCurrencies().subscribe(
    (data) => { 
      this.currencies = Object.entries(data).map(([code, name]) => code);

    },
    (error) => {
      
    }
  );
}

selectCurrency(event: any) {
  const currency = event.target.value;
  this.currencySelected.emit(currency);
  console.log(currency)
}
}
