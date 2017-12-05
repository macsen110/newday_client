/**
* add.vue
* Created by dsky on 17/7/6.
*/
<template>
  <div id="app" class="form-page">
    <div class="page-header clearfix">
      <h2 class="page-title fl">
        车辆详情
      </h2>
      <!-- <span class="page-refresh fr" id="pageRefresh">
        <i class="ico-refresh"></i>刷新
      </span> -->
    </div>
    <el-row v-loading.fullscreen.lock="loading" element-loading-text="加载中">
      <el-form :model="domainObject" ref="domainObject" label-width="140px" class="demo-ruleForm" :inline="true">
        <el-col :span="12" v-for="field in fields" :key="field.fieldConfigCode">
          <el-form-item :label="field.showName" :required="field.required ==='true'">
            <ele-block disabled='disabled' :field="field" :domainObject="domainObject" :inputKey="inputKey"></ele-block>
            <!--<el-form-item-->
              <!--v-for="(domain, index) in field.extraParams"-->
              <!--:key="domain.fieldConfigCode"-->
              <!--:prop="domain.field">-->
              <!--<el-input v-model="domainObject[domain.field]"></el-input>-->
            <!--</el-form-item>-->
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import eleBlock from '../components/ele-block/eleBlock.vue';

  import ApiConst from '../../api/ApiConst';

  import * as TruckService from '../../api/TruckService';

  import * as utils from '../../api/Utils';

  const axios = require('axios'),
    truckUrl = ApiConst.apiTruckDomain,
//    orgId = process.env.orgId,
    // 获取伙伴字段配置
    configUrl = `${truckUrl}/detail_render_info/truck/list`;

  function elementConfig() {
    return axios({
      method: 'get',
      url: configUrl,
      headers: { 'Accept': 'application/json' }
    });
  }
  export default {
    data() {
      return {
        fields: [],
        loading: true,
        isEdit: false,
        code: '',
        domainObject: {},
        getData: {},
        initData: {}
      };
    },
    components: {
      'ele-block': eleBlock
    },
    methods: {
      submitForm(formName) {
//        console.log('domainObject', this.domainObject);
//        if (this.domainObject) return;
//        console.log(this.$refs[formName].validate);
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
              if (this.isEdit) {
                TruckService.edit(this.code, this.domainObject, (success, error) => {
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
                TruckService.add(this.domainObject, (success, error) => {
                  if (error || success.code !== 200) {
                    this.$message({
                      type: 'error',
                      showClose: true,
                      message: `${error.content}`,
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
                    self.resetForm(formName);
                  }
                });
              }
            } else {
              done();
            }
          }
        }).then(() => {
        });
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(valid);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        Object.keys(this.initData).forEach((key) => {
          this.$set(this.domainObject, key, this.initData[key]);
        });
      }
    },
    beforeCreate() {
      //   先从partnerConfig拿到数据，然后根据拿到的elementCode匹配element_type_define里面的组合信息，然后再到element_type_info里面拿到对应的数据
      const search = window.location.search,
        self = this,
        localStorage = window.localStorage,
        eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
        eleInfo = JSON.parse(localStorage.getItem('eleInfo'));
      axios.all([elementConfig()])
        .then(axios.spread((eleConfig) => {
          const paramData = utils.getParam(eleConfig, eleDefine, eleInfo);
          self.inputKey = paramData.inputKey;
          if (search) {
            const truckCode = search.replace('?', ''),
              paramObj = {
                code: truckCode
              };
            self.code = truckCode;
            self.isEdit = true;
            TruckService.get(paramObj, (success) => {
              Object.keys(success.content).forEach((key) => {
                if (!isNaN(success.content[key])) {
                  success.content[key] = success.content[key].toString();
                }
                self.$set(self.domainObject, key, success.content[key]);
                self.initData[key] = success.content[key];
              });
              paramData.field.forEach((field) => {
                field.extraParams.forEach((property) => {
                  if (!(property.field in self.domainObject)) {
                    self.$set(self.domainObject, property.field, null);
                  }
                });
              });
              self.fields = paramData.field;
              self.loading = false;
            });
          } else {
            paramData.field.forEach((field) => {
              field.extraParams.forEach((property) => {
                self.$set(self.domainObject, property.field, null);
                self.initData[property.field] = null;
              });
            });
            self.fields = paramData.field;
            self.loading = false;
          }
        })
      );
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/base";
</style>
