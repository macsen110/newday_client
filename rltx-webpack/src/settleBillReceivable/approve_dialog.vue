<template>
  <el-dialog :title="title" :visible.sync="revoke.show">
    <el-form :model="data">
      <el-form-item :label="`${batchApproveLabel}请输入审核意见或理由。`">
        <el-input type="textarea" v-model="data.approveRemark" placeholder="请输入内容" :rows="10" :autosize="{ minRows: 10 }"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="revoke.show = false">关闭</el-button>
      <el-button type="primary" @click="handleApproveSuccess()">审核通过</el-button>
      <el-button type="primary" @click="handleApproveFail()">审核不通过</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss">

</style>

<script>
  export default {
    name: 'ApproveDialog',
    data() {
      return {
        data: {
          approveRemark: ''
        }
      };
    },
    props: {
      revoke: {
        type: Object,
        'default': () => {
          return {
            show: false
          };
        }
      },
      title: {
        type: String,
        'default': '审核账单'
      },
      batchApproveLabel: {
        type: String,
        'default': ''
      }
    },
    methods: {
      handleApproveSuccess() {
        this.$emit('onSuccess', {
          data: this.data
        });
      },
      handleApproveFail() {
        this.$emit('onFail', {
          data: this.data
        });
      }
    }
  };
</script>
