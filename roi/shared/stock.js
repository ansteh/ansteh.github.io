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
