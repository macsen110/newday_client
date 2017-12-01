/**
* list.vue
* 订单列表
* Created by zhuyi on 17/7/21.
*/
<template>
<!--<listLayout :deleteFun="deleteFun" :add="add" :downloadErrorData="downloadErrorData" :downloadTemplate="downloadTemplate" -->
            <!--:importUrl="importUrl" :getColumn="getColumn" :getList="getList" :exportCsv="exportCsv" -->
            <!--:getSearch="getSearch" :objectName="objectName" :editUrl="editUrl" :addUrl="addUrl" -->
            <!--:dispatch="dispatch" :dispatchUrl="dispatchUrl" :pop-truck-map="popTruckMap" :pop-logsitcs-truck-map="true">-->
<!--</listLayout>-->
  <div>
    <ele-list :selectable="selectable" :operatable="operatable"
              @query="query" @ready="query" @action="action" @more="more" @exportData="exportData"
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
              :editUrl="editUrl"
              :getColumn="getColumn"
              :getList="getList"
              :exportCsv="exportCsv"
              :getSearch="getSearch"
              :objectName="objectName">
    </ele-list>
    <el-dialog :title="actionDialogTitle" :visible.sync="actionDialogVisible" size="large">
      <component ref="logisticsAction" :is="currentDialogComponent"
                 @success="dialogSuccess" @fail="dialogFail" @close="dialogClose"
                 :type="type" :actionType="actionType" :actionDomain="actionDomain"
                 :id="currentCode" :action="currentActionCode" :actionExecuteFun="actionExecuteFun"
                 :isDialog="true"></component>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import eleList from '../components/ele-list/eleList.vue';
  import eleLogisticPopMap from '../components/ele-pop-map/eleLogisticPopMap.vue';
  import { urlRedirect } from '../../api/Utils';
  import { getColumn, getAction, list, getSearch, deleted, exportCsv, add, downloadErrorData, downloadTemplate, addAction as executeAction } from '../../api/LogisticsService';
  import ApiConst from '../../api/ApiConst';
  import eleAction from '../components/ele-action/eleAction.vue';

  export default {
    name: 'LogisticsList',
    components: {
      'ele-list': eleList,
      'ele-logistic-pop-map': eleLogisticPopMap,
      'ele-action': eleAction
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
        actionDialogTitle: 'Dialog',
        actionDialogVisible: false,
        type: 'logistics',
        actionType: 'logistics',
        actionDomain: `${ApiConst.apiLogisticsDomain}`,
        actionExecuteFun: executeAction,
        currentCode: null,
        currentActionCode: null,
        currentDialogComponent: '',
        getColumn,
        getList: list,
        getSearch,
        objectName: '订单',
        addUrl: '/logistics/add.html',
        editUrl: '/logistics/add.html',
        dispatch: true,
        dispatchUrl: '/waybill/add.html',
        deleteFun: deleted,
        exportCsv,
        add,
        popTruckMap: true,
        downloadErrorData,
        importUrl: `${ApiConst.apiLogisticsDomain}/import/logistics`,
        downloadTemplate
      };
    },
    methods: {
      openWindow(url, title) {
        urlRedirect(url, title);
      },
      more(model) {
//        console.log('more', `${this.listUrl}?objectName=${this.objectName}&${this.toParameterArray(model).join('&')}`);
        this.openWindow(`${this.listUrl}?objectName=${this.objectName}&${this.toParameterArray(model).join('&')}`, `${this.objectName}列表`);
      },
      dialogSubmit() {
        this.$refs.logisticsAction.execute();
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
      },
      doRemove(model) {
        const self = this;
        this.$msgbox({
          title: '确认',
          message: `确认要删除${this.objectName} ${model.logisticsNo} 吗？`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              deleted({ code: model.code }, (success, error) => {
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
          case 'dispatch':
            this.openWindow(`${this.dispatchUrl}?logisticsCode=${model.code}`, '派车');
            break;
          case 'remove':
            this.doRemove(model);
            break;
          case 'map':
            this.actionDialogTitle = menu.name;
            this.actionDialogVisible = true;
            this.currentCode = model.code;
            this.currentActionCode = menu.key;
            this.currentDialogComponent = 'ele-logistic-pop-map';
//            this.openWindow(`/truck/truck-gps.html?truckLicenseNo=${model.truckLicenseNo}&objectName=${this.objectName}`, '车辆轨迹');
            break;
          default:
            this.actionDialogTitle = menu.name;
            this.actionDialogVisible = true;
            this.currentCode = model.code;
            this.currentActionCode = menu.key;
            this.currentDialogComponent = 'ele-action';
            break;
        }
      },
      exportData(params) {
        exportCsv(params, (success) => {
          window.location.href = success.content.url;
        });
      },
      query(searchParams) {
        console.log('searchParams', searchParams);
        Object.assign(searchParams, this.params);
        console.log('query', searchParams);
        const self = this;
        this.total = 0;
        this.loading = true;
        list(searchParams, (success, error) => {
          this.loading = false;
          if (error) {
            this.$message({
              type: 'error',
              message: error.content,
              duration: 5000
            });
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
                // actionList.push({ key: 'edit', name: '编辑' });
                // actionList.push({ key: 'remove', name: '删除' });
                actionList.push({ key: 'dispatch', name: '派车' });
                actionList.push({ key: 'map', name: '车辆位置' });
                if (response && response.content[row.code]) {
                  response.content[row.code].forEach((action) => {
                    actionList.push({ key: action.actionCode, name: action.actionName });
                  });
                }
                row.actionMenuList = actionList;
              });
              self.listData = success.content;
//              this.loading = false;
//              self.listData.splice(self.listData.length);
              console.log('parent.listData', self.listData);
            });
          }
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>

