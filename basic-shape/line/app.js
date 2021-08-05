const draw = async () => {
  // load the dataset
  const dataset = await d3.csv('data.csv')
  console.log(dataset)

  // create the data accessors
  const xAccessor = (d) => parseInt(d.data)
  const yAccessor = (d) => parseInt(d.value)

  // prepare the dimensions
  const dimensions = {
    width: 800,
    height: 600,
    margin: 50,
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
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.ctrHeight, 0])
    .nice()

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.ctrWidth])

  // create the line
  const line = d3
    .line()
    // .curve(d3.curveBasis)
    .curve(d3.curveNatural)
    // .curve(d3.curveCadinal)
    // .curve(d3.curveStep)
    // .curve(d3.curveLinear)
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)))

  ctr
    .append('path')
    .datum(dataset)
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', 'Brown')
    .attr('stroke-width', 2)
}

draw()
