'use strict';

// load the JSON data
// float relies on jQuery, so we use that
$.ajax({
  'url': '../data.json',
  'dataType': 'json',
  'success': drawChart
})


function drawChart(jsonData) {
  //bar data
  var data = [];
  //xAxis labels
  var ticks = [];
  jsonData.data.forEach(function(d, i) {
    //we use i to plot along the xAxis
    data.push([i, d.value]);
    ticks.push([i, d.name]);
  });

  var dataSet = [
    {
      label: jsonData.labels.title,
      data: data,
      color: jsonData.colors.bar
    }
  ];

  var options = {
    series: {
      bars: {
        show: true
      }
    },
    bars: {
      align: 'center',
      barWidth: 0.9 //in xAxis units, not pixles
    },
    xaxis: {
      //axis labels require axisLabel plugin
      axisLabel: jsonData.labels.xAxis,
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 16,
      axisLabelPadding: 8,
      ticks: ticks
    },
    yaxis: {
      axisLabel: jsonData.labels.yAxis,
      axisLabelUseCanvas: true,
      axisLabelPadding: 8,
      axisLabelFontSizePixels: 16
    },
    grid: {
      //must be true for tooltip plugin to work
      hoverable: true
    },
    //tooltip plugin
    tooltip: {
      show: true,
      content: "%x <p> %yKB"
    }
  };

  var graphDiv = $('#barChart');
  var plot = $.plot(graphDiv, dataSet, options);
};
