<template>
  <div class="status-container">
    <div class="status-content">
      <h1 class="title">恭喜您，应收账单{{tips.type === 'add' ? '创建' : '编辑保存'}}成功！</h1>
      <p class="bill-code">账号编号：{{tips.billNo}}</p>
      <div class="btn-container">
        <el-button @click="onGoList" size="large">应收账单管理</el-button>
        <el-button @click="onGoView" size="large">查看账单详情</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'create_status',
    data() {
      return {};
    },
    props: {
      tips: {
        type: Object,
        default() {
          return {
            status: false,
            billCode: '',
            billNo: '',
            type: ''
          };
        }
      }
    },
    methods: {
      onGoList() {
        this.tips.status = false;
        this.$message.info('去查看列表');
        window.location.href = '/settleBillReceivable/list.html';
      },
      onGoView() {
        this.tips.status = false;
        this.$message.info('去查看详情');
        window.location.href = `/settleBillReceivable/create.html?code=${this.tips.billCode}&editable=false`;
      },
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
  .status-container {
    text-align: center;

    .status-content {
      margin-top: 100px;
      .title {
        font-size: 26px;
      }
      .bill-code {
        font-size: 20px;
        margin: 20px 0px;
      }
    }
  }
</style>
