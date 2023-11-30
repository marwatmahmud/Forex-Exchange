import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
 import { ChartComponent } from './components/chart/chart.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import {HttpClientModule} from '@angular/common/http'
 import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import {ChartModule} from 'primeng/chart';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
     ChartComponent,
    DropDownComponent,

   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartModule 

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
