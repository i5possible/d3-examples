const draw = async () => {
  const dataset = await d3.csv("data.csv");
  console.log(dataset);

  const xAccessor = (d) => parseInt(d.data);
  const yAccessor = (d) => parseInt(d.value);
};

draw();
