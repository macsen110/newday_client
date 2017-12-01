/**
* list.vue
* Created by zhuyi on 17/7/5.
*/

<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="list" class="list-page">
    <!-- advance search -->
    <div class="advance-search" v-if="isAdvanced">
      <div class="as-hd clearfix">
        <h3 class="tit fl">高级搜索</h3>
        <span class="as-close fr" id="asClose" @click="closeAdvanceSearch">
          <i class="el-icon-close"></i>
        </span>
      </div>
      <div class="as-bd" id="asBd">
        <v-tableSearch :getData="getData" :searchFields="searchFields" :searchModel="searchModel" :isShow="false" ref="tableSearch"></v-tableSearch>
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
          <!--<a href="javascript:;" :data-link="addUrl" v-bind:data-title="`新建`+objectName" class="el-button el-button--primary"><i class="el-icon-plus"></i> 新建{{ objectName }}</a>-->
          <a v-if="objectName === '运单' && !isAdvanced" href="javascript:;" :data-link="waybillUrl" data-title="运单记录" class="el-button el-button--primary">查看更多</a>
          <a v-if="objectName === '车辆证照' && !isAdvanced" href="javascript:;" :data-link="attachmentUrl" data-title="证照管理" class="el-button el-button--primary">查看更多</a>
          <a v-if="objectName === '保险记录' && !isAdvanced" href="javascript:;" :data-link="insuranceUrl" data-title="保险信息" class="el-button el-button--primary">查看更多</a>
          <a v-if="objectName === '维修记录' && !isAdvanced" href="javascript:;" :data-link="maintenanceUrl" data-title="维修记录" class="el-button el-button--primary">查看更多</a>
          <a v-if="objectName === '保养记录' && !isAdvanced" href="javascript:;" :data-link="careUrl" data-title="保养记录" class="el-button el-button--primary">查看更多</a>
          <a v-if="objectName === '违章记录' && !isAdvanced" href="javascript:;" :data-link="peccancyUrl" data-title="违章记录" class="el-button el-button--primary">查看更多</a>
          <a v-if="objectName === '事故记录' && !isAdvanced" href="javascript:;" :data-link="accidentUrl" data-title="事故记录" class="el-button el-button--primary">查看更多</a>
          <a v-if="objectName === '车辆轮胎' && !isAdvanced" href="javascript:;" :data-link="tyreUrl" data-title="轮胎清单" class="el-button el-button--primary">查看更多</a>
          <a v-if="objectName === '轮胎巡检' && !isAdvanced" href="javascript:;" :data-link="tyreInspectionUrl" data-title="轮胎巡检" class="el-button el-button--primary">查看更多</a>
          <a v-if="objectName === '组织'" href="javascript:;" :data-link="addUrl" data-title="新建人员" class="el-button el-button--primary">
            <i class="el-icon-plus"></i> 新建人员</a>
          <a v-if="objectName === '银行账户' && !isAdvanced" href="javascript:;" :data-link="bankAccountAddUrl" data-title="银行账户" class="el-button el-button--primary">
            <i class="el-icon-plus"></i> 新建银行账户</a>
          <span v-else>
            <a v-show="!(objectName === '运单' && !isAdvanced)" v-if="addUrl" href="javascript:;" :data-link="addUrl + '?objectName=' + objectName" v-bind:data-title="addBtnTitle == null ? `新建` + objectName : addBtnTitle" class="el-button el-button--primary">
              <i class="el-icon-plus"></i> {{addBtnTitle == null ? `新建` + objectName : addBtnTitle}}</a>
          </span>
          <el-button v-if="objectName === '组织'" v-show="showImportButton" type="default" :disabled="true">导入人员</el-button>
          <el-upload v-else :action="importUrl" v-show="showImportButton && isAdvanced" :add="add" :downloadErrorData="downloadErrorData" :actionData="actionData" :columnsData="columnsData" :objectName="objectName" class="innerblock">导入{{ objectName }}</el-upload>
          <a href="javascript:;" v-show="showDownloadTemplate" v-if="isAdvanced" @click="downloadTemplate_" data-title="下载模板" class="el-button el-button--default">下载模板</a>
        </div>
        <span class="page-refresh fr" id="pageRefresh" v-if="isAdvanced">
          <i class="ico-refresh"></i>刷新
        </span>
      </div>
      <div class="block">
        <div class="table-opr clearfix"  v-if="isAdvanced">
          <div class="opr-button fl">
            <el-button type="default" id="exportCSV" v-show="showExportButton" @click="exportCSV">导出{{objectName}}</el-button>
            <el-button type="default" id="batch_submit" v-show="showBatchSubmit" @click="batchSubmit_" :disabled="btnDisabled">{{batchOprName}}</el-button>
            <el-button type="default" id="batch_ignored" v-show="showBatchIgnored" @click="batchIgnored_">{{batchIgnoredName}}</el-button>
            <slot name="funArea"></slot>
          </div>
          <div class="mini-search fr" id="miniSearch">
            <v-minTableSearch :getData="getData" :searchFields="searchFields" :searchModel="searchModel" :isShow="true" ref="tableSearch"></v-minTableSearch>
          </div>
        </div>
        <v-table :selectable="selectable" :operatable="operatable" :getData="getData" :deleteFun="deleteFun" :editUrl="editUrl" :dispatchDelete="dispatchDelete" :actionUrl="actionUrl" :dispatch="dispatch" :dispatchUrl="dispatchUrl" :dispatchFreightSendCar="dispatchFreightSendCar" :dispatchFreightSendCarUrl="dispatchFreightSendCarUrl" :columnsData="columnsData" :listData="listData" :searchData="searchData" :actionData="actionData" :operValues="operValues" :objectName="objectName" :uploadUrl="uploadUrl" v-loading.fullscreen.lock="loading" :refreshFreightFun="refreshFreightFun" :refreshFreightDispatch="refreshFreightDispatch" :closeFreightFun="closeFreightFun" :closeFreightDispatch="closeFreightDispatch" :pop-waybill-truck-map="popWaybillTruckMap" :pop-logsitcs-truck-map="popLogsitcsTruckMap" :batchSubmit="batchSubmit" :batchIgnored="batchIgnored">
        </v-table>
        <v-page :page="page" :pageSize="pageSize" :total="total" v-on:change="change" v-if="needPage"></v-page>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import table from '../../components/ele-table/eleTable.vue';
import tableSearch from '../../components/ele-table/eleTableSearch.vue';
import page from '../../components/ele-table/elePage.vue';
import minTableSearch from '../../components/ele-table/eleMinTableSearch.vue';
import eleUpload from '../../components/ele-upload/eleUpload.vue';
import { toggleClass, addClass, removeClass, hasClass } from '../../../api/classUtil';
import { getParam, adaptHeight, getParamsFromURL } from '../../../api/Utils';

// 引入tab跳转
require('../../public.js');

export default {
  name: 'waybillList',
  components: {
    'v-table': table,
    'v-tableSearch': tableSearch,
    'v-minTableSearch': minTableSearch,
    'v-page': page,
    'el-upload': eleUpload
  },
  props: {
    getColumn: Function,
    getList: Function,
    getSearch: Function,
    add: Function,
    downloadErrorData: Function,
    objectName: null,
    addBtnTitle: null,
    addUrl: '',
    editUrl: '',
    dispatchDelete: {
      type: Boolean,
      'default': true
    },
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
    params: {
      type: Object,
      'default': function () {
        return {};
      }
    }
  },
  data: () => {
    return {
      columnsData: [],
      listData: [],
      searchData: [],
      pageSize: 20,
      page: 1,
      exportMaxSize: 3000,
      exportMinSize: 1,
      total: null,
      searchFields: [],
      searchModel: {},
      actionData: {},
      operValues: {},
      loading: true,
      btnDisabled: false,
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
      const sizeTemp = this.paramObj.size,
        pageTemp = this.paramObj.page;
      this.paramObj.size = this.exportMaxSize;
      this.paramObj.page = this.exportMinSize;
      this.exportCsv(this.paramObj, (success) => {
        window.location.href = success.content.url;
      });
      this.paramObj.size = sizeTemp;
      this.paramObj.page = pageTemp;
    },
    batchSubmit_() {
      /* eslint-disable */
      const self = this,
        length = self.listData.length,
        total = document.querySelectorAll('tbody tr td [type=checkbox]:checked').length;
      let successNum = 0;
      if (total === 0) {
        self.$message({
          type: 'warning',
          message: '请选择您要批量派单的记录！',
          duration: 1000
        });
      } else {
        this.btnDisabled = true;
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
                this.btnDisabled = false;
                const info = `批量派车${successNum}条数据`;
                self.$alert(info, '派车成功', {
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
            data["code"] = code;
          }
        }
      }
    },
    batchIgnored_() {
      /* eslint-disable */
      const self = this,
        length = self.listData.length,
        total = document.querySelectorAll('tbody tr td [type=checkbox]:checked').length;
      let successNum = 0;
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
              self.$alert(info, '操作成功', {
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
          data["code"] = code;
        }
      }
    },
    getData() {
      this.listData = [];
      this.total = 0;
      const self = this,
        codeArr = [];
      this.paramObj = {
        size: this.pageSize,
        page: this.page
      };
      Object.keys(this.searchModel).forEach((key) => {
        self.paramObj[key] = self.searchModel[key];
      });
      // 合并传进来的数据作为搜索条件
      if (this.extraSearchParamObj && Object.keys(this.extraSearchParamObj).length > 0) {
        Object.assign(this.paramObj, this.extraSearchParamObj);
      }
      Object.assign(this.paramObj, this.params);
      this.getList(this.paramObj, (success, error) => {
        if (error) {
          this.loading = false;
          this.$message({
            type: 'error',
            message: error.content,
            duration: 5000
          });
        }
        // console.log('list data is', success.content);
        if (success) {
          this.listData = success.content;
          this.total = success.total;
          success.content.forEach((data) => {
            codeArr.push(data.code);
            // 人员列表显示用户状态文字
            if (data.userStatus) {
              data.userStatus = data.userStatus === 'active' ? '已激活' : '未激活';
            }

          });
          if (this.getAction) {
            const operMap = {};
            this.getAction(codeArr, (success1) => {
              const actionDic = success1.content;
              Object.keys(actionDic).forEach((key) => {
                const code = key;
                operMap[code] = '';
              });
              this.actionData = actionDic;
              this.operValues = operMap;
              //            console.log(this.actionData);
            });
          }
          this.$nextTick(() => {
            this.loading = false;
            this.resetScrollBar();
          });
        }
      });
    },
    change(newPage, newPageSize) {
      const tableWrap = document.querySelector('.fix-table-wrap');
      this.topDistance = tableWrap.scrollTop;
      this.leftDistance = tableWrap.scrollLeft;
      // console.log('翻页前保存top为', this.topDistance, '翻页前保存left为', this.leftDistance);
      this.page = newPage;
      this.pageSize = newPageSize;
      this.getData();
    },
    downloadTemplate_() {
      const templateName = `${this.objectName}模板.csv`;
      this.downloadTemplate({ csvTemplateName: templateName }, (data) => {
        if (data && data.code === 200) {
          window.location.href = data.content.url;
        }
      });
    }
  },
  created() {
    // 获取检索区域
    const self = this,
      localStorage = window.localStorage,
      eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
      eleInfo = JSON.parse(localStorage.getItem('eleInfo'));
    this.getSearch((searchConfig) => {
      if (searchConfig) {
        const paramData = getParam({ data: { content: searchConfig.content } }, eleDefine, eleInfo);
        paramData.field.forEach((field) => {
          field.extraParams.forEach((property) => {
            self.$set(self.searchModel, property.field, null);
          });
        });
        self.searchFields = paramData.field;
        this.getData();
      }
    });
    // 获取列名
    this.getColumn((success) => {
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
        } else {
          const columns = getParam({ data: { content: resultData } }, eleDefine, eleInfo);
          this.columnsData = columns.field;
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
    // 单选
    function checkRow() {
      const ckAll = document.querySelector('.ck-all'),
        ckSingle = document.querySelectorAll('.ck-single'),
        ckLength = ckSingle.length;
      // console.log(ckAll, ckSingle, ckLength);
      let countNum = 0;
      ckSingle.forEach((item) => {
        if (item.checked === true) {
          countNum += 1;
          addClass(item.parentNode.parentNode, 'active');
        } else {
          removeClass(item.parentNode.parentNode, 'active');
        }
      });
      if (countNum === ckLength) {
        ckAll.checked = true;
      } else {
        ckAll.checked = false;
      }
    }
    document.querySelector('.fix-table-wrap').addEventListener('click', (event) => {
      const target = event.target;
      // console.log(target.nodeName);
      if (hasClass(target, 'ck-single')) {
        checkRow();
      }
      if (target.nodeName === 'TD') {
        target.parentNode.childNodes[0].querySelector('.ck-single').click();
      }
      if (target.nodeName === 'SPAN' && target.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName === 'TD') {
        target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].querySelector('.ck-single').click();
      }
    });
    // 全选
    function checkAll() {
      const ckAll = document.querySelector('.ck-all'),
        ischeckAll = ckAll.checked,
        ckTr = document.querySelectorAll('.rl-fix-table tbody tr'),
        ckSingle = document.querySelectorAll('.ck-single');
      // console.log(ckAll, ischeckAll, ckTr, ckSingle);
      ckSingle.forEach((item) => {
        item.checked = ischeckAll;
      });
      if (ischeckAll === true) {
        ckTr.forEach((tr) => {
          addClass(tr, 'active');
        });
      } else {
        ckTr.forEach((tr) => {
          removeClass(tr, 'active');
        });
      }
    }
    if (document.querySelector('.ck-all')) {
      document.querySelector('.ck-all').addEventListener('click', checkAll);
    }

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
@import "../../assets/sass/rl-fixed-table.min.scss";
@import "../../assets/sass/base.scss";
</style>
