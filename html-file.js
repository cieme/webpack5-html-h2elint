const path = require('path');
const { statSync, readdirSync } = require('fs');

function getHtmlList() {
  const filePath = path.join(__dirname, './src/views');

  const list = [];

  deepDir(filePath, list);
  list.forEach((item) => {
    item.fileNamePath = pathOfInterception(item.fileFullPath, filePath);
  });

  return list;
}

/**
 * 递归处理文件
 * @author cieme
 * @date 2022-11-16
 * @param {any} dirStr
 * @param {any} listArr
 * @returns {any}
 *
 */
/*
  fileName: 'com.html',
  filePath: '/Users/cieme/study/webpack5-html-h2elint/src/views/about',
  fileFullPath: '/Users/cieme/study/webpack5-html-h2elint/src/views/about/com.html',
  fileNamePath: 'about/com.html'
*/
function deepDir(dirStr, listArr) {
  /* 获取该目录下所有文件 */
  const filList = readdirSync(dirStr);
  /* 循环处理文件或者文件夹 */
  filList.forEach((item) => {
    const fileItemPath = `${dirStr}/${item}`;

    const fileStats = statSync(`${dirStr}/${item}`);
    if (fileStats.isDirectory()) {
      /* 如果是文件夹就递归 */
      deepDir(fileItemPath, listArr);
    } else if (fileStats.isFile()) {
      /* 如果是文件就处理 */

      const oFile = {
        fileName: item,
        filePath: dirStr,
        fileFullPath: fileItemPath,
      };

      listArr.push(oFile);
    }
  });
  return listArr;
}
/* 替换掉路径部分，保留目录结构 */
function pathOfInterception(originStr, filePath) {
  const str = originStr.replace(`${filePath}/`, ``);
  return str;
}

module.exports = {
  getHtmlList,
};
