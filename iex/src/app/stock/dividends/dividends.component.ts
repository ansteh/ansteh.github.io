import { Component, OnInit, Input } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'iex-dividends',
  templateUrl: './dividends.component.html',
  styleUrls: ['./dividends.component.css']
})
export class DividendsComponent implements OnInit {
  @Input() dividends: any[];

  constructor() { }

  ngOnInit() {
  }

}
