const draw = async () => {
  // load the dataset
  const dataset = await d3.csv("data.csv")
  console.log(dataset)

  // create the data accessors
  const xAccessor = (d) => parseInt(d.data)
  const yAccessor = (d) => parseInt(d.value)
  const yAccessor2 = (d) => parseInt(d.value2)

  // prepare the dimensions
  const dimensions = {
    width: 800,
    height: 800,
    margin: 50,
  }

  dimensions.ctrWidth = dimensions.width - dimensions.margin * 2
  dimensions.ctrHeight = dimensions.height / 2 - dimensions.margin * 2

  // select the chart div and create an svg
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  // create an container inside the svg
  // the container is move to the center of the svg
  const ctr = svg
    .append("g")
    .attr("transform", `translate(${dimensions.margin}, ${dimensions.margin})`)

  // create the x and y scales
  // d3.extent = [min, max]
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor)) // 9000 ~ 10000
    .range([dimensions.ctrHeight, 0]) // [100, 0]
    .nice()

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.ctrWidth])

  // create the line
  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d))) // 14,27 => 14, => 86
    .y((d) => yScale(yAccessor(d)))

  ctr
    .append("path")
    .datum(dataset)
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "Brown")
    .attr("stroke-width", 2)
  const tooltip1 = d3.select("#tooltip1")
  const tooltipLine1 = d3.select("#tooltip-line1")

  const tooltip2 = d3.select("#tooltip2")
  const tooltipLine2 = d3.select("#tooltip-line2")

  ctr
    .selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", (d) => xScale(xAccessor(d)))
    .attr("cy", (d) => yScale(yAccessor(d)))
    .attr("r", 5)
    .attr("fill", "red")
    .attr("data-x", (d) => xAccessor(d))
    .classed("tooltip-dots", true)
    .on("mouseenter", function (event, datum) {
      d3.selectAll(".tooltip-dots")
        .filter((d) => xAccessor(d) === xAccessor(datum))
        .attr("fill", "brown")
        .attr("r", 8)
      tooltip1
        .style("display", "block")
        .style("top", yScale(yAccessor(datum)) - 25 + "px")
        .style("left", xScale(xAccessor(datum)) + "px")

      tooltip2
        .style("display", "block")
        .style(
          "top",
          dimensions.height / 2 + yScale(yAccessor(datum)) - 25 + "px"
        )
        .style("left", xScale(xAccessor(datum)) + "px")
      tooltipLine1
        .style("display", "block")
        .style("top", "50px")
        .style("left", dimensions.margin + xScale(xAccessor(datum)) + "px")

      tooltipLine2
        .style("display", "block")
        .style("top", dimensions.height / 2 + 50 + "px")
        .style("left", dimensions.margin + xScale(xAccessor(datum)) + "px")

      tooltip1.select(".metric-x span").text(xAccessor(datum))
      tooltip1.select(".metric-y span").text(yAccessor(datum))

      tooltip2.select(".metric-x span").text(xAccessor(datum))
      tooltip2.select(".metric-y span").text(yAccessor2(datum))
    })
    .on("mouseleave", function (event, datum) {
      d3.selectAll(".tooltip-dots").attr("fill", "red").attr("r", 5)

      tooltip1.style("display", "none")
      tooltip2.style("display", "none")
    })

  // // create the x-axis and y-axis
  const yAxis = d3.axisLeft(yScale).tickFormat((d) => `$${d}`)
  const yAxisGroup = ctr.append("g").call(yAxis).classed("axis", true)

  // // Add label to the y-axis
  yAxisGroup
    .append("text")
    .attr("x", -dimensions.ctrHeight / 2)
    .attr("y", -dimensions.margin + 12)
    .attr("fill", "black")
    .html("Prices")
    .style("transform", "rotate(270deg)")
    .style("text-anchor", "middle")

  // the text of the axis is placed at the botton of the axis
  const xAxis = d3.axisBottom(xScale).tickFormat((d) => `#${d}`)

  // move the x-axis to the bottom
  const xAxisGroup = ctr
    .append("g")
    .call(xAxis)
    .style("transform", `translateY(${dimensions.ctrHeight}px)`)
    .classed("axis", true)

  xAxisGroup
    .append("text")
    .attr("x", dimensions.ctrWidth / 2)
    .attr("y", dimensions.margin - 10)
    .attr("fill", "black")
    .text("Index")

  const ctr2 = svg
    .append("g")
    .attr(
      "transform",
      `translate(${dimensions.margin}, ${
        dimensions.margin + dimensions.height / 2
      })`
    )

  var colors = ["rgb(43, 110, 210, 1)", "rgb(43, 110, 210, 0.25)"]

  var grad = svg
    .append("defs")
    .append("linearGradient")
    .attr("id", "grad")
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%")

  grad
    .selectAll("stop")
    .data(colors)
    .enter()
    .append("stop")
    .style("stop-color", function (d) {
      return d
    })
    .attr("offset", function (d, i) {
      return 100 * (i / (colors.length - 1)) + "%"
    })
  const areGenerator = d3
    .area()
    .x((d) => xScale(xAccessor(d)))
    .y0(yScale(0))
    .y1((d) => yScale(yAccessor2(d)))
  ctr2
    .append("path")
    .datum(dataset)
    .attr("d", areGenerator)
    .attr("fill", "url(#grad)")
    .attr("stroke", "blue")
    .style("opacity", 0.2)
    .attr("stroke-width", 2)

  const dots2 = ctr2
    .selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", (d) => xScale(xAccessor(d)))
    .attr("cy", (d) => yScale(yAccessor2(d)))
    .attr("r", 5)
    .attr("fill", "red")
    .attr("data-x", (d) => xAccessor(d))
    .classed("tooltip-dots", true)
    .on("mouseenter", function (event, datum) {
      d3.selectAll(".tooltip-dots")
        .filter((d) => xAccessor(d) === xAccessor(datum))
        .attr("fill", "brown")
        .attr("r", 8)
      tooltip1
        .style("display", "block")
        .style("top", yScale(yAccessor(datum)) - 25 + "px")
        .style("left", xScale(xAccessor(datum)) + "px")

      tooltip2
        .style("display", "block")
        .style(
          "top",
          dimensions.height / 2 + yScale(yAccessor(datum)) - 25 + "px"
        )
        .style("left", xScale(xAccessor(datum)) + "px")
      tooltipLine1
        .style("display", "block")
        .style("top", "50px")
        .style("left", dimensions.margin + xScale(xAccessor(datum)) + "px")

      tooltipLine2
        .style("display", "block")
        .style("top", dimensions.height / 2 + 50 + "px")
        .style("left", dimensions.margin + xScale(xAccessor(datum)) + "px")

      tooltip1.select(".metric-x span").text(xAccessor(datum))
      tooltip1.select(".metric-y span").text(yAccessor(datum))

      tooltip2.select(".metric-x span").text(xAccessor(datum))
      tooltip2.select(".metric-y span").text(yAccessor2(datum))
    })
    .on("mouseleave", function (event, datum) {
      d3.selectAll(".tooltip-dots").attr("fill", "red").attr("r", 5)

      tooltip1.style("display", "none")
      tooltip2.style("display", "none")
    })
}

draw()
