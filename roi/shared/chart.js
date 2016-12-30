MG.add_hook('global.before_init', function(args) {
    // console.log("About to initialize a chart");
});

function xPosition(args, index, series) {
  series = series || 0;
  if(_.has(args, 'data.'+series+'.'+index)) {
    var data = args.data[series][index];
    return args.scales.X(data[args.x_accessor]);
  }
}

function yPosition(args, index, series) {
  series = series || 0;
  if(_.has(args, 'data.'+series+'.'+index)) {
    var data = args.data[series][index];
    return args.scales.Y(data[args.y_accessor]);
  }
}

function getPosition(args, point) {
  return {
    x: args.scales.X(point[args.x_accessor]),
    y: args.scales.Y(point[args.y_accessor])
  };
}

function drawLine(svg, color, start, end) {
  return svg.append("line")
    .attr("x1", start.x)
    .attr("y1", start.y)
    .attr("x2", end.x)
    .attr("y2", end.y)
    .attr("class", "trend")
    .attr("stroke-width", 1)
    .attr("stroke", color);
}

function drawTrends(trendType, args, draw) {
  if(_.has(args, 'trends.'+trendType)) {
    _.forEach(args.trends[trendType], function(trend) {
      var start = getPosition(args, _.first(trend));
      var end = getPosition(args, _.last(trend));
      draw(start, end);
    });
  }
}

MG.add_hook('line.after_init', function(chart) {
  var args = chart.args;
  // console.log('chart', chart);
  // console.log('args', args);

  if(args.plot_rising_trends) {
    // console.log(xPosition(args, 0, 0));
    // console.log(yPosition(args, 0, 0));
    // console.log('plot_rising_trends!', args.plot_rising_trends);

    var start = getPosition(args, _.first(args.plot_rising_trends));
    var end = getPosition(args, _.last(args.plot_rising_trends));

    var svg = d3.select(args.target).select('svg');
    // console.log(svg.selectAll("path"));
    var line = svg.select('.mg-line1');
    // console.log('line', line.attr("x1", 5)[0][0]);
    //http://bl.ocks.org/d3noob/5d621a60e2d1d02086bf
    // line.style("opacity", 0);

    svg.selectAll(".trend").remove();

    // var line = svg.append("line")
    //   .attr("x1", start.x)
    //   .attr("y1", start.y)
    //   .attr("x2", end.x)
    //   .attr("y2", end.y)
    //   .attr("class", "trend")
    //   .attr("stroke-width", 1)
    //   .attr("stroke", "black");

    console.log(args.trends);

    drawTrends('upper', args, function(start, end) {
      drawLine(svg, 'green', start, end);
    });

    drawTrends('down', args, function(start, end) {
      drawLine(svg, 'red', start, end);
    });
  }
});

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
      //markers: markers,
      min_y: min_y,
      plot_rising_trends: [_.first(data), _.last(data)],
      trends: stock.getTrends()
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
