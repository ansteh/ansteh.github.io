var Interior = (function() {

  function chain(iteratee) {
    return function(series) {
      var previous, value, result;
      var collection = _.map(series, function(data, index) {
        value = data;
        if(index === 0) {
          result = 0;
        } else {
          result = iteratee(value, previous);
        }
        previous = value;
        return result;
      });
      collection.shift();
      return collection;
    };
  };

  var dif = chain(function(a, b) {
    return a-b;
  });

  var sign = chain(function(a, b) {
    return Math.sign(a)-Math.sign(b);
  });

  var findAllExtrema = _.curry(function(diffs, series) {
    var min = _.min(series)-1;
    series.unshift(min);
    series.push(min);
    var difSign = sign(dif(series));
    console.log(difSign);
    return _.reduce(difSign, function(collector, value, index) {
      if(_.includes(diffs, value)) {
        collector.push(index);
      }
      return collector;
    }, []);
  });

  return {
    findAllPeaks: findAllExtrema([-1, -2]),
    findAllValleys: findAllExtrema([1, 2])
  };
}());

console.log(Interior.findAllPeaks([2.3, 2, 2.5, 2.7, 2.4, 2, 1.7, 4, 3.9, 4, 3.5, 3.3, 4]));
// console.log(Interior.findAllValleys([2.3, 2,2.5,2.7,2.4,2,1.7,4,3.9,4,3.5,3.3,4]));
// console.log(Interior.findAllPeaks([1, 1, 1, 1, 1]));
