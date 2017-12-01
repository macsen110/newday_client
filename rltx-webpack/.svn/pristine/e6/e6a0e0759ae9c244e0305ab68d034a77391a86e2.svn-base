/**
* table-column.vue
* Created by dsky on 17/6/5.
*/
<template>
  <div class="tableColumn">
    <el-table-column
      type="selection"
      header-align="center"
      width="80">
    </el-table-column>
    <el-table-column
      type="index"
      header-align="center"
      label="序号"
      width="70">
    </el-table-column>
    <el-table-column label="操作" width="140" header-align="center">
      <template scope="scope">
        <el-select placeholder="请选择" v-model="valueSelect[scope.$index]" v-if="actionArray[scope.$index].length">
          <el-option v-for="item in actionArray[scope.$index]" :key="item.onlyCode" :label="item.actionName" :value="item.onlyCode">
            <!--<span>{{ item.actionName }}</span>-->
            <a href="javascript:;" :data-link="'/waybill/action.html?'+item.waybillCode + '&' + item.actionCode" :data-title=" item.actionName " @click="clickTab($event)">{{ item.actionName }}</a>
          </el-option>
        </el-select>
        <a href="javascript:;" :data-link="'/waybill/add.html?'+scope.row.code" data-title="编辑运单" class="el-button el-button--small el-button--primary">编辑</a>
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
  import * as waybillService from '../../../api/waybillService';
  import { urlRedirect } from '../../../api/Utils';

  export default {
    name: 'tableColumn',
    props: {
      'getData': null,
      'actionArray': Array,
      'valueSelect': Array
    },
    data() {
      return {
        columnsData: []
      };
    },
    created() {
      waybillService.getColumn((success) => {
        if (success) {
          this.columnsData = success.content;
        }
      });
    },
    methods: {
      handleDelete(index, row) {
        const paramObj = {
            waybillCode: row.code
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
              waybillService.deleteList(paramObj, (success, error) => {
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
