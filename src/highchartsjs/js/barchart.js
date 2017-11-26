'use strict';

// load the JSON data
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', '../data.json', true); 
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == '200') {
          var data = JSON.parse(xobj.responseText);
          callback(data);
        }
  };
  xobj.send(null);  
}

loadJSON(drawChart);

function drawChart(jsonData) {
  //make data array
  var data = jsonData.data.map(function(d) {
    return d.value;
  });

  //xaxis labels array
  var ticks = jsonData.data.map(function(d) {
    return d.name;
  });
  

  var myChart = Highcharts.chart('barChart', {
        chart: {
            type: 'column' //'bar' creates horizontal chart
        },
        title: {
            text: jsonData.labels.title
        },
        xAxis: {
            categories: ticks
        },
        yAxis: {
            title: {
                text: jsonData.labels.yAxis
            }
        },
        series: [{
            name: jsonData.labels.title,
            data: data,
            color: jsonData.colors.bar,
            borderColor: jsonData.colors.border,
            borderWidth: jsonData.colors.borderWidth
        }]
    });
}
