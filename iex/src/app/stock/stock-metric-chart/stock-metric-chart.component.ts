import { Component, Input, OnChanges, OnInit, ViewChild, ElementRef } from '@angular/core';

import Chart from 'chart.js';
import * as _ from 'lodash';

@Component({
  selector: 'stock-metric-chart',
  templateUrl: './stock-metric-chart.component.html',
  styleUrls: ['./stock-metric-chart.component.css']
})
export class StockMetricChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') canvas: ElementRef;

  @Input() data: any[];
  @Input() label: any;

  private chart: Chart;
  private lineChartData: Array<any> = [
    {data: [], label: ''},
  ];
  private lineChartLabels:Array<any> = [];

  constructor() { }

  ngOnInit() {
    const ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });

    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  private update() {
    if(this.chart && this.data && this.label) {
      this.updateChart();

      this.chart.data = _.cloneDeep({
        labels: this.lineChartLabels,
        datasets: this.lineChartData
      });

      this.chart.update();
    }
  }

  private updateChart() {
    this.setLabels();
    this.setData();
  }

  private setLabels() {
    this.lineChartLabels = _.map(this.data, 'date');
  }

  private setData() {
    const values = _.map(this.data, 'value');
    const backgroundColor = this.getColors(values);

    this.lineChartData = [
      { data: values,
        label: this.label,
        backgroundColor,
      },
    ];
  }

  private getColors(values: any[] = []): any[] {
    return _.map(values, (value) => {
      if(value < 0) {
        return 'red';
      }

      return 'green';
    });
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
