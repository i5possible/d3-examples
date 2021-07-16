const fs = require("fs");

const writeArrayToCsv = (fileName, data) => {
  fs.writeFileSync(fileName, data.join("\n"));
};

module.exports = {
  writeArrayToCsv,
};
