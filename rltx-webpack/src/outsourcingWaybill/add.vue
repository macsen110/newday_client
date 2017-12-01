/**
* add.vue
* Created by cc on 17/9/23.
*/
<template>
  <detailLayout :objectName="objectName" :configUrl="configUrl"  :logType="logType"  :domainObject="domainObject" :addFun="addFun" :editFun="editFun" :getInfo="getInfo" :uploadUrl="uploadUrl" :listUrl="listUrl" :listTitle="listTitle"></detailLayout>
</template>

<script type="text/ecmascript-6">
  import detailLayout from '../layout/detail/detailLayout.vue';
  import { add, edit, get } from '../../api/OutsourcingWaybillService';

  import ApiConst from '../../api/ApiConst';

  export default {
    components: {
      'detailLayout': detailLayout
    },
    data() {
      return {
        objectName: '外包运单',
        configUrl: '',
        domainObject: {},
        addFun: add,
        editFun: edit,
        getInfo: get,
        uploadUrl: ApiConst.apiWayBillDomain,
        listUrl: '/outsourcingWaybill/list.html',
        listTitle: '外包运单列表',
        logType: 'outsourcing'
      };
    },
    created() {
      const domainUrl = ApiConst.apiWayBillDomain,
        configUrl = `${domainUrl}/detail_render_info/outsourcing/list`;
      this.configUrl = configUrl;
    }
  };
</script>

