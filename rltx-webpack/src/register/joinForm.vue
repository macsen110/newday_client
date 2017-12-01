<template>
  <div id="joinForm">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="reg-form formlist">
      <el-form-item label="公司名称" prop="companyName">
        <el-row>
          <el-col :span="10">
            <el-autocomplete v-model='ruleForm.companyName' :fetch-suggestions="querySearch" :trigger-on-focus="false" @select="handleSelect" placeholder="请输入您要加入的公司全称"></el-autocomplete>
          </el-col>
          <el-col :span="14">
            <span class="light">平台将会为您匹配已注册的公司</span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">申请加入</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">

  // import * as apiConst from '../../api/ApiConst';

  import * as registerService from '../../api/registerService';

  // import * as Utils from '../../api/Utils';

  // const axios = require('axios');

  export default {
    data() {
      return {
        ruleForm: {
          companyName: ''
        },
        rules: {
          companyName: [
            { required: true, message: '请输入您要加入的公司全称', trigger: 'blur' }
          ]
        },
        orgs: []
      };
    },
    methods: {
      querySearch(queryString, cb) {
        const orgs = this.orgs,
          results = queryString ? orgs.filter(this.createStateFilter(queryString)) : orgs;
        cb(results);
      },
      createStateFilter(queryString) {
        return org => org.orgFullName.indexOf(queryString.toLowerCase()) === 0;
      },
      loadAll() {
        return [
          {
            'code': '551', 'orgFullName': '上海卡小车物流有限公司'
          },
          {
            'code': '552', 'orgFullName': '通达物流'
          },
          {
            'code': '553', 'orgFullName': '九零速运'
          }
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      mounted() {
        this.orgs = this.loadAll();
        console.log(this.orgs);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            registerService.joinCompany(this.ruleForm, (success, error) => {
              if (success) {
                // window.location.href = '/register/register-wait';
              }
              if (error) {
                console.log(error);
              }
            });
          } else {
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
