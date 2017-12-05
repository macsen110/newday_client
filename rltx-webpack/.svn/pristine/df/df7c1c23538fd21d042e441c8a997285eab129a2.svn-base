/**
* add.vue
* Created by cc on 17/8/10.
*/
<template>
<detailLayout :objectName="objectName" :configUrl="configUrl" :domainObject="domainObject" :addFun="addFun" :editFun="editFun" :getInfo="getInfo" :uploadUrl="uploadUrl" :logType="logType" :listUrl="listUrl" :listTitle="listTitle"></detailLayout>
</template>

<script type="text/ecmascript-6">
  import detailLayout from '../../layout/detail/detailLayout.vue';
  import * as ticketDetailService from '../../../api/ticketDetailService';

  import ApiConst from '../../../api/ApiConst';

  export default {
    components: {
      'detailLayout': detailLayout
    },
    data() {
      return {
        objectName: '货单',
        configUrl: '',
        domainObject: {},
        addFun: ticketDetailService.add,
        editFun: ticketDetailService.edit,
        getInfo: ticketDetailService.get,
        uploadUrl: ApiConst.apiWayBillDomain,
        logType: 'ticket',
        listUrl: '/ticket/list.html',
        listTitle: '货单管理'
      };
    },
    created() {
      const orgUrl = ApiConst.apiWayBillDomain,
        configUrl = `${orgUrl}/waybill_ticket_detail/detail_render_info/list/`;
      this.configUrl = configUrl;
    }
  };
</script>

