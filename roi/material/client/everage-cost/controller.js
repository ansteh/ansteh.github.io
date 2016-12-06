app.controller('EverageCostCtrl', function($scope, $element) {
  var anchor = $element.find('#everage-cost')[0];
  var chart = Graphics.everageCost(anchor);

  $scope.$watch(function() {
    return _.get($scope.info, 'transactions.length');
  }, function() {
    if(_.has($scope.info, 'transactions.length')) {
      chart.plot($scope.info);
    }
  });
});
