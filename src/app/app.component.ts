import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workshop';

  selectedFromCurrency='usd';
  selectedToCurrency='eur';
  onSelectedFromChanged(curr:string){
    this.selectedFromCurrency=curr;
  }
  onSelectedToChanged(curr:string){
    this.selectedToCurrency=curr;
  }
}
