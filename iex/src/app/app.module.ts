import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatOptionModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';

import { StockService } from './stock/stock.service';

import { appRoutes } from './app.routes';
import { StockComponent } from './stock/stock.component';
import { StockMetricChartComponent } from './stock/stock-metric-chart/stock-metric-chart.component';
import { StockPricesChartComponent } from './stock/stock-prices-chart/stock-prices-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    StockMetricChartComponent,
    StockPricesChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,

    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true }
    ),

    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,

    ChartsModule,
  ],
  providers: [
    StockService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
