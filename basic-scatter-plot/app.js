const draw = async () => {
  // load the dataset
  const dataset = await d3.csv("data.csv");
  console.log(dataset);

  // create the data accessors
  const indexAccessor = (d) => d.index;
  const xAccessor = (d) => parseInt(d.column);
  const yAccessor = (d) => parseInt(d.row);

  // prepare the dimensions
  const dimensions = {
    width: 800,
    height: 400,
    margin: 50,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margin * 2;
  dimensions.ctrHeight = dimensions.height - dimensions.margin * 2;

  // select the chart div and create an svg
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  // create an container inside the svg
  // the container is move to the center of the svg
  const ctr = svg
    .append("g")
    .attr("transform", `translate(${dimensions.margin}, ${dimensions.margin})`);

  // create the x and y scales
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .rangeRound([dimensions.ctrHeight, 0])
    .nice();

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .rangeRound([0, dimensions.ctrWidth])
    .nice();

  ctr
    .selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", (d) => xScale(xAccessor(d)))
    .attr("cy", (d) => yScale(yAccessor(d)))
    .attr("r", 5)
    .attr("fill", "red");

  // create the x-axis and y-axis
  const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${d}`);
  const yAxisGroup = ctr.append("g").call(yAxis).classed("axis", true);

  // Add label to the y-axis
  yAxisGroup
    .append("text")
    .attr("x", -dimensions.ctrHeight / 2)
    .attr("y", -dimensions.margin + 12)
    .attr("fill", "black")
    .html("Row")
    .style("transform", "rotate(270deg)")
    .style("text-anchor", "middle");

  // the text of the axis is placed at the botton of the axis
  const xAxis = d3.axisBottom(xScale).tickFormat((d) => `${d}`);

  // move the x-axis to the bottom
  const xAxisGroup = ctr
    .append("g")
    .call(xAxis)
    .style("transform", `translateY(${dimensions.ctrHeight}px)`)
    .classed("axis", true);

  xAxisGroup
    .append("text")
    .attr("x", dimensions.ctrWidth / 2)
    .attr("y", dimensions.margin - 10)
    .attr("fill", "black")
    .text("Column");
};

draw();
