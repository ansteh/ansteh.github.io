var Graphics = {};

Graphics.stock = function(anchor, stock){

  var plot = function(start, end, delimiter) {
    var data = stock.filter(start, end);

    var markers = [];
    var optimum = stock.getOptimum();
    if(_.has(optimum, 'min')) markers.push(optimum.min);
    if(_.has(optimum, 'max')) markers.push(optimum.max);

    var indices = Interior.findAllPeaks(_.map(data, 'close'));
    var points = _.map(indices, function(index) {
      return data[index];
    });
    _.forEach(points, function(point) {
      _.assign(point, { label: '' });
      markers.push(point);
    });
    // console.log(markers);

    // console.log('markers', _.last(markers));
    var min_y = _.minBy(data, function(item) {
      return item.close;
    }).close;

    MG.data_graphic({
      // data: [data, stock.compress('month'), stock.compress('year')],
      data: data,
      animate_on_load: true,
      y_scale_type: 'log',
      area: false,
      full_width: true,
      target: anchor,
      x_accessor: 'date',
      y_accessor: 'close',
      markers: markers,
      min_y: min_y
    });
  };

  return {
    plot: plot
  };
};

Graphics.everageCost = function(anchor) {

  function plot(info) {
    MG.data_graphic({
      data: info.transactions,
      animate_on_load: true,
      y_scale_type: 'log',
      area: false,
      full_width: true,
      target: anchor,
      x_accessor: 'date',
      y_accessor: 'close'
    });
    // MG.data_graphic({
    //   data: info.transactions,
    //   chart_type: 'histogram',
    //   width: 600,
    //   height: 300,
    //   right: 40,
    //   bar_margin: 0,
    //   bins: 150,
    //   target: anchor,
    //   y_extended_ticks: true,
    //   x_accessor: 'date',
    //   y_accessor: 'investment'
    // });
  };

  return {
    plot: plot
  };
};
