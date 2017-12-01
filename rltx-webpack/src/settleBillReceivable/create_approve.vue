<!--approveContentName
:
"审核通过"
approveRemark
:
"通过了。"
approveTime
:
"2017-11-11 17:59:03"
approveUserFullName
:
"奥康"-->
<template>
  <div>
    <el-table
      :data="history.approveList.list"
      border
      style="width: 100%">
      <el-table-column
        prop="approveTime"
        label="审核时间"></el-table-column>
      <el-table-column
        prop="approveUserFullName"
        label="审核人"></el-table-column>
      <el-table-column
        prop="approveContentName"
        label="操作"></el-table-column>
      <el-table-column
        prop="approveRemark"
        label="备注"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'create_approve',
    data() {
      return {};
    },
    props: {
      history: {
        type: Object,
        default() {
          return {
            actualReceiptLogList: {
              list: []
            },
            approveList: {
              list: []
            }
          };
        }
      }
    },
    methods: {
      init() {
      }
    },
    mounted() {
      this.init();
    },
    watch: {
      $route() {
        this.init();
      }
    }
  };
</script>

<style lang="scss">

</style>
