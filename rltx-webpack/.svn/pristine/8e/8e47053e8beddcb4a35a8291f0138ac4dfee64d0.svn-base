<template>
  <el-dialog :title="title" :visible.sync="dialog.show" size='large'>
    <el-form :model="dialog.data" label-width="100px" :inline="true" :rules="rules" ref="data">
      <el-row class="grey-section">
        <el-col :span="24">
          <label>客户名称：</label>
          <span>{{dialog.data.clientOrgName}}</span>
        </el-col>
        <el-col :span="8">
          <label>账单编号：</label>
          <span>{{dialog.data.billNo}}</span>
        </el-col>
        <el-col :span="16">
          <label>账单名称：</label>
          <span>{{dialog.data.billName}}</span>
        </el-col>
        <el-col :span="8">
          <label>未收金额：</label>
          <span>¥<strong>{{dialog.data.unreceivedAmount}}</strong>元</span>
        </el-col>
        <el-col :span="8">
          <label>应收金额：</label>
          <span>¥<strong>{{dialog.data.receivableAmount}}</strong>元</span>
        </el-col>
        <el-col :span="8">
          <label>已收金额：</label>
          <span>¥<strong>{{dialog.data.receivedAmount}}</strong>元</span>
        </el-col>
      </el-row>
      <el-row class="form-section">
        <el-col :span="7">
          <el-form-item label="结算方式" prop="settlingMethod">
            <el-select v-model="dialog.data.settlingMethod">
              <el-option value="现金" label="现金"></el-option>
              <el-option value="银行转账" label="银行转账"></el-option>
              <el-option value="油卡" label="油卡"></el-option>
              <el-option value="气卡" label="气卡"></el-option>
              <el-option value="银行汇票" label="银行汇票"></el-option>
              <el-option value="商业汇票" label="商业汇票"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收款金额" prop="amount">
            <el-input type="text" v-model="dialog.data.amount"></el-input>
            <span class="unit">元</span>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="收款时间" prop="operateTime">
            <el-date-picker type="datetime" v-model="dialog.data.operateTime" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="dialog.data.description" placeholder="请输入内容" :rows="3" :autosize="{ minRows: 3 }"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.show=false">取消</el-button>
      <el-button type="primary" @click="onSuccess">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'ReceiveDialog',
    data() {
      return {
        rules: {
          settlingMethod: [{
            required: true,
            message: '请选择结算方式',
            trigger: 'change'
          }],
          amount: [{
            required: true,
            message: '请输入收款金额',
            trigger: 'blur'
          }],
          operateTime: [{
            type: 'date',
            required: true,
            message: '请选择收款时间',
            trigger: 'blur'
          }]
        }
      };
    },
    props: {
      dialog: {
        type: Object,
        'default': () => {
          return {
            show: false,
            data: {}
          };
        }
      },
      title: {
        type: String,
        'default': '添加收款'
      }
    },
    methods: {
      onSuccess() {
        this.$emit('onSuccess');
      },
      init() {}
    }
  };
</script>

<style lang="scss">
  .grey-section {
    padding: 10px 10px 0;
    margin: 10px;
    background-color: #f8f8f8;
    border: solid 1px #e8e8e8;
    .el-col {
      margin-bottom: 10px;
    }
  }
  
  .unit {
    position: absolute;
    top: 0;
    right: 5px;
    color: #999;
  }
  
  .form-section {
    .el-col-8 {
      .el-input {
        width: 140px;
      }
    }
    .el-col-24 {
      .el-form-item {
        display: block;
        .el-form-item__label {
          float: left;
        }
        .el-form-item__content {
          display: block;
          margin-left: 100px;
        }
      }
    }
  }
  
  .el-dialog__body .form-section .el-date-editor {
    width: 180px !important;
  }
</style>
