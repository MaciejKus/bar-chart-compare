'use strict';

//load json using d3
d3.json('../data.json', function(error, jsonData) {
  if(error) console.warn(error);

  //set initial dimensions 
  var margin = {top: 20, right: 20, bottom: 70, left: 60},
  width = window.innerWidth - margin.left - margin.right ,
  height = window.innerHeight - margin.top - margin.bottom;

  var data = jsonData.data.map(function(d) {
    return d.value;
  });

  //xaxis labels
  var ticks = jsonData.data.map(function(d) {
    return d.name;
  });

  //the first object in the data array is the label
  var xLabel = jsonData.labels.title;
  data.unshift(xLabel)

  var graph = c3.generate({
    bindto: '#barChart',
    size: {
      height: height,
      width: width
    },
    data: {
      columns: [
        data
      ],
      type: 'bar'
    },
    color: {
      pattern: [jsonData.colors.bar],
    },
    axis: {
      x: {
        label: {
          text: jsonData.labels.xAxis,
          position: 'outer-right'
        },
        type: 'category',
        categories: ticks
      },
      y: {
        label: jsonData.labels.yAxis
      }
    }
  });

  //listen for window resize
  window.addEventListener('resize', function() {
    width = window.innerWidth - margin.left - margin.right ,
    height = window.innerHeight - margin.top - margin.bottom;
    graph.resize({
      height: height,
      width: width
    });
  })

  //use d3 to change the border width and color
  d3.select('#barChart').selectAll('.c3-bar')
    .style('stroke', jsonData.colors.border)
    .style('stroke-width', jsonData.colors.borderWidth)
})
