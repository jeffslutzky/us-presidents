$(function() {
  $.getJSON('', function(data){
    retirements(data);
  });

});

function retirements(presidents){
  var data = presidents;

  var margin = {top: 20, right: 20, bottom: 180, left: 80},
      width = 1100 - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .domain(data.names)
      .rangeBands([0, width], .1);

  var y = d3.scale.linear()
    .domain([0, Math.ceil(d3.max(data.days)/1000)*1000])
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

  var svg = d3.select(".container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  var barWidth = width / data.days.length;

  svg.selectAll("rect")
      .data(data.days)
    .enter().append("rect")
    // this might be affected:
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; })
      .attr("y", function(d) { return y(d); })
      .attr("height", function(d) { return height - y(d) + 1; })
      .attr("width", barWidth - 1)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.9em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-50)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-6em")
      .attr("dx","-15em")
      .style("text-anchor", "end")
      .text("Days");

  var sortOrder = false;

  var sortBars = function() {
    svg.selectAll("rect")
      .sort(function(a, b) {
        if (sortOrder) {
          return d3.descending(a, b);
        } else {
          return d3;
        }
       })
      .transition()
      .duration(1000)
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; })

    svg.select(".x.axis")
    .call(xAxis)
    .selectAll(".tick")
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.9em")
      .attr("dy", ".25em")
      .attr("transform", "rotate(-50)" );
  };


  $("#descending").on("click", function(){
   sortOrder = true;
   sortBars();
  });

  $("#chronological").on("click", function(){
    sortOrder = false;
    sortBars();
   });
  };
