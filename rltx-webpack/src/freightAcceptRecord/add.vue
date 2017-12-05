/**
* add.vue
* Created by cc on 17/8/10.
*/
<template>
  <detailLayout :objectName="objectName" :configUrl="configUrl" :domainObject="domainObject" :addFun="addFun" :editFun="editFun" :getInfo="getInfo" :uploadUrl="uploadUrl" :logType="logType" :listUrl="listUrl" :listTitle="listTitle"></detailLayout>
</template>

<script type="text/ecmascript-6">
  import detailLayout from '../layout/detail/detailLayout.vue';
  import { edit, get } from '../../api/FreightAcceptRecordService';

  import ApiConst from '../../api/ApiConst';

  export default {
    name: 'freightAcceptRecordAdd',
    components: {
      'detailLayout': detailLayout
    },
    data() {
      return {
        objectName: '新增接单记录',
        configUrl: '',
        domainObject: {},
        addFun: null,
        editFun: edit,
        getInfo: get,
        uploadUrl: ApiConst.apiFreightDomain,
        logType: 'freightAcceptRecord',
        listUrl: '/freightAcceptRecord/list.html',
        listTitle: '接单记录管理'
      };
    },
    created() {
      const freightUrl = ApiConst.apiFreightDomain,
        configUrl = `${freightUrl}/detail_render_info/freight.accept.record/list`;
      this.configUrl = configUrl;
    }
  };
</script>

