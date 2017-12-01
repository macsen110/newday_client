<template>
  <div>
    <ele-list :selectable="true" :operatable="true"
              :showImportButton="false" :showDownloadTemplate="false" :showExportButton="false"
              :showBatchBtn1="true" :showBatchBtn2="true"
              :batchBtn1Name="batchBtn1Name" :batchBtn2Name="batchBtn2Name"
              @batchOpr1="batchOpr1_" @batchOpr2="batchOpr2_"
              @query="query" @ready="query" @action="action"
              :total="total" :loading="loading"
              :list-data="listData"
              ref="eleList"
              :needAdd="false"
              :getColumn="getColumn"
              :getList="getList"
              :getSearch="getSearch"
              :footerEnable="false"
              :editUrl="editUrl"
              :objectName="objectName">
    </ele-list>
    <el-dialog :title="approveDialogTitle" :visible.sync="approveDialogVisible">
      <el-form :model="approveForm">
        <el-form-item :label="`${batchApproveLabel}请输入审核意见或理由`">
          <el-input type="textarea" v-model="approveForm.approveRemark" placeholder="请输入内容" :rows="10" :autosize="{ minRows: 10 }"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="approveDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleApproveSuccess()">审核通过</el-button>
        <el-button type="primary" @click="handleApproveFail()">审核不通过</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加付款" :visible.sync="paymentDialogVisible" size="large">
      <el-form :model="paymentForm" label-width="100px" :inline="true" :rules="paymentFormRules" ref="paymentForm">
        <el-row class="grey-section">
            <el-col :span="24">
              <label>承运商名称：</label>
              <span>{{paymentForm.carrierOrgName}}</span>
            </el-col>
            <el-col :span="8">
              <label>账单编号：</label>
              <span>{{paymentForm.billNo}}</span>
            </el-col>
            <el-col :span="16">
              <label>账单名称：</label>
              <span>{{paymentForm.billName}}</span>
            </el-col>
            <el-col :span="8">
              <label>未付金额：</label>
              <span>¥<strong>{{paymentForm.unpaidAmount}}</strong>元</span>
            </el-col>
            <el-col :span="8">
              <label>应付金额：</label>
              <span>¥<strong>{{paymentForm.payableAmount}}</strong>元</span>
            </el-col>
            <el-col :span="8">
              <label>已付金额：</label>
              <span>¥<strong>{{paymentForm.paidAmount}}</strong>元</span>
            </el-col>
        </el-row>
        <el-row class="form-section">
          <el-col :span="7">
            <el-form-item label="结算方式" prop="settlingMethod">
              <el-select v-model="paymentForm.settlingMethod">
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
            <el-form-item label="付款金额" prop="amount">
              <el-input type="text" v-model="paymentForm.amount"></el-input><span class="unit">元</span>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="付款时间" prop="operateTime">
              <el-date-picker type="datetime" v-model="paymentForm.operateTime" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="paymentForm.description" placeholder="请输入内容" :rows="3" :autosize="{ minRows: 3 }"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="paymentDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePayment()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unused-vars */

  import eleList from '../components/ele-list/eleList.vue';
  import { urlRedirect } from '../../api/Utils';
  import { settlePayableGet, settlePayableList, settlePayableListColumn, settlePayableListSearch, settlePayableApplyApprove, settlePayableApprove,
  settlePayableRevokeApplyApprove, settlePayableRevokeApprove, settlePayableCancel, settlePayableReceivedInvoice, settlePayableActualPaymentLogAdd } from '../../api/SettleBillService';

  export default {
    name: 'payableList',
    components: {
      'ele-list': eleList
    },
    props: {
      params: {
        type: Object,
        'default': function () {
          return {};
        }
      }
    },
    data: () => {
      return {
        batchBtn1Name: '批量提交审核',
        batchBtn2Name: '批量审核账单',
        listData: [],
        total: 0,
        loading: true,
        getColumn: settlePayableListColumn,
        getList: settlePayableList,
        getSearch: settlePayableListSearch,
        objectName: '应付账单列表',
        editUrl: '/settleBillPayable/create.html',
        batchApplyNum: 0,
        batchApproveNum: 0,
        batchApproveList: [],
        batchApproveLabel: '',
        approveDialogVisible: false,
        paymentDialogVisible: false,
        approveDialogTitle: '批量审核账单',
        approveForm: {
          approveRemark: ''
        },
        paymentForm: {
          billCode: String,
          clientOrgCode: String,
          clientOrgName: String,
          billNo: String,
          billName: String,
          unreceivedAmount: Number,
          receivableAmount: Number,
          receivedAmount: Number,
          settlingMethod: String,
          amount: Number,
          operateTime: String,
          description: String
        },
        paymentFormRules: {
          settlingMethod: [
            { required: true, message: '请选择结算方式', trigger: 'change' }
          ],
          amount: [
            { required: true, message: '请输入付款金额', trigger: 'blur' }
          ],
          operateTime: [
            { type: 'date', required: true, message: '请选择付款时间', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      openWindow(url, title) {
        urlRedirect(url, title);
      },
      action(command, menu, model) {
        switch (command) {
          case 'applyApprove':
            this.applyApprove(model.code);
            break;
          case 'revokeApply':
            this.revokeApply(model.code);
            break;
          case 'approve':
            this.approve(model.code);
            break;
          case 'revokeApprove':
            this.revokeApprove(model.code);
            break;
          case 'edit':
            this.openWindow(`/settleBillPayable/select_waybill.html?billCode=${model.code}`, '编辑应付账单-选择运单');
            break;
          case 'receivedInvoice':
            this.receivedInvoice(model.code);
            break;
          case 'payment':
            this.payment(model.code);
            break;
          case 'destroy':
            this.destroy(model.code);
            break;
          default:
            break;
        }
      },
      batchOpr1_() {
        const that = this,
          list = [];
        this.listData.forEach((item) => {
          if (item.checked && item.billStatus === 'none') {
            list.push(item.code);
          }
        });
        if (!list.length) {
          this.$message({
            type: 'warning',
            message: '请选择待提交审核记录！',
            duration: 1000
          });
          return;
        }
        this.$msgbox({
          title: '提示',
          message: `共选中${list.length}条"待提交审核"状态的账单， 您确认批量提交审核这些账单吗？`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              that.batchApplyNum = list.length;
              list.forEach((item) => {
                settlePayableApplyApprove(item, (success, error) => {
                  that.batchApplyNum -= 1;
                  if (that.batchApplyNum === 0) {
                    this.$message({
                      type: 'success',
                      message: '批量提交审核成功',
                      duration: 1000
                    });
                    instance.confirmButtonLoading = false;
                    done();
                    that.$refs.eleList.dispatchQueryEvent();
                  }
                });
              });
            } else {
              done();
            }
          }
        });
      },
      batchOpr2_() {
        const that = this,
          list = [];
        this.listData.forEach((item) => {
          if (item.checked && item.billStatus === 'pend') {
            list.push(item.code);
          }
        });
        if (list.length) {
          that.batchApproveList = list;
          that.batchApproveLabel = `共选中${list.length}条“待审核”状态的账单，`;
          that.approveDialogTitle = '批量审核账单';
          that.approveDialogVisible = true;
        } else {
          this.$message({
            type: 'warning',
            message: '请选择待审核记录！',
            duration: 1000
          });
        }
      },
      applyApprove(code) {
        const that = this;
        this.$msgbox({
          title: '提示',
          message: '您确认提交审核这笔账单吗？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              settlePayableApplyApprove(code, (success, error) => {
                if (error) {
                  this.$message({
                    type: 'success',
                    message: error.content,
                    duration: 1000
                  });
                }
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '提交审核成功',
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                  that.$refs.eleList.dispatchQueryEvent();
                }
              });
            } else {
              done();
            }
          }
        });
      },
      revokeApply(code) {
        const that = this;
        this.$msgbox({
          title: '提示',
          message: '您确认要撤回提交审核这笔账单吗？账单将回到"待提交审核"状态，并可以编辑。',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              settlePayableRevokeApplyApprove(code, (success, error) => {
                if (error) {
                  this.$message({
                    type: 'success',
                    message: error.content,
                    duration: 1000
                  });
                }
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '撤回提交审核成功！',
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                  that.$refs.eleList.dispatchQueryEvent();
                }
              });
            } else {
              done();
            }
          }
        });
      },
      revokeApprove(code) {
        const that = this;
        this.$msgbox({
          title: '提示',
          message: '您确认要撤回审核这笔账单吗？账单将回到"待审核"状态。',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              settlePayableRevokeApprove(code, (success, error) => {
                if (error) {
                  this.$message({
                    type: 'success',
                    message: error.content,
                    duration: 1000
                  });
                }
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '撤回提交审核成功！',
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                  that.$refs.eleList.dispatchQueryEvent();
                }
              });
            } else {
              done();
            }
          }
        });
      },
      receivedInvoice(code) {
        const that = this;
        this.$msgbox({
          title: '提示',
          message: '您确认已经收票了吗？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              settlePayableReceivedInvoice(code, (success, error) => {
                if (error) {
                  this.$message({
                    type: 'success',
                    message: error.content,
                    duration: 1000
                  });
                }
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '确认收票成功！',
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                  that.$refs.eleList.dispatchQueryEvent();
                }
              });
            } else {
              done();
            }
          }
        });
      },
      approve(code) {
        const that = this;
        that.batchApproveList = [code];
        that.batchApproveLabel = '';
        that.approveDialogVisible = true;
        that.approveDialogTitle = '审核账单';
      },
      handleApproveFail() {
        const that = this;
        let label = '笔';
        if (that.batchApproveList.length > 1) {
          label = '批';
        }
        this.$msgbox({
          title: '提示',
          message: `您确认审核不通过这${label}账单吗？`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              that.batchApproveNum = that.batchApproveList.length;
              that.batchApproveList.forEach((item) => {
                settlePayableApprove(item, { billStatus: 'reject', approveRemark: that.approveForm.approveRemark }, (success, error) => {
                  that.batchApproveNum -= 1;
                  if (that.batchApproveNum === 0) {
                    this.$message({
                      type: 'success',
                      message: '审核通过操作成功！',
                      duration: 1000
                    });
                    that.approveDialogVisible = false;
                    instance.confirmButtonLoading = false;
                    done();
                    that.$refs.eleList.dispatchQueryEvent();
                  }
                });
              });
            } else {
              done();
            }
          }
        });
      },
      handleApproveSuccess() {
        const that = this;
        let label = '笔';
        if (that.batchApproveList.length > 1) {
          label = '批';
        }
        this.$msgbox({
          title: '提示',
          message: `您确认审核通过这${label}账单吗？`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              that.batchApproveNum = that.batchApproveList.length;
              that.batchApproveList.forEach((item) => {
                settlePayableApprove(item, { billStatus: 'accept', approveRemark: that.approveForm.approveRemark }, (success, error) => {
                  that.batchApproveNum -= 1;
                  if (that.batchApproveNum === 0) {
                    this.$message({
                      type: 'success',
                      message: '审核通过操作成功！',
                      duration: 1000
                    });
                    that.approveDialogVisible = false;
                    instance.confirmButtonLoading = false;
                    done();
                    that.$refs.eleList.dispatchQueryEvent();
                  }
                });
              });
            } else {
              done();
            }
          }
        });
      },
      payment(code) {
        const that = this;
        settlePayableGet(code, (success, error) => {
          if (success) {
            const bill = success.content;
            that.paymentForm = {
              billCode: bill.code,
              carrierOrgCode: bill.payeeOrgCode,
              carrierOrgName: bill.payeeOrgName,
              billNo: bill.billNo,
              billName: bill.billName,
              unpaidAmount: bill.unpaidAmount,
              payableAmount: bill.payableAmount,
              paidAmount: bill.paidAmount,
              settlingMethod: '现金',
              amount: '',
              operateTime: new Date(),
              description: ''
            };
            that.paymentDialogVisible = true;
          }
        });
      },
      handlePayment() {
        const that = this,
          params = {
            billCode: that.paymentForm.billCode,
            carrierOrgCode: that.paymentForm.carrierOrgCode,
            carrierOrgName: that.paymentForm.carrierOrgName,
            billNo: that.paymentForm.billNo,
            billName: that.paymentForm.billName,
            settlingMethod: that.paymentForm.settlingMethod,
            amount: that.paymentForm.amount,
            operateTime: that.paymentForm.operateTime,
            description: that.paymentForm.description
          };
        this.$refs.paymentForm.validate((valid) => {
          if (valid) {
            settlePayableActualPaymentLogAdd(params, (success, error) => {
              if (success) {
                this.$message({
                  type: 'success',
                  message: '保存成功！',
                  duration: 1000
                });
                that.paymentDialogVisible = false;
                that.$refs.eleList.dispatchQueryEvent();
              }
            });
          }
        });
      },
      destroy(code) {
        const that = this;
        this.$msgbox({
          title: '提示',
          message: '您确认要作废这笔账单吗？账单作废后将轨道"已作废"类别，并不可再编辑。',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              settlePayableCancel(code, (success, error) => {
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '作废账单成功！',
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                  that.$refs.eleList.dispatchQueryEvent();
                }
              });
            } else {
              done();
            }
          }
        });
      },
      query(searchParams) {
        const self = this;
        this.total = 0;
        this.loading = true;
        settlePayableList(searchParams, (success, error) => {
          if (error) {
            this.$message({
              type: 'error',
              message: error.content,
              duration: 5000
            });
          }
          if (success) {
            this.total = success.total;
            success.content.forEach((data) => {
              const actionList = [];
              switch (data.billStatus) {
                case 'none' :
                  actionList.push({ key: 'applyApprove', name: '提交审核' });
                  actionList.push({ key: 'edit', name: '编辑账单' });
                  actionList.push({ key: 'destroy', name: '作废账单' });
                  break;
                case 'pend' :
                  actionList.push({ key: 'approve', name: '审核账单' });
                  actionList.push({ key: 'revokeApply', name: '撤回提交' });
                  break;
                case 'accept' :
                  actionList.push({ key: 'revokeApprove', name: '撤回审核' });
                  if (data.payStatus !== 'all') {
                    actionList.push({ key: 'payment', name: '添加付款' });
                  }
                  if (!data.receivedInvoice) {
                    actionList.push({ key: 'receivedInvoice', name: '记录收票' });
                  }
                  break;
                case 'reject' :
                  actionList.push({ key: 'edit', name: '编辑账单' });
                  actionList.push({ key: 'destroy', name: '作废账单' });
                  break;
                default:
                  break;
              }
              data.actionMenuList = actionList;
            });
            self.listData = success.content;
            this.loading = false;
          }
        });
      }
    },
    created() {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
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

