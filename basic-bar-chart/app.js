const draw = async () => {
  // load the dataset
  const dataset = await d3.csv('data.csv')
  console.log(dataset)

  // create the data accessors
  const xAccessor = (d) => parseInt(d.data)
  const yAccessor = (d) => d3.mean(d, (data) => data.value)

  // prepare the dimensions
  const dimensions = {
    width: 800,
    height: 400,
    margin: 50,
    padding: 3,
  }

  dimensions.ctrWidth = dimensions.width - dimensions.margin * 2
  dimensions.ctrHeight = dimensions.height - dimensions.margin * 2

  // select the chart div and create an svg
  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  // create an container inside the svg
  // the container is move to the center of the svg
  const ctr = svg
    .append('g')
    .attr('transform', `translate(${dimensions.margin}, ${dimensions.margin})`)

  // create the x and y scales

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.ctrWidth])
    .nice()

  const bin = d3
    .bin()
    .domain(xScale.domain())
    .value(xAccessor)
    .thresholds(xScale.ticks())

  const newDataSet = bin(dataset)

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(newDataSet, yAccessor)])
    .range([dimensions.ctrHeight, 0])
    .nice()

  console.log(xScale.ticks())
  console.log(newDataSet)
  // create the bars
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

  // create the x-axis and y-axis
  const yAxis = d3.axisLeft(yScale).tickFormat((d) => `$${d}`)
  const yAxisGroup = ctr.append('g').call(yAxis).classed('axis', true)

  // Add label to the y-axis
  yAxisGroup
    .append('text')
    .attr('x', -dimensions.ctrHeight / 2)
    .attr('y', -dimensions.margin + 12)
    .attr('fill', 'black')
    .html('Prices')
    .style('transform', 'rotate(270deg)')
    .style('text-anchor', 'middle')

  // the text of the axis is placed at the botton of the axis
  const xAxis = d3.axisBottom(xScale).tickFormat((d) => `#${d}`)

  // move the x-axis to the bottom
  const xAxisGroup = ctr
    .append('g')
    .call(xAxis)
    .style('transform', `translateY(${dimensions.ctrHeight}px)`)
    .classed('axis', true)

  xAxisGroup
    .append('text')
    .attr('x', dimensions.ctrWidth / 2)
    .attr('y', dimensions.margin - 10)
    .attr('fill', 'black')
    .text('Index')
}

draw()
