/**
* addsettle.vue
* Created by dsky on 17/7/10.
*/
<template>
  <div id="settlePage">
    <div id="base">
      <h2 class="tmp-title">基本信息</h2>
      <div class="el-row"></div>
    </div>
    <div id="transporter">
      <h2 class="tmp-title">运力信息</h2>
      <div class="el-row"></div>
    </div>
    <div id="loading">
      <h2 class="tmp-title">装货信息</h2>
      <div class="el-row"></div>
    </div>
    <div id="unloading">
      <h2 class="tmp-title">卸货信息</h2>
      <div class="el-row"></div>
    </div>
    <detailLayout :objectName="objectName" :configUrl="configUrl" :domainObject="domainObject" :addFun="addFun" :editFun="editFun" :getInfo="getInfo" :uploadUrl="uploadUrl" :logType="logType" :listUrl="listUrl" :listTitle="listTitle"></detailLayout>
    <!-- <driver-record :domainObject="domainObject" :waybillCode="code" :getTotalAmount="getTotalAmount" :expressionArray="expressionArray"></driver-record> -->
    <cost-record :domainObject="domainObject" :waybillCode="code" :getTotalAmount="getTotalAmount" :expressionArray="expressionArray" v-if="status"></cost-record>
    <!-- <action action="loading" v-if="status"></action>
    <action action="unloading" v-if="status"></action> -->
    <div class="form-page">
      <el-row>
        <el-form :model="domainObject" ref="domainObject" label-width="140px" :inline="true">
          <el-col :span="24" v-if="domainObject.code">
            <el-form-item>
              <el-button type="primary" @click="saveSettle" size="large">提交</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <p class="total-amount" v-for="item in expressionArray">{{ item.expressionName }} :  {{ item.expressionResult }} 元 <span class="grey"> ({{ item.description }})</span> </p>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">

  import detailLayout from '../layout/detail/detailLayout.vue';

  import driverRecord from './driverRecord.vue';

  import costRecord from './costRecord.vue';

  import action from './action.vue';
  // import eleBlock from '../components/ele-block/eleBlock.vue';

  import ApiConst from '../../api/ApiConst';

  import { addSettle, editSettle, get, getTotalAmount, saveSettle } from '../../api/waybillService';

  import { getParamsFromURL } from '../../api/Utils';

  // const waybillUrl = ApiConst.apiWayBillDomain,
    // orgConfigUrl = ApiConst.apiOrgConfigDomain,
//    orgId = process.env.orgId,
    // 获取伙伴字段配置
    // configUrl = `${waybillUrl}`,
    // 获取element type deine
    // defineUrl = `${orgConfigUrl}/element_type/define`,
    // 获取element type info
    // typeUrl = `${orgConfigUrl}/element_type/info`;

  // function elementConfig() {
  //   return axios({
  //     method: 'get',
  //     url: `${configUrl}/detail_render_info/settle/list`,
  //     headers: { 'Accept': 'application/json' }
  //   });
  // }
  // function elementDefine() {
  //   return axios({
  //     method: 'get',
  //     url: defineUrl,
  //     headers: { 'Accept': 'application/json' }
  //   });
  // }
  // function elementInfo() {
  //   return axios({
  //     method: 'get',
  //     url: typeUrl,
  //     headers: { 'Accept': 'application/json' }
  //   });
  // }
  export default {
    data() {
      return {
        objectName: '结算单',
        configUrl: '',
        domainObject: {},
        addFun: addSettle,
        editFun: editSettle,
        getInfo: get,
        uploadUrl: ApiConst.apiWayBillDomain,
        logType: 'settle',
        listUrl: '/settle/list.html',
        listTitle: '司机结算',
        addForm: {
        },
        fields: [],
        loading: true,
        code: '',
        action: '',
        tableDate: [],
        driveDate: [],
        waybillCode: '',
        activeName: '1',
        expressionArray: [],
        status: false
      };
    },
    components: {
      'detailLayout': detailLayout,
      'driver-record': driverRecord,
      'cost-record': costRecord,
      'action': action
    },
    computed: {
    },
    methods: {
      getTotalAmount(waybillCode, domainObject, tableDate) {
        // 获取运费总金额
        getTotalAmount(waybillCode, domainObject, tableDate, (res) => {
          this.expressionArray = res.content;
          // console.log('expressionArray: ', this.expressionArray);
        });
      },
      saveSettle() {
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '确认提交吗？ ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (actioncode, instance, done) => {
            if (actioncode === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              saveSettle(this.code, (success, error) => {
                if (error || success.code !== 200) {
                  this.$message({
                    type: 'error',
                    showClose: true,
                    message: `error code ${error || success.code}, see console message please`,
                    duration: 5000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                  return false;
                }
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '提交成功',
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
//                  self.resetForm();
                  // 获取运费总金额
                  this.getTotalAmount(this.code, this.domainObject, this.tableDate);
                }
              });
            } else {
              done();
            }
          }
        }).then(() => {
        });
      }
/*      resetForm(formName) {
        this.$refs[formName].resetFields();
      }*/
    },
    created() {
      //   先从partnerConfig拿到数据，然后根据拿到的elementCode匹配element_type_define里面的组合信息，然后再到element_type_info里面拿到对应的数据
      const params = getParamsFromURL(window.location.search),
        waybillCode = params.code,
        settleUrl = ApiConst.apiWayBillDomain,
        configSettleUrl = `${settleUrl}/detail_render_info/settle/list`,
        self = this;
      this.configUrl = configSettleUrl;
      this.code = waybillCode;
      if (waybillCode) {
        this.status = true;
      }
      // axios.all([elementConfig(), elementDefine(), elementInfo()])
      //   .then(axios.spread((eleConfig, eleDefine, eleInfo) => {
      //     const paramData = utils.getParam(eleConfig, eleDefine, eleInfo);
      //     paramData.field.forEach((field) => {
      //       field.extraParams.forEach((property) => {
      //         this.$set(this.domainObject, property.field, null);
      //       });
      //     });
      //     this.fields = paramData.field;
      //     this.loading = false;
      //     if (waybillCode) {
      //       console.log('get');
      //       waybillService.get(paramObj, (success) => {
      //         if (success) {
      //           Object.keys(success.content).forEach((key) => {
      //             this.$set(this.domainObject, key, utils.NumtoStr(success.content[key]));
      //           });
      //         }
      //       });
      //     }
      //   })
      // );
      // 页面版块设置
      function cb() {
        const baseDoms = document.querySelectorAll('.base'),
          baseWrap = document.querySelector('#base .el-row'),
          transporterDoms = document.querySelectorAll('.transporter'),
          transporterWrap = document.querySelector('#transporter .el-row'),
          loadingDoms = document.querySelectorAll('.loading'),
          loadingWrap = document.querySelector('#loading .el-row'),
          unloadingDoms = document.querySelectorAll('.unloading'),
          unloadingWrap = document.querySelector('#unloading .el-row'),
          tmpWrap = document.querySelector('#tmp-wrap');
        baseDoms.forEach((value) => {
          baseWrap.appendChild(value);
        });
        transporterDoms.forEach((value) => {
          transporterWrap.appendChild(value);
        });
        loadingDoms.forEach((value) => {
          loadingWrap.appendChild(value);
        });
        unloadingDoms.forEach((value) => {
          unloadingWrap.appendChild(value);
        });
        tmpWrap.appendChild(document.querySelector('#base'));
        tmpWrap.appendChild(document.querySelector('#transporter'));
        tmpWrap.appendChild(document.querySelector('#loading'));
        tmpWrap.appendChild(document.querySelector('#unloading'));
      }
      document.addEventListener('loadDone', cb, false);
      // 计算费用
      function submitCb() {
        self.getTotalAmount(self.code, null, null);
      }
      document.addEventListener('submitDone', submitCb, false);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/base";
  .el-icon-plus, .el-icon-minus{
    cursor: pointer;
  }
  .grey{
    color: #666;
  }
  .total-amount{
    margin-left: 20px;
  }
  #settlePage {
    padding-bottom: 20px;
  }
</style>
