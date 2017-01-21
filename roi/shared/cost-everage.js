var Cost = {};

Cost.accumulate = function(transactions, keys) {
  return _.map(transactions, function(transaction, index) {
    if(index === 0) {
      _.forEach(keys, function(key) {
        _.set(transaction, 'total'+key, transaction[key]);
      });
    } else {
      let previous = transactions[index-1];
      _.forEach(keys, function(key) {
        var totalKey = 'total'+key;
        _.set(transaction, totalKey, previous[totalKey]+transaction[key]);
      });
    }
    transaction.profit = transaction.price*transaction.totalshares/transaction.totalinvestment;
    transaction.profit -= 1;
    transaction.profit *= 100;
    return transaction;
  });
};

Cost.everage = _.curry(function(getPrice, data, investment) {
  var transactions = _.map(data, function(batch) {
    var state = _.last(batch);
    if(!state) return {};
    var price = getPrice(state);
    var shares = _.floor(investment/price);
    return _.assign({}, state, {
      price: price,
      shares: shares,
      investment: shares*price
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
    shares: totaleShares,
    currentValue: currentValue,
    totalInvestment: totalInvestment,
    growth: currentValue/totalInvestment,
    rate: rate,
    transactions: Cost.accumulate(transactions, ['shares', 'investment']),
  };
});
