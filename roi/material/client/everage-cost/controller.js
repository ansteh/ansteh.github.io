app.controller('EverageCostCtrl', function($scope, $element) {
  var profit = Graphics.line($element.find('#profit')[0]);
  function plotProfit() {
    var data = _.map($scope.info.transactions, function(transaction){
      return {
        date: transaction.date,
        value: transaction.profit
      }
    });
    profit.plot(data, {
      title: 'Profit %',
      yax_units: '%',
      color: '#8C001A',
      baselines: [{ value: 0, label: ''}],
    });
  }

  $scope.$watch(function() {
    return _.get($scope.info, 'transactions.length');
  }, function() {
    if(_.has($scope.info, 'transactions.length')) {
      plotProfit();
    }
  });
});
