/**
* table.vue
* Created by zyc on 17/7/6.
*/
<template>
  <div class="block">
      <div class="table-opr clearfix">
        <div class="opr-button fl">
          <!-- <el-button type="default">批量快捷内部调车</el-button>
          <el-button type="default">批量智能派车</el-button> -->
          <el-button type="default" :disabled="true">导出订单</el-button>
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
        <table-column :getData="getData" :actionArray="actionArray"></table-column>
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
  import { list, getAction, getSearch } from '../../../api/LogisticsService';

  import tableColumn from './table-column.vue';

  import tableSearch from './table-search.vue';

  import { adaptHeight, advanceSearch } from '../../../api/Utils';

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
        actionArray: [],
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
        list(this.paramObj, (success) => {
          if (success) {
            self.tableData = success.content;
            self.total = success.total;
            const len = success.content.length;
            for (let i = 0; i < len; i++) {
              self.codeArray.push(success.content[i].code);
              self.actionArray[i] = [];
            }
            getAction(self.codeArray, (suc) => {
              if (suc) {
                const actionLen = suc.content.length;
                for (let j = 0; j < actionLen; j++) {
                  for (let i = 0; i < len; i++) {
                    if (self.codeArray[i] === suc.content[j].logisticsCode) {
                      suc.content[j].onlyCode = suc.content[j].logisticsCode + suc.content[j].actionPermissionCode;
                      self.actionArray[i].push(suc.content[j]);
                    }
                  }
                }
                self.loading = false;
              }
            });
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
      getSearch((success) => {
        if (success) {
          success.content.forEach((value) => {
            value.extraParams = JSON.parse(value.extraParams);
            this.searchData.push(value);
          });
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
