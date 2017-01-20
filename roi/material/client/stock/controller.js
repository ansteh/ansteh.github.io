app.controller('StockCtrl', function($scope, $element, Quandl, QuandlLists) {

  $scope.SP500 = [];
  $scope.createWikiUrl = function(stock) {
    return stock ? Quandl.createWikiUrl(stock) : "";
  };

  QuandlLists.getSP500()
  .then(function(SP500) {
    // console.log(SP500);
    $scope.SP500 = SP500;
  })
  .catch(function(err) {
    console.log(err);
  });

  $scope.searchStock = function() {
    var needle = _.toLower($scope.searchText);
    return _.filter($scope.SP500, function(candidate) {
      return _.includes(_.toLower(candidate.name), needle);
    });
  }

  var stock, chart;
  $scope.stock = {
    "ticker": "FB",
    "name": "Facebook",
    "free_code": "WIKI/FB",
    "premium_code": "EOD/FB"
  };
  $scope.optimum;
  $scope.investment = 1000;
  $scope.cost;

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
    chart.plot($scope.boundries.start, $scope.boundries.end, 'month', $scope.onlyTrends);
    $scope.optimum = stock.getOptimum();
  };

  $scope.everageCost = function(delimiter) {
    if(stock) {
      return stock.everageCost(delimiter, $scope.investment);
    }
  };

  $scope.update = function() {
    Quandl.get($scope.stock)
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

      $scope.cost = $scope.everageCost('month');
      $scope.$apply();
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  $scope.update();

  $scope.attach = function() {
    if($scope.stock) $scope.update();
  }
});
