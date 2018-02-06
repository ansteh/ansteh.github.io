webpackJsonp([1,5],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stock_service__ = __webpack_require__(106);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StockComponent = (function () {
    function StockComponent(route, stockService) {
        this.route = route;
        this.stockService = stockService;
    }
    StockComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeParamsSub = this.route.params.subscribe(function (params) {
            if (params.ticker) {
                _this.stockService.getCompany(params.ticker)
                    .subscribe(function (company) {
                    _this.company = company;
                });
                _this.stockService.getChart(params.ticker)
                    .subscribe(function (historical) {
                    _this.historical = historical;
                });
                _this.stockService.getEarnings(params.ticker)
                    .subscribe(function (earnings) {
                    _this.earnings = earnings;
                    _this.earningsChartData = __WEBPACK_IMPORTED_MODULE_2_lodash__["map"](_this.earnings, function (_a) {
                        var actualEPS = _a.actualEPS, fiscalEndDate = _a.fiscalEndDate;
                        return {
                            value: actualEPS,
                            date: fiscalEndDate
                        };
                    });
                });
                _this.stockService.getDividends(params.ticker)
                    .subscribe(function (dividends) {
                    _this.dividends = dividends;
                    _this.dividendsChartData = __WEBPACK_IMPORTED_MODULE_2_lodash__["map"](_this.dividends, function (_a) {
                        var amount = _a.amount, paymentDate = _a.paymentDate;
                        return {
                            value: amount,
                            date: paymentDate
                        };
                    });
                });
            }
        });
    };
    StockComponent.prototype.ngOnDestroy = function () {
        this.routeParamsSub.unsubscribe();
    };
    return StockComponent;
}());
StockComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-stock',
        template: __webpack_require__(417),
        styles: [__webpack_require__(406)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__stock_service__["a" /* StockService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__stock_service__["a" /* StockService */]) === "function" && _b || Object])
], StockComponent);

var _a, _b;
//# sourceMappingURL=stock.component.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(69);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StockService = (function () {
    function StockService(http) {
        this.http = http;
    }
    StockService.prototype.getCompany = function (ticker) {
        return this.http.get("https://api.iextrading.com/1.0/stock/" + ticker + "/company")
            .map(function (res) { return res.json(); });
    };
    StockService.prototype.getChart = function (ticker) {
        return this.http.get("https://api.iextrading.com/1.0/stock/" + ticker + "/chart/5y")
            .map(function (res) { return res.json(); });
    };
    StockService.prototype.getEarnings = function (ticker) {
        return this.http.get("https://api.iextrading.com/1.0/stock/" + ticker + "/earnings")
            .map(function (res) { return res.json(); })
            .map(function (data) { return __WEBPACK_IMPORTED_MODULE_2_lodash__["get"](data, 'earnings'); })
            .map(__WEBPACK_IMPORTED_MODULE_2_lodash__["reverse"]);
    };
    StockService.prototype.getDividends = function (ticker) {
        return this.http.get("https://api.iextrading.com/1.0/stock/" + ticker + "/dividends/5y")
            .map(function (res) { return res.json(); })
            .map(__WEBPACK_IMPORTED_MODULE_2_lodash__["reverse"]);
    };
    return StockService;
}());
StockService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _a || Object])
], StockService);

var _a;
//# sourceMappingURL=stock.service.js.map

/***/ }),

/***/ 258:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 258;


/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hammerjs__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__(300);





if (__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(413),
        styles: [__webpack_require__(402)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_flex_layout__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_charts_ng2_charts__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__stock_stock_service__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_routes__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__stock_stock_component__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__stock_stock_metric_chart_stock_metric_chart_component__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__stock_stock_prices_chart_stock_prices_chart_component__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__stock_dividends_dividends_component__ = __webpack_require__(297);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_12__stock_stock_component__["a" /* StockComponent */],
            __WEBPACK_IMPORTED_MODULE_13__stock_stock_metric_chart_stock_metric_chart_component__["a" /* StockMetricChartComponent */],
            __WEBPACK_IMPORTED_MODULE_14__stock_stock_prices_chart_stock_prices_chart_component__["a" /* StockPricesChartComponent */],
            __WEBPACK_IMPORTED_MODULE_15__stock_dividends_dividends_component__["a" /* DividendsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_routes__["a" /* appRoutes */], { useHash: true }),
            __WEBPACK_IMPORTED_MODULE_7__angular_material__["a" /* MatInputModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_material__["b" /* MatFormFieldModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_material__["c" /* MatTableModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_material__["d" /* MatOptionModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_material__["e" /* MatSelectModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_material__["f" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_8_ng2_charts_ng2_charts__["ChartsModule"],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_10__stock_stock_service__["a" /* StockService */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stock_stock_component__ = __webpack_require__(105);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return appRoutes; });

var appRoutes = [
    {
        path: '',
        redirectTo: '/stock/aapl',
        pathMatch: 'full'
    },
    {
        path: 'stock/:ticker',
        component: __WEBPACK_IMPORTED_MODULE_0__stock_stock_component__["a" /* StockComponent */]
    },
];
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DividendsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DividendsComponent = (function () {
    function DividendsComponent() {
    }
    DividendsComponent.prototype.ngOnInit = function () {
    };
    return DividendsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], DividendsComponent.prototype, "dividends", void 0);
DividendsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'iex-dividends',
        template: __webpack_require__(414),
        styles: [__webpack_require__(403)]
    }),
    __metadata("design:paramtypes", [])
], DividendsComponent);

//# sourceMappingURL=dividends.component.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chart_js__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockMetricChartComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StockMetricChartComponent = (function () {
    function StockMetricChartComponent() {
        this.lineChartData = [
            { data: [], label: '' },
        ];
        this.lineChartLabels = [];
    }
    StockMetricChartComponent.prototype.ngOnInit = function () {
        var ctx = this.canvas.nativeElement.getContext('2d');
        this.chart = new __WEBPACK_IMPORTED_MODULE_1_chart_js___default.a(ctx, {
            type: 'bar',
            data: {},
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        });
        this.update();
    };
    StockMetricChartComponent.prototype.ngOnChanges = function () {
        this.update();
    };
    StockMetricChartComponent.prototype.update = function () {
        if (this.chart && this.data && this.label) {
            this.updateChart();
            this.chart.data = __WEBPACK_IMPORTED_MODULE_2_lodash__["cloneDeep"]({
                labels: this.lineChartLabels,
                datasets: this.lineChartData
            });
            this.chart.update();
        }
    };
    StockMetricChartComponent.prototype.updateChart = function () {
        this.setLabels();
        this.setData();
    };
    StockMetricChartComponent.prototype.setLabels = function () {
        this.lineChartLabels = __WEBPACK_IMPORTED_MODULE_2_lodash__["map"](this.data, 'date');
    };
    StockMetricChartComponent.prototype.setData = function () {
        var values = __WEBPACK_IMPORTED_MODULE_2_lodash__["map"](this.data, 'value');
        var backgroundColor = this.getColors(values);
        this.lineChartData = [
            { data: values,
                label: this.label,
                backgroundColor: backgroundColor,
            },
        ];
    };
    StockMetricChartComponent.prototype.getColors = function (values) {
        if (values === void 0) { values = []; }
        return __WEBPACK_IMPORTED_MODULE_2_lodash__["map"](values, function (value) {
            if (value < 0) {
                return 'red';
            }
            return 'green';
        });
    };
    // events
    StockMetricChartComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    StockMetricChartComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    return StockMetricChartComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chart'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], StockMetricChartComponent.prototype, "canvas", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], StockMetricChartComponent.prototype, "data", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], StockMetricChartComponent.prototype, "label", void 0);
StockMetricChartComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'stock-metric-chart',
        template: __webpack_require__(415),
        styles: [__webpack_require__(404)]
    }),
    __metadata("design:paramtypes", [])
], StockMetricChartComponent);

var _a;
//# sourceMappingURL=stock-metric-chart.component.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chart_js__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StockPricesChartComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StockPricesChartComponent = (function () {
    function StockPricesChartComponent() {
        this.labels = [];
        this.closes = [];
        this.lineChartData = [
            { data: [], label: '' },
        ];
        this.lineChartLabels = [];
    }
    StockPricesChartComponent.prototype.ngOnInit = function () {
        var ctx = this.canvas.nativeElement.getContext('2d');
        this.chart = new __WEBPACK_IMPORTED_MODULE_1_chart_js___default.a(ctx, {
            type: 'bar',
            data: {
                labels: this.labels,
                datasets: [{
                        label: 'close',
                        data: this.closes,
                        type: 'line',
                        pointRadius: 0,
                        fill: false,
                        lineTension: 0,
                        borderWidth: 2,
                        backgroundColor: '#4285f4'
                    }]
            },
            options: {
                scales: {
                    xAxes: [{
                            type: 'time',
                            distribution: 'series',
                            ticks: {
                                source: 'auto'
                            }
                        }],
                    yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Closing price ($)'
                            }
                        }]
                }
            }
        });
        this.update();
    };
    StockPricesChartComponent.prototype.ngOnChanges = function () {
        this.update();
    };
    StockPricesChartComponent.prototype.update = function () {
        if (!this.data)
            return;
        this.labels = __WEBPACK_IMPORTED_MODULE_2_lodash__["map"](this.data, function (point) {
            return new Date(point.date);
        });
        this.closes = __WEBPACK_IMPORTED_MODULE_2_lodash__["map"](this.data, function (point) {
            return {
                x: new Date(point.date),
                y: point.close
            };
        });
        this.chart.data = __WEBPACK_IMPORTED_MODULE_2_lodash__["cloneDeep"]({
            labels: this.labels,
            datasets: [{
                    label: this.label,
                    data: this.closes,
                    type: 'line',
                    pointRadius: 0,
                    fill: false,
                    lineTension: 0,
                    borderWidth: 2,
                    backgroundColor: '#4285f4',
                    borderColor: '#4285f4',
                }]
        });
        this.chart.update();
    };
    return StockPricesChartComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chart'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], StockPricesChartComponent.prototype, "canvas", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], StockPricesChartComponent.prototype, "label", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], StockPricesChartComponent.prototype, "data", void 0);
StockPricesChartComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'sec-stock-prices-chart',
        template: __webpack_require__(416),
        styles: [__webpack_require__(405)]
    }),
    __metadata("design:paramtypes", [])
], StockPricesChartComponent);

var _a;
//# sourceMappingURL=stock-prices-chart.component.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    apiUrl: 'http://localhost:3000',
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 301:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 107,
	"./af.js": 107,
	"./ar": 114,
	"./ar-dz": 108,
	"./ar-dz.js": 108,
	"./ar-kw": 109,
	"./ar-kw.js": 109,
	"./ar-ly": 110,
	"./ar-ly.js": 110,
	"./ar-ma": 111,
	"./ar-ma.js": 111,
	"./ar-sa": 112,
	"./ar-sa.js": 112,
	"./ar-tn": 113,
	"./ar-tn.js": 113,
	"./ar.js": 114,
	"./az": 115,
	"./az.js": 115,
	"./be": 116,
	"./be.js": 116,
	"./bg": 117,
	"./bg.js": 117,
	"./bn": 118,
	"./bn.js": 118,
	"./bo": 119,
	"./bo.js": 119,
	"./br": 120,
	"./br.js": 120,
	"./bs": 121,
	"./bs.js": 121,
	"./ca": 122,
	"./ca.js": 122,
	"./cs": 123,
	"./cs.js": 123,
	"./cv": 124,
	"./cv.js": 124,
	"./cy": 125,
	"./cy.js": 125,
	"./da": 126,
	"./da.js": 126,
	"./de": 129,
	"./de-at": 127,
	"./de-at.js": 127,
	"./de-ch": 128,
	"./de-ch.js": 128,
	"./de.js": 129,
	"./dv": 130,
	"./dv.js": 130,
	"./el": 131,
	"./el.js": 131,
	"./en-au": 132,
	"./en-au.js": 132,
	"./en-ca": 133,
	"./en-ca.js": 133,
	"./en-gb": 134,
	"./en-gb.js": 134,
	"./en-ie": 135,
	"./en-ie.js": 135,
	"./en-nz": 136,
	"./en-nz.js": 136,
	"./eo": 137,
	"./eo.js": 137,
	"./es": 139,
	"./es-do": 138,
	"./es-do.js": 138,
	"./es.js": 139,
	"./et": 140,
	"./et.js": 140,
	"./eu": 141,
	"./eu.js": 141,
	"./fa": 142,
	"./fa.js": 142,
	"./fi": 143,
	"./fi.js": 143,
	"./fo": 144,
	"./fo.js": 144,
	"./fr": 147,
	"./fr-ca": 145,
	"./fr-ca.js": 145,
	"./fr-ch": 146,
	"./fr-ch.js": 146,
	"./fr.js": 147,
	"./fy": 148,
	"./fy.js": 148,
	"./gd": 149,
	"./gd.js": 149,
	"./gl": 150,
	"./gl.js": 150,
	"./gom-latn": 151,
	"./gom-latn.js": 151,
	"./he": 152,
	"./he.js": 152,
	"./hi": 153,
	"./hi.js": 153,
	"./hr": 154,
	"./hr.js": 154,
	"./hu": 155,
	"./hu.js": 155,
	"./hy-am": 156,
	"./hy-am.js": 156,
	"./id": 157,
	"./id.js": 157,
	"./is": 158,
	"./is.js": 158,
	"./it": 159,
	"./it.js": 159,
	"./ja": 160,
	"./ja.js": 160,
	"./jv": 161,
	"./jv.js": 161,
	"./ka": 162,
	"./ka.js": 162,
	"./kk": 163,
	"./kk.js": 163,
	"./km": 164,
	"./km.js": 164,
	"./kn": 165,
	"./kn.js": 165,
	"./ko": 166,
	"./ko.js": 166,
	"./ky": 167,
	"./ky.js": 167,
	"./lb": 168,
	"./lb.js": 168,
	"./lo": 169,
	"./lo.js": 169,
	"./lt": 170,
	"./lt.js": 170,
	"./lv": 171,
	"./lv.js": 171,
	"./me": 172,
	"./me.js": 172,
	"./mi": 173,
	"./mi.js": 173,
	"./mk": 174,
	"./mk.js": 174,
	"./ml": 175,
	"./ml.js": 175,
	"./mr": 176,
	"./mr.js": 176,
	"./ms": 178,
	"./ms-my": 177,
	"./ms-my.js": 177,
	"./ms.js": 178,
	"./my": 179,
	"./my.js": 179,
	"./nb": 180,
	"./nb.js": 180,
	"./ne": 181,
	"./ne.js": 181,
	"./nl": 183,
	"./nl-be": 182,
	"./nl-be.js": 182,
	"./nl.js": 183,
	"./nn": 184,
	"./nn.js": 184,
	"./pa-in": 185,
	"./pa-in.js": 185,
	"./pl": 186,
	"./pl.js": 186,
	"./pt": 188,
	"./pt-br": 187,
	"./pt-br.js": 187,
	"./pt.js": 188,
	"./ro": 189,
	"./ro.js": 189,
	"./ru": 190,
	"./ru.js": 190,
	"./sd": 191,
	"./sd.js": 191,
	"./se": 192,
	"./se.js": 192,
	"./si": 193,
	"./si.js": 193,
	"./sk": 194,
	"./sk.js": 194,
	"./sl": 195,
	"./sl.js": 195,
	"./sq": 196,
	"./sq.js": 196,
	"./sr": 198,
	"./sr-cyrl": 197,
	"./sr-cyrl.js": 197,
	"./sr.js": 198,
	"./ss": 199,
	"./ss.js": 199,
	"./sv": 200,
	"./sv.js": 200,
	"./sw": 201,
	"./sw.js": 201,
	"./ta": 202,
	"./ta.js": 202,
	"./te": 203,
	"./te.js": 203,
	"./tet": 204,
	"./tet.js": 204,
	"./th": 205,
	"./th.js": 205,
	"./tl-ph": 206,
	"./tl-ph.js": 206,
	"./tlh": 207,
	"./tlh.js": 207,
	"./tr": 208,
	"./tr.js": 208,
	"./tzl": 209,
	"./tzl.js": 209,
	"./tzm": 211,
	"./tzm-latn": 210,
	"./tzm-latn.js": 210,
	"./tzm.js": 211,
	"./uk": 212,
	"./uk.js": 212,
	"./ur": 213,
	"./ur.js": 213,
	"./uz": 215,
	"./uz-latn": 214,
	"./uz-latn.js": 214,
	"./uz.js": 215,
	"./vi": 216,
	"./vi.js": 216,
	"./x-pseudo": 217,
	"./x-pseudo.js": 217,
	"./yo": 218,
	"./yo.js": 218,
	"./zh-cn": 219,
	"./zh-cn.js": 219,
	"./zh-hk": 220,
	"./zh-hk.js": 220,
	"./zh-tw": 221,
	"./zh-tw.js": 221
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 301;


/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(35)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(35)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(35)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 405:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(35)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 406:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(35)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 413:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ 414:
/***/ (function(module, exports) {

module.exports = "<p>\n  dividends works!\n</p>\n"

/***/ }),

/***/ 415:
/***/ (function(module, exports) {

module.exports = "<div>\n  <canvas #chart width=\"400\" height=\"220\" style=\"max-height: 220px;\"></canvas>\n</div>\n"

/***/ }),

/***/ 416:
/***/ (function(module, exports) {

module.exports = "<div>\n  <canvas #chart width=\"400\"></canvas>\n</div>\n\n<!-- <pre>{{ closes | json }}</pre> -->\n"

/***/ }),

/***/ 417:
/***/ (function(module, exports) {

module.exports = "<pre>{{ company | json }}</pre>\n\n<!-- <pre>{{ historical | json }}</pre> -->\n<!-- <pre>{{ earnings | json }}</pre> -->\n\n<sec-stock-prices-chart [label]=\"company?.companyName\" [data]=\"historical\"></sec-stock-prices-chart>\n<!-- <iex-dividends [dividends]=\"dividends\"></iex-dividends> -->\n<stock-metric-chart [label]=\"'dividends'\" [data]=\"dividendsChartData\"></stock-metric-chart>\n<stock-metric-chart [label]=\"'earnings'\" [data]=\"earningsChartData\"></stock-metric-chart>\n"

/***/ }),

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(259);


/***/ })

},[483]);
//# sourceMappingURL=main.bundle.js.map