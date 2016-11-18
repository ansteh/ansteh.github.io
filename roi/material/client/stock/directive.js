app.directive('stock', function(){
  return {
    restrict: 'E',
    templateUrl: 'client/stock/tpl.html',
    scope: { name: "=" },
    controller: 'StockCtrl'
  };
});
