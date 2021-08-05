const draw = async () => {
  // load the dataset
  const dataset = await d3.csv('data.csv')

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

  // create the pie
  const arcs = d3
    .pie()
    // .sort((a, b) => a.value - b.value)
    // .sortValues((a, b) => a - b)
    // .startAngle((3 / 16) * Math.PI)
    // .endAngle((27 / 16) * Math.PI)
    // .padAngle(0.01)
    .value((d) => d.value)(dataset)

  // create the arcs
  arcPie = d3
    .arc()
    .innerRadius(100)
    .outerRadius(200)
    .padRadius(200)
    .padAngle(2 / 150)
    .cornerRadius(8)

  // draw the arcs
  ctr
    .append('g')
    .selectAll('path')
    .data(arcs)
    .join('path')
    .attr('d', (d) => arcPie(d))
    .attr('fill', 'Brown')
    .attr('stroke', 'none')
    .attr('transform', `translate(200, 200)`)
}

draw()
