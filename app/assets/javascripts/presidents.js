$(function() {
  $.getJSON('', function(data){
    index = 3;
    chart(data);
    $("select").change(function(event){
      event.preventDefault();
      index = parseInt($("#chart").val()) + 2
      $("svg").remove();
      $(".d3-tip").remove();
      $("#chronological").prop("checked", true);
      chart(data);
    });
  });

});

function chart(data){
  d3.json("index.json", function(error, data) {

    var margin = {top: 20, right: 20, bottom: 180, left: 80},
        width = 1100 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;

    var xScale = d3.scale.ordinal()
        .domain(data.map(function(d) { return d[1]; } ))
        .rangeBands([0, width]);

    var yScale = d3.scale.linear()
      .domain([0, Math.ceil(d3.max(data, function(d) { return d[index] } )/1000)*1000])
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
        return d[1] + ": " + d[index] + " days<br/>(" + d3.round(d[index]/365.0, 2) + " years)";
      })

    var svg = d3.select(".container")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.9em")
          // .attr("dy", ".25em")
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
        .attr("transform", function(d, i) { return "translate(" + i * xScale.rangeBand() + ",0)"; })
        .attr("y", function(d) { return yScale(d[index]); })
        .attr("height", function(d) { return height - yScale(d[index]) + 1; })
        .attr("width", xScale.rangeBand()-1)
        .attr("fill", function(d) {
          if (d[2]==true) {
            return "red"
          } else {
            return "blue"
          }
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    var sortOrder = false;

    var sortBars = function() {

      if (sortOrder) {
        var sorted = data.sort(function(a, b) {
          return d3.descending(a[index], b[index]);
        })
      } else {
        var sorted = data.sort(function(a, b) {
          return d3.ascending(a[0], b[0])
        })
      };

      xScale.domain(sorted.map(function(d) {
        return d[1];
      }));

      svg.selectAll("rect")
        .sort(function(a, b) {
          if (sortOrder) {
            return d3.descending(a[index], b[index]);
          } else {
            return d3.ascending(a[0], b[0]);
          }
        });

      var transition = svg.transition().duration(750),
        delay = function(d, i) {
          return i * 500;
        };

      transition.select(".x.axis")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.9em")
        // .attr("dy", ".25em")
        .attr("transform", "rotate(-50)");

      transition.selectAll("rect")
        .attr("transform", function(d, i) {
          return "translate(" + i * xScale.rangeBand() + ",0)";
        });

    };

    $("#descending").on("click", function(){
      sortOrder = true;
      sortBars();
    });

    $("#chronological").on("click", function(){
      sortOrder = false;
      sortBars();
    });

})};
