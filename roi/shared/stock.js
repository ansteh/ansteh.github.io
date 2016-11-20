var Stock = function(info) {
  var access = function(point) {
    return point.date;
  };

  var getStart = function() {
    var start = _.get(_.first(series), '0');
    return moment(start,'YYYY-MM-DD').startOf('day').toDate();
  };

  var getEnd = function() {
    var end = _.get(_.last(series), '0');
    return moment(end,'YYYY-MM-DD').endOf('day').toDate();
  };

  function filter(start, end) {
    filteredData = DP.slice(data, start, end, access);
    setOptimum();
    return filteredData;
  };

  var setOptimum = function() {
    optimum = maxDiff(filteredData);
    _.set(optimum, 'min.label', 'BUY: '+_.get(optimum, 'min.close'));
    _.set(optimum, 'max.label', 'SELL: '+_.get(optimum, 'max.close'));
    // console.log('setOptimum', optimum.max);
    return optimum;
  };

  function getAmount(investment) {
    return _.round(investment/optimum.min.close)
  };

  // console.log(DP.increment(new Date(), 'month'));
  // console.log(DP.delimit(new Date(), moment().add(5, 'month').toDate(), 'month'));
  // console.log(DP.batch(data, 'month', access));

  var series = _.chain(_.get(info, 'dataset.data', []))
    .reverse()
    .value();

  var data = _.map(series, function(point) {
    return {
      date: moment(point[0], 'YYYY-MM-DD').toDate(),
      close: point[4]
    }
  });

  var filteredData = data;
  var optimum = setOptimum();
  // console.log(data);

  return {
    data: data,
    filteredData: filteredData,
    access: access,
    getOptimum: function() {
      return optimum;
    },
    filter: filter,
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
