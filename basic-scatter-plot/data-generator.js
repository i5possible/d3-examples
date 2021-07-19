const { writeArrayToCsv } = require('../utils/file')

const generateScatterPlotData = (
  headers = ['index', 'column', 'row'],
  yMin = 1,
  yMax = 100,
  xMin = 1,
  xMax = 100,
  numPoints = 100
) => {
  const data = [headers]

  for (let i = 1; i <= numPoints; i++) {
    const x = Math.floor(xMin + (xMax - xMin) * Math.random())
    const y = Math.floor(yMin + (yMax - yMin) * Math.random())
    data.push(`${i},${x},${y}`)
  }
  return data
}

const generateDataFile = (dataGenerator) => {
  writeArrayToCsv('data.csv', dataGenerator())
}

generateDataFile(generateScatterPlotData)
