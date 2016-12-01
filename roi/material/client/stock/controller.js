app.controller('StockCtrl', function($scope, $element, Quandl) {
  var stock, chart;
  $scope.companies = ['FB', 'GOOG', 'MSFT'];
  $scope.company = _.first($scope.companies);
  $scope.optimum;
  $scope.investment = 1000;

  $scope.start = new Date();
  $scope.end = new Date();

  $scope.boundries = {
    start: _.clone($scope.start),
    end: _.clone($scope.end)
  };

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

  $scope.getDuration = function() {
    if($scope.optimum) {
      return moment($scope.optimum.max.date).diff(moment($scope.optimum.min.date), 'days');
    }
    return 0;
  };

  $scope.filter = function() {
    chart.plot($scope.boundries.start, $scope.boundries.end, 'month');
    $scope.optimum = stock.getOptimum();
  };

  $scope.everageCost = function(delimiter) {
    if(stock) {
      return stock.everageCost(delimiter, $scope.investment);
    }
  };

  $scope.update = function() {
    Quandl.get($scope.company)
    .then(function(response) {
      stock = Stock(response);
      chart = Graphics.stock($element.find('#stock')[0], stock);
      chart.plot();
      // chart.batch('month');

      $scope.optimum = stock.getOptimum();

      $scope.start = stock.getStart();
      $scope.end = stock.getEnd();

      $scope.boundries = {
        start: _.clone($scope.start),
        end: _.clone($scope.end)
      };

      $scope.$apply();
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  $scope.update();
});
