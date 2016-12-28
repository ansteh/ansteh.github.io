var Trends = _.curry(function(getValue, series) {

  var values = _.map(series, getValue);

  var peakIndices = Interior.findAllPeaks(values);
  var peakValues = _.map(peakIndices, function(index) { return values[index]; });

  var valleyIndices = Interior.findAllValleys(values);
  var valleyValues = _.map(valleyIndices, function(index) { return values[index]; });

  // console.log(valleyValues);

  var aggragetUpperTrends = function() {
    var trend = [];
    return _.reduce(valleyIndices, function(trends, valleyIndex, index) {
      if(trend.length === 0) {
        trend.push(valleyIndex);
      } else {
        if(values[index] > values[_.last(trend)]) {
          trend.push(valleyIndex);
        } else {
          trends.push(trend);
          trend = [valleyIndex];
        }
      }
      return trends;
    }, []);
  };

  var upperTrends = _.chain(aggragetUpperTrends())
  .filter(function(trend) {
    return trend.length > 1;
  })
  .map(function(trend) {
    return _.map(trend, function(index) {
      return values[index];
    });
  })
  .value();

  var aggragetDownTrends = function() {
    var trend = [];
    return _.reduce(peakIndices, function(trends, peakIndex, index) {
      if(trend.length === 0) {
        trend.push(peakIndex);
      } else {
        if(values[index] < values[_.last(trend)]) {
          trend.push(peakIndex);
        } else {
          trends.push(trend);
          trend = [peakIndex];
        }
      }
      return trends;
    }, []);
  };

  var downTrends = _.chain(aggragetDownTrends())
  .filter(function(trend) {
    return trend.length > 1;
  })
  .map(function(trend) {
    return _.map(trend, function(index) {
      return values[index];
    });
  })
  .value();

  return {
    upper: upperTrends,
    down: downTrends
  };

});
