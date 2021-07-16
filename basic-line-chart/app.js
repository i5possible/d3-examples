const draw = async () => {
  const dataset = await d3.csv("data.csv");
  console.log(dataset);
};

draw();
