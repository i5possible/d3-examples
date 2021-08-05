const { writeArrayToCsv } = require('../../utils/file')

const generateBasicLineChartData = (
  headers,
  yMin = 0,
  yMax = 100,
  rows = 10
) => {
  const data = [headers]

  for (let i = 1; i <= rows; i++) {
    const y = Math.floor(yMin + (yMax - yMin) * Math.random())
    data.push(`${i},${y}`)
  }
  return data
}

const generateDataFile = () => {
  const data = generateBasicLineChartData(['data', 'value'])
  writeArrayToCsv('data.csv', data)
}

generateDataFile()
