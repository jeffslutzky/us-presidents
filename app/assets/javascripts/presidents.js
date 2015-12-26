$(function() {
  $.getJSON('', function(data){
  d3Chart(data);
  });
});

function makeChart(presidents) {
  var ctx = $("#myChart").get(0).getContext("2d");
  var data = {
    labels: presidents.names,
    datasets: [
      {
        label: 'Retirement Lengths of U.S. Presidents',
        fillColor: 'red',
        strokeColor: 'rgba(220,220,220,0.8)',
        highlightFill: 'blue',
        highlightStroke: 'rgba(220,220,220,1)',
        data: presidents.days
      }
    ]
  };
  var myBarChart = new Chart(ctx).Bar(data, {
    scaleOverride : true,
    scaleSteps : 13,
    scaleStepWidth : 1000,
    scaleStartValue : 0
  });
};


function d3Chart(presidents){
  var data = presidents.days;

  var margin = {top: 20, right: 20, bottom: 180, left: 40},
      width = 1100 - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .domain(presidents.names)
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var chart = d3.select("#myChart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var barWidth = width / data.length;

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

  bar.append("rect")
      .attr("y", function(d) { return y(d); })
      .attr("height", function(d) { return height - y(d) + 1; })
      .attr("width", barWidth - 1);
  //
  // bar.append("text")
  //     .attr("x", barWidth / 2 + 11)
  //     .attr("y", function(d) { return y(d) -17; })
  //     .attr("dy", ".75em")
  //     .text(function(d) { return d; });

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.2em")
        .attr("dy", ".55em")
        .attr("transform", "rotate(-50)" );

};
