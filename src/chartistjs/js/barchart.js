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
  var values = jsonData.data.map(function(d) {
    //we return an object with a 'meta' value for the mouseover tool tip
    //if we were not using the tool tip plugin 
    //(https://github.com/tmmdata/chartist-plugin-tooltip)
    //there we could just return d.value;
    return {
      meta: d.name,
      value: d.value
    };
  })

  var labels = jsonData.data.map(function(d) {
    return d.name;
  })

  var data = {
    labels: labels,
    //note, this must be inside an array
    series: [values]
  };

  var options = {
    chartPadding: {
        top: 20,
        right: 0,
        bottom: 20,
        left: 20
    },
    axisY: {
      //by default axis can have floats
      onlyInteger: true
    },
    plugins: [
        Chartist.plugins.tooltip(),
        Chartist.plugins.ctAxisTitle({
          axisX: {
            axisTitle: jsonData.labels.xAxis,
            offset: {
               x: 0,
               y: 40
             },
             textAnchor: 'middle'
          },
          axisY: {
            axisTitle: jsonData.labels.yAxis,
            offset: {
               x: 10,
               y: 15 
             },
             textAnchor: 'middle',
             flipTitle: true
          }
        })
      ]
  };

  new Chartist.Bar('#barChart', data, options);
}
