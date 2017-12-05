/**
* list.vue
* Created by dsky on 17/5/23.
*/
<template>
  <div class="block">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="伙伴名称">
        <el-input v-model="formInline.partnerName" placeholder="伙伴名称"></el-input>
      </el-form-item>
      <!--<el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item><el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i> 查询</el-button>
        <a href="add.html" class="el-button el-button--info" target="_blank"><i class="el-icon-plus"></i> 添加数据</a>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      stripe
      border
      highlight-current-row
      v-loading.body="loading"
      element-loading-text="处理中，请稍候"
      max-height="600"
      @current-change="rowSelect"
      :summary-method="getSummaries"
      :default-sort = "{prop: 'date', order: 'descending'}"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="80">
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="70">
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template scope="scope">
          <a :href="'add.html?'+scope.row.partnerOrgCode" class="el-button el-button--small el-button--primary" target="_blank">编辑</a>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="partnerName"
        label="伙伴名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="county"
        label="县"
        width="180">
      </el-table-column>
      <el-table-column
        prop="creatorUsername"
        label="创建人用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="备注"
        width="180">
      </el-table-column>
      <el-table-column
        prop="linkmanFullName"
        label="业务联系人姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="linkmanPhone"
        label=" 电话号码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="orgFullName"
        label="公司全称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="orgTagList"
        label="标签列表"
        width="180">
      </el-table-column>
      <el-table-column
        prop="partnerOrgCode"
        label="伙伴编码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省Code"
        width="180">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="updateUsername"
        label="更新人用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        :formatter="formatter"
        label="创建时间">
      </el-table-column>
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
  import { list, deleted } from '../../api/PartnerService';

  export default {
    data() {
      return {
        tableData: null,
        currentPage1: 1,
        currentRow: null,
        formInline: {
          partnerName: ''
        },
        pageSize: 10,
        page: 1,
        total: null,
        loading: true
      };
    },
    methods: {
      getData() {
        this.loading = true;
        const paramObj = {
            size: this.pageSize,
            page: this.page,
            partnerName: this.formInline.partnerName
          },
          self = this;
        list(paramObj, (success, error) => {
          if (success) {
            self.loading = false;
            self.tableData = success.data.data;
            self.total = success.data.count;
          }
          if (error) {
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
      formatter(row) {
        return row.address;
      },
      getSummaries(param) {
        const { columns, data } = param,
          sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
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
            sums[index] += ' 岁';
          } else {
            sums[index] = '-';
          }
        });
        return sums;
      },
      onSubmit() {
        this.getData();
      },
      handleDelete(index, row) {
        this.loading = true;
        const paramObj = {
            partnerOrgCode: row.partnerOrgCode
          },
          self = this;
        deleted(paramObj, (success, error) => {
          if (success) {
            this.getData();
            self.loading = false;
          }
          if (error) {
            console.error(error);
          }
        });
      }
    },
    created() {
      this.getData();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/sass/base";
</style>
