var peakFunction = function(getValue, k, index, series) {
  var value = getValue(series[index]);
  var left = _.slice(series, _.max([0, index-k]), index);
  var right = _.slice(series, _.min([series.length, index+1]), _.min([series.length, index+k+1]));
  // console.log(index, value, left, right, series);
  return (value-_.sumBy(left, getValue)/k + value-_.sumBy(right, getValue)/k)/2;
};

var Detection = _.curry(function(produce, options, getValue, series) {
  var h = options.h || 2;
  var k = options.k || 5;

  function getMean(values) {
    return _.sum(values)/values.length;
  };

  function getVariance(values, mean) {
    return 1/(values.length-1)*_.sumBy(values, function(data) {
      return Math.pow(data-mean, 2);
    });
  }

  var locals = _.map(series, function(data, index) {
    return {
      data: data,
      value: produce(getValue, k, index, series)
    };
  });

  var createExtremaMiner = function(compare) {
    return function() {
      var extrema = _.filter(locals, function(local) {
        return compare(local.value, 0);
      });
      var values = _.map(extrema, function(local) {
        return getValue(local.data);
      });
      var mean = getMean(values);
      var variance = getVariance(values, mean);
      var treshold = mean+h*Math.sqrt(variance);
      // console.log(mean, treshold);
      peaks = _.filter(extrema, function(peak) {
        // console.log(peak.value, treshold, compare(peak.value, treshold));
        return compare(peak.value, treshold);
      });
      return peaks;
    };
  };

  var getPeaks = createExtremaMiner(function(a, b) {
    return a > b;
  });

  var getValleys = createExtremaMiner(function(a, b) {
    return a <= b;
  });

  return {
    peaks: getPeaks(),
    valleys: getValleys()
  };
});

// console.log(peakFunction(function(x) {
//   return x;
// }, 10, 4, [1,2,3,4,5,6,5,4,3,2,1]));

// console.log(Detection(peakFunction, { k: 5, h: 1.1 }, function(x) {
//   return x;
// }, [1,2,3,4,5,20,5,4,3,2,1]));
