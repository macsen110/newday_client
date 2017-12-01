/**
* action.vue
* Created by dsky on 17/7/6.
*/
<template>
  <div id="app">
    <el-row :gutter="22" v-loading="loading" element-loading-text="加载中">
      <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-ruleForm" :inline="true">
        <el-form-item :label="field.showName" v-for="field in fields" :key="field.fieldConfigCode">
          <ele-block :field="field"></ele-block>
        </el-form-item>
        <el-col :span="24">
          <el-form-item v-show="!loading">
            <el-button type="primary" @click="submitForm('addForm')" size="large">提交</el-button>
            <el-button @click="resetForm('addForm')" size="large">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import eleBlock from '../components/ele-block/eleBlock.vue';

  import ApiConst from '../../api/ApiConst';

  import { addAction } from '../../api/LogisticsService';

  import { getParam } from '../../api/Utils';

  const axios = require('axios'),
    logisticsUrl = ApiConst.apiLogisticsDomain,
//    orgId = process.env.orgId,
    // 获取伙伴字段配置
    configUrl = `${logisticsUrl}`;

  function elementConfig(code, action) {
    return axios({
      method: 'get',
      url: `${configUrl}/logistics/${code}/action/${action}/render/list`,
      headers: { 'Accept': 'application/json' }
    });
  }
  export default {
    data() {
      return {
        addForm: {
        },
        fields: [],
        loading: true,
        code: '',
        action: ''
      };
    },
    components: {
      'ele-block': eleBlock
    },
    methods: {
      submitForm(formName) {
        const paramObj = {},
          self = this,
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
              this.fields.forEach((field) => {
                const param = field.extraParams,
                  len = param.length;
                for (let i = 0; i < len; i++) {
                  paramObj[param[i].field] = param[i].value;
                }
              });
              paramObj.code = this.code;
              paramObj.actionCode = this.action;
              addAction(paramObj, (success, error) => {
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '提交成功',
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                  self.resetForm(formName);
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
      const search = window.location.search,
        self = this,
        logisticsCode = search.replace('?', ''),
        localStorage = window.localStorage,
        eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
        eleInfo = JSON.parse(localStorage.getItem('eleInfo'));
      this.code = logisticsCode.split('&')[0];
      this.action = logisticsCode.split('&')[1];
      axios.all([elementConfig(this.code, this.action)])
        .then(axios.spread((eleConfig) => {
          self.fields = getParam(eleConfig, eleDefine, eleInfo);
          self.loading = false;
        })
      );
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/base";
  #app {
    padding: 20px 40px;
    .el-col-24 {
      text-align: center;
      .el-form-item {
        padding-top: 20px;
        margin-right: 0;
      }
    }
    .el-button--large {
      min-width: 240px;
    }
  }
</style>
