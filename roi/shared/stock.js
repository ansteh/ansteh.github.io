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

  var access = function(point) {
    return point.date;
  };

  var getStart = function() {
    var start = _.get(_.first(series), '0');
    return moment(start,'YYYY-MM-DD').toDate();
  };

  var getEnd = function() {
    var end = _.get(_.last(series), '0');
    return moment(end,'YYYY-MM-DD').toDate();
  };

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

  function compress(delimiter) {
    return DP.groupBy(data, delimiter, access);
  };

  console.log(DP.increment(new Date(), 'month'));
  console.log(DP.delimit(new Date(), moment().add(5, 'month').toDate(), 'month'));
  console.log(DP.batch(data, 'month', access));

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
    },
    getEnd: getEnd,
    getStart: getStart
  };
};
