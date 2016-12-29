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
    if(start && end) {
      filteredData = DP.slice(data, start, end, access);
    }
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

  function compress(delimiter) {
    var data = DP.batch(_.cloneDeep(filteredData), delimiter, access);
    return _.map(data, function(batch) {
      return _.last(batch);
    });
  };

  function getPrice(point) {
    return point.close;
  };

  var costEverage = Cost.everage(getPrice);

  function everageCost(data, delimiter, investment) {
    var batches = DP.batch(data, delimiter, access);
    var info = costEverage(batches, investment);
    info.delimiter = delimiter;
    return info
  };

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

  //test
  data = compress('week');
  // data = _.take(compress('week'), 20);
  filteredData = data;

  // console.log(Detection(peakFunction, { h: 1.1 , k: 2 }, getPrice, filteredData));
  // console.log(Interior.findAllPeaks(_.map(filteredData, 'close')));
  // console.log(Trends(getPrice, filteredData));

  var optimum = setOptimum();
  // console.log(data);

  // console.log(DP.increment(new Date(), 'month'));
  // console.log(DP.delimit(new Date(), moment().add(5, 'month').toDate(), 'month'));
  // console.log(DP.batch(data, 'month', access));

  return {
    filter: filter,
    compress: compress,
    getAmount: getAmount,
    getEnd: getEnd,
    getStart: getStart,
    getTrends: function() {
      return Trends(getPrice, filteredData);
    },
    getOptimum: function() {
      return optimum;
    },
    everageCost: function(delimiter, investment) {
      return everageCost(filteredData, delimiter, investment);
    },
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
