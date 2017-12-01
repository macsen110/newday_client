/**
* table.vue
* Created by dsky on 17/6/5.
*/
<template>
  <div class="block">
    <table-search :getData="getData" :searchData="searchData" ref="tableSearch"></table-search>

    <el-table
      :data="tableData"
      stripe
      border
      highlight-current-row
      v-loading.body="loading"
      element-loading-text="处理中，请稍候"
      max-height="600"
      show-summary
      :summary-method="getSummaries"
      @current-change="rowSelect"
      :default-sort = "{prop: 'date', order: 'descending'}"
      style="width: 100%">
      <table-column :getData="getData"></table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[2, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="text-r">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import { list, getSearch } from '../../../api/PartnerService';

  import tableColumn from './table-column.vue';

  import tableSearch from './table-search.vue';

  export default {
    name: 'table',
    components: {
      'table-column': tableColumn,
      'table-search': tableSearch
    },
    data() {
      return {
        tableData: null,
        currentPage1: 1,
        currentRow: null,
        pageSize: 10,
        page: 1,
        total: null,
        loading: true,
        searchData: []
      };
    },
    methods: {
      getData() {
        this.loading = true;
        const self = this;
        this.paramObj = {
          size: this.pageSize,
          page: this.page
        };
        self.searchData.forEach((value) => {
          self.paramObj[value.extraParams.field1] = document.getElementsByName(value.extraParams.field1)[0].value;
        });
        list(this.paramObj, (success, error) => {
          if (success) {
            self.loading = false;
            self.tableData = success.data.list;
            self.total = success.data.total;
          } else {
            console.error(error);
          }
        });
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getData();
      },
      rowSelect(val) {
        this.currentRow = val;
      },
      getSummaries(param) {
        const { columns, data } = param,
          sums = [];
        columns.forEach((column, index) => {
          if (index === 1) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              }
              return prev;
            }, 0);
            sums[index] += ' 人';
          } else {
            sums[index] = '-';
          }
        });
        return sums;
      }
    },
    created() {
      this.getData();
    },
    beforeCreate() {
      const self = this;
      getSearch((success, error) => {
        if (success) {
          success.data.forEach((value) => {
            value.extraParams = JSON.parse(value.extraParams);
            self.searchData.push(value);
          });
        } else {
          console.error(error);
        }
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
