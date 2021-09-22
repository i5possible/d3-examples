# Basic line chart

This example is a duel line chart. In this example, we will explain what is the changes we made comparing to basic-line-chart:

- increase the container's size as wanted
- add the second chart as expected, make sure we transform the chart into the right place
- make sure we have the dataset for the second chart
- add tooltip for the two charts
- add mouse event to transform the tooltip to the right place

## Prepare the data

Run node data-generator.js or user the given data.csv.

## Increase the container's size

We changed the dimensions.height to 800 to be able to display another chart, and calculate the right ctrHeight for each chart.

```javascript
const dimensions = {
  width: 800,
  height: 800,
  margin: 50,
}
dimensions.ctrHeight = dimensions.height / 2 - dimensions.margin * 2
```

## Add the html/css for the tooltip

We added the html as follow:

```html
<div id="tooltip1" class="tooltip">
  <div class="metric-x">Column: <span></span></div>
  <div class="metric-y">Row: <span></span></div>
</div>
<div id="tooltip-line1" class="tooltip-line"></div>
<div id="tooltip2" class="tooltip">
  <div class="metric-x">Column: <span></span></div>
  <div class="metric-y">Row: <span></span></div>
</div>
<div id="tooltip-line2" class="tooltip-line"></div>
```

As you can see, we prepared two tooltips as well as two tooltip-lines. Each of the tooltip contains the Row value and the column value.

And we added the css as follow:

```css
.tooltip {
  text-align: center;
  border: 1px solid #ccc;
  position: absolute;
  padding: 10px;
  background-color: #fff;
  display: none;
}

.tooltip .metric-date {
  text-decoration: underline;
}

.tooltip-line {
  position: absolute;
  display: block;
  width: 2px;
  height: 300px;
  background-color: red;
}

body {
  margin: 0;
}
```

We use the absolute position for the tooltip to be able to transform them into the right place as we want. The display of the tooltip is set to none to hide the tooltip by default.

## Add the second chart

Create another svg group to display the chart. Make sure we translate it to the right place.

```javascript
const ctr2 = svg
  .append('g')
  .attr(
    'transform',
    `translate(${dimensions.margin}, ${
      dimensions.margin + dimensions.height / 2
    })`
  )
```

Define the linerGradient color we are going to use. The linerGradient need to define the direction of the color using x1,x2,y1,y2, and dine the stop-color and offset for each color we use in the gradient.

```javascript
// use the colors to define the linearGradient
var colors = ['rgb(43, 110, 210, 1)', 'rgb(43, 110, 210, 0.25)']

var grad = svg
  .append('defs')
  .append('linearGradient')
  .attr('id', 'grad')
  .attr('x1', '0%')
  .attr('x2', '0%')
  .attr('y1', '0%')
  .attr('y2', '100%')

grad
  .selectAll('stop')
  .data(colors)
  .enter()
  .append('stop')
  .style('stop-color', function (d) {
    return d
  })
  .attr('offset', function (d, i) {
    return 100 * (i / (colors.length - 1)) + '%'
  })
```

## Add the tooltips

We need to add the tooltip and events for the line chart to show the tooltip and tooltipLine.
When the user hover on the chart, we shows the tooltips and move it to the right place.
When the mouse is off the chart, we need to change the tooltips display back to none to hide it.

```javascript
// select the tooltips
const tooltip1 = d3.select('#tooltip1')
const tooltipLine1 = d3.select('#tooltip-line1')

const tooltip2 = d3.select('#tooltip2')
const tooltipLine2 = d3.select('#tooltip-line2')

// add circle to the datapoints of the chart
ctr
  .selectAll('circle')
  .data(dataset)
  .join('circle')
  .attr('cx', (d) => xScale(xAccessor(d)))
  .attr('cy', (d) => yScale(yAccessor(d)))
  .attr('r', 5)
  .attr('fill', 'red')
  .attr('data-x', (d) => xAccessor(d))
  .classed('tooltip-dots', true)
  .on('mouseenter', function (event, datum) {
    // make the circle bigger when the mouse hover on
    d3.selectAll('.tooltip-dots')
      .filter((d) => xAccessor(d) === xAccessor(datum))
      .attr('fill', 'brown')
      .attr('r', 8)

    // show the tooltips and transform it to the right position
    tooltip1
      .style('display', 'block')
      .style('top', yScale(yAccessor(datum)) - 25 + 'px')
      .style('left', xScale(xAccessor(datum)) + 'px')

    tooltip2
      .style('display', 'block')
      .style(
        'top',
        dimensions.height / 2 + yScale(yAccessor(datum)) - 25 + 'px'
      )
      .style('left', xScale(xAccessor(datum)) + 'px')

    // show the tooltip lines and move it to the right place
    tooltipLine1
      .style('display', 'block')
      .style('top', '50px')
      .style('left', dimensions.margin + xScale(xAccessor(datum)) + 'px')

    tooltipLine2
      .style('display', 'block')
      .style('top', dimensions.height / 2 + 50 + 'px')
      .style('left', dimensions.margin + xScale(xAccessor(datum)) + 'px')

    // show the tooltip text
    tooltip1.select('.metric-x span').text(xAccessor(datum))
    tooltip1.select('.metric-y span').text(yAccessor(datum))

    tooltip2.select('.metric-x span').text(xAccessor(datum))
    tooltip2.select('.metric-y span').text(yAccessor2(datum))
  })
  .on('mouseleave', function (event, datum) {
    // make the circle smaller when the mouse leave
    d3.selectAll('.tooltip-dots').attr('fill', 'red').attr('r', 5)

    // hide the tooltips
    tooltip1.style('display', 'none')
    tooltip2.style('display', 'none')
    tooltipLine1.style('display', 'none')
    tooltipLine2.style('display', 'none')
  })
```

## Axis and label

We haven't define the axises and the label for the second chart, but we could add them for sure. Could you try it by yourself?

## Improvement

Currently the use need to put the mouse on the small dot we defined to show the tooltip, we want it to be easy to magnet the tooltip to the closest datapoint. So we need to create the area to make it happens.
