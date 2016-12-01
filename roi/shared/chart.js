var Graphics = {};

Graphics.stock = function(anchor, stock){

  var plot = function(start, end, delimiter) {
    var data;
    if(start) {
      data = stock.filter(start, end);
    } else {
      data = stock.filteredData;
    }

    var markers = [];
    var optimum = stock.getOptimum();
    if(_.has(optimum, 'min')) markers.push(optimum.min);
    if(_.has(optimum, 'max')) markers.push(optimum.max);

    // console.log('markers', _.last(markers));
    var min_y = _.minBy(data, function(item) {
      return item.close;
    }).close;

    MG.data_graphic({
      // data: [data, stock.compress('month')],
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

  // var batch = function(delimiter) {
  //   MG.data_graphic({
  //     data: stock.compress('month'),
  //     area: false,
  //     full_width: true,
  //     target: document.getElementById('batched'),
  //     x_accessor: 'date',
  //     y_accessor: 'close'
  //   });
  // }

  return {
    plot: plot
  };
};
