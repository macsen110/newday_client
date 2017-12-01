/**
* list.vue
* Created by zhuyi on 17/7/5.
*/

<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="list" class="list-page">
    <!-- advance search -->
    <div class="advance-search">
      <div class="as-bd" id="asBd">
        <v-tableSearch :getData="getData" :searchFields="searchFields" :searchModel="searchModel" :isShow="false" ref="tableSearch"></v-tableSearch>
      </div>
    </div>
    <div class="list-wrap">
      <div class="page-header clearfix">
        <h2 class="page-title fl">运单列表</h2>
        <div class="hd-opr fr">
          <span class="page-refresh fr" id="pageRefresh">
            <i class="ico-refresh"></i>刷新
          </span>
        </div>
        <div class="block">
          <div class="table-opr clearfix">
            <div class="mini-search fr" id="miniSearch">
              <v-minTableSearch :getData="getData" :searchFields="searchFields" :searchModel="searchModel" :isShow="true" ref="tableSearch"></v-minTableSearch>
            </div>
          </div>
          <v-table :getData="getData" :deleteFun="deleteFun" :editUrl="editUrl" :actionUrl="actionUrl" :dispatch="dispatch" :dispatchUrl="dispatchUrl" :columnsData="columnsData" :listData="listData" :searchData="searchData" :actionData="actionData" :operValues="operValues" :objectName="objectName" :uploadUrl="uploadUrl" v-loading.fullscreen.lock="loading">
          </v-table>
          <v-page :page="page" :pageSize="pageSize" :total="total" v-on:change="change"></v-page>
        </div>
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
import { addClass, removeClass, hasClass } from '../../../api/classUtil';
import { getParam, adaptHeight } from '../../../api/Utils';
import { list as getlist, getAction, deleteList, getColumn } from '../../../api/waybillService';
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
  },
  data: () => {
    return {
      columnsData: [],
      listData: [],
      searchData: [],
      pageSize: 20,
      page: 1,
      exportMinSize: 1,
      total: null,
      searchFields: [],
      searchModel: {},
      actionData: {},
      operValues: {},
      loading: true,
      leftDistance: '',
      topDistance: '',
      waybillUrl: '/waybill/list.html',
      add: Function,
      objectName: null,
      addUrl: '',
      editUrl: '',
      actionUrl: '',
      dispatch: '',
      dispatchUrl: '',
      deleteFun: deleteList,
      getAction,
      uploadUrl: '',
      importUrl: String,
      downloadTemplate: Function,
      isHide: false,
      extraSearchParamObj: {}
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
      getlist(this.paramObj, (success, error) => {
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
    fixedTable(event) {
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
    },
    checkRow() {
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
    },
    checkAll() {
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
    },
    getconfig() {
      /* eslint-disable quotes */
      const data = {
        "code": 200,
        "content": [
          {
            "elementCode": "text",
            "extraParams": "{\"field1\":\"logisticsNo\"}",
            "fieldConfigCode": "logisticsNo",
            "showName": "订单号"
          },
          {
            "elementCode": "select",
            "extraParams": "{\"field1\":\"logisticsStatus\",\"optionsValue1\":[\"todo\",\"doing\",\"done\",\"cancel\"],\"options1\":[\"待执行\",\"执行中\",\"订单完成\",\"订单取消\"]}",
            "fieldConfigCode": "logisticsStatus",
            "showName": "订单状态"
          },
          {
            "elementCode": "selectPartner",
            "extraParams": "{\"field1\":\"clientOrgName\",\"field2\":\"clientOrgCode\",\"field3\":\"clientOrgName\",\"placeholder1\":\"请输入托运客户\"}",
            "fieldConfigCode": "clientOrg",
            "showName": "托运客户"
          },
          {
            "elementCode": "selectRoute",
            "extraParams": "{\"field1\":\"routeName\",\"field2\":\"routeCode\",\"placeholder1\":\"请输入线路名称\"}",
            "fieldConfigCode": "route",
            "showName": "线路名称"
          },
          {
            "elementCode": "text",
            "extraParams": "{\"field1\":\"shipperOrgName\",\"placeholder1\":\"请输入装货单位\"}",
            "fieldConfigCode": "loadingOrg",
            "showName": "装货单位"
          },
          {
            "elementCode": "selectArea",
            "extraParams": "{\"field1\":\"loadingProvinceCode\",\"field2\":\"loadingCityCode\",\"field3\":\"loadingCountyCode\"}",
            "fieldConfigCode": "loadingArea",
            "showName": "装货地"
          },
          {
            "elementCode": "text",
            "extraParams": "{\"field1\":\"consigneeOrgName\",\"placeholder1\":\"请输入卸货单位\"}",
            "fieldConfigCode": "unloadingOrg",
            "showName": "卸货单位"
          },
          {
            "elementCode": "selectArea",
            "extraParams": "{\"field1\":\"unloadingProvinceCode\",\"field2\":\"unloadingCityCode\",\"field3\":\"unloadingCountyCode\"}",
            "fieldConfigCode": "unloadingArea",
            "showName": "卸货地"
          }
        ]
      };
      return data;
    }
  },
  created() {
    const self = this;
    setTimeout(() => {
      // 获取检索区域
      const config = ['logisticsNo', 'logisticsStatus', 'meterageType', 'clientOrg', 'route', 'rates', 'goodsName'],
        configColumnsData = [];
      getColumn((success) => {
        success.content.forEach((val) => {
          console.log('val: ', val);
          console.log(config.indexOf(val.fieldConfigCode));
          if (config.indexOf(val.fieldConfigCode) > 0) {
            configColumnsData.push(val);
          }
        });
        console.log(configColumnsData);
        const localStorage = window.localStorage,
          eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
          eleInfo = JSON.parse(localStorage.getItem('eleInfo')),
          configData = self.getconfig(),
          paramData = getParam({ data: configData }, eleDefine, eleInfo),
          columns = getParam({ data: { content: configColumnsData } }, eleDefine, eleInfo);
        console.log('paramData', paramData);
        console.log('columns', columns);
        paramData.field.forEach((field) => {
          field.extraParams.forEach((property) => {
            self.$set(self.searchModel, property.field, null);
          });
        });
        self.searchFields = paramData.field;
        self.columnsData = columns.field;
        self.getData();
      });
    }, 20);
  },
  mounted() {
    const self = this;
    // 重置宽度
    document.querySelectorAll('.fix-table-wrap').forEach((value) => {
      value.addEventListener('scroll', self.fixedTable);
    });
    // 单选
    document.querySelector('.fix-table-wrap').addEventListener('click', (event) => {
      const target = event.target;
      // console.log(target.nodeName);
      if (hasClass(target, 'ck-single')) {
        self.checkRow();
      }
      if (target.nodeName === 'TD') {
        target.parentNode.childNodes[0].querySelector('.ck-single').click();
      }
      if (target.nodeName === 'SPAN' && target.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName === 'TD') {
        target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].querySelector('.ck-single').click();
      }
    });
    // 全选
    document.querySelector('.ck-all').addEventListener('click', self.checkAll);

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
