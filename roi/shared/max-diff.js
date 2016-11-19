var maxDiff = function(data) {
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
