/**
* list.vue
* 外包运单列表
* Created by cc on 17/9/23.
*/
<template>
<listLayout :add="add" :downloadErrorData="downloadErrorData" :downloadTemplate="downloadTemplate" :importUrl="importUrl" :exportCsv="exportCsv" :deleteFun="deleteFun" :getColumn="getColumn" :getList="getList" :getSearch="getSearch" :objectName="objectName" :editUrl="editUrl" :addUrl="addUrl" :uploadUrl="uploadUrl" :showImportButton="false" :showDownloadTemplate="false">
</listLayout>
</template>

<script type="text/ecmascript-6">
  import listLayout from '../layout/list/listLayout.vue';
  import { getColumn, list, getSearch, deleted, exportCsv, add, downloadErrorData, downloadTemplate } from '../../api/OutsourcingWaybillService';
  import ApiConst from '../../api/ApiConst';

  export default {
    name: 'outsourcingList',
    components: {
      'listLayout': listLayout
    },
    data() {
      return {
        getColumn,
        getList: list,
        getSearch,
        objectName: '外包运单',
        addUrl: '/outsourcingWaybill/add.html',
        editUrl: '/outsourcingWaybill/add.html',
        deleteFun: deleted,
        uploadUrl: `${ApiConst.apiWayBillDomain}`,
        exportCsv,
        add,
        downloadErrorData,
        importUrl: `${ApiConst.apiWayBillDomain}/import/outsourcing`,
        downloadTemplate
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/rl-fixed-table.min.scss";
  @import "../assets/sass/base.scss";
</style>
