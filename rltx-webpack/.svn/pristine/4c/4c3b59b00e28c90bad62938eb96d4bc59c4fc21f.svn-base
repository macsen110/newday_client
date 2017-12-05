<template>
  <listLayout :getColumn="getColumn" :getList="getList" :getSearch="getSearch" :objectName="objectName" :defaultSearchModel="searchModel">
  </listLayout>
</template>

<script type="text/ecmascript-6">
  import listLayout from '../layout/list/reportLayout.vue';

  import * as ReportService from '../../api/ReportService';

  require('../public.js');

  export default {
    name: 'lineSummaryList',
    components: {
      'listLayout': listLayout
    },
    data: () => {
      return {
        getColumn: ReportService.lineSummaryColumn,
        getList: ReportService.lineSummaryList,
        getSearch: ReportService.lineSummarySearch,
        searchModel: {},
        objectName: '线路汇总'
      };
    },
    created() {
      this.searchModel.from_loadingDate = this.getCurrentMonthFirstDay();
      this.searchModel.to_loadingDate = this.getCurrentMonthLastDay();
    },
    methods: {
      getCurrentMonthFirstDay() {
        const date = new Date();
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
      },
      getCurrentMonthLastDay() {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/rl-fixed-table.min.scss";
  @import "../assets/sass/base.scss";
  .as-bd .el-date-editor {
    width: 100% !important;
  }
</style>

