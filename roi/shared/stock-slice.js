var StockSlice = function(stock) {
  var data = stock.data, start, end, optimum, amount;

  function slice(left, right) {
    start = left;
    end = right;
    data = DP.slice(stock.data, start, end, stock.access);
    return data;
  };

  var updateOptimum = function() {
    optimum = maxDiff(filteredData);
    _.set(optimum, 'min.label', 'BUY: '+_.get(optimum, 'min.close'));
    _.set(optimum, 'max.label', 'SELL: '+_.get(optimum, 'max.close'));
    return optimum;
  };

  return {

  };
};
