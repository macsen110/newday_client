<template>
  <div class="sellte-revice-container">
    <div class="list-wrap" v-show="!tips.status">
      <!--标题-->
      <div>
        <h2 class="title-component">
          {{params.billCode && !readonly ? '编辑' : !readonly ? '创建' : ''}}应收账单{{readonly ? '详情' : ''}}</h2>
        <el-button v-if="!readonly" @click="onBack" class="title-btn">返回到选择运单</el-button>
        <div v-if="readonly" class='tr'>
          <el-button @click="applyApprove" v-if="submitData.billStatus==='none'">提交审核</el-button>
          <el-button @click="revokeApply" v-if="submitData.billStatus==='pend'">撤回提交审核</el-button>
          <el-button @click="revokeConfirm" v-if="submitData.billStatus==='pend'">审核账单</el-button>
          <el-button @click="revokeApprove" v-if="submitData.billStatus==='accept'">撤回审核</el-button>
          <el-button @click="invoice" v-if="submitData.billStatus==='accept' && !submitData.invoiced">记录开票</el-button>
          <el-button @click="destroy" v-if="submitData.billStatus==='none' || submitData.billStatus==='reject'">作废账单</el-button>
          <el-button @click='onEditForm' v-if="submitData.billStatus==='none' || submitData.billStatus==='reject'">编辑账单</el-button>
          <el-button @click="addReceiveDialog" v-if="submitData.billStatus==='accept' && submitData.receivableStatus!=='all'">添加收款</el-button>
        </div>
      </div>
      <div class="hr"></div>
      <!--收付方信息-->
      <create-title :readonly='readonly' :params="params" :showData="showData" :submitData='submitData'></create-title>
      <!--账单明细模块-->
      <div class="list-container">
        <div class="list-title">账单明细</div>
        <div class="hr"></div>
        <v-table-search @reset="onReset" @submit="onSearch" :searchFields="searchParams" :isMin='false' :searchModel="searchData"></v-table-search>
        <div class="tabel-action-btn-container">
          <table-action-btn @onClickBtn="onTableActionBtnClick" :readonly="readonly" :list="batchBtnList"></table-action-btn>
        </div>
        <table-list @onSelectionChange="onSelectionChange" @onSave="onTableCellSave" :readonly="readonly" :editFields="editFields" :fixedFields="fixedFields" :batchFields="batchFields" :list="list" :btnList="btnList" :fields="fields" :formatterFields='formatterFields'></table-list>
        <table-page @change="onChange" :page='params.page' :pageSize='params.size' :total='page_info.total'></table-page>
      </div>
      <!--整单核算-->
      <create-computed ref="CreateComputed" @onSubmit="onSubmit" @onCancel="onCancel" :readonly="readonly" :params="params" :submitData="submitData"></create-computed>
      <!-- 详情记录需要的收款和审核记录 -->
      <div v-if="readonly">
        <div class='tr'>
          <el-button @click="applyApprove" v-if="submitData.billStatus==='none'">提交审核</el-button>
          <el-button @click="revokeApply" v-if="submitData.billStatus==='pend'">撤回提交审核</el-button>
          <el-button @click="revokeConfirm" v-if="submitData.billStatus==='pend'">审核账单</el-button>
          <el-button @click="revokeApprove" v-if="submitData.billStatus==='accept'">撤回审核</el-button>
        </div>
        <!-- 审核记录 -->
        <create-approve ref='CreateApproveList' :history="history"></create-approve>
        <div class='tr'>
          <el-button @click="addReceiveDialog" v-if="submitData.billStatus==='accept' && submitData.receivableStatus!=='all'">添加收款</el-button>
        </div>
        <!-- 收款记录 -->
        <receive-log-list ref='CreateReceiveLogList' :customColumn='["operateTime", "settlingMethod", "amount", "updateUsername", "updateTime", "description"]' :selectable="false" :operatable="false" :isAdvanced="false" :needPage="false" :params="{billCode:params.billCode}"></receive-log-list>
      </div>
    </div>
    <!-- 表单页面，列表批量操作弹框 -->
    <create-dialog @onBatchSubmit="onBatchSubmit" :batchCodeList="batchCodeList" :dialog="dialog" :params="params"></create-dialog>
    <!-- 详情页面，审核弹框确认 -->
    <approve-dialog @onSuccess='revokeSuccess' @onFail='revokeFail' :revoke="revoke_dialog"></approve-dialog>
    <!-- 详情页面，添加收款弹框 -->
    <create-receive-dialog @onSuccess='addReceive' :dialog='receive_dialog'></create-receive-dialog>
    <!-- 添加或者页面，修改成功之后的提示 -->
    <create-status :tips="tips" v-show="tips.status"></create-status>
  </div>
</template>

<script>
  import TableActionBtn from './create/table-action-btn.vue';
  import TableList from './create/table-list.vue';
  import VTableSearch from '../components/ele-list/eleMinTableSearch.vue';
  import TablePage from '../components/ele-list/elePage.vue';
  // 只适用于本页面的组件
  import CreateComputed from './create_computed.vue';
  //  标题栏
  import CreateTitle from './create_title.vue';
  // 点击表格上面的按钮弹出的组件
  import CreateDialog from './create_dialog.vue';
  //  添加或修改成功之后的提示组件
  import CreateStatus from './create_status.vue';
  // 收款记录
  import ReceiveLogList from './receive_log_list.vue';
  // 审核记录
  import CreateApprove from './create_approve.vue';
  // 审核弹框确认
  import ApproveDialog from './approve_dialog.vue';
  // 添加收款弹框
  import CreateReceiveDialog from './create_receive_dialog.vue';
  import {
    getParam,
    getParamsFromURL
  } from '../../api/Utils';
  import * as SettleBillService from '../../api/SettleBillService';

  import {
    // goodsNumber,
    // goodsVolume,
    // goodsWeight,
    carrierPrice,
    chargeItemNumber,
    getAll
  } from '../../api/DataSourceService';
  
  import * as ApiConst from '../../api/ApiConst';

  export default {
    name: 'create',
    components: {
      TableActionBtn,
      TableList,
      TablePage,
      VTableSearch,
      CreateComputed,
      CreateTitle,
      CreateDialog,
      CreateStatus,
      CreateApprove,
      ReceiveLogList,
      ApproveDialog,
      CreateReceiveDialog
    },
    data() {
      return {
        carrierPriceData: [],
        goodsLossData: [],
        chargeItemNumberData: [],
        history: {
          actualReceiptLogList: {
            list: []
          },
          approveList: {
            list: []
          }
        },
        readonly: false,
        tips: {
          status: false,
          type: 'add',
          billCode: '',
          billNo: ''
        },
        showData: {
          selfName: ''
        },
        receive_dialog: {
          show: false,
          data: {
            billCode: '',
            clientOrgCode: '',
            clientOrgName: '',
            billNo: '',
            billName: '',
            unreceivedAmount: '',
            receivableAmount: '',
            receivedAmount: '',
            settlingMethod: '',
            amount: '',
            operateTime: '',
            description: ''
          }
        },
        revoke_dialog: {
          show: false
        },
        // 表格上面的按钮点击弹框组件用的参数
        dialog: {
          show: false,
          title: '', // 标题
          value: '', // 字段的value
          key: '', //  字段的key
          selectList: [], // 如果该字段是下拉类型，这里配置下拉列表信息
          checkbox: false //  是否需要显示全选按钮
        },
        // 当前登录信息
        userinfo: {},
        // 批量选择时，把获取的每行的ID存储到这里
        batchCodeList: [],
        // 表格上面的按钮配置
        batchBtnList: [{
          text: '批量调整计价方式',
          key: 'settleMethod'
        }, {
          text: '批量调整每单金额',
          key: 'adjustmentQuota'
        }, {
          text: '批量调整每单比例',
          key: 'adjustmentProportion'
        }, {
          text: '批量调整运价税型',
          key: 'ratesTaxType'
        }, {
          text: '批量调整客户税率',
          key: 'taxRate'
        }, {
          text: '批量移除',
          key: 'remove'
        }, {
          text: '导出运单明细',
          key: 'export'
        }],
        // 搜索配置
        searchParams: [],
        // 搜索参数
        searchData: {},
        // 上一次搜索参数
        searchDataPrev: {},
        // 运单列表
        list: [],
        page_info: {
          total: 0
        },
        // 运单列表字段
        fields: [],
        // 表格批量选择时，表格组件内部会根据这里面配置的字段，组装出对应的数据
        batchFields: ['code', 'waybillNo'],
        // 表格操作列自定义按钮
        btnList: [{
          text: '移除',
          type: 'text',
          attrs: {
            size: 'large'
          },
          fn: ({
            data
          }) => {
            // console.log(data);
            this.$msgbox({
              title: '提示',
              message: `您确认把运单${data.waybillNo}移出吗？移出后该运单将不在已选运单列表中。`,
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  this.tableCellActions.remove({
                    codeList: data.code,
                    clientOrgName: data.clientOrgName,
                    billCode: ''
                  }, ({
                    code
                  } = {}) => {
                    done();
                    // console.log(code);
                    if (code === 200) {
                      this.onGetList();
                      this.$refs.CreateComputed.onUpdateStatis();
                      this.$message.success('移除成功');
                    }
                  });
                } else {
                  done();
                }
              }
            });
          }
        }],
        // 表格需要固定的列配置
        fixedFields: {
          left: ['waybillNo']
        },
        // 表格需要编辑的列配置
        editFieldsTemp: {
          settleMethod: {
            component: 'TableCellSelect',
            list: [{
              label: '按发货货量',
              value: 'loadingweight'
            }, {
              label: '按收货货量',
              value: 'unloadingweight'
            }, {
              label: '发货与收货两者取小',
              value: 'smaller'
            }, {
              label: '发货与收货两者取大',
              value: 'bigger'
            }],
            formatter: {
              loadingweight: '按发货货量',
              unloadingweight: '按收货货量',
              smaller: '发货与收货两者取小',
              bigger: '发货与收货两者取大'
            }
          }
        },
        editFields: {
          settleMethod: {
            component: 'TableCellSelect',
            list: [{
              label: '按发货货量',
              value: 'loadingweight'
            }, {
              label: '按收货货量',
              value: 'unloadingweight'
            }, {
              label: '发货与收货两者取小',
              value: 'smaller'
            }, {
              label: '发货与收货两者取大',
              value: 'bigger'
            }],
            formatter: {
              loadingweight: '按发货货量',
              unloadingweight: '按收货货量',
              smaller: '发货与收货两者取小',
              bigger: '发货与收货两者取大'
            }
          },
          adjustmentQuota: {
            component: 'TableCellInput',
            cancelReset: true
          },
          adjustmentProportion: {
            component: 'TableCellInput'
          },
          ratesTaxType: {
            component: 'TableCellSelect',
            list: [{
              label: '不含税运价',
              value: 'include'
            }, {
              label: '含税运价',
              value: 'exclude'
            }],
            formatter: {
              include: '不含税运价',
              exclude: '含税运价'
            }
          },
          taxRate: {
            component: 'TableCellInput'
          },
          description: {
            component: 'TableCellInput'
          }
        },
        formatterFields: {
          waybillStatus(value, field) {
            const formats = {
              finish: '已完成',
              unloading: '待装货',
              going: '运输中',
              cancel: '运单取消'
            };
            return formats[value[field.fieldConfigCode]];
          },
          // 装货重量
          loadingGoodsWeight(value, field) {
            return `${value[field.fieldConfigCode]}吨`;
          },
          // 装货体积
          loadingGoodsVolume(value, field) {
            return `${value[field.fieldConfigCode]}方`;
          },
          // 装货数量
          loadingGoodsNum(value, field) {
            return `${value[field.fieldConfigCode]}个`;
          },
          //  结算方式
          settleMethod(value, field) {
            const formats = {
              loadingweight: '按发货货量',
              unloadingweight: '按收货货量',
              smaller: '发货与收货两者取小',
              bigger: '发货与收货两者取大',
              trucknumber: '按车次'
            };
            return formats[value[field.fieldConfigCode]];
          },
          // unloadingGoodsWeight 重量
          unloadingGoodsWeight(value, field) {
            return `${value[field.fieldConfigCode]}吨`;
          },
          // unloadingGoodsVolume 卸货体积
          unloadingGoodsVolume(value, field) {
            return `${value[field.fieldConfigCode]}方`;
          },
          // unloadingGoodsNum  卸货数量
          unloadingGoodsNum(value, field) {
            return `${value[field.fieldConfigCode]}个`;
          },
          // goodsPrice 货物单价
          goodsPrice(value, field) {
            const dwKey = `${field.fieldConfigCode}UnitCodeAsyncValue` || '';
            return `${value[field.fieldConfigCode]}${value[dwKey]}`;
          },
          // totalFee 应收核算运费
          totalFee(value, field) {
            return `￥${value[field.fieldConfigCode]}`;
          },
          // adjustmentQuota  "应收调整定额"
          adjustmentQuota(value, field) {
            return `￥${value[field.fieldConfigCode]}`;
          },
          // adjustmentProportion "应收调整比例"
          adjustmentProportion(value, field) {
            return `${value[field.fieldConfigCode]}%`;
          },
          // "adjustmentProportionAmount" "应收调整比例金额"
          adjustmentProportionAmount(value, field) {
            return `￥${value[field.fieldConfigCode]}`;
          },
          // "freightSubtotal"  "应收运费小计"
          freightSubtotal(value, field) {
            return `￥${value[field.fieldConfigCode]}`;
          },
          // "ratesTaxType"  "运价税型"
          ratesTaxType(value, field) {
            const formats = {
              include: '不含税运价',
              exclude: '含税运价'
            };
            return formats[value[field.fieldConfigCode]];
          },
          // "taxRate"  "客户税率"
          taxRate(value, field) {
            return `${value[field.fieldConfigCode]}%`;
          },
          // "taxFreightSubtotal" "含税应收运费小计"
          taxFreightSubtotal(value, field) {
            return `￥${value[field.fieldConfigCode]}`;
          },
          // 客户运价
          clientFreightPrice(value, field) {
            const dwKey = `${field.fieldConfigCode}UnitCodeAsyncValue` || '';
            return `${value[field.fieldConfigCode]}${value[dwKey]}`;
          },
          // 合理细差
          goodsLoss(value, field) {
            const dwKey = `${field.fieldConfigCode}UnitCodeAsyncValue` || '';
            return `${value[field.fieldConfigCode]}${value[dwKey]}`;
          },
          actualGoodsLoss(value, field) {
            const dwKey = `${field.fieldConfigCode}UnitCodeAsyncValue` || '';
            return `${value[field.fieldConfigCode]}${value[dwKey]}`;
          },
          confirmedGoodsLoss(value, field) {
            const dwKey = `${field.fieldConfigCode}UnitCodeAsyncValue` || '';
            return `${value[field.fieldConfigCode]}${value[dwKey]}`;
          },
          lossDeduction(value, field) {
            return `￥${value[field.fieldConfigCode]}`;
          }
        },
        layoutFields: {},
        // 调整各种类型的接口全部以类型为key的形式定义，在调用的时候直接调用此对象[类型]即可
        tableCellActions: {
          // 调整每单定额
          adjustmentQuota: (data, cb) => {
            SettleBillService.settleReceivableWaybillAdjustQuota(data, cb);
          },
          // 调整每单比例
          adjustmentProportion: (data, cb) => {
            SettleBillService.settleReceivableWaybillAdjustRatio(data, cb);
          },
          // 调整客户税率
          taxRate: (data, cb) => {
            SettleBillService.settleReceivableWaybillAdjustTaxRates(data, cb);
          },
          // 编辑备注描述
          description: (data, cb) => {
            SettleBillService.settleReceivableWaybillEditDescription(data, cb);
          },
          // 调整结算方式
          settleMethod: (data, cb) => {
            SettleBillService.settleReceivableWaybillAdjustSettleMethod(data, cb);
          },
          // 调整运价税型
          ratesTaxType: (data, cb) => {
            SettleBillService.settleReceivableWaybillAdjustTaxType(data, cb);
          },
          // 移除
          remove: (data, cb) => {
            SettleBillService.settleReceivableWaybillRemove(data, cb);
          }
        },
        updateParams: {},
        // 初始化时会更新这些参数
        params: {
          clientOrgCode: '',
          clientOrgName: '',
          size: 20,
          page: 1,
          billCode: ''
        },
        //        字段注释
        //            adjustQuota (number, optional): 调整定额 ,
        //            adjustRatio (number, optional): 调整比例 ,
        //            billAdjustFee (number, optional): 整单调整费 ,
        //            confirmedLossDeduction (number, optional): 货差扣款 ,
        //            subtotal (number, optional): 运费小计 ,
        //            taxSubtotal (number, optional): 含税运费小计
        //        ==============
        //            lossDeductionAmount 客户货差扣款总额
        //            receivableAdjustmentQuotaAmount 应收调整定额总额
        //            receivableAdjustmentProportionAmount 应收调整比例金额总额
        //            taxReceivableFreightSubtotalAmount 含税应收运费小计总额
        //            receivableFreightSubtotalAmount 应收运费小计总额
        //        billName (required) 账单名称
        //        payerOrgCode (required) 付款方组织编码
        //        payerOrgName (required) 付款方名称
        //          adjustmentWay 调整方式 quota 按整单定额调整 scale 按整单比例调整
        //          entireSingleAdjustmentRoportion 整单调整比例
        //          receivableEntireSingleAdjustment 应收整单调整
        //          adjustmentDescription 调整备注
        //          receivableAmount 应收金额
        //          cashPlanSettleAmount 现金计划结算金额
        //          bankTransferPlanSettleAmount 银行转账计划结算金额
        //          oilCardPlanSettleAmount 油卡计划结算金额
        //          gasCardPlanSettleAmount 气卡计划结算金额
        //          bankDraftPlanSettleAmount 银行汇票计划结算金额
        //          businessDraftPlanSettleAmount 商业汇票计划结算金额
        // 添加和修改需要给后台提交的数据
        submitData: {
          adjustmentDescription: '',
          adjustmentWay: 'quota',
          bankDraftPlanSettleAmount: 0,
          bankTransferPlanSettleAmount: 0,
          billName: '',
          billNo: '',
          billStatus: '',
          businessDraftPlanSettleAmount: 0,
          cashPlanSettleAmount: 0,
          code: '',
          creatorUsername: '',
          entireSingleAdjustmentRoportion: 0,
          gasCardPlanSettleAmount: 0,
          invoiced: false,
          lossDeductionAmount: 0,
          oilCardPlanSettleAmount: 0,
          payerOrgCode: '',
          payerOrgName: '',
          receivableAdjustmentProportionAmount: 0,
          receivableAdjustmentQuotaAmount: 0,
          receivableAmount: 0,
          receivableEntireSingleAdjustment: 0,
          receivableFreightSubtotalAmount: 0,
          receivableStatus: '',
          receivedAmount: 0,
          taxReceivableFreightSubtotalAmount: 0,
          unreceivedAmount: 0,
          updateUsername: ''
        }
      };
    },
    methods: {
      /**
       * 运单列表批量选择事件
       * @param code 当前点击行的code
       */
      onSelectionChange({
        code
      } = {}) {
        // console.log('create->onSelectionChange:', code);
        this.batchCodeList = code;
      },

      /**
       * 表格上面的一排按钮点击之后，会弹框，可以批量操作，操作完之后点击确定会触发此方法
       * @param btn 当前点击的按钮配置信息
       */
      onBatchSubmit(data) {
        this.onUpdateActionByType(this.dialog.key, data).then(() => {
          this.$message.success(`批量操作 ${this.dialog.title} 成功`);
          this.onGetList();
          this.$refs.CreateComputed.onUpdateStatis();
        });
      },

      /**
       * 表格上面的一排按钮点击事件
       * @param btn 当前点击的按钮配置信息
       */
      onTableActionBtnClick({
        btn
      }) {
        if (btn.key !== 'export') {
          if (!this.batchCodeList.length) {
            this.$message.info('一个也没有选中呢。');
          } else {
            this.dialog.checkbox = false;
            this.dialog.title = btn.text;
            this.dialog.show = true;
            this.dialog.value = '';
            this.dialog.key = btn.key;
            if (this.editFields[btn.key]) {
              this.dialog.selectList = this.editFields[btn.key].list || [];
            }
          }
        } else {
          // console.log(btn);
          const path = 'settleReceivableSelWaybill',
            query = this.readonly ? '?tableType=contrast' : '';
          // console.log(path, query);
          // exportCsv(params, (success) => {
          //   window.location.href = success.content.url;
          // });
          window.location.href = `${ApiConst.apiSettleDomain}/export/${path}${query}`;
        }
      },

      /**
       * 表格中的所有保存事件
       * @param oldData 修改之前的数据对象
       * @param newData 修改之后的数据对象
       * @param index   行索引
       * @param field   当前数据的字段信息对象
       */
      onTableCellSave({
        oldData,
        newData,
        field
      }) {
        //  code: oldData.code,
        this.updateParams = {};
        // console.log('field.fieldConfigCode outer :', field.fieldConfigCode);
        if (field.fieldConfigCode === 'description') {
          // console.log('field.fieldConfigCode inner :', field.fieldConfigCode);
          // console.log('oldData.code before :', oldData.code);
          this.updateParams.code = oldData.code;
          // console.log('this.updateParams.code after :', this.updateParams.code);
        } else {
          this.updateParams.codeList = oldData.code;
        }
        if (this.params.billCode) {
          this.updateParams.billCode = this.params.billCode;
        } else {
          this.updateParams.clientOrgName = this.params.clientOrgName;
        }
        if (this.tableCellActions[field.fieldConfigCode]) {
          if (typeof this.tableCellActions[field.fieldConfigCode] === 'function') {
            this.updateParams[field.fieldConfigCode] = newData[field.fieldConfigCode];
            console.log('this.updateParams:', this.updateParams);
            this.onUpdateActionByType(field.fieldConfigCode, this.updateParams).then(() => {
              this.$message.success('操作成功');
              this.onGetList();
              // oldData[field.fieldConfigCode] = newData[field.fieldConfigCode];
              this.$refs.CreateComputed.onUpdateStatis();
            }).catch((msg) => {
              this.$message.error(msg);
            });
          }
        } else {
          this.$message.error('没有定义对应的操作，可能是新增的需求');
        }
      },
      onUpdateActionByType(type, data) {
        console.log('this.updateParams->data:', data);
        return new Promise((resolve, reject) => {
          this.tableCellActions[type](data, (success, error) => {
            if (success) {
              // console.log(`action->${type}:`, success.code, success.content);
              resolve(success.content);
            } else {
              this.$message.error(error.content);
              reject(error.content);
            }
          });
        });
      },
      addReceiveDialog() {
        // console.log('添加收款弹框');
        Object.keys(this.receive_dialog.data).forEach((key) => {
          this.receive_dialog.data[key] = this.submitData[key] || this.params[key];
        });
        this.receive_dialog.show = true;
      },
      addReceive() {
        // console.log('添加收款弹框点击确定', this.receive_dialog.data);
        const params = {
          billCode: this.receive_dialog.data.billCode,
          clientOrgCode: this.receive_dialog.data.clientOrgCode,
          clientOrgName: this.receive_dialog.data.clientOrgName,
          billNo: this.receive_dialog.data.billNo,
          billName: this.receive_dialog.data.billName,
          settlingMethod: this.receive_dialog.data.settlingMethod,
          amount: this.receive_dialog.data.amount,
          operateTime: this.receive_dialog.data.operateTime,
          description: this.receive_dialog.data.description
        };
        SettleBillService.settleReceivableActualReceiptLogAdd(params, (success, error) => {
          if (success) {
            this.$message({
              type: 'success',
              message: '保存成功！',
              duration: 1000
            });
            this.$refs.CreateReceiveLogList.query({
              billCode: this.params.billCode,
              size: 20,
              page: 1
            });
          }
          if (error) {
            this.$message({
              type: 'error',
              message: error.content,
              duration: 1000
            });
          }
          this.receive_dialog.show = false;
        });
      },
      invoice() {
        const code = this.params.billCode;
        this.$msgbox({
          title: '提示',
          message: '您确认已经开票了吗？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              SettleBillService.settleReceivableInvoice(code, (success, error) => {
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
                    message: '确认开票成功！',
                    duration: 1000
                  });
                  this.submitData.invoiced = true;
                  instance.confirmButtonLoading = false;
                  done();
                }
              });
            } else {
              done();
            }
          }
        });
      },
      destroy() {
        const code = this.params.billCode;
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
              SettleBillService.settleReceivableCancel(code, (success) => {
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '作废账单成功！',
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
        });
      },
      revokeSuccess({
        data
      }) {
        console.log('审核通过', data);
        this.$msgbox({
          title: '提示',
          message: '您确认审核通过这笔账单吗？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              SettleBillService.settleReceivableApprove(this.params.billCode, {
                billStatus: 'accept',
                approveRemark: data.approveRemark
              }, (success, error) => {
                if (error) {
                  this.$message({
                    type: 'success',
                    message: error.content,
                    duration: 1000
                  });
                }
                if (success) {
                  this.submitData.billStatus = 'accept';
                  this.$message({
                    type: 'success',
                    message: '审核通过成功！',
                    duration: 1000
                  });
                  this.onGetApproveList();
                  this.revoke_dialog.show = false;
                  instance.confirmButtonLoading = false;
                  done();
                }
              });
            }
          }
        });
      },
      revokeFail({
        data
      }) {
        console.log('审核失败', data);
        this.$msgbox({
          title: '提示',
          message: '您确认审核不通过这笔账单吗？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              SettleBillService.settleReceivableApprove(this.params.billCode, {
                billStatus: 'reject',
                approveRemark: data.approveRemark
              }, (success, error) => {
                if (error) {
                  this.$message({
                    type: 'success',
                    message: error.content,
                    duration: 1000
                  });
                }
                if (success) {
                  this.submitData.billStatus = 'reject';
                  this.$message({
                    type: 'success',
                    message: '审核不通过操作成功！',
                    duration: 1000
                  });
                  this.onGetApproveList();
                  this.revoke_dialog.show = false;
                  instance.confirmButtonLoading = false;
                  done();
                }
              });
            }
          }
        });
      },
      revokeConfirm() {
        console.log('revokeConfirm');
        this.revoke_dialog.show = true;
      },
      revokeApprove() {
        const code = this.params.billCode;
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
              SettleBillService.settleReceivableRevokeApprove(code, (success, error) => {
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
                  this.submitData.billStatus = 'pend';
                  instance.confirmButtonLoading = false;
                  done();
                }
              });
            } else {
              done();
            }
          }
        });
      },
      applyApprove() {
        const code = this.params.billCode;
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
              SettleBillService.settleReceivableApplyApprove(code, (success, error) => {
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
                  this.submitData.billStatus = 'pend';
                  instance.confirmButtonLoading = false;
                  done();
                }
              });
            } else {
              done();
            }
          }
        });
      },
      revokeApply() {
        const code = this.params.billCode;
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
              SettleBillService.settleReceivableRevokeApplyApprove(code, (success, error) => {
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
                  this.submitData.billStatus = 'none';
                  instance.confirmButtonLoading = false;
                  done();
                }
              });
            } else {
              done();
            }
          }
        });
      },
      onChange(page, size) {
        console.log('onChange-page-size:', page, size);
        this.params.page = page;
        this.params.pageSize = size;
        this.onGetList();
      },
      /**
       * 获取运单列表
       * @returns {Promise}
       */
      onGetList() {
        Object.assign(this.searchData, this.params);
        return new Promise((resolve, reject) => {
          /**
           * 详情页面和添加编辑页面，获取运单列表的接口不一样
           */
          SettleBillService[this.readonly ? 'settleReceivableSelectContractWaybillList' : 'settleReceivableSelectSelectedWaybillList'](this.searchData, (success, error) => {
            if (success) {
              success.content.forEach((item) => {
                // clientFreightPrice 客户税率单位
                if (item.clientFreightPrice && item.clientFreightPriceUnitCode) {
                  this.carrierPriceData.forEach((uc) => {
                    if (uc.id === item.clientFreightPriceUnitCode) {
                      item.clientFreightPriceUnitCodeAsyncValue = uc.name;
                    }
                  });
                }
                // goodsLoss  合理货差系数
                if (item.goodsLoss && item.goodsLossUnitCode) {
                  this.goodsLossData.forEach((uc) => {
                    if (uc.id === item.goodsLossUnitCode) {
                      item.goodsLossUnitCodeAsyncValue = uc.name;
                    }
                  });
                }
                // actualGoodsLoss  实际货差
                if (item.actualGoodsLoss && item.meterageType) {
                  this.goodsLossData.forEach((uc) => {
                    if (uc.id === item.meterageType) {
                      item.actualGoodsLossUnitCodeAsyncValue = uc.name;
                    }
                  });
                }
                // confirmedGoodsLoss  货差超标量
                if (item.confirmedGoodsLoss && item.meterageType) {
                  this.goodsLossData.forEach((uc) => {
                    if (uc.id === item.meterageType) {
                      item.confirmedGoodsLossUnitCodeAsyncValue = uc.name;
                    }
                  });
                }
                 // goodsPrice 货物单价
                if (item.goodsPrice && item.meterageType) {
                  this.goodsLossData.forEach((uc) => {
                    if (uc.id === item.meterageType) {
                      item.goodsPriceUnitCodeAsyncValue = uc.name;
                    }
                  });
                }
                // 动态判断是否可编辑
                if (item.settleMethod === 'trucknumber') {
                  item.settleMethodUnitCodeAsyncEdit = true;
                }
              });
              console.log('this.goodsLossData', this.goodsLossData);
              console.log('this.carrierPriceData', this.carrierPriceData);
              console.log('onGetList:', success.content);
              this.list = success.content;
              this.page_info.total = success.total;
              resolve(success.content);
            } else {
              this.$message.error(error.content);
              reject(error.content);
            }
          });
        });
      },

      /**
       * 获取账单详情
       * @returns {Promise}
       */
      onGetView() {
        return new Promise((resolve, reject) => {
          SettleBillService.settleReceivableGet(this.params.billCode, (success, error) => {
            if (success) {
              resolve(success.content);
            } else {
              this.$message.error(error.content);
              reject(error.content);
            }
          });
        });
      },

      /**
       * 获取运单列表字段
       * @returns {Promise}
       */
      onGetFields() {
        SettleBillService.settleReceivableSelectedWaybillColumns(({
          code,
          content
        }) => {
          const eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
            eleInfo = JSON.parse(localStorage.getItem('eleInfo'));
          let params = {};
          params = getParam({
            data: {
              content
            }
          }, eleDefine, eleInfo);
          // console.log('onGetFields:getParam', params);
          if (code === 200) {
            params.field.forEach((field) => {
              console.log(field);
            });
            this.fields = content;
          } else {
            this.$message.error(content);
          }
        });
      },

      /**
       * 获取运单列表搜索配置
       * @returns {Promise}
       */
      onGetSearchFields() {
        SettleBillService.settleReceivableSelectedWaybillSearch(({
          code,
          content
        }) => {
          if (code === 200) {
            // console.log('onGetSearchFields:', code, content);
            const eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
              eleInfo = JSON.parse(localStorage.getItem('eleInfo'));
            let params = {};
            params = getParam({
              data: {
                content
              }
            }, eleDefine, eleInfo);
            // console.log(params);
            this.searchParams = params.field;
            this.searchParams.forEach((ele) => {
              //              console.log(ele.fieldConfigCode);
              this.$set(this.searchData, ele.fieldConfigCode, null);
            });
          } else {
            this.$message.error(content);
          }
        });
      },
      onBack() {
        // window.history.back();
        const path = '/settleBillReceivable/select_waybill.html?',
          query = this.params.billCode ? `billCode=${this.params.billCode}` : `orgCode=${this.params.clientOrgCode}&orgName=${this.params.clientOrgName}`;
        window.location.href = path + query;
      },

      /**
       * 运单列表搜索
       * @returns {Promise}
       */
      onSearch() {
        this.searchDataPrev = Object.assign({}, this.searchData);
        this.onGetList();
      },

      /**
       * 获取运单重置
       * @returns {Promise}
       */
      onReset() {
        this.searchDataPrev = Object.assign({}, this.searchData);
        this.onGetList();
      },
      onCancel() {
        this.$message.info('取消');
      },

      /**
       * 编辑账单
       */
      onEditForm() {
        // console.log('onEditForm,this.params', this.params);
        // this.readonly = false;
        window.location.href = `/settleBillReceivable/select_waybill.html?billCode=${this.params.billCode}`;
      },

      /**
       * 添加和修改应收账单信息
       * @returns {Promise}
       */
      onSubmit() {
        // console.log('this.submitData', this.submitData);
        return new Promise((resolve, reject) => {
          if (!this.params.billCode) {
            SettleBillService.settleReceivableAdd(this.submitData, (success, error) => {
              if (success) {
                this.tips.status = true;
                this.tips.type = 'add';
                this.tips.billCode = success.content.code;
                this.tips.billNo = success.content.billNo;
                resolve(success.content, 'add');
              } else {
                this.$message.error(error.content);
                reject(error.content, 'add');
              }
            });
          } else {
            const tempData = Object.assign({}, this.submitData);
            tempData.code = this.params.billCode;
            delete tempData.billNo;
            delete tempData.createTime;
            delete tempData.updateTime;
            delete tempData.updateUsername;
            delete tempData.creatorUsername;
            SettleBillService.settleReceivableEdit(this.params.billCode, tempData, (success, error) => {
              if (success) {
                this.tips.status = true;
                this.tips.type = 'edit';
                this.tips.billCode = this.params.billCode;
                this.tips.billNo = this.submitData.billNo;
                resolve(success.content, 'edit');
              } else {
                this.$message.error(error.content);
                reject(error.content, 'edit');
              }
            });
          }
        });
      },
      //      onGetActualReceiptLogList() {
      //        SettleBillService.settleReceivableActualReceiptLogList({
      //          page: this.params.page || 1,
      //          size: this.params.size || 12,
      //          billCode: this.params.billCode
      //        }, ({
      //              code, content
      //            }) => {
      //          if (code === 200) {
      //            console.log('create_history->onGetActualReceiptLogList', content);
      //            this.history.actualReceiptLogList.list = content;
      //          } else {
      //            this.$message.error(content);
      //          }
      //        });
      //      },

      /**
       * 获取审核记录列表
       * @returns {Promise}
       */
      onGetApproveList() {
        SettleBillService.settleReceivableApproveList({
          page: this.params.page || 1,
          size: this.params.size || 12,
          billCode: this.params.billCode
        }, ({
          code,
          content
        }) => {
          if (code === 200) {
            // console.log('create_history->onGetApproveList', content);
            this.history.approveList.list = content;
          } else {
            this.$message.error(content);
          }
        });
      },

      /**
       * 初始化更新参数，此方法执行之后，将会知道当前页面是属于添加还是编辑或者详情
       * @returns {Promise}
       */
      onUpdateParams() {
        const date = new Date(),
          paramsObj = getParamsFromURL(window.location.search),
          userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        console.log('url params', paramsObj);
        console.log('window.location.href', window.location.href);
        this.showData.selfName = userInfo.orgFullName;
        if (paramsObj.code) {
          this.readonly = false;
          // console.log('billcode：', paramsObj.code);
          this.params.billCode = paramsObj.code;
          this.onGetView().then((content) => {
            // console.log('onUpdateParams->content:', content);
            this.submitData = Object.assign(this.submitData, content);
            this.params.clientOrgName = this.submitData.payerOrgName;
            this.params.clientOrgCode = this.submitData.payerOrgCode;

            if (this.readonly) {
              this.$refs.CreateComputed.onComputedWill().onComputedEnd();
            }
          });
        } else {
          this.readonly = false;
          this.params.clientOrgCode = paramsObj.clientOrgCode;
          this.params.clientOrgName = paramsObj.clientOrgName;
          this.submitData.billName = this.params.clientOrgName + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
          this.submitData.payerOrgName = this.params.clientOrgName;
          this.submitData.payerOrgCode = this.params.clientOrgCode;
        }
        if (paramsObj.editable) {
          this.readonly = true;
          //          this.onGetActualReceiptLogList();
          this.onGetApproveList();
        }
        // console.log('onUpdateParams->this.userInfo:', userInfo);
      },
      onGetCarrierPriceData() {
        return new Promise((resolve, reject) => {
          carrierPrice.getData({}, (res) => {
            if (res) {
              this.carrierPriceData = res;
              resolve();
            } else {
              reject();
            }
          });
        });
      },
      onGoodsLossData() {
        return new Promise((resolve, reject) => {
          getAll(['goodsLoss', 'goodsLossRation'], {}, (res) => {
            if (res) {
              this.goodsLossData = res;
              resolve();
            } else {
              reject();
            }
          });
        });
      },
      // chargeItemNumber
      onChargeItemNumberData() {
        return new Promise((resolve, reject) => {
          chargeItemNumber.getData({}, (res) => {
            if (res) {
              this.chargeItemNumberData = res;
              resolve();
            } else {
              reject();
            }
          });
        });
      },
      init() {
        this.onUpdateParams();
        this.onGetCarrierPriceData().then(() => {
          this.onGoodsLossData().then(() => {
            this.onGetList();
            this.onGetFields();
            this.onGetSearchFields();
            if (!this.readonly) {
              this.$refs.CreateComputed.onUpdateStatis();
            }
          });
        });
        // console.log('this.readonly', this.readonly);
        // console.log('this.$refs', this.$refs);
        // this.$nextTick(() => {
        //   console.log('this.$refs.CreateReceiveLogList', this.$refs.CreateReceiveLogList);
        //   this.$refs.CreateReceiveLogList.query({
        //     billCode: this.params.billCode,
        //     size: 20,
        //     page: 1
        //   });
        // });

        // console.log('goodsNumber', goodsNumber);
        // console.log('goodsVolume', goodsVolume);
        // console.log('goodsWeight', goodsWeight);

        // goodsNumber.getData({}, (res1) => {
        //   console.log('goodsNumber.getData', res1);
        //   goodsVolume.getData({}, (res2) => {
        //     console.log('goodsVolume.getData', res2);
        //     goodsWeight.getData({}, (res3) => {
        //       console.log('goodsWeight.getData', res3);
        //       carrierPrice.getData({}, (res4) => {
        //         console.log('carrierPrice.getData', res4);
        //       });
        //     });
        //   });
        // });
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
  @import "../assets/sass/rl-fixed-table.min.scss";
  @import "../assets/sass/base.scss";
  .form-button {
    text-align: center;
    padding: 20px;
    min-width: 240px;
  }

  .el-form-item__label {
    font-size: 13px;
  }

  .el-textarea__inner {
    min-width: auto !important;
  }

  .description {
    .innerblock {
      display: block !important;
    }
    .el-textarea__inner {
      height: 48px;
    }
  }

  @media (max-width: 1366px) {
    .el-select {
      width: 164px;
    }
    .complex-control-2 {
      .el-input {
        width: 83px;
      }
      .el-select {
        width: 70px !important;
      }
    }
    .form-page .innerblock .el-date-editor {
      width: 165px !important;
    }
  }

  .hr {
    clear: both;
    border-top: 1px solid #eee;
  }

  .title-component {
    line-height: 42px;
    font-size: 16px;
    display: inline-block;
  }

  .title-btn {
    float: right;
    margin-right: 20px;
    margin-top: 6px;
  }

  .userinfo {
    display: inline-block;
    line-height: 42px;
    .item {
      float: left;
      margin-right: 100px;
    }
  }

  .list-container,
  .computed-component,
  .computed-base-component,
  .computed-change-component,
  .will-computed-component {
    border: 1px solid #eee;
    padding: 10px;
    width: 100%;
    height: auto !important;
    margin-bottom: 20px;
    box-sizing: border-box;
  }

  .list-title {
    color: red;
    line-height: 22px;
  }

  .sellte-revice-container {
    padding: 10px;
  }

  .userinfo-name {
    color: #000;
    font-size: 14px;
  }

  .userinfo-tip {
    color: red;
  }

  .computed-base-component {
    .title {
      font-size: 15px;
      line-height: 42px;
    }
    .computed-cp-name {
      line-height: 46px;
    }
    .base-list {
      background: #eee;
      padding: 10px;
      .base-li {
        line-height: 24px;
        width: 100%;
        display: inline-block;
        .base-li-label {
          width: 180px;
          display: inline-block;
          float: left;
        }
        &.end {
          .base-li-label {
            font-weight: bold;
          }
          .base-li-value {
            color: red;
          }
        }
      }
    }
  }

  .computed-change-component {
    .title {
      font-size: 15px;
      line-height: 42px;
    }
    .change-value {
      margin: 16px 0px;
    }
  }

  .computed-total {
    width: 100%;
    display: inline-block;
    background: #eee;
    padding: 3px;
    font-weight: bold;
    line-height: 32px;
    font-size: 16px;
    .label {
      color: #000;
    }
    .value {
      color: red;
    }
  }

  .will-computed-total {
    font-size: 14px;
    width: 100%;
    line-height: 32px;
  }

  .end-total {
    color: #999;
    font-size: 14px;
    line-height: 32px;
  }

  .hr {
    margin: 10px 0px;
  }
  .tabel-action-btn-container{
    margin: 10px 0px;

    button{
      margin-right: 10px;
    }
  }
  .tr{
    text-align: right;
  }
</style>
