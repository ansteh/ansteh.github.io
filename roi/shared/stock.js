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

  function compress(delimiter) {
    var data = DP.batch(_.cloneDeep(filteredData), delimiter, access);
    return _.map(data, function(batch) {
      return _.last(batch);
    });
  };

  function everageCost(data, delimiter, investment, transactionCost) {
    var batches = DP.batch(data, delimiter, access);

    var transactions = _.map(batches, function(batch) {
      var state = _.last(batch);
      if(!state) return {};
      var shares = _.floor(investment/state.close);
      return _.assign({}, state, {
        shares: shares,
        investment: shares*state.close
      });
    });

    var last = _.last(transactions);
    var totaleShares = _.sumBy(transactions, function(transaction) {
      return transaction.shares;
    });
    var totalInvestment = _.sumBy(transactions, function(transaction) {
      return transaction.investment;
    });
    var currentValue = last.close*totaleShares;
    var rate = Math.pow(currentValue/investment, 1/transactions.length)-1;

    return {
      delimiter: delimiter,
      shares: totaleShares,
      currentValue: currentValue,
      totalInvestment: totalInvestment,
      growth: currentValue/totalInvestment,
      rate: rate,
      transactions: transactions,
    };
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
  var optimum = setOptimum();
  // console.log(data);

  // console.log(DP.increment(new Date(), 'month'));
  // console.log(DP.delimit(new Date(), moment().add(5, 'month').toDate(), 'month'));
  // console.log(DP.batch(data, 'month', access));

  return {
    data: data,
    filteredData: filteredData,
    access: access,
    filter: filter,
    compress: compress,
    getAmount: getAmount,
    getEnd: getEnd,
    getStart: getStart,
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
