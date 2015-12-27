$(function() {
  $.getJSON('', function(data){
  retirementsChronological(data);
  });
});


function retirementsChronological(presidents){
  var data = presidents.days;

  var margin = {top: 20, right: 20, bottom: 180, left: 80},
      width = 1100 - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .domain(presidents.names)
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
    .domain([0, Math.ceil(d3.max(data)/1000)*1000])
    .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10);

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return d + " days";
    })

  var chart = d3.select("#myChart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  chart.call(tip);

  var barWidth = width / data.length;

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

  bar.append("rect")
      .attr("y", function(d) { return y(d); })
      .attr("height", function(d) { return height - y(d) + 1; })
      .attr("width", barWidth - 1)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".55em")
        .attr("transform", "rotate(-50)" );

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-6em")
      .attr("dx","-15em")
      .style("text-anchor", "end")
      .text("Days");
};
