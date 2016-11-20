var Graphics = {};

Graphics.stock = function(anchor, stock){

  var plot = function(start, end) {
    var data;
    if(start) {
      data = stock.filter(start, end);
    } else {
      data = stock.data;
    }

    var markers = [];
    var optimum = stock.getOptimum();
    if(_.has(optimum, 'min')) markers.push(optimum.min);
    if(_.has(optimum, 'max')) markers.push(optimum.max);

    console.log('markers', _.last(markers));
    MG.data_graphic({
      //title: stock.getName(),
      data: data,
      full_width: true,
      target: anchor,
      x_accessor: 'date',
      y_accessor: 'close',
      markers: markers
    });
  };

  return {
    plot: plot
  };
};
