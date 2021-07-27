const draw = async () => {
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

  const arc = d3.arc()
  arc.innerRadius(0).outerRadius(100)

  const cornorArc = arc({
    startAngle: (Math.PI * 3) / 2,
    endAngle: Math.PI * 2,
  })

  ctr
    .append('path')
    .attr('d', cornorArc)
    .attr('fill', 'none')
    .attr('stroke', 'Brown')
    .attr('stroke-width', 2)
    .attr('transform', `translate(100, 100)`)

  const halfArc = arc({
    startAngle: Math.PI,
    endAngle: Math.PI * 2,
  })

  ctr
    .append('path')
    .attr('d', halfArc)
    .attr('fill', 'none')
    .attr('stroke', 'Brown')
    .attr('stroke-width', 2)
    .attr('transform', `translate(300, 100)`)

  const circleArc = arc({
    cornerRadius: 0,
    startAngle: 0,
    endAngle: Math.PI * 2,
  })

  ctr
    .append('path')
    .attr('d', circleArc)
    .attr('fill', 'none')
    .attr('stroke', 'Brown')
    .attr('stroke-width', 2)
    .attr('transform', `translate(500, 100)`)

  const partialArc = arc({
    innerRadius: 0,
    outerRadius: 100,
    cornerRadius: 0,
    startAngle: (Math.PI * 9) / 8,
    endAngle: (Math.PI * 27) / 16,
  })

  ctr
    .append('path')
    .attr('d', partialArc)
    .attr('fill', 'Brown')
    .attr('stroke', 'Brown')
    .attr('stroke-width', 2)
    .attr('transform', `translate(100, 300)`)

  arc.cornerRadius(20)
  const withCornorArc = arc({
    innerRadius: 0,
    outerRadius: 100,
    // cornerRadius: 20, // this is not effected, use the arc.cornerRadius() instead
    startAngle: (Math.PI * 5) / 8,
    endAngle: (Math.PI * 25) / 16,
  })
  arc.cornerRadius(0)

  ctr
    .append('path')
    .attr('d', withCornorArc)
    .attr('fill', 'Brown')
    .attr('stroke', 'Brown')
    .attr('stroke-width', 2)
    .attr('transform', `translate(300, 300)`)

  arc
    .innerRadius(50)
    .cornerRadius(0)
    .startAngle(0)
    .endAngle(Math.PI * 2)

  ctr
    .append('path')
    .attr('d', arc())
    .attr('fill', 'Brown')
    .attr('stroke', 'Brown')
    .attr('stroke-width', 2)
    .attr('transform', `translate(600, 300)`)
}

draw()
