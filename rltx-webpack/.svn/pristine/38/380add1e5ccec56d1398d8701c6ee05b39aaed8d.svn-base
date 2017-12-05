<template>
  <div>
    <ele-list :selectable="false" :operatable="true"
              :showImportButton="false" :showDownloadTemplate="false" :showExportButton="false"
              @query="query" @ready="query" @action="action"
              :total="total" :loading="loading"
              :list-data="listData"
              ref="eleList"
              :isAdvanced="true"
              :customAdd="true"
              :customAddName="customAddName"
              :needFullSearch="false"
              :getColumn="getColumn"
              :getList="getList"
              :getSearch="getSearch"
              :footerEnable="false"
              :objectName="objectName">
    </ele-list>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unused-vars */

  import eleList from '../components/ele-list/eleList.vue';
  import { urlRedirect } from '../../api/Utils';
  import { settlePayableSelectCarrierColumn, settlePayableSelectCarrierSearch, settlePayableSelectCarrierList, settleOrgStatisticsRefresh } from '../../api/SettleBillService';

  export default {
    name: 'selectCarrierList',
    components: {
      'ele-list': eleList
    },
    props: {
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
        getColumn: settlePayableSelectCarrierColumn,
        getList: settlePayableSelectCarrierList,
        getSearch: settlePayableSelectCarrierSearch,
        objectName: '客户对账',
        customAddName: '刷新数据',
        selectWaybillUrl: '/settleBillPayable/select_waybill.html'
      };
    },
    methods: {
      openWindow(url, title) {
        urlRedirect(url, title);
      },
      refreshData() {
        const that = this,
          userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        settleOrgStatisticsRefresh(userInfo.orgCode, (success, error) => {
          that.$refs.eleList.dispatchQueryEvent();
        });
      },
      action(command, menu, model) {
        switch (command) {
          case 'selectWaybill':
            this.openWindow(`${this.selectWaybillUrl}?orgCode=${model.orgCode}&orgName=${model.orgName}`, '创建应付账单-选择运单');
            break;
          case 'add':
            this.refreshData();
            break;
          default:
            break;
        }
      },
      query(searchParams) {
        const self = this;
        this.total = 0;
        this.loading = true;
        settlePayableSelectCarrierList(searchParams, (success, error) => {
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
              const actionList = [];
              actionList.push({ key: 'selectWaybill', name: '开始对账' });
              data.actionMenuList = actionList;
            });
            self.listData = success.content;
            this.loading = false;
          }
        });
      }
    },
    created() {
      const that = this,
        userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      settleOrgStatisticsRefresh(userInfo.orgCode, (success, error) => {});
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>

