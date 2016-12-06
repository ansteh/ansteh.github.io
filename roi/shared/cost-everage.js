var Cost = {};

Cost.everage = _.curry(function(getPrice, data, investment) {
  var transactions = _.map(data, function(batch) {
    var state = _.last(batch);
    if(!state) return {};
    var price = getPrice(state);
    var shares = _.floor(investment/price);
    return _.assign({}, state, {
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
    transactions: transactions,
  };
});
