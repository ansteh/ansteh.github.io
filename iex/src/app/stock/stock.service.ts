import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import * as _ from 'lodash';
import { Stock } from './stock.helper';

import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class StockService {

  constructor(private http: Http) { }

  getCompany(ticker: string): Observable<any> {
    return this.http.get(`https://api.iextrading.com/1.0/stock/${ticker}/company`)
      .map(res => res.json())
  }

  getChart(ticker: string): Observable<any> {
    return this.http.get(`https://api.iextrading.com/1.0/stock/${ticker}/chart/5y`)
      .map(res => res.json())
  }

  getEarnings(ticker: string): Observable<any> {
    return this.http.get(`https://api.iextrading.com/1.0/stock/${ticker}/earnings`)
      .map(res => res.json())
      .map(data => _.get(data, 'earnings'))
  }

  getDividends(ticker: string): Observable<any> {
    return this.http.get(`https://api.iextrading.com/1.0/stock/${ticker}/dividends/5y`)
      .map(res => res.json())
  }

}
