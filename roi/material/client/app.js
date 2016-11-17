(function(angular) {

  var app = angular.module('app', ['ngMaterial', 'LocalStorageModule']);

  app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('roi-charts');
  });

  app.factory('Request', function($http, localStorageService) {
    function get(url){
      return new Promise(function(resolve, reject){
        if(localStorageService.isSupported) {
          var value = localStorageService.get(url);
          if(value) {
            resolve(value)
          } else {
            $http({ method: 'GET', url: url })
            .then(function (response) {
              localStorageService.set(url, response.data);
              resolve(response.data);
            }, function (err) {
              reject(err);
            });
          }
        } else {
          $http({ method: 'GET', url: url })
          .then(function (response) {
            resolve(response.data);
          }, function (err) {
            reject(err);
          });
        }
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

  app.directive('stock', function(Quandl){
    return {
      restrict: 'E',
      templateUrl: 'client/stock.tpl.html',
      scope: { name: "=" },
      controller: function($scope, $element) {
        var stock;
        $scope.companies = ['FB', 'GOOG', 'MSFT'];
        $scope.company = _.first($scope.companies);
        $scope.optimum;
        $scope.investment = 1000;
        $scope.start = new Date();
        $scope.end = new Date();

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
            stock = Stock(response);
            Graphics.stock($element.find('#stock')[0], stock);
            $scope.optimum = stock.getOptimum();
            $scope.start = stock.getStart();
            $scope.end = stock.getEnd();
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

}(angular));
