/**
* action.vue
* Created by dsky on 17/7/6.
*/
<template>
  <div class="form-page">
    <!-- <div class="page-header clearfix">
      <h2 class="page-title fl">
        发货
      </h2>
      <span class="page-refresh fr" id="pageRefresh">
        <i class="ico-refresh"></i>刷新
      </span>
    </div> -->
    <el-row v-loading.fullscreen.lock="loading" element-loading-text="加载中">
      <el-form :model="domainObject" ref="domainObject" label-width="140px" class="demo-ruleForm" :inline="true">
        <el-col :span="12" v-for="field in fields" :key="field.fieldConfigCode">
          <el-form-item :label="field.showName">
            <ele-block :field="field" :domainObject="domainObject" :inputKey="inputKey" :uploadUrl="uploadUrl"></ele-block>
          </el-form-item>
        </el-col>
        <!--显示-->
        <el-table
          :data="tableData"
          stripe
          style="width: 100%" v-if="tableData.length">
          <el-table-column
            type="index"
            label="序号"
            width="72"
            align="center">
            <template scope="scope">
              {{ scope.$index + 1 }} <i class="el-icon-plus" v-show="isEdit" v-if="!scope.row.isAdd" @click="addTpl(scope.$index)"></i><i class="el-icon-minus" v-show="isEdit" v-if="scope.row.isAdd" @click="deleteTpl(scope.$index)"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="chargeItemName"
            label="费用名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="usageDesc"
            label="用途类型"
            align="center">
          </el-table-column>
          <el-table-column
            label="金额"
            align="center">
            <template scope="scope">
              <div class="block" v-show="isEdit">
                <el-input v-model="tableData[scope.$index].chargeAmounts" placeholder="金额" ></el-input>{{ scope.row.chargeAmountsUnitName }}
              </div>
              <span v-show="!isEdit">{{ scope.row.chargeAmounts ? scope.row.chargeAmounts + scope.row.chargeAmountsUnitName : 0 + scope.row.chargeAmountsUnitName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="费用描述"
            align="center">
            <template scope="scope">
              <div class="block" v-show="isEdit">
                <el-input v-model="tableData[scope.$index].description" placeholder="费用描述" v-show="isEdit"></el-input>
              </div>
              <span v-show="!isEdit">{{ scope.row.description ? scope.row.description : '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sourceCode"
            label="相关附件"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reportPerson"
            label="上报人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="ReportTime"
            label="上报时间"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="68">
            <template scope="scope">
              <el-button
                size="small"
                type="default"
                @click="handleEmpty(scope.$index)" v-show="isEdit">清空</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('domainObject')" v-show="isEdit">提交</el-button>
          <el-button @click="handleCancel" v-show="isEdit">取消</el-button>
        </div>
        <el-col :span="24">
          <el-form-item v-show="!loading">
            <el-button type="primary" @click="isEdit = true" v-show="!isEdit && !isDialog" size="large" v-if="tableData.length">编辑</el-button>
            <el-button type="primary" @click="submitForm('domainObject')" v-show="isEdit && !isDialog" size="large">提交</el-button>
            <!--<el-button @click="resetForm('domainObject')" v-show="isEdit" size="large">重置</el-button>-->
            <el-button @click="handleCancel" v-show="isEdit && !isDialog" size="large" v-if="tableData.length">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import eleBlock from '../components/ele-block/eleBlock.vue';

  import ApiConst from '../../api/ApiConst';

  import * as waybillService from '../../api/waybillService';

  import * as utils from '../../api/Utils';

  const axios = require('axios'),
    waybillUrl = ApiConst.apiWayBillDomain;

  function elementConfig(code, action) {
    return axios({
      method: 'get',
//      url: `${configUrl}/waybill/${code}/action/${action}/render/list`,
      url: `${waybillUrl}/waybill/${code}/action/${action}/render/list`,
      headers: { 'Accept': 'application/json' }
    });
  }
  export default {
    data() {
      return {
        domainObject: {},
        inputKey: [],
        fields: [],
        loading: true,
        code: '',
        tableData: [],
        copyData: [],
        isEdit: false,
        isAction: false,
        uploadUrl: ApiConst.apiWayBillDomain,
        actionCode: ''
      };
    },
    props: {
      id: '',
      action: '',
//      uploadUrl: '',
      isDialog: {
        type: Boolean,
        'default': false
      }
    },
    components: {
      'ele-block': eleBlock
    },
    computed: {
    },
    methods: {
      execute() {
        console.log('execute action');
        this.submitForm('domainObject');
      },
      addTpl(index) {
        const tableData = this.tableData[index],
          dataTpl = {};
        Object.keys(tableData).forEach((key) => {
          dataTpl[key] = tableData[key];
        });
        dataTpl.isAdd = true;
        this.tableData.splice(index + 1, 0, dataTpl);
      },
      deleteTpl(index) {
        this.tableData.splice(index, 1);
      },
      handleEmpty(index) {
        this.$set(this.tableData[index], 'description', '');
        this.$set(this.tableData[index], 'chargeAmounts', '');
      },
      handleCancel() {
        this.isEdit = false;
        this.tableData = this.copyData;
//        console.log('copyData: ', this.copyData);
//        console.log('tableData: ', this.tableData);
      },
      submitForm(formName) {
        const self = this,
          h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '确认提交吗？ ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              /*
              if (this.fields.length) {
                this.fields.forEach((field) => {
                  const param = field.extraParams,
                    len = param.length;
                  for (let i = 0; i < len; i++) {
                    paramObj[param[i].field] = param[i].value;
                  }
                });
              }
              paramObj.code = this.code;
              paramObj.actionCode = this.action;
              if (self.tableData.length) {
                self.tableData.forEach((value) => {
                  delete value.isAdd;
                });
              }
              */
              waybillService.executeAction(self.code, self.action, self.domainObject, self.tableData, (success, error) => {
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '提交成功',
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                  if (!this.isDialog) {
                    self.resetForm(formName);
                  }
                  this.$emit('success');
                }
                if (error) {
                  this.$message({
                    type: 'warning',
                    message: `${error}`,
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                  console.error(error);
                  this.$emit('fail');
                }
              });
            } else {
              done();
            }
          }
        }).then(() => {
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      //   先从partnerConfig拿到数据，然后根据拿到的elementCode匹配element_type_define里面的组合信息，然后再到element_type_info里面拿到对应的数据
      const self = this,
        params = utils.getParamsFromURL(window.location.search),
        localStorage = window.localStorage,
        eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
        eleInfo = JSON.parse(localStorage.getItem('eleInfo'));
      this.code = this.id ? this.id : params.code;
      this.actionCode = this.action ? this.action : params.actionCode;
      axios.all([elementConfig(this.code, this.actionCode)])
        .then(axios.spread((eleConfig) => {
          if (eleConfig.data.content.length) {
            const paramData = utils.getParam(eleConfig, eleDefine, eleInfo);
            this.inputKey = paramData.inputKey;
            paramData.field.forEach((field) => {
              field.extraParams.forEach((property) => {
                self.$set(self.domainObject, property.field, null);
              });
            });
//            console.log('self.domainObject: ', self.domainObject);
            this.isAction = true;
            this.fields = paramData.field;
            this.loading = false;
          } else {
            this.loading = false;
          }
        })
      );
      waybillService.getCharge(this.code, this.actionCode, (success) => {
        this.tableData = success.content;
//        console.log('this.tableData: ', this.tableData.length);
        if (this.tableData.length) {
          this.tableData.forEach((value) => {
            value.isAdd = false;
          });
        }
        const copyData = this.tableData;
        Object.defineProperty(this, 'copyData', copyData);
//        this.copyData = copyData;
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/base";
  .el-icon-plus, .el-icon-minus{
    cursor: pointer;
  }
  .el-table {
    .el-input {
      width: 100px;
      margin-right: 5px;
    }
  }
  .el-col-12 {
    height: auto !important;
  }
</style>
