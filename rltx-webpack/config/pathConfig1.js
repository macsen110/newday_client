const configList = {
  person: [
    'person/info', 'driver/add', 'driver/list', 'driver/account-add', 'driver/account-list',
    { 'chunks': 'employee/add', 'filePath': './src/employee/add/add.js' },
    { 'chunks': 'employee/list', 'filePath': './src/employee/list/list.js' }
  ]
};


// 获取到输入的第二个字段
// 范例 npm run dev item account
const arg = process.argv[3];
const getArray = arg ? arg.split('/') : [],
  exportsArray = [];
// 没有填第二个参数就全部编译
if (getArray.length === 0) {
  Object.keys(configList).forEach((element) => {
    getArray.push(element);
  });
}
getArray.forEach((element) => {
  // 获取到对应的属性
  const pushPropList = configList[element];
  if (pushPropList && pushPropList.length > 0) {
    pushPropList.forEach((ele) => {
      // 字符串
      if ((typeof ele === 'string') && ele.constructor === String) {
        const pushObj = {
          chunks: ele,
          templatePath: `template/${ele}.html`,
          filePath: `./src/${ele}.js`,
          outputPath: `/${ele}.html`,
          urlPath: `${ele}.html`
        }
        exportsArray.push(pushObj);
      } else {
        const name = ele.chunks;
        const pushObj = Object.assign({
          chunks: name,
          templatePath: `template/${name}.html`,
          filePath: `./src/${name}.js`,
          outputPath: `/${name}.html`,
          urlPath: `${name}.html`
        }, ele);
        exportsArray.push(pushObj);
      }
    });
  }
});


module.exports = exportsArray;
