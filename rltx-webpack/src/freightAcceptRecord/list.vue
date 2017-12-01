/**
* list.vue
* 货源列表
*/
<template>
  <div>
    <ele-list :selectable="selectable" :operatable="operatable"
              :showImportButton="false" :showDownloadTemplate="false" :showExportButton="false"
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
              :showBatchSubmit="showBatchSubmit"
              :showBatchIgnored="showBatchIgnored"
              :batchOprName="batchOprName"
              :batchIgnoredName="batchIgnoredName"
              :batchSubmit="batchSubmitFun"
              :batchIgnored="batchIgnoredFun"
              :objectName="objectName">
    </ele-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import eleList from '../components/ele-list/eleList.vue';
  import { urlRedirect } from '../../api/Utils';
  import { getColumn, list, getSearch, exportCsv, downloadErrorData, downloadTemplate, batchSubmit, batchIgnored } from '../../api/FreightAcceptRecordService';
  import * as ApiConst from '../../api/ApiConst';

  export default {
    name: 'freightAcceptRecordList',
    components: {
      'ele-list': eleList
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
        getColumn,
        getList: list,
        getSearch,
        objectName: '接单记录',
        addUrl: '/freightAcceptRecord/add.html',
        editUrl: '/freightAcceptRecord/add.html',
        listUrl: '/freightAcceptRecord/list.html',
        deleteFun: null,
        exportCsv,
        add: null,
        showBatchSubmit: true,
        showBatchIgnored: true,
        batchOprName: '批量派车',
        batchIgnoredName: '批量忽略',
        batchSubmitFun: batchSubmit,
        batchIgnoredFun: batchIgnored,
        downloadErrorData,
        importUrl: `${ApiConst.apiFreightDomain}/import/freight.accept.record`,
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
      handleSendWaybill(model) {
        const paramObj = {
            code: model.code
          },
          h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [h('span', null, '确认派车吗？ ')]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              this.batchSubmitFun(paramObj, (success, error) => {
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '派车成功',
                    duration: 1000
                  });
                  done();
                  this.$refs.eleList.dispatchQueryEvent();
                  instance.confirmButtonLoading = false;
                }
                if (error) {
                  this.$message({
                    type: 'warning',
                    message: `${error}`,
                    duration: 1000
                  });
                  done();
                  this.$refs.eleList.dispatchQueryEvent();
                  instance.confirmButtonLoading = false;
                }
              });
            } else {
              done();
            }
          }
        }).then(() => {
          this.$refs.eleList.dispatchQueryEvent();
        });
      },
      handleIgnore(model) {
        const paramObj = {
            code: model.code
          },
          h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [h('span', null, '确认忽略吗？ ')]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              this.batchIgnoredFun(paramObj.code, (success, error) => {
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '忽略成功',
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                  this.$refs.eleList.dispatchQueryEvent();
                }
                if (error) {
                  this.$message({
                    type: 'warning',
                    message: `${error}`,
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                  this.$refs.eleList.dispatchQueryEvent();
                }
              });
            } else {
              done();
            }
          }
        }).then(() => {
          this.$refs.eleList.dispatchQueryEvent();
        });
      },
      toParameterArray(model) {
        const params = [];
        Object.keys(model).forEach((key) => {
          params.push(`${key}=${encodeURIComponent(model[key])}`);
        });
        return params;
      },
      action(command, menu, model) {
        console.log('action command', command, 'menu', menu, 'model', model);
        switch (command) {
          case 'sendTruck':
            this.handleSendWaybill(model);
            break;
          case 'ignore':
            this.handleIgnore(model);
            break;
          case 'view':
            this.openWindow(`/waybill/add.html?code=${model.waybillCode}&editable=false`, '运单详情');
            break;
          default:
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
          if (error) {
            this.$message({
              type: 'error',
              message: error.content,
              duration: 5000
            });
          }
          if (success) {
            this.total = success.total;
            success.content.forEach((data) => {
              const actionList = [],
                status = data.driverAcceptStatus;
              // actionList.push({ key: 'edit', name: '编辑' });
              switch (status) {
                case 'undispatched':
                  actionList.push({ key: 'sendTruck', name: '去派车' });
                  actionList.push({ key: 'ignore', name: '忽略' });
                  break;
                case 'dispatched':
                  actionList.push({ key: 'view', name: '查看运单详情' });
                  break;
                case 'ignored':
                  break;
                default:
                  break;
              }
              // actionList.push({ key: 'remove', name: '删除' });
              data.actionMenuList = actionList;
            });
            self.listData = success.content;
            this.loading = false;
//              self.listData.splice(self.listData.length);
            console.log('parent.listData', self.listData);
          }
        });
      }
    },
    created() {

    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/rl-fixed-table.min.scss";
  @import "../assets/sass/base.scss";
</style>

