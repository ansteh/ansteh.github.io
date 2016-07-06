var Graphics = {};

Graphics.stock = function plot(anchor, stock){
  //console.log(info);
  var markers = [];
  var optimum = stock.getOptimum();
  if(_.has(optimum, 'min')) markers.push(optimum.min);
  if(_.has(optimum, 'max')) markers.push(optimum.max);

  MG.data_graphic({
    //title: stock.getName(),
    data: stock.data,
    full_width: true,
    target: anchor,
    x_accessor: 'date',
    y_accessor: 'close',
    markers: markers
  });
};
