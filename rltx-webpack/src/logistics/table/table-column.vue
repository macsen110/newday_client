/**
* table-column.vue
* Created by zyc on 17/7/6.
*/
<template>
  <div class="tableColumn">
    <el-table-column
      type="selection"
      header-align="center"
      fixed
      width="80">
    </el-table-column>
    <el-table-column
      type="index"
      header-align="center"
      label="序号"
      fixed
      width="70">
    </el-table-column>
    <el-table-column label="操作" width="140" header-align="center" fixed>
      <template scope="scope">
        <el-select placeholder="请选择" v-model="valueSelect[scope.$index]" v-show='actionArray[scope.$index].length'>
          <el-option v-for="item in actionArray[scope.$index]" :key="item.onlyCode" :label="item.actionName" :value="item.onlyCode">
            <div :data-link="'/logistics/action.html?'+item.logisticsCode + '&' + item.actionCode" :data-title="item.actionName" @click="clickTab($event)">{{ item.actionName }}</div>
          </el-option>
        </el-select>
        <a href="JavaScript:;" :data-link="'/logistics/add.html?'+scope.row.code" data-title="编辑订单" class="el-button el-button--small el-button--primary">编辑</a>
        <el-button
          size="small"
          type="default"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    <el-table-column v-for="column in columnsData" :prop="column.fieldConfigCode" :label="column.showName" header-align="center" :key="column.fieldConfigCode"></el-table-column>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getColumn, deleted } from '../../../api/LogisticsService';
  import { urlRedirect } from '../../../api/Utils';

  export default {
    name: 'tableColumn',
    props: {
      'getData': null,
      'actionArray': Array
    },
    data() {
      return {
        columnsData: [],
        valueSelect: []
      };
    },
    created() {
      getColumn((success) => {
        this.columnsData = success.content;
      });
    },
    methods: {
      handleDelete(index, row) {
        const paramObj = {
            code: row.code
          },
          h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '确认删除吗？ ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              deleted(paramObj, (success, error) => {
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '删除成功',
                    duration: 1000
                  });
                  done();
                  instance.confirmButtonLoading = false;
                }
                if (error) {
                  this.$message({
                    type: 'warning',
                    message: `${error}`,
                    duration: 1000

                  });
                  instance.confirmButtonLoading = false;
                  done();
                }
              });
            } else {
              done();
            }
          }
        }).then(() => {
          this.getData();
        });
      },
      clickTab(ele) {
        const dom = ele.target,
          link = dom.getAttribute('data-link'),
          title = dom.getAttribute('data-title');
        urlRedirect(link, title);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
