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
    <link
      href="https://fonts.googleapis.com/css?​family=Baloo Thambi 2"
      rel="stylesheet"
    />
```

One for our css and one for a font.

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
