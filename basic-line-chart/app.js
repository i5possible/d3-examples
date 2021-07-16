const draw = async () => {
  // load the dataset
  const dataset = await d3.csv("data.csv");
  console.log(dataset);

  // create the data accessors
  const xAccessor = (d) => parseInt(d.data);
  const yAccessor = (d) => parseInt(d.value);
};

draw();
