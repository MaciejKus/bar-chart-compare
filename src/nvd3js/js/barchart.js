'use strict';

//use d3 to load json data
d3.json('../data.json', function(error, jsonData) {
  if(error) consolw.warn(error);

  //set initial dimensions of svg element
  var margin = {top: 20, right: 20, bottom: 70, left: 60},
  width = window.innerWidth - margin.left - margin.right ,
  height = window.innerHeight - margin.top - margin.bottom;

  var chart = nv.models.discreteBarChart()
      .margin({left: 100})
      .x(function(d) { return d.name })    
      .y(function(d) { return d.value })
      .color([jsonData.colors.bar]) //must be a function or array of colors
      .rectClass('addBorders') //css class to add borders
      .showValues(false)   
      .showYAxis(true)
      .showXAxis(true);

  chart.xAxis
    .axisLabel(jsonData.labels.xAxis);

  chart.yAxis
    .tickFormat(d3.format(',r')) //integers
    .axisLabel(jsonData.labels.yAxis);

  d3.select('#barChart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .datum([
        {
          key: jsonData.labels.title,
          values: jsonData.data
        }
      ])
      .call(chart);

  // add the title using d3
  d3.select('#barChart').append('text')
      .attr('transform', 'translate(' + (width/2) + ',' + margin.top + ')')
      .style('text-anchor', 'middle')
      .text(jsonData.labels.title)


  nv.utils.windowResize(chart.update);

})
