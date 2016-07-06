(function(angular) {

  var Stock = function(info) {
    var series = _.chain(_.get(info, 'dataset.data', []))
      .reverse()
      .value();

    var data = _.map(series, function(point) {
      return {
        date: moment(point[0], 'YYYY-MM-DD').toDate(),
        close: point[4]
      }
    });

    var maxDiff = function() {
      var memory = {};
      var maxDiff = -1;
      var maxRight = _.last(data);
      memory.max = maxRight;
      for (var i = data.length-2; i >= 0; i--) {
        if (data[i].close > maxRight.close) {
          maxRight = data[i];
          memory.max = maxRight;
        } else {
          var diff = maxRight.close - data[i].close;
          if (diff > maxDiff) {
            memory.min = data[i];
            maxDiff = diff;
          }
        }
      }
      memory.maxDiff = maxDiff;
      return memory;
    }

    var getOptimum = function() {
      return maxDiff();
    };

    var optimum = getOptimum();
    _.set(optimum, 'min.label', 'BUY: '+_.get(optimum, 'min.close'));
    _.set(optimum, 'max.label', 'SELL: '+_.get(optimum, 'max.close'));

    function getAmount(investment) {
      return _.round(investment/optimum.min.close)
    };

    return {
      data: data,
      getOptimum: function() {
        return optimum;
      },
      getAmount: getAmount,
      getROI: function(investment) {
        var amount = getAmount(investment);
        return (amount*(optimum.max.close-optimum.min.close))/(amount*optimum.min.close) * 100;
      },
      getCash: function(investment) {
        return getAmount(investment)*optimum.max.close;
      },
      getName: function() {
        return _.get(info, 'dataset.name');
      }
    };
  };

  var Graphics = {};

  Graphics.stock = function plot(anchor, stock){
    //console.log(info);
    var markers = [];
    var optimum = stock.getOptimum();
    if(_.has(optimum, 'min')) markers.push(optimum.min);
    if(_.has(optimum, 'max')) markers.push(optimum.max);

    MG.data_graphic({
      //title: stock.getName(),
      data: stock.data,
      full_width: true,
      target: anchor,
      x_accessor: 'date',
      y_accessor: 'close',
      markers: markers
    });
  };

  var app = angular.module('app', ['ngMaterial']);

  app.factory('Request', function($http) {
    function get(url){
      return new Promise(function(resolve, reject){
        $http({ method: 'GET', url: url })
        .then(function (response) {
          resolve(response.data);
        }, function (err) {
          reject(err);
        });
      });
    };

    return {
      get: get
    };
  });

  app.factory('Quandl', function(Request) {
    var createWikiUrl = _.template('https://www.quandl.com/api/v3/datasets/WIKI/${ name }.json');
    //var createWikiUrl = _.template('/${ name }');

    function get(name) {
      var url = createWikiUrl({ name: _.toUpper(name) });
      return Request.get(url);
    };

    return {
      get: get
    };
  });

  app.directive('test', function(Quandl){
    return {
      restrict: 'E',
      templateUrl: 'client/stock.tpl.html',
      scope: { name: "=" },
      controller: function($scope, $element) {
        var stock;
        $scope.companies = ['FB', 'GOOG'];
        $scope.company = _.first($scope.companies);
        $scope.optimum;
        $scope.investment = 1000;


        $scope.getROI = function() {
          if(stock) {
            return stock.getROI($scope.investment);
          }
        };

        $scope.cash = function() {
          if(stock) {
            return stock.getCash($scope.investment);
          }
        };

        $scope.amount = function() {
          if(stock) {
            return stock.getAmount($scope.investment);
          }
        };

        $scope.getName = function() {
          if(stock) {
            return stock.getName();
          }
        };

        $scope.update = function() {
          Quandl.get($scope.company)
          .then(function(response) {
            console.log(response);
            stock = Stock(response);
            Graphics.stock($element.find('#stock')[0], stock);
            $scope.optimum = stock.getOptimum();
            $scope.$apply();
          })
          .catch(function(err) {
            console.log(err);
          });
        }

        $scope.update();
      }
    };
  });

  console.log('test');
}(angular));
