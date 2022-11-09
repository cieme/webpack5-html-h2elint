const path = require('path');
const fs = require('fs');

function getHtmlList() {
  const filePath = path.join(__dirname, './src/views');
  const list = fs.readdirSync(filePath);
  return list;
}
module.exports = {
  getHtmlList,
};
