/**
* list.vue
* 运单列表
* Created by zhuyi on 17/7/21.
*/
<template>
<listLayout :add="add" :downloadErrorData="downloadErrorData" :downloadTemplate="downloadTemplate" :importUrl="importUrl" :exportCsv="exportCsv" :deleteFun="deleteFun" :getColumn="getColumn" :getList="getList" :getSearch="getSearch" :objectName="objectName" :editUrl="editUrl" :addUrl="addUrl" :uploadUrl="uploadUrl">
</listLayout>
</template>

<script type="text/ecmascript-6">
  import listLayout from '../../layout/list/listLayout.vue';
  import * as ticketDetailService from '../../../api/ticketDetailService';
  import * as ApiConst from '../../../api/ApiConst';

  export default {
    name: 'waybillList',
    components: {
      'listLayout': listLayout
    },
    data: () => {
      return {
        getColumn: ticketDetailService.getColumn,
        getList: ticketDetailService.list,
        getSearch: ticketDetailService.getSearch,
        objectName: '货单',
        addUrl: '/ticket/add.html',
        editUrl: '/ticket/add.html',
        deleteFun: ticketDetailService.deleted,
        uploadUrl: `${ApiConst.apiWayBillDomain}`,
        exportCsv: ticketDetailService.exportCsv,
        add: ticketDetailService.add,
        downloadErrorData: ticketDetailService.downloadErrorData,
        importUrl: `${ApiConst.apiWayBillDomain}/import/ticket`,
        downloadTemplate: ticketDetailService.downloadTemplate
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>

