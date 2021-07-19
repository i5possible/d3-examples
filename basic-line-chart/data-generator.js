const { writeArrayToCsv } = require('../utils/file')

const generateBasicLineChartData = (
  headers = ['data', 'value'],
  yMin = 0,
  yMax = 100,
  rows = 40
) => {
  const data = [headers]

  for (let i = 1; i <= rows; i++) {
    const y = Math.floor(yMin + (yMax - yMin) * Math.random())
    data.push(`${i},${y}`)
  }
  return data
}

const generateDataFile = (dataGenerator) => {
  writeArrayToCsv('data.csv', dataGenerator())
}

generateDataFile(generateBasicLineChartData)
