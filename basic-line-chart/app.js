const draw = async () => {
  // load the dataset
  const dataset = await d3.csv("data.csv");
  console.log(dataset);

  // create the data accessors
  const xAccessor = (d) => parseInt(d.data);
  const yAccessor = (d) => parseInt(d.value);

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
};

draw();
