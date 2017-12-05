<template>
  <div>
    <!--整单核算-->
    <el-form :inline="true">
      <div class="computed-component">
        <div class="list-title self-title">整单核算</div>
        <hr class="hr">
        <!--账单基本信息-->
        <div class="computed-base-component">
          <div class="title">账单基本信息：</div>
          <br>
          <el-form-item label="账单名称">
            <el-input v-if="!readonly" v-model="submitData.billName" placeholder=""></el-input>
            <span v-if="readonly">{{submitData.billName}}</span>
          </el-form-item>
          <div class="base-list">
            <div class="base-li">
              <span class="base-li-label">承运商货差扣款总额：</span>
              <span class="base-li-value">￥{{submitData.lossDeductionAmount}}元</span>
            </div>
            <div class="base-li">
              <span class="base-li-label">应付调整定额总额：</span>
              <span class="base-li-value">￥{{submitData.receivableAdjustmentQuotaAmount}}元</span>
            </div>
            <div class="base-li">
              <span class="base-li-label">应付调整比例金额总额：</span>
              <span class="base-li-value">￥{{submitData.receivableAdjustmentProportionAmount}}元</span>
            </div>
            <div class="base-li">
              <span class="base-li-label">应付运费小计总额：</span>
              <span class="base-li-value">￥{{submitData.receivableFreightSubtotalAmount}}元</span>
            </div>
            <div class="base-li end">
              <span class="base-li-label">含税应付运费小计总额：</span>
              <span class="base-li-value">￥{{submitData.taxReceivableFreightSubtotalAmount}}元</span>
            </div>
          </div>
        </div>
        <div class="computed-change-component">
          <div class="title">账单费用调整：</div>
          <div>
            <el-form-item label-width="100px" label="调整方式">
              <el-radio-group  v-if="!readonly" @change="onChangeBase" v-model="submitData.adjustmentWay">
                <el-radio label="quota">按整单定额调整</el-radio>
                <el-radio label="scale">按整单比例调整</el-radio>
              </el-radio-group>
              <span v-if="readonly">{{submitData.adjustmentWay==='quota' ? '按整单定额调整' : '按整单比例调整'}}</span>
            </el-form-item>
          </div>
          <div v-if="submitData.adjustmentWay==='quota'">
            <el-form-item label-width="100px" label="应收整单调整">
              <span v-if="!readonly">
                <el-input v-if='!readonly' :disabled="readonly" type="number" @change="onChangeBase" v-model="submitData.receivableEntireSingleAdjustment"
                        placeholder="金额"></el-input>
              </span>
              <span v-if="readonly">{{submitData.receivableEntireSingleAdjustment}}元</span>      
            </el-form-item>
            <span v-if="!readonly" class="input-tip">元</span>
          </div>
          <div class='computed-form-item' v-if="submitData.adjustmentWay==='scale'">
            <el-form-item label-width="100px" label="整单调整比例">
              <el-input v-if='!readonly' :disabled="readonly" type="number" @change="onChangeBase" v-model="submitData.entireSingleAdjustmentRoportion"
                        placeholder="百分比"></el-input>
              <!--<span>应收整单调整xxxx元</span>-->
              <span v-if="readonly">{{submitData.entireSingleAdjustmentRoportion}}%</span>
            </el-form-item>
            <span v-if='!readonly' class="input-tip">%</span>
            <span v-if='!readonly' style="margin-left:60px;">应收账单调整：￥{{Number(Number(this.submitData.entireSingleAdjustmentRoportion / 100) * Number(this.tempData.proTotal)).toFixed(2)}}元</span>
          </div>
          <div>
            <el-form-item label-width="100px" label="备注">
              <el-input  v-if="!readonly" type="textarea" v-model="submitData.adjustmentDescription" placeholder="备注"></el-input>
              <span v-if="readonly">{{submitData.adjustmentDescription}}</span>
            </el-form-item>
          </div>
        </div>
        <div class="computed-total">
          <span class="label">账单含税应收运费：</span>
          <span class="value">￥{{submitData.receivableAmount}}元</span>
        </div>
      </div>
      <div class="will-computed-component">
        <div class="title self-title">收款预分配</div>
        <div class="hr"></div>
        <div class="form-component">
          <div>
            <el-form-item label="现金">
              <el-input  v-if="!readonly" type="number" @change="onChangeWill" v-model="submitData.cashPlanSettleAmount"
                        placeholder="现金"></el-input>
              <span v-if="readonly">{{submitData.cashPlanSettleAmount}}元</span>
              <span v-if="!readonly" class="will-input-tips">元</span>
            </el-form-item>
            <el-form-item label="银行转账">
              <el-input  v-if="!readonly" type="number" @change="onChangeWill" v-model="submitData.bankTransferPlanSettleAmount"
                        placeholder="银行转账"></el-input>
              <span v-if="readonly">{{submitData.bankTransferPlanSettleAmount}}元</span>
              <span v-if="!readonly" class="will-input-tips">元</span>
            </el-form-item>
            <el-form-item label="油卡">
              <el-input  v-if="!readonly" type="number" @change="onChangeWill" v-model="submitData.oilCardPlanSettleAmount"
                        placeholder="油卡"></el-input>
              <span v-if="readonly">{{submitData.oilCardPlanSettleAmount}}元</span>
              <span v-if="!readonly" class="will-input-tips">元</span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="气卡">
              <el-input  v-if="!readonly" type="number" @change="onChangeWill" v-model="submitData.gasCardPlanSettleAmount"
                        placeholder="气卡"></el-input>
              <span v-if="readonly">{{submitData.gasCardPlanSettleAmount}}元</span>
              <span v-if="!readonly" class="will-input-tips">元</span>
            </el-form-item>
            <el-form-item label="银行汇票">
              <el-input  v-if="!readonly" type="number" @change="onChangeWill" v-model="submitData.bankDraftPlanSettleAmount"
                        placeholder="银行汇票"></el-input>
              <span v-if="readonly">{{submitData.bankDraftPlanSettleAmount}}元</span>
              <span v-if="!readonly" class="will-input-tips">元</span>
            </el-form-item>
            <el-form-item label="商业汇票">
              <el-input  v-if="!readonly" type="number" @change="onChangeWill" v-model="submitData.businessDraftPlanSettleAmount"
                        placeholder="商业汇票"></el-input>
              <span v-if="readonly">{{submitData.businessDraftPlanSettleAmount}}元</span>
              <span v-if="!readonly" class="will-input-tips">元</span>
            </el-form-item>
          </div>
        </div>
        <div class="will-computed-total">预分配金额合计：￥{{tempData.willTotal}}元</div>
        <div class="end-total">账单含税应收运费 - 预分配金额合计 = {{tempData.tempTotal}}元</div>
      </div>
      <div class="btn-component" v-if="!readonly">
        <el-button class='form-button' type="primary" @click="onSubmit()" size="large">提交</el-button>
        <el-button class='form-button' @click="onCancel()" size="large">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import * as SettleBillService from '../../api/SettleBillService';

  export default {
    name: 'create_computed',
    data() {
      return {
        formatMoney: {
          adjustQuota: 'receivableAdjustmentQuotaAmount',
          billAdjustFee: 'receivableAdjustmentProportionAmount',
          confirmedLossDeduction: 'lossDeductionAmount',
          subtotal: 'receivableFreightSubtotalAmount',
          taxSubtotal: 'taxReceivableFreightSubtotalAmount'
        },
        tempData: {
          willTotal: 0,
          tempTotal: 0,
          proTotal: 0
        },
        statisTotal: {},
        isInit: true,
        reset: {
          tempData: {},
          statisTotal: {},
          submitData: {}
        }
      };
    },
    props: {
      submitData: {
        type: Object,
        default() {
          return {};
        }
      },
      params: {
        type: Object,
        default() {
          return {};
        }
      },
      readonly: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    methods: {
      onGetStatic() {
        return new Promise((resolve, reject) => {
          const data = {};
          if (this.params.billCode) {
            data.billCode = this.params.billCode;
          } else {
            data.clientOrgName = this.params.clientOrgName;
            data.clientOrgCode = this.params.clientOrgCode;
          }
          SettleBillService.settleReceivableStatisticalBill(data, (res) => {
            if (res) {
              if (res.code !== 200) {
                this.$message.error(res.content);
                reject(res.content);
              } else {
                Object.keys(res.content).forEach((key) => {
                  this.submitData[this.formatMoney[key]] = res.content[key] ? res.content[key].toFixed(2) : 0;
                });
                this.statisTotal = res.content;
                this.submitData.receivableAmount = res.content.taxSubtotal ? res.content.taxSubtotal.toFixed(2) : 0;
                console.log('this.submitData.receivableAmount', this.submitData.receivableAmount);
                this.tempData.tempTotal = Number(this.submitData.receivableAmount) ? Number(this.submitData.receivableAmount).toFixed(2) : 0;
                resolve();
              }
            }
          });
        });
      },
      onUpdateStatis() {
        this.onGetStatic().then(() => {
          this.onComputedByMethod().onComputedWill().onComputedEnd();
          this.onSetZeroEqEmpty();
          if (this.isInit === true) {
            this.isInit = false;
            this.reset.submitData = Object.assign({}, this.submitData);
            this.reset.tempData = Object.assign({}, this.tempData);
            this.reset.statisTotal = Object.assign({}, this.statisTotal);
          }
        });
      },
      //      receivableAmount  账单应收含税运费
      //      taxReceivableFreightSubtotalAmount   含税应收运费小计总额
      //      adjustmentWay 调整方式 quota 按整单定额调整 scale 按整单比例调整
      //          scale->entireSingleAdjustmentRoportion 整单调整比例
      //          quota->receivableEntireSingleAdjustment 应收整单调整
      onComputedByMethod() {
        if (this.submitData.adjustmentWay === 'quota') {
          this.submitData.receivableAmount = Number(this.submitData.taxReceivableFreightSubtotalAmount) - (Number(this.submitData.entireSingleAdjustmentRoportion / 100) * Number(this.submitData.receivableAmount));
          this.submitData.entireSingleAdjustmentRoportion = 0;
          this.submitData.receivableAmount = Number(this.submitData.taxReceivableFreightSubtotalAmount) + Number(this.submitData.receivableEntireSingleAdjustment);
        }
        if (this.submitData.adjustmentWay === 'scale') {
          this.submitData.receivableAmount = Number(this.submitData.taxReceivableFreightSubtotalAmount) - Number(this.submitData.receivableEntireSingleAdjustment);
          this.submitData.receivableEntireSingleAdjustment = 0;
          this.submitData.receivableAmount = Number(this.submitData.taxReceivableFreightSubtotalAmount) + (Number(this.submitData.entireSingleAdjustmentRoportion / 100) * Number(this.submitData.receivableAmount));
        }
        this.submitData.receivableAmount = this.submitData.receivableAmount ? this.submitData.receivableAmount.toFixed(2) : 0;
        return this;
      },
      //          cashPlanSettleAmount 现金计划结算金额
      //          bankTransferPlanSettleAmount 银行转账计划结算金额
      //          oilCardPlanSettleAmount 油卡计划结算金额
      //          gasCardPlanSettleAmount 气卡计划结算金额
      //          bankDraftPlanSettleAmount 银行汇票计划结算金额
      //          businessDraftPlanSettleAmount 商业汇票计划结算金额
      onComputedWill() {
        this.tempData.willTotal = 0;
        ['cashPlanSettleAmount', 'bankTransferPlanSettleAmount', 'oilCardPlanSettleAmount', 'gasCardPlanSettleAmount', 'bankDraftPlanSettleAmount', 'businessDraftPlanSettleAmount'].forEach((key) => {
          console.log(this.submitData[key]);
          this.tempData.willTotal += Number(this.submitData[key]);
        });
        return this;
      },
      onComputedEnd() {
        this.tempData.tempTotal = Number(this.submitData.receivableAmount) - Number(this.tempData.willTotal);
        this.tempData.proTotal = Number(this.submitData.taxReceivableFreightSubtotalAmount);
        this.tempData.tempTotal = this.tempData.tempTotal.toFixed(2);
        this.tempData.proTotal = this.tempData.proTotal.toFixed(2);
        return this;
      },
      onChangeBase() {
        this.onComputedByMethod().onComputedWill().onComputedEnd();
        this.onSetZeroEqEmpty();
      },
      onChangeWill() {
        this.onComputedWill().onComputedEnd();
      },
      onSetZeroEqEmpty() {
        // receivableEntireSingleAdjustment
        // entireSingleAdjustmentRoportion
        // cashPlanSettleAmount
        // bankTransferPlanSettleAmount
        // oilCardPlanSettleAmount
        // gasCardPlanSettleAmount
        // bankDraftPlanSettleAmount
        // businessDraftPlanSettleAmount
        this.submitData.receivableEntireSingleAdjustment = this.submitData.receivableEntireSingleAdjustment || '';
        this.submitData.entireSingleAdjustmentRoportion = this.submitData.entireSingleAdjustmentRoportion || '';
        this.submitData.cashPlanSettleAmount = this.submitData.cashPlanSettleAmount || '';
        this.submitData.bankTransferPlanSettleAmount = this.submitData.bankTransferPlanSettleAmount || '';
        this.submitData.oilCardPlanSettleAmount = this.submitData.oilCardPlanSettleAmount || '';
        this.submitData.gasCardPlanSettleAmount = this.submitData.gasCardPlanSettleAmount || '';
        this.submitData.bankDraftPlanSettleAmount = this.submitData.bankDraftPlanSettleAmount || '';
        this.submitData.businessDraftPlanSettleAmount = this.submitData.businessDraftPlanSettleAmount || '';
      },
      onSubmit() {
        this.$emit('onSubmit');
      },
      onCancel() {
        this.isInit = true;
        // this.submitData = Object.assign({}, this.reset.submitData);
        Object.keys(this.reset.submitData).forEach((key) => {
          this.submitData[key] = this.reset.submitData[key];
        });
        this.tempData = Object.assign({}, this.reset.tempData);
        this.statisTotal = Object.assign({}, this.reset.statisTotal);
        // this.$emit('onCancel');
      },
      init() {
        console.log('readonly:', this.readonly);
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
  .btn-component{
    text-align: center;
    margin-top: 26px;
  }
  .self-title{
    color: #FF6600;
    line-height: 22px;
  }
  .computed-form-item{
    display: inline;
    clear: both;
  }
  .will-computed-component{
    .el-input{
      float: left;
    }
    .will-input-tips{
      position: absolute;
    }
    .el-form-item{
      margin-right: 20px;
    }
  }
</style>
