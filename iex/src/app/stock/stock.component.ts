import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';

import { StockService } from './stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, OnDestroy {
  public company: any;
  public historical: any[];

  public earnings: any[];
  public earningsChartData: any[];

  public dividends: any[];
  public dividendsChartData: any[];

  private routeParamsSub: Subscription;

  constructor(private route: ActivatedRoute,
              private stockService: StockService) { }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe((params) => {
      if(params.ticker){

        this.stockService.getCompany(params.ticker)
          .subscribe((company) => {
            this.company = company;
          });

        this.stockService.getChart(params.ticker)
          .subscribe((historical) => {
            this.historical = historical;
          });

        this.stockService.getEarnings(params.ticker)
          .subscribe((earnings) => {
            this.earnings = earnings;
            this.earningsChartData = _.map(this.earnings, ({ actualEPS, fiscalEndDate }) => {
              return {
                value: actualEPS,
                date: fiscalEndDate
              };
            });
          });

        this.stockService.getDividends(params.ticker)
          .subscribe((dividends) => {
            this.dividends = dividends;
            this.dividendsChartData = _.map(this.dividends, ({ amount, paymentDate }) => {
              return {
                value: amount,
                date: paymentDate
              };
            });
          });

      }
    });
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }
}
