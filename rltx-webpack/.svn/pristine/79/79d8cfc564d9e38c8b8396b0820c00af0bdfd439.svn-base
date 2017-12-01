<template>
  <div>
    <ele-list :selectable="false" :operatable="false"
              @query="query" @ready="ready"
              :loading="loading"
              :list-data="listData"
              ref="eleList"
              :params="params"
              :needPage="false"
              :isAdvanced="false"
              :getColumn="getColumn">
    </ele-list>
  </div>
</template>
<script type="text/ecmascript-6">
  import eleList from '../components/ele-list/eleList.vue';
  import { ratesList, getLogisticRatesColumn } from '../../api/rateService';

  export default {
    components: {
      'ele-list': eleList
    },
    props: {
      code: String
    },
    data() {
      return {
        params: {},
        columns: [],
        listData: [],
        loading: true,
        getColumn: getLogisticRatesColumn
      };
    },
    methods: {
      ready(params, columns) {
        this.columns = columns;
        this.query();
      },
      query() {
        ratesList(this.params, (success) => {
          this.loading = false;
          if (success) {
            const tempData = success.content;
            this.listData = tempData;
          }
        });
      }
    },
    created() {
      this.params = {
        code: this.code,
        size: 100,
        page: 1
      };
    }
  };
</script>
