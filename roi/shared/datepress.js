var DP = {};

DP.range = function(start, end, delimiter, func) {
  var step = moment(_.clone(start));
  var limit = moment(_.clone(end));
  var pool = [];
  var index = 0;

  while(step.isSameOrBefore(limit)) {
    var value = _.clone(step.toDate());
    if(func) {
      value = func(value, index);
    }
    pool.push(value);

    if(_.isString(delimiter)) {
      step.add(1, delimiter)
    } else {
      step.add(delimiter)
    }
    index += 1;
  }

  return pool;
};

DP.increment = function(dateable, delimiter) {
  var date = _.clone(dateable);
  var isMoment = moment.isMoment(dateable);
  if(isMoment == false) {
    date = moment(date);
  }
  date.endOf(delimiter).add(1, delimiter).startOf(delimiter);
  return isMoment ? date : date.toDate();
};

DP.delimit = function(start, end, delimiter, func) {
  var step = moment(_.clone(start));
  var limit = moment(_.clone(end));
  var pool = [];
  var index = 0;

  while(step.isSameOrBefore(limit)) {
    var value = _.clone(step.toDate());
    if(func) {
      value = func(value, index);
    }
    pool.push(value);
    step = DP.increment(step, delimiter);
    index += 1;
  }

  return pool;
};

DP.groupBy = function(collection, delimiter, access) {
  return _.groupBy(collection, function(item) {
    var date = item;
    if(_.isFunction(access)) {
      date = access(item);
    } else if(_.isString(access)) {
      date =_.get(item, access);
    }
    return moment(date).get(delimiter);
  });
};

DP.batch = function(collection, delimiter, access) {
  var replication = _.cloneDeep(collection);
  if(_.isUndefined(access)) {
    access = function(x) { return x };
  }

  var start = access(_.first(replication));
  var end = access(_.last(replication));
  var limits = DP.delimit(start, end, delimiter);
  limits.shift();

  return _.reduce(limits, function(pool, limit) {
    var index = _.findIndex(replication, function(item) {
      return moment(limit).get(delimiter) === moment(access(item)).get(delimiter);
    });
    pool.push(_.take(replication, index+1));
    replication = _.slice(replication, index+1);
    return pool;
  }, []);
};
