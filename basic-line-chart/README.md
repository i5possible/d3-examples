# Basic line chart

This example is a basic line chart. In this example, we will explain:

- how to create the container
- how to add a line to the container
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
  const dataset = await d3.csv("data.csv");
  console.log(dataset);
};

draw();
```

If we open the index.html file, we could see the dataset is logged to the console.

## Prepare the data accessor

The data accessor is a function that helps d3 know how to get the target data from the dataset.

```javascript
const xAccessor = (d) => parseInt(d.data);
const yAccessor = (d) => parseInt(d.value);
```

## Prepare the container dimensions

The width and the height is used to determine the size of the chart. The margin defines the margin from the line-chart to the svg border.

If you are not familiar with svg, see [SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial).

```javascript
const dimensions = {
  width: 800,
  height: 400,
  margin: 50,
};

dimensions.ctrWidth = dimensions.width - dimensions.margin * 2;
dimensions.ctrHeight = dimensions.height - dimensions.margin * 2;
```

## Create the container

Select the chart div and create an svg in it. You could see a svg tag in the chart div now.

Create an g tag in the svg to draw the line. You could see a g tag in the svg.

```javascript
const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", dimensions.width)
  .attr("height", dimensions.height);

const ctr = svg
  .append("g")
  .attr("transform", `translate(${dimensions.margin}, ${dimensions.margin})`);
```

## Create the x and y scales

Using the scaleLinear() function to create scale functions to map the data to the width/height in the container.

```javascript
const yScale = d3
  .scaleLinear()
  .domain(d3.extent(dataset, yAccessor))
  .range([dimensions.ctrHeight, 0])
  .nice();

const xScale = d3
  .scaleLinear()
  .domain(d3.extent(dataset, xAccessor))
  .range([0, dimensions.ctrWidth]);
```

## Create the line

Create a line generator using d3.line() function.

For each data, the x value is: use the xAccessor to get the data, and scale to the right value in x axis. The y value is the same.

Create a path in the container. The datum means bind the data to a single svg element. Attr d describes the path. Fill, stroke, stroke-width defines how the line looks like.

```javascript
const lineGenerator = d3
  .line()
  .x((d) => xScale(xAccessor(d)))
  .y((d) => yScale(yAccessor(d)));

ctr
  .append("path")
  .datum(dataset)
  .attr("d", lineGenerator)
  .attr("fill", "none")
  .attr("stroke", "Brown")
  .attr("stroke-width", 2);
```

## Create the axis

Create xAxis and yAxis. The yAxis use the axisLeft and added a $ before the value. The xAxis use the axisBottom and added a # before the value, and the xAxis need to be moved to the bottom of the screen manually cause the top left is the (0, 0) in svg.

```javascript
const yAxis = d3.axisLeft(yScale).tickFormat((d) => `$${d}`);
ctr.append("g").call(yAxis);

const xAxis = d3.axisBottom(xScale).tickFormat((d) => `#${d}`);

ctr
  .append("g")
  .style("transform", `translateY(${dimensions.ctrHeight}px`)
  .call(xAxis);
```

## Add label to the axis

Create label for yAxis and xAxis, and translate them to the right position and orientation.

```javascript
yAxisGroup
  .append("text")
  .attr("x", -dimensions.ctrHeight / 2)
  .attr("y", -dimensions.margin + 12)
  .attr("fill", "black")
  .html("Prices")
  .style("transform", "rotate(270deg)")
  .style("text-anchor", "middle");

xAxisGroup
  .append("text")
  .attr("x", dimensions.ctrWidth / 2)
  .attr("y", dimensions.margin - 10)
  .attr("fill", "black")
  .text("Index");
```
