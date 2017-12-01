/**
* list.vue
* 外包订单列表
* Created by cc on 17/9/22.
*/
<template>
<listLayout :add="add" :downloadErrorData="downloadErrorData" :downloadTemplate="downloadTemplate" :importUrl="importUrl" :exportCsv="exportCsv" :deleteFun="deleteFun" :getColumn="getColumn" :getList="getList" :getSearch="getSearch" :objectName="objectName" :editUrl="editUrl" :addUrl="addUrl" :uploadUrl="uploadUrl" :showImportButton="false" :showDownloadTemplate="false">
</listLayout>
</template>

<script type="text/ecmascript-6">
  import listLayout from '../layout/list/listLayout.vue';
  import { getColumn, list, getSearch, deleted, exportCsv, add, downloadErrorData, downloadTemplate } from '../../api/OutsourcingLogisticsService';
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
        objectName: '外包订单',
        addUrl: '/outsourcingLogistics/add.html',
        editUrl: '/outsourcingLogistics/add.html',
        deleteFun: deleted,
        uploadUrl: `${ApiConst.apiLogisticsDomain}`,
        exportCsv,
        add,
        downloadErrorData,
        importUrl: `${ApiConst.apiLogisticsDomain}/import/outsourcing`,
        downloadTemplate
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/rl-fixed-table.min.scss";
  @import "../assets/sass/base.scss";
</style>
