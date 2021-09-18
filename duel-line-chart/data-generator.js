const { writeArrayToCsv } = require("../utils/file");

const generateBasicLineChartData = (
  headers = ["data", "value", "value2"],
  yMin = 0,
  yMax = 100,
  rows = 40
) => {
  const data = [headers];

  for (let i = 1; i <= rows; i++) {
    const y = Math.floor(yMin + (yMax - yMin) * Math.random());
    const y2 = Math.floor(yMin + (yMax - yMin) * Math.random());
    data.push(`${i},${y},${y2}`);
  }
  return data;
};

const generateDataFile = (dataGenerator) => {
  writeArrayToCsv("data.csv", dataGenerator());
};

generateDataFile(generateBasicLineChartData);
