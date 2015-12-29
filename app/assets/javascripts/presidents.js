$(document).on('page:change', function() {
  $.getJSON('', function(data){
    retirements(data);
  });

});

function retirements(data){
  d3.json("index.json", function(error, data) {

  var margin = {top: 20, right: 20, bottom: 180, left: 80},
      width = 1100 - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom;

  var xScale = d3.scale.ordinal()
      .domain(data.map(function(d) { return d[1] } ))
      .rangeBands([0, width], .1);

  var yScale = d3.scale.linear()
    .domain([0, Math.ceil(d3.max(data, function(d) { return d[2] } )/1000)*1000])
    .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(10);

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return d[2] + " days";
    })

  var svg = d3.select(".container")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  var barWidth = width / data.length;

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

  svg.selectAll("rect")
      .data(data)
    .enter().append("rect")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; })
      .attr("y", function(d) { return yScale(d[2]); })
      .attr("height", function(d) { return height - yScale(d[2]) + 1; })
      .attr("width", barWidth - 1)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  // d3.select("#descending").on("click", change);
  //
  // var sortTimeout = setTimeout(function() {
  //   d3.select("#descending").property("checked", true).each(change);
  // }, 2000);
//
//   function change() {
//     clearTimeout(sortTimeout);
// debugger;
//     var x0 = x.domain(data.sort(this.checked
//         ? function(a, b) { return b[2] - a[2]; }
//         : function(a, b) { return a[2] - b[2]; })
//         .map(function(d) { return d[1]; }))
//         .copy();
//
//     svg.selectAll("rect")
//         .sort(function(a, b) { return x0(a[0]) - x0(b[0]); });
//
//     var transition = svg.transition().duration(750),
//         delay = function(d, i) { return i * 50; };
//
//     transition.selectAll("rect")
//         .delay(delay)
//         .attr("x", function(d) { return x0(d[1]); });
//
//     transition.select(".x.axis")
//         .call(xAxis)
//       .selectAll("g")
//         .delay(delay);
//   }

})};



//
//   var sortOrder = false;
//
//   var sortBars = function() {
//     svg.selectAll("rect")
//       .sort(function(a, b) {
//         if (sortOrder) {
//           return d3.descending(a, b);
//         } else {
//           return d3;
//         }
//        })
//       .transition()
//       .duration(1000)
//       .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });
//
//       svg.select(".x.axis").selectAll("g")
//         .sort(function(a, b) {
//           if (sortOrder) {
//             return d3.ascending(a.id, b.id);
//           } else {
//             return d3;
//           }
//          })
//         .transition()
//         .duration(1000)
//         .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; })
//
//     };
//
//   $("#descending").on("click", function(){
//     sortOrder = true;
//     sortBars();
//   });
//
//   $("#chronological").on("click", function(){
//     sortOrder = false;
//     sortBars();
//   });
// };
