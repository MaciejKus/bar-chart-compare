'use strict';

//amcharts has a data loader plugin, but it does not 
//work with nested JSON
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
  console.log(jsonData);
  //make data object
  var data = jsonData.data.map(function(d) {
    return {'value': d.value, 'name': d.name};
  });

  AmCharts.makeChart( 'barChart', {
    'type': 'serial',
    'categoryField': 'name',
    'dataProvider': data,
    'titles': [
      {
        'text': jsonData.labels.title
      }
    ],
    'valueAxes': [
      {
        'title': jsonData.labels.yAxis
      }
    ],
    'categoryAxis': {
        'title': jsonData.labels.xAxis
    },
    'graphs': [
      {
        'balloonText': '[[name]]: <p>[[value]]KB',
        'fillAlphas': 0.8,
        'fillColors': jsonData.colors.bar,
        'lineAlpha': 1,
        'lineColor': jsonData.colors.border,
        'lineThickness': jsonData.colors.borderWidth,
        'valueField': 'value',
        'type': 'column'
      }
    ],
    'export': {
      'enabled': true
    }
  })
}
