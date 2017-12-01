<template>
  <div>
    <el-upload
      :show-file-list="showFileList"
      with-credentials
      :before-upload="handleFile"
      :on-success="handleSuccess"
      :action="action">
      <el-button type="primary">导入{{objectName}}</el-button>
    </el-upload>
    <el-dialog
      :title="objectName + '列表'"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      size="large">
      <v-table :getData="getData" :deleteFun="deleteFun" :selectable="selectable" :operatable="operatable" :editUrl="editUrl" :actionUrl="actionUrl"
               :dispatch="dispatch" :dispatchUrl="dispatchUrl"
               :columnsData="columnsData" :listData="listData"
               :searchData="searchData" :actionData="actionData" :operValues="operValues" :objectName="objectName" :uploadUrl="uploadUrl"
               v-loading.fullscreen.lock="loading">
      </v-table>
      <span slot="footer" class="dialog-footer">
      <span v-show="errorNum != 0">错误{{ errorNum }}条 <a href="javascript:;" @click="download">下载错误记录</a></span>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="importData" v-loading.fullscreen.lock="fullscreenLoading" :element-loading-text="loadingText" :disabled="importDisabled" id="importCsv">导入{{ objectName }}</el-button>
    </span>
    </el-dialog>
  </div>
</template>
<script>
  import table from '../../components/ele-list/eleTable.vue';

  export default {
    components: {
      'v-table': table
    },
    props: {
      action: {
        type: String,
        'default': ''
      },
      objectName: String,
      columnsData: null,
      pageSize: 10,
      page: 1,
      exportSize: 3000,
      add: Function,
      downloadErrorData: Function,
      total: null,
      searchFields: [],
      searchModel: {}
    },
    data() {
      return {
        listData: Array,
        dialogVisible: false,
        searchData: null,
        getData: Function,
        editUrl: '',
        actionUrl: '',
        showFileList: false,
        deleteFun: null,
        actionData: null,
        operValues: {
          code: ''
        },
        uploadUrl: '',
        dispatch: false,
        dispatchUrl: '',
        selectable: false,
        operatable: false,
        loading: false,
        errorNum: 0,
        errorData: null,
        importDisabled: false,
        fullscreenLoading: false,
        loadingText: ''
      };
    },
    methods: {
      handleFile() {
        this.loadingText = '数据正在加载中，请稍等……';
        this.fullscreenLoading = true;
      },
      handleSuccess(response) {
        this.errorNum = 0;
        this.dialogVisible = true;
        this.importDisabled = false;
        this.listData = response.content;
        this.fullscreenLoading = false;
      },
      text(e) {
        let t = '';
        const eTemp = e.childNodes || e;
        for (let j = 0; j < eTemp.length; j++) {
          t += eTemp[j].nodeType !== 1 ? eTemp[j].nodeValue.trim() : this.text(eTemp[j].childNodes);
        }
        return t;
      },
      importData() {
        const self = this,
          errorData = [],
          length = self.listData.length;
        let num = 0,
          counter = 0,
          successNum = 0;
        self.importDisabled = true;
        this.loadingText = '数据正在导入中，请稍等……';
        self.fullscreenLoading = true;
        self.listData.forEach((data) => {
          self.add(data, (data_) => {
            counter += 1;
            if (counter === length) {
              self.fullscreenLoading = false;
            }
            if (data_ && data_.code === 200) {
              // console.log(data_);
              successNum += 1;
            } else {
              errorData.push(data);
              num += 1;
              self.errorNum = num;
              self.errorData = errorData;
              self.$set(data, 'error', true);
            }
            if (length === successNum) {
              self.dialogVisible = false;
              const info = `导入${successNum}条数据`;
              self.$alert(info, '导入成功', {
                confirmButtonText: '确定',
                callback: () => {
                  const refresh = document.querySelector('#pageRefresh');
                  if (refresh) {
                    refresh.click();
                  }
                }
              });
            }
          });
        });
      },
      download() {
        const self = this,
          param = {},
          trEl = this.$el.querySelector('table').querySelectorAll('tr');
        for (let j = 1; j < trEl.length; j++) {
          if (trEl[j].dataset.error === 'true') {
            const tdsEl = trEl[j].querySelectorAll('td');
            for (let i = 0; i < self.columnsData.length; i++) {
              const key = self.columnsData[i].fieldConfigCode;
              if (!param[key]) {
                param[key] = [];
              }
              param[key].push(self.text(tdsEl[i]));
            }
          }
        }
        Object.keys(param).forEach((key) => {
          param[key] = param[key].join(',');
        });
        this.downloadErrorData(param, (data) => {
          if (data && data.code === 200) {
            window.location.href = data.content.url;
          }
        });
      }
    }
  };
</script>
