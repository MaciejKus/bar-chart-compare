'use strict';
// set the dimensions of the canvas
var titlePadding = 20;
var margin = {top: 20, right: 20, bottom: 70, left: 60},
    width = window.innerWidth - margin.left - margin.right - titlePadding,
    height = window.innerHeight - margin.top - margin.bottom - titlePadding;

//add a tool tip/label that will be shown when mouseover a bar
var div = d3.select('body')
  .append('div')
  .attr('class', 'toolTip');

// set the ranges
var x = d3.scaleBand()
          .padding(0.1)
          .range([0, width]);

var y = d3.scaleLinear()
          .range([height, 0]);

// add the SVG element
var svg = d3.select('#barChart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 
          'translate(' + margin.left + ',' + margin.top + ')');
    
// load the data
d3.json('../data.json', function(error, jsonData) {
  if(error) console.warn(error);
  var data = jsonData.data;
  var labelData = jsonData.labels;

  // scale the range of the data
  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  // Add bar chart
  svg.selectAll('.bar')
      .data(data)
    .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return x(d.name); })
      .attr('width', x.bandwidth())
      .attr('y', function(d) { return y(d.value); })
      .attr('height', function(d) { return height - y(d.value); })
      .attr('fill', jsonData.colors.bar)
      .attr('stroke', jsonData.colors.border)
      .attr('stroke-width', jsonData.colors.borderWidth)
      .on('mousemove', function(d){
         div.style('left', d3.event.pageX+10+'px');
         div.style('top', d3.event.pageY-25+'px');
         div.style('display', 'inline-block');
         div.html((d.name) + '<br>' + (d.value) + 'KB');
      })
      .on('mouseout', function(d){
         div.style('display', 'none');
      });

  // add the x Axis
  svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

  // add x Axis label
  svg.append('text')
      .attr('transform', 'translate(' + (width/2) + ',' + (height + margin.top + titlePadding) + ')')
      .style('text-anchor', 'middle')
      .text(labelData.xAxis)

  // add the y Axis
  svg.append('g')
      .call(d3.axisLeft(y));

  // add y Axis label
  svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', titlePadding - margin.left) 
      .attr('x', 0 - (height / 2))
      .style('text-anchor', 'middle')
      .text(labelData.yAxis)

  // add the title
  svg.append('text')
      .attr('transform', 'translate(' + (width/2) + ',0)')
      .style('text-anchor', 'middle')
      .text(labelData.title)



});
