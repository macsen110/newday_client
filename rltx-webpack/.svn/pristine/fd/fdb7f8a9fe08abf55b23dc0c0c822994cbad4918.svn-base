/**
* list.vue
* 运单列表
* Created by zhuyi on 17/7/21.
*/
<template>
  <div>
    <ele-list :selectable="selectable" :operatable="operatable"
              @query="query" @ready="query" @action="action" @exportData="exportData"
              :total="total" :loading="loading"
              :list-data="listData"
              ref="eleList"
              :customColumn="customColumn"
              :params="params"
              :needPage="needPage"
              :isAdvanced="isAdvanced"
              :deleteFun="deleteFun"
              :add="add"
              :downloadErrorData="downloadErrorData"
              :downloadTemplate="downloadTemplate"
              :importUrl="importUrl"
              :getColumn="getColumn"
              :getList="getList"
              :exportCsv="exportCsv"
              :getSearch="getSearch"
              :getAction="getAction"
              :objectName="objectName"
              :editUrl="editUrl"
              :addUrl="addUrl"
              :actionUrl="actionUrl"
              :pop-waybill-truck-map="popWaybillTruckMap">
    </ele-list>
    <el-dialog :title="actionDialogTitle" :visible="actionDialogVisible" size="large">
      <!--<waybill-action :id="currentWaybillCode" :action="currentActionCode" ref="waybillAction" :isDialog="true"></waybill-action>-->
      <!--<div id="dialog"></div>-->
      <component ref="waybillAction" :is="currentDialogComponent"
                 @success="dialogSuccess" @fail="dialogFail"
                 :id="currentWaybillCode" :action="currentActionCode" :isDialog="true"></component>
      <div slot="footer" class="dialog-footer">
        <!--<el-button type="primary" @click="editReportFeeForm" v-show="showButton">编 辑</el-button>-->
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--<waybill-action :id="currentWaybillCode" :action="currentActionCode" ref="waybillAction" :isDialog="true"></waybill-action>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import listLayout from '../components/ele-list/eleList.vue';
  import eleWaybillPopMap from '../components/ele-pop-map/eleWaybillPopMap.vue';
  import { urlRedirect } from '../../api/Utils';
  import { getSettleColumn, settleList, getSettleSearch, deleteSettleList, getAction, exportCsv, add, downloadErrorData, downloadTemplate } from '../../api/waybillService';
  import * as ApiConst from '../../api/ApiConst';
  import waybillAction from './action.vue';

  export default {
    name: 'settleList',
    components: {
      'ele-list': listLayout,
      'ele-waybill-pop-map': eleWaybillPopMap,
      'waybill-action': waybillAction
    },
    props: {
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
        listData: [],
        total: 0,
        loading: true,
        getColumn: getSettleColumn,
        actionDialogTitle: 'Dialog',
        actionDialogVisible: false,
        currentWaybillCode: '',
        currentActionCode: '',
        currentDialogComponent: '',
        getList: settleList,
        getSearch: getSettleSearch,
        objectName: '运单结账',
        addUrl: '/waybill/settle.html',
        editUrl: '/waybill/settle.html',
        actionUrl: '/waybill/action.html',
        deleteFun: deleteSettleList,
        getAction,
        exportCsv,
        add,
        downloadErrorData,
        importUrl: `${ApiConst.apiWayBillDomain}/import/waybill`,
        popWaybillTruckMap: true,
        downloadTemplate
      };
    },
    methods: {
      openWindow(url, title) {
        urlRedirect(url, title);
      },
      dialogSubmit() {
        this.$refs.waybillAction.execute();
      },
      dialogSuccess() {
        this.dialogClose();
        this.$refs.eleList.dispatchQueryEvent();
      },
      dialogFail() {
        console.log('dialog execute failed');
      },
      dialogClose() {
        this.actionDialogVisible = false;
        this.currentDialogComponent = null;
        this.currentWaybillCode = null;
        this.currentActionCode = null;
      },
      doRemove(model) {
        const self = this;
        this.$msgbox({
          title: '确认',
          message: `确认要删除${this.objectName} ${model.waybillNo} 吗？`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              this.deleteList({ code: model.code }, (success, error) => {
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '删除成功',
                    duration: 1000
                  });
                  done();
                  instance.confirmButtonLoading = false;
                }
                if (error) {
                  this.$message({
                    type: 'warning',
                    message: `${error}`,
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                }
              });
            } else {
              done();
            }
          }
        }).then(() => {
          self.$refs.eleList.dispatchQueryEvent();
        });
      },
      action(command, menu, model) {
        console.log('action command', command, 'menu', menu, 'model', model);
        switch (command) {
          case 'add':
            this.openWindow(`${this.editUrl}?objectName=${this.objectName}`, `新建${this.objectName}`);
            break;
          case 'edit':
            this.openWindow(`${this.editUrl}?code=${model.code}&objectName=${this.objectName}`, `编辑${this.objectName}`);
            break;
          case 'remove':
            this.doRemove(model);
            break;
          case 'map':
            this.actionDialogTitle = menu.name;
            this.actionDialogVisible = true;
            this.currentWaybillCode = model.code;
            this.currentActionCode = menu.key;
            this.currentDialogComponent = 'ele-waybill-pop-map';
//            this.openWindow(`/truck/truck-gps.html?truckLicenseNo=${model.truckLicenseNo}&objectName=${this.objectName}`, '车辆轨迹');
            break;
          default:
            this.actionDialogTitle = menu.name;
            this.actionDialogVisible = true;
            this.currentWaybillCode = model.code;
            this.currentActionCode = menu.key;
            this.currentDialogComponent = 'waybill-action';
//            this.currentDialogComponent = '<waybill-action :id="currentWaybillCode" :action="currentActionCode" isDialog="true"/>';
//            const WaybillActionComponent = Vue.extend(waybillAction);
//            this.currentDialogComponent = new WaybillActionComponent({ id: model.code, action: menu.key, isDialog: true });
            break;
        }
      },
      exportData(params) {
        exportCsv(params, (success) => {
          window.location.href = success.content.url;
        });
      },
      query(params) {
        console.log('query', params);
        const self = this;
        this.total = 0;
        this.loading = true;
        this.getList(params, (success, error) => {
          if (error) {
            this.$message({
              type: 'error',
              message: error.content,
              duration: 5000
            });
            this.loading = false;
          }
          const codeList = [];
          if (success) {
            this.total = success.total;
            success.content.forEach((data) => {
              codeList.push(data.code);
            });
            getAction(codeList, (response) => {
              success.content.forEach((row) => {
                const actionList = [];
                actionList.push({ key: 'edit', name: '编辑' });
                actionList.push({ key: 'remove', name: '删除' });
                actionList.push({ key: 'map', name: '查看车辆位置' });
                if (response) {
                  response.content[row.code].forEach((action) => {
                    actionList.push({ key: action.actionCode, name: action.actionName });
                  });
                }
                row.actionMenuList = actionList;
              });
              self.listData = success.content;
              this.loading = false;
//              self.listData.splice(self.listData.length);
              console.log('parent.listData', self.listData);
            });
          }
        });
      }
    },
    created() {}
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>

