# Basic bar chart

This example is a basic bar chart. In this example, we will explain:

- how to add bars to the container

The other part would be the same as basic line chart

- how to create the container
- how to add x-Axis and y-Axis
- how to add label for x-Axis and y-Axis

## Prepare the data

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

## Create the javascript file

See the app.js. We will add all javascript code that draw the line chart here.

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
const xAccessor = (d) => parseInt(d.data)
const yAccessor = (d) => parseInt(d.value)
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

```javascript
const yScale = d3
  .scaleLinear()
  .domain(d3.extent(dataset, yAccessor))
  .range([dimensions.ctrHeight, 0])
  .nice()

const xScale = d3
  .scaleLinear()
  .domain(d3.extent(dataset, xAccessor))
  .range([0, dimensions.ctrWidth])
```

## Create the bars

### Create the bin and new data set

d3.bin() will create a bin function which will group the data. The result of bin would like:

```
[
  Array(data),
  [{ data1 }, { data2 } ... { dataN }, x0: 0, x1: 5]
]
```

The x0 and x1 is the range of the bin.

```javascript
const bin = d3
  .bin()
  .domain(xScale.domain())
  .value(xAccessor)
  .thresholds(xScale.ticks())

const newDataSet = bin(dataset)
```

### Create the new yScale

Since the new dataset have an array, we use the mean of the data here. You could write your own yAccessor as you like.

d3.max() will find the max value in an array, the second param is accessor. The accessor is optional.

```javascript
const yAccessor = (d) => d3.mean(d, (data) => data.value)

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(newDataSet, yAccessor)])
  .range([dimensions.ctrHeight, 0])
  .nice()
```

### Use nice for the xScale

We use the nice() function for the scale. What it does is make the domain looks better. If the result is [0.21213, 0.89993], the nice function will change it to [0.2, 0.9]. As we are going to use the ticks of the scale as the width, the nice() function is necessary for the xScale.

```javascript
const xScale = d3
  .scaleLinear()
  .domain(d3.extent(dataset, xAccessor))
  .range([0, dimensions.ctrWidth])
  .nice()
```

### Create the rectangle

Use the newDataSet to create the rectangles. Set the x, y, width, height, fill and you could see them shown in the right place with right color.

```javascript
ctr
  .selectAll('rect')
  .data(newDataSet)
  .join('rect')
  .attr('fill', 'Brown')
  .attr('x', (d) => xScale(d.x0) + dimensions.padding)
  .attr('y', (d) => yScale(yAccessor(d)))
  .attr('width', (d) =>
    d3.max([0, xScale(d.x1) - xScale(d.x0) - dimensions.padding * 2])
  )
  .attr('height', (d) => dimensions.ctrHeight - yScale(yAccessor(d)))
```

## Create the axis

Create xAxis and yAxis. The yAxis use the axisLeft and added a $ before the value. The xAxis use the axisBottom and added a # before the value, and the xAxis need to be moved to the bottom of the screen manually cause the top left is the (0, 0) in svg.

```javascript
const yAxis = d3.axisLeft(yScale).tickFormat((d) => `$${d}`)
ctr.append('g').call(yAxis)

const xAxis = d3.axisBottom(xScale).tickFormat((d) => `#${d}`)

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
  .html('Prices')
  .style('transform', 'rotate(270deg)')
  .style('text-anchor', 'middle')

xAxisGroup
  .append('text')
  .attr('x', dimensions.ctrWidth / 2)
  .attr('y', dimensions.margin - 10)
  .attr('fill', 'black')
  .text('Index')
```
