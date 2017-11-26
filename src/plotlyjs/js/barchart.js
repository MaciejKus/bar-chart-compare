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

  var dataSet = [
    {
      x: ticks,
      y: data,
      type: 'bar',
      marker: {
        color: jsonData.colors.bar,
        line: {
          color: jsonData.colors.border,
          width: jsonData.colors.borderWidth
        }
      }
    }
  ];

  var options = {
    xaxis: {
      title: jsonData.labels.xAxis 
    },
    yaxis: {
      title: jsonData.labels.yAxis 
    },
    title: jsonData.labels.title
  };
  
  var graphDiv = document.getElementById('barChart');
  Plotly.plot( graphDiv, dataSet, options);
}
