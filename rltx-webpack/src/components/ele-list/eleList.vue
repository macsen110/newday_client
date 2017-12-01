/**
* list.vue
* Created by zhuyi on 17/7/5.
*/

<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="list" class="list-page">
    <!-- advance search -->
    <div class="advance-search" v-if="isAdvanced && needFullSearch">
      <div class="as-hd clearfix">
        <h3 class="tit fl">高级搜索</h3>
        <span class="as-close fr" id="asClose" @click="closeAdvanceSearch">
          <i class="el-icon-close"></i>
        </span>
      </div>
      <div class="as-bd" id="asBd">
        <v-tableSearch @reset="reset" @submit="submit"
                       :searchFields="searchFields"
                       :searchModel="searchModel" :isShow="false" ref="tableSearch">
        </v-tableSearch>
      </div>
    </div>

    <div class="list-wrap">
      <div class="page-header clearfix">
        <h2 class="page-title fl" v-if="objectName !== '组织' && !isHide && isAdvanced">
          {{ objectName }}列表
        </h2>
        <h2 class="page-title fl" v-else-if="objectName === '组织' && !isHide  && isAdvanced">
          组织结构
        </h2>
        <div class="hd-opr fr">
          <a v-if="!(!isAdvanced) && needAdd && !customAdd" href="javascript:;" class="el-button el-button--primary" @click="createObject()">
            <i class="el-icon-plus"></i> 新建{{ objectName }}
          </a>
          <a v-else-if="!(!isAdvanced) && needAdd && customAdd" href="javascript:;" class="el-button el-button--primary" @click="createObject()">
            <i class="el-icon-plus"></i> {{ customAddName }}
          </a>
          <el-upload :action="importUrl" v-if="showImportButton && isAdvanced" :add="add" :downloadErrorData="downloadErrorData" :actionData="actionData" :columnsData="columnsData" :objectName="objectName" class="innerblock">导入{{ objectName }}</el-upload>
          <a href="javascript:;" v-if="showDownloadTemplate && isAdvanced" @click="downloadTemplate_" data-title="下载模板" class="el-button el-button--default">下载模板</a>
        </div>
        <span class="page-refresh fr" id="pageRefresh" v-if="isAdvanced">
          <i class="ico-refresh"></i>刷新
        </span>
      </div>
      <div class="block">
        <div class="table-opr clearfix">
          <div class="opr-button fl" v-if="isAdvanced">
            <el-button type="default" id="exportCSV" v-if="showExportButton" @click="exportCSV">导出{{objectName}}</el-button>
            <el-button type="default" id="batch_submit" v-if="showBatchSubmit" @click="batchSubmit_">{{batchOprName}}</el-button>
            <el-button type="default" id="batch_ignored" v-if="showBatchIgnored" @click="batchIgnored_">{{batchIgnoredName}}</el-button>
            <el-button type="default" id="batch_btn1" v-if="showBatchBtn1" @click="batchOpr1_">{{batchBtn1Name}}</el-button>
            <el-button type="default" id="batch_btn2" v-if="showBatchBtn2" @click="batchOpr2_">{{batchBtn2Name}}</el-button>
            <slot name="funArea"></slot>
          </div>
          <div class="mini-search fr" id="miniSearch" v-if="needPage">
            <v-minTableSearch @reset="reset" @submit="submit"
                              :searchFields="searchFields" :searchModel="searchModel"
                              :isShow="isAdvanced && needFullSearch" ref="tableSearch"></v-minTableSearch>
          </div>
          <a v-if="needMore" href="javascript:;" class="el-button el-button--primary fr" @click="more()">
            查看更多
          </a>
        </div>
        <v-table :selectable="selectable" :operatable="operatable" :multiSelect="multiSelect" :selectedCode="selectedCode"
                 :footerEnable="footerEnable" ref="table" @menuClick="menuClick" @select="handleSelect"
                 :deleteFun="deleteFun" :editUrl="editUrl" :actionUrl="actionUrl"
                 :dispatch="dispatch" :dispatchUrl="dispatchUrl"
                 :dispatchFreightSendCar="dispatchFreightSendCar" :dispatchFreightSendCarUrl="dispatchFreightSendCarUrl"
                 :columnsData="columnsData" :listData="listData" :searchData="searchData" :actionData="actionData"
                 :operValues="operValues" :objectName="objectName" :uploadUrl="uploadUrl"
                 v-loading.fullscreen.lock="loading" :refreshFreightFun="refreshFreightFun"
                 :refreshFreightDispatch="refreshFreightDispatch" :closeFreightFun="closeFreightFun"
                 :closeFreightDispatch="closeFreightDispatch" :pop-waybill-truck-map="popWaybillTruckMap"
                 :pop-logsitcs-truck-map="popLogsitcsTruckMap">
        </v-table>
        <v-page :page="page" :pageSize="pageSize" :total="total" v-on:change="change" v-if="needPage"></v-page>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import table from './eleTable.vue';
import tableSearch from './eleTableSearch.vue';
import page from './elePage.vue';
import minTableSearch from './eleMinTableSearch.vue';
import eleUpload from '../ele-upload/eleUpload.vue';
import { toggleClass } from '../../../api/classUtil';
import { getParam, adaptHeight, getParamsFromURL } from '../../../api/Utils';

// 引入tab跳转
require('../../public.js');

export default {
  name: 'eleList',
  components: {
    'v-table': table,
    'v-tableSearch': tableSearch,
    'v-minTableSearch': minTableSearch,
    'v-page': page,
    'el-upload': eleUpload
  },
  props: {
    selectedCode: {
      type: String,
      'default': null
    },
    multiSelect: {
      type: Boolean,
      'default': true
    },
    footerEnable: {
      type: Boolean,
      'default': false
    },
    listData: Array,
    total: Number,
    loading: Boolean,
    getColumn: Function,
    getSearch: Function,
    add: Function,
    downloadErrorData: Function,
    objectName: null,
    customAddName: null,
    addUrl: '',
    editUrl: '',
    actionUrl: '',
    dispatch: '',
    dispatchUrl: '',
    dispatchFreightSendCar: {
      type: Boolean,
      'default': false
    },
    dispatchFreightSendCarUrl: '',
    deleteFun: Function,
    getAction: Function,
    uploadUrl: String,
    exportCsv: Function,
    importUrl: String,
    downloadTemplate: Function,
    isHide: false,
    refreshFreightFun: Function,
    closeFreightFun: Function,
    refreshFreightDispatch: {
      type: Boolean,
      'default': false
    },
    closeFreightDispatch: {
      type: Boolean,
      'default': false
    },
    showExportButton: {
      type: Boolean,
      'default': true
    },
    showDownloadTemplate: {
      type: Boolean,
      'default': true
    },
    showImportButton: {
      type: Boolean,
      'default': true
    },
    showBatchSubmit: {
      type: Boolean,
      'default': false
    },
    showBatchIgnored: {
      type: Boolean,
      'default': false
    },
    showBatchBtn1: {
      type: Boolean,
      'default': false
    },
    showBatchBtn2: {
      type: Boolean,
      'default': false
    },
    popWaybillTruckMap: {
      type: Boolean,
      'default': false
    },
    popLogsitcsTruckMap: {
      type: Boolean,
      'default': false
    },
    batchOprName: String,
    batchIgnoredName: String,
    batchSubmit: Function,
    batchIgnored: Function,
    batchBtn1Name: String,
    batchBtn2Name: String,
    extraSearchParamObj: {},
    selectable: {
      type: Boolean,
      'default': true
    },
    operatable: {
      type: Boolean,
      'default': true
    },
    customColumn: Array,
    isAdvanced: {
      type: Boolean,
      'default': true
    },
    needPage: {
      type: Boolean,
      'default': true
    },
    needMore: {
      type: Boolean,
      'default': false
    },
    needAdd: {
      type: Boolean,
      'default': true
    },
    customAdd: {
      type: Boolean,
      'default': false
    },
    needFullSearch: {
      type: Boolean,
      'default': true
    },
    params: {
      type: Object,
      'default': function () {
        return {};
      }
    }
  },
  data: () => {
    return {
      searchFieldsDone: false,
      columnFieldsDone: false,
      columnsData: [],
      searchData: [],
      pageSize: 20,
      page: 1,
      exportMaxSize: 3000,
      exportMinSize: 1,
      searchFields: [],
      searchModel: {},
      actionData: {},
      operValues: {},
      leftDistance: '',
      topDistance: '',
      waybillUrl: '/waybill/list.html',
      attachmentUrl: '/attachment/list.html',
      insuranceUrl: '/insurance/list.html',
      maintenanceUrl: '/maintenance/list.html',
      careUrl: '/care/list.html',
      peccancyUrl: '/peccancy/list.html',
      accidentUrl: '/accident/list.html',
      tyreUrl: '/tyre/list.html',
      tyreInspectionUrl: '/tyre_inspection/list.html',
      bankAccountAddUrl: `/driver/account-add.html?personCode=${getParamsFromURL(window.location.search).code}`
    };
  },
  methods: {
    more() {
      this.$emit('more', this.params);
    },
    reset() {
      this.$refs.table.dataChanged();
      this.dispatchQueryEvent();
    },
    submit() {
      this.$refs.table.dataChanged();
      this.dispatchQueryEvent();
    },
    menuClick(command, menu, model) {
      this.$emit('action', command, menu, model);
    },
    handleSelect(model, index) {
      this.$emit('select', model, index);
    },
    createObject() {
      this.$emit('action', 'add', null, null);
    },
    resetScrollBar() {
      const tableWrap = document.querySelector('.fix-table-wrap'),
        fixHd = document.querySelectorAll('.fix-hd'),
        fixCol = document.querySelectorAll('.fix-col');
      tableWrap.scrollTop = this.topDistance;
      tableWrap.scrollLeft = this.leftDistance;
      for (let i = 0, len = fixHd.length; i < len; i++) {
        fixHd[i].style.top = `${this.topDistance}px`;
      }
      for (let j = 0, len = fixCol.length; j < len; j++) {
        fixCol[j].style.left = `${this.leftDistance}px`;
      }
      // console.log('翻页后top应该为', this.topDistance, '翻页后left应该为', this.leftDistance);
      // console.log('翻页后top实际为', tableWrap.scrollTop, '翻页后left实际为', tableWrap.scrollLeft);
    },
    closeAdvanceSearch() {
      const listPage = document.querySelector('#list'),
        miniSearch = document.querySelector('#miniSearch');
      toggleClass(listPage, 'opened');
      toggleClass(miniSearch, 'hide');
    },
    exportCSV() {
      /*
      const sizeTemp = this.paramObj.size,
        pageTemp = this.paramObj.page;
      this.paramObj.size = this.exportMaxSize;
      this.paramObj.page = this.exportMinSize;
      this.exportCsv(this.paramObj, (success) => {
        window.location.href = success.content.url;
      });
      this.paramObj.size = sizeTemp;
      this.paramObj.page = pageTemp;
      */
      this.dispatchExportEvent();
    },
    batchSubmit_() {
      /* eslint-disable */
      const self = this,
        length = self.listData.length,
        total = document.querySelectorAll('tbody tr td [type=checkbox]:checked').length,
        h = this.$createElement;
      let successNum = 0;
      this.$msgbox({
          title: '消息',
          message: h('p', null, [h('span', null, '确认批量派车吗？ ')]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              for (let i = 0; i < length; i++) {
                if (document.querySelectorAll('tbody tr')[i].querySelector('[type=checkbox]').checked) {
                  const data = self.listData[i];
                  let code = data["code"];
                  data["code"] = null;
                  self.batchSubmit(data, (success) => {
                    if (success && success.code === 200) {
                      successNum += 1;
                    }
                    if (successNum === total) {
                      const info = `批量派车${successNum}条数据`;
                      this.$message({
                        type: 'success',
                        message: info,
                        duration: 1000
                      });
                      done();
                      instance.confirmButtonLoading = false;
                    }
                  });
                  data["code"] = code;
                }
              }
            } else {
              done();
            }
          }
        }).then(() => {
          done();
        });
    },
    batchIgnored_() {
      /* eslint-disable */
      const self = this,
        length = self.listData.length,
        total = document.querySelectorAll('tbody tr td [type=checkbox]:checked').length,
        h = this.$createElement;
      let successNum = 0;
      this.$msgbox({
          title: '消息',
          message: h('p', null, [h('span', null, '确认批量忽略吗？ ')]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              for (let i = 0; i < length; i++) {
                if (document.querySelectorAll('tbody tr')[i].querySelector('[type=checkbox]').checked) {
                  const data = self.listData[i];
                  let code = data["code"];
                  self.batchIgnored(code, (success) => {
                    if (success && success.code === 200) {
                      successNum += 1;
                    }
                    if (successNum === total) {
                      const info = `忽略掉${successNum}条接单数据`;
                      this.$message({
                        type: 'success',
                        message: info,
                        duration: 1000
                      });
                      instance.confirmButtonLoading = false;
                      done();
                    }
                  });
                  data["code"] = code;
                }
              }
            } else {
              done();
            }
          }
        }).then(() => {
          done();
        });
    },
    batchOpr1_() {
      this.$emit('batchOpr1');
    },
    batchOpr2_() {
      this.$emit('batchOpr2');
    },
    downloadTemplate_() {
      const templateName = `${this.objectName}模板.csv`;
      this.downloadTemplate({ csvTemplateName: templateName }, (data) => {
        if (data && data.code === 200) {
          window.location.href = data.content.url;
        }
      });
    },
    getQueryParams() {
      const paramObj = {
        size: this.pageSize,
        page: this.page
      };
      Object.keys(this.searchModel).forEach((key) => {
        paramObj[key] = this.searchModel[key];
      });
      // 合并传进来的数据作为搜索条件
      if (this.extraSearchParamObj && Object.keys(this.extraSearchParamObj).length > 0) {
        Object.assign(paramObj, this.extraSearchParamObj);
      }
//      Object.assign(this.paramObj, this.params);
      return paramObj;
    },
    change(newPage, newPageSize) {
      const tableWrap = document.querySelector('.fix-table-wrap');
      this.topDistance = tableWrap.scrollTop;
      this.leftDistance = tableWrap.scrollLeft;
      // console.log('翻页前保存top为', this.topDistance, '翻页前保存left为', this.leftDistance);
      this.page = newPage;
      this.pageSize = newPageSize;
      this.dispatchQueryEvent();
//      this.getData();
    },
    dispatchExportEvent() {
      this.$emit('exportData', this.getQueryParams());
    },
    dispatchQueryEvent() {
      this.$refs.table.dataChanged();
      this.$emit('query', this.getQueryParams());
    },
    dispatchReadyEvent() {
      if (this.searchFieldsDone && this.columnFieldsDone) {
        this.$emit('ready', this.getQueryParams(), this.columnsData);
      }
    }
  },
  events: {
    reload() {
      console.log('reload');
      this.dispatchQueryEvent();
    }
  },
  created() {
    // 获取检索区域
    const self = this,
      localStorage = window.localStorage,
      queryParams = getParamsFromURL(window.location.search),
      eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
      eleInfo = JSON.parse(localStorage.getItem('eleInfo'));
    if (this.getSearch) {
      this.getSearch((searchConfig) => {
        if (searchConfig) {
          const paramData = getParam({ data: { content: searchConfig.content } }, eleDefine, eleInfo);
          console.log('searchConfig', searchConfig, 'queryParams', queryParams, 'paramData', paramData);
          paramData.field.forEach((field) => {
            field.extraParams.forEach((property) => {
              self.$set(self.searchModel, property.field, queryParams[property.field] ? queryParams[property.field] : null);
            });
          });
          self.searchFields = paramData.field;
  //        this.getData();
        }
        this.searchFieldsDone = true;
        this.dispatchReadyEvent();
      });
    } else {
      this.searchFieldsDone = true;
      this.dispatchReadyEvent();
    }
    // 获取列名
    this.getColumn((success) => {
//      console.log('eleList getColumn', success);
      if (success) {
        const resultData = success.content,
          customColumn = this.customColumn,
          newColumns = [];
        if (customColumn && customColumn.length > 0) {
          resultData.forEach((val) => {
            if (customColumn.indexOf(val.fieldConfigCode) > -1) {
              newColumns.push(val);
            }
          });
          const columns = getParam({ data: { content: newColumns } }, eleDefine, eleInfo);
          this.columnsData = columns.field;
          this.columnFieldsDone = true;
          this.dispatchReadyEvent();
        } else {
          const columns = getParam({ data: { content: resultData } }, eleDefine, eleInfo);
          this.columnsData = columns.field;
          this.columnFieldsDone = true;
          this.dispatchReadyEvent();
        }
      }
      // console.log('this.columnsData is', this.columnsData);
    });
  },
  mounted() {
    // 重置宽度
    function fixedTable(event) {
      // console.log('target is', event.target);
      const tableWrap = event.target,
        top = tableWrap.scrollTop,
        left = tableWrap.scrollLeft,
        fixHd = tableWrap.querySelectorAll('.fix-hd'),
        fixCol = tableWrap.querySelectorAll('.fix-col'),
        unit = 'px';
      for (let i = 0, len = fixHd.length; i < len; i++) {
        fixHd[i].style.top = top + unit;
      }
      for (let j = 0, len = fixCol.length; j < len; j++) {
        fixCol[j].style.left = left + unit;
      }
    }
    document.querySelectorAll('.fix-table-wrap').forEach((value) => {
      value.addEventListener('scroll', fixedTable);
    });
    // 检测高度
    this.$nextTick(() => {
      adaptHeight();
      window.onresize = () => {
        adaptHeight();
      };
    });
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../assets/sass/base.scss";
@import "../../assets/sass/rl-fixed-table.min.scss";
</style>
