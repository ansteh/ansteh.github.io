app.directive('everageCost', function(){
  return {
    restrict: 'E',
    templateUrl: 'client/everage-cost/tpl.html',
    controller: 'EverageCostCtrl',
    scope: {
      info: "="
    }
  };
});
