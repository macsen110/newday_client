const path = require('path');
const webpack = require('webpack');
const getApiPath = (fileName) => path.join(__dirname, '../api', fileName)


const getEleMentItemArr = (arr) => arr.map(item => 'element-ui/lib/'+item);
const eleMentArr = [
  'element-ui.common',
  'date-picker',
  'message',
  'upload',
  'message-box',
  'autocomplete',
  'loading',
  'form-item',
  'dialog',
  'alert',
  'radio',
  'form',
  'col',
  'radio-group',
  'row'
]
module.exports = {
  entry: {
    vendor: [
      'vue/dist/vue.esm.js',
      ...getEleMentItemArr(eleMentArr),
      getApiPath('area.json'), 
      getApiPath('Utils.js'), 
      getApiPath('httpUtil.js'), 
      getApiPath('DataSourceService.js'),
      "vue-baidu-map",
      "v-charts",
      "echarts",
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].dll.js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      /**
       * path
       * 定义 manifest 文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path: path.join(__dirname, 'dist', '[name]-manifest.json'),
      /**
       * name
       * dll bundle 输出到那个全局变量上
       * 和 output.library 一样即可。 
       */
      name: '[name]_library',
      context: __dirname,
    })
  ]
};