/**
* list.vue
* 结算单列表
* Created by zhuyi on 17/7/21.
*/
<template>
<listLayout :deleteFun="deleteFun" :getColumn="getColumn" :getList="getList" :getSearch="getSearch" :objectName="objectName" :editUrl="editUrl" :addUrl="addUrl" :importUrl="importUrl">
</listLayout>
</template>

<script type="text/ecmascript-6">
  import listLayout from '../layout/list/listLayout.vue';
  import * as waybillService from '../../api/waybillService';

  export default {
    name: 'waybillList',
    components: {
      'listLayout': listLayout
    },
    data: () => {
      return {
        getColumn: waybillService.getSettleColumn,
        getList: waybillService.settleList,
        getSearch: waybillService.getSettleSearch,
        objectName: '费用',
        addUrl: '/waybill/addsettle.html',
        editUrl: '/waybill/addsettle.html',
        importUrl: '',
        deleteFun: waybillService.deleteSettleList
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>

