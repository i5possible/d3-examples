# Basic Scatter Plot

This example is a basic line chart. In this example, we will explain:

- How to create scatter plot
- How to apply mouse events to the plot

We need to create several files:

- html
- app.js
- style.css
- data-generator.js
- data.csv

## Prepare the data

The data is a little bit different from the previous examples. We need at least three dimensions to create a scatter plot.

Run node data-generator.js or user the given data.csv.

## Create the html file

See the index.html. It contains an empty div to show the line chart we are going to build. And we set the id of this div to `chart` to use it easily.

We added the links to the css files:

```css
    <link rel="stylesheet" href="style.css" />
```

And script files:

```html
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script src="./app.js"></script>
```

And some Dom elements:

```html
<div id="chart">
  <div id="tooltip">
    <div class="metric-index"></div>
    <div class="metric-column">Column: <span></span></div>
    <div class="metric-row">Row: <span></span></div>
  </div>
</div>
```

## Create the javascript file

See the app.js. We will add all javascript code that draw the scatter plot here.

## Load the data.csv

```javascript
const draw = async () => {
  const dataset = await d3.csv('data.csv')
  console.log(dataset)
}

draw()
```

If we open the index.html file, we could see the dataset is logged to the console.

## Prepare the data accessor

The data accessor is a function that helps d3 know how to get the target data from the dataset.

```javascript
const indexAccessor = (d) => d.index
const xAccessor = (d) => parseInt(d.column)
const yAccessor = (d) => parseInt(d.row)
```

## Prepare the container dimensions

The width and the height is used to determine the size of the chart. The margin defines the margin from the line-chart to the svg border.

If you are not familiar with svg, see [SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial).

```javascript
const dimensions = {
  width: 800,
  height: 400,
  margin: 50,
}

dimensions.ctrWidth = dimensions.width - dimensions.margin * 2
dimensions.ctrHeight = dimensions.height - dimensions.margin * 2
```

## Create the container

Select the chart div and create an svg in it. You could see a svg tag in the chart div now.

Create an g tag in the svg to draw the line. You could see a g tag in the svg.

```javascript
const svg = d3
  .select('#chart')
  .append('svg')
  .attr('width', dimensions.width)
  .attr('height', dimensions.height)

const ctr = svg
  .append('g')
  .attr('transform', `translate(${dimensions.margin}, ${dimensions.margin})`)
```

## Create the x and y scales

Using the scaleLinear() function to create scale functions to map the data to the width/height in the container.

d3.scaleLinear().rangeRound() is similar to the d3.scaleLinear().range() function. But it will round the output value to the nearest integer.

```javascript
const yScale = d3
  .scaleLinear()
  .domain(d3.extent(dataset, yAccessor))
  .rangeRound([dimensions.ctrHeight, 0])
  .nice()

const xScale = d3
  .scaleLinear()
  .domain(d3.extent(dataset, xAccessor))
  .rangeRound([0, dimensions.ctrWidth])
```

## Create the scatter plot

For each data, create an circle for it.

```javascript
ctr
  .selectAll('circle')
  .data(dataset)
  .join('circle')
  .attr('cx', (d) => xScale(xAccessor(d)))
  .attr('cy', (d) => yScale(yAccessor(d)))
  .attr('r', 5)
  .attr('fill', 'red')
```

## Create the tooltips

When the mouse is over the scatter plot, we will show the tooltip.

```javascript
.on('mouseenter', function (event, datum) {
    d3.select(this).attr('fill', 'brown').attr('r', 8)
    tooltip
        .style('display', 'block')
        .style('top', yScale(yAccessor(datum)) - 25 + 'px')
        .style('left', xScale(xAccessor(datum)) + 'px')

    tooltip.select('.metric-column span').text(xAccessor(datum))
    tooltip.select('.metric-row span').text(yAccessor(datum))

    tooltip.select('.metric-index').text(indexAccessor(datum))
})
.on('mouseleave', function (event, datum) {
    d3.select(this).attr('fill', 'red').attr('r', 5)

    tooltip.style('display', 'none')
})
```

## Create the axis

Create xAxis and yAxis.

```javascript
const yAxis = d3.axisLeft(yScale)
ctr.append('g').call(yAxis)

const xAxis = d3.axisBottom(xScale)

ctr
  .append('g')
  .style('transform', `translateY(${dimensions.ctrHeight}px`)
  .call(xAxis)
```

## Add label to the axis

Create label for yAxis and xAxis, and translate them to the right position and orientation.

```javascript
yAxisGroup
  .append('text')
  .attr('x', -dimensions.ctrHeight / 2)
  .attr('y', -dimensions.margin + 12)
  .attr('fill', 'black')
  .html('Rows')
  .style('transform', 'rotate(270deg)')
  .style('text-anchor', 'middle')

xAxisGroup
  .append('text')
  .attr('x', dimensions.ctrWidth / 2)
  .attr('y', dimensions.margin - 10)
  .attr('fill', 'black')
  .text('Columns')
```
