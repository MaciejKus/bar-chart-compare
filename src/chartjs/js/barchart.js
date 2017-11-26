'use strict';

// Chart.js does not have a way to load JSON
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

//wrap everything in a function to be called
//when JSON data loads
//another option would be to create the chart and then
//call .update() on the chart to rerender it once the data loads
function drawChart(jsonData) {
  //get canvas element
  var ctx = document.getElementById('barChart').getContext('2d');

  //chart.js expects the labels to be an array
  var labels = jsonData.data.map(function(d) {
    return d.name;
  });
  //chart.js expects the values to be an array
  var values = jsonData.data.map(function(d) {
    return d.value;
  })
  var data = {
    labels: labels,
    //we can have many overlaping datasets
    datasets: [{
      borderColor: jsonData.colors.border,
      borderWidth: jsonData.colors.borderWidth,
      backgroundColor: jsonData.colors.bar,
      label: jsonData.labels.yAxis,
      data: values
    }]
  };

  //create the chart
  var chart = new Chart(ctx, {
    type: 'bar',
    data: data,
    //by default title is not displayed
    options: {
      title: {
        display: true,
        text: jsonData.labels.title
      }
    }
  });
};
