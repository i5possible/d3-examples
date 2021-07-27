# d3.shape - line

This is an example for a line shape. The line is defined by two points. and you can specify the line width.

The line can be used as a base for other shapes like rect, circle, ellipse, polygon, etc.

## Draw the line

```javascript
// create the line
const line = d3
  .line()
  .x((d) => xScale(xAccessor(d))) // xScale is the scale of xAccessor
  .y((d) => yScale(yAccessor(d))) // yScale is the scale of yAccessor

ctr
  .append('path')
  .datum(dataset) // The line used all of the data, so we use the datum to pass the data.
  .attr('d', line) // Draw the line
  .attr('fill', 'none') // Remove the fill color
  .attr('stroke', 'Brown') // Set the stroke color
  .attr('stroke-width', 2) / // Set the stroke width
```
