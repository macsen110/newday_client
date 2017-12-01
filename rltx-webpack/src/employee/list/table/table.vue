/**
* table.vue
* Created by cc on 17/6/30.
*/
<template>
  <div class="block">
    <div class="table-opr clearfix">
      <div class="opr-button fl">
        <el-button type="default" :disabled="true">导出人员</el-button>
      </div>
      <div class="mini-search fr" id="miniSearch">
        <table-search :getData="getData" :searchData="searchData2" :isShow="true" ref="tableSearch"></table-search>
      </div>
    </div>

    <el-table
      :data="tableData"
      stripe
      border
      highlight-current-row
      v-loading.body="loading"
      element-loading-text="处理中，请稍候"
      :height="adaptHeight"
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
      :total="total">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import { employeeList, getSearch } from '../../../../api/EmployeeService';

  import tableColumn from './table-column.vue';

  import tableSearch from './table-search.vue';

  import { adaptHeight, advanceSearch } from '../../../../api/Utils';

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
        searchData: [],
        codeArray: [],
        adaptHeight: null
      };
    },
    props: {
      'searchData2': Array
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
        employeeList(this.paramObj, (success) => {
          if (success) {
            self.tableData = success.content;
            self.total = success.total;
            const len = success.content.length;
            for (let i = 0; i < len; i++) {
              self.codeArray.push(success.content[i].code);
              self.actionArray[i] = [];
            }
          }
          self.loading = false;
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
      }
    },
    created() {
      this.getData();
      getSearch((success, error) => {
        if (success) {
          success.content.forEach((value) => {
            value.extraParams = JSON.parse(value.extraParams);
            this.searchData.push(value);
          });
        } else {
          console.error(error);
        }
        this.$nextTick(() => {
          this.adaptHeight = adaptHeight();
          window.onresize = () => {
            this.adaptHeight = adaptHeight();
          };
          advanceSearch();
        });
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
