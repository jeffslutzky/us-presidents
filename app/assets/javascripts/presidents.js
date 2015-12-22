$(function() {
  $.getJSON('', function(data){
  makeChart(data);
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
  var myBarChart = new Chart(ctx).Bar(data);
};
