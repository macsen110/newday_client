/**
* detail.vue
* Created by cc on 17/10/18.
*/

<template>
  <div id="template" class="form-page">
    <div class="page-header clearfix">
      <h2 class="page-title fl">
        {{ isEdit ? ( editable ? '编辑' + objectName : objectName + '详情' ): ( '新建' + objectName) }}
      </h2>
      <!-- <span class="page-refresh fr" id="pageRefresh">
        <i class="ico-refresh"></i>刷新
      </span> -->
      <div class="hd-opr fr">
        <el-button type="primary" v-show="!editable && isEdit" @click="editPage()">编辑</el-button>
        <el-button v-show="editable && isEdit" @click="cancelEdit()">取消编辑</el-button>
        <el-button v-show="!editable && isEdit" @click="changeLog()">{{ objectName }}变更记录</el-button>
      </div>
    </div>
    <el-form :model="domainObject" ref="domainObject" :rules="rules" label-width="140px" :inline="false">
      <el-row :gutter="20">
        <el-col :span="12" class="el-col-auto">
          <h2 class="tmp-title">基础信息</h2>
          <el-form-item label="使用单位" prop="orgName">
            <el-autocomplete
              v-model="domainObject.orgName"
              :fetch-suggestions="querySearchAsyncOrg"
              placeholder="请选择单位"
              @select="handleSelectOrg"
              v-if="editable || !isEdit"
            ></el-autocomplete>
            <span v-else>{{domainObject.orgName}}</span>
          </el-form-item>
          <el-form-item label="融链设备名称" prop="deviceName">
            <el-input v-model="domainObject.deviceName" placeholder="请输入融链设备名称" v-if="editable || !isEdit"></el-input>
            <span v-else>{{domainObject.deviceName}}</span>
          </el-form-item>
          <el-form-item label="融链设备编号" prop="deviceCode">
            <el-input v-model="domainObject.deviceCode" placeholder="请输入融链设备编号" v-if="editable || !isEdit"></el-input>
            <span v-else>{{domainObject.deviceCode}}</span>
          </el-form-item>
          <el-form-item label="SIM卡号" prop="simCardNo">
            <el-input v-model="domainObject.simCardNo" placeholder="请输入SIM卡号" v-if="editable || !isEdit"></el-input>
            <span v-else>{{domainObject.simCardNo}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="el-col-auto">
          <h2 class="tmp-title">API参数</h2>
          <el-form-item label="设备厂商" prop="providerName">
            <el-autocomplete
              v-model="domainObject.providerName"
              :fetch-suggestions="querySearchAsyncManufactory"
              placeholder="请选择设备厂商"
              @select="handleSelectManufactory"
              v-if="editable || !isEdit"
            ></el-autocomplete>
            <span v-else>{{domainObject.providerName}}</span>
          </el-form-item>
          <el-form-item label="接入方式" v-if="domainObject.supportRonglian || domainObject.supportThird" class="is-required">
            <el-checkbox v-model="domainObject.supportRonglian" disabled v-if="editable || !isEdit">融链方式接入</el-checkbox>
            <span v-else>{{domainObject.supportRonglian === true ? '融链方式接入' : ''}}</span>
            <el-checkbox v-model="domainObject.supportThird" disabled v-if="editable || !isEdit">厂商平台接入</el-checkbox>
            <span v-else>{{domainObject.supportThird === true ? '厂商平台接入' : ''}}</span>
          </el-form-item>
          <el-form-item v-for="item in parameterValueList" :label="item.parameterName" :key="item.providerCode" :prop="item.parameterKey">
            <el-input v-model="domainObject[item.parameterKey]" v-if="editable || !isEdit"></el-input>
            <span v-else>{{domainObject[item.parameterKey]}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-col :span="24" v-show='editable || !isEdit' class="el-col-button">
        <el-form-item>
          <el-button type="primary" @click="submitForm('domainObject')" size="large" :disabled="btnDisabled">提交</el-button>
          <el-button @click="resetForm('domainObject')" size="large">重置</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">

  import { getParamsFromURL, urlRedirect, NumtoStr as numtoStr } from '../../api/Utils';

  import ApiConst from '../../api/ApiConst';
  import { orgList, manufactoryList, add, edit, get } from '../../api/DeviceBindService';

  // 引入tab跳转
  require('../public.js');

  export default {
    data() {
      return {
        objectName: '设备绑定',
        domainObject: {
          orgName: '',
          deviceName: '',
          deviceCode: '',
          providerName: '',
          supportRonglian: false,
          supportThird: false
        },
        rules: {
          orgName: [
            { required: true, message: '请选择单位', trigger: 'change' }
          ],
          deviceName: [
            { required: true, message: '请输入融链设备名称', trigger: 'blur' }
          ],
          deviceCode: [
            { required: true, message: '请输入融链设备编号', trigger: 'blur' }
          ],
          providerName: [
            { required: true, message: '请选择设备厂商', trigger: 'change' }
          ]
        },
        orgList: [],
        manufactoryList: [],
        parameterValueList: [],
        timeout: null,
        uploadUrl: `${ApiConst.apiOprLbsDomain}`,
        logType: '',
        listUrl: '/deviceBind/list.html',
        listTitle: '设备绑定列表',
        isEdit: false, // 控制编辑添加按钮
        editable: true, // 控制页面状态
        code: '',
        btnDisabled: false
      };
    },
    methods: {
      /* eslint-disable arrow-body-style */
      editPage() {
        this.editable = true;
      },
      cancelEdit() {
        // this.resetForm('domainObject');
        this.editable = false;
      },
      changeLog() {
        const url = `/logs/list.html?domain=${this.uploadUrl}&type=${this.logType}&code=${this.code}`,
          title = `${this.objectName}变更记录`;
        urlRedirect(url, title);
      },
      isArray(val) {
        if (typeof Array.isArray === 'function') {
          return Array.isArray(val);
        }
        return Object.prototype.toString.call(val) === '[object Array]';
      },
      submitForm(formName) {
        const self = this;
        this.$refs[formName].validate((valid) => {
          // delete this.domainObject.providerName;
          // delete this.domainObject.supportRonglian;
          // delete this.domainObject.supportThird;
          if (valid) {
            self.btnDisabled = true;
            if (this.isEdit) {
              edit(this.code, this.domainObject, (success, error) => {
                if (error || success.code !== 200) {
                  this.$message({
                    type: 'error',
                    message: error.content,
                    duration: 5000
                  });
                  self.btnDisabled = false;
                  return false;
                }
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '提交成功',
                    duration: 1000
                  });
                  self.btnDisabled = false;
                  self.isEdit = true;
                  self.editable = false;
                }
              });
            } else {
              add(this.domainObject, (success, error) => {
                if (error || success.code !== 200) {
                  this.$message({
                    type: 'error',
                    showClose: true,
                    message: error.content,
                    duration: 5000
                  });
                  self.btnDisabled = false;
                  return false;
                }
                if (success) {
                  // self.resetForm('domainObject');
                  self.btnDisabled = false;
                  this.$confirm(`恭喜您,新建${this.objectName}成功！ 是否继续新建${this.objectName}?`, '提示', {
                    confirmButtonText: '继续新建',
                    cancelButtonText: `返回${this.objectName}列表`,
                    type: 'success',
                    customClass: 'confirm-dialog'
                  }).then(() => {
                    window.location.reload();
                  }).catch(() => {
                    let url = this.listUrl;
                    const qindex = url.indexOf('?'),
                      title = this.listTitle;
                    // console.log(url, title);
                    if (qindex > -1) {
                      url = url.substring(0, qindex);
                    }
                    // console.log(url, title);
                    urlRedirect(url, title);
                  });
                }
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getOrgList() {
        orgList((success) => {
          this.orgList = success.content;
          this.orgList.forEach((val) => {
            val.value = val.orgName;
          });
          // console.log('orgList is', success.content);
        });
      },
      querySearchAsyncOrg(queryString, cb) {
        const org = this.orgList,
          results = queryString ? org.filter(this.createStateFilter(queryString)) : org;
        cb(results);
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelectOrg(item) {
        console.log(item);
        this.domainObject.orgCode = item.orgCode;
      },
      getManufactoryList() {
        manufactoryList((success) => {
          this.manufactoryList = success.content;
          this.manufactoryList.forEach((val) => {
            val.value = val.providerName;
          });
          console.log('manufactoryList is', success.content);
        });
      },
      querySearchAsyncManufactory(queryString, cb) {
        const manufactory = this.manufactoryList,
          results = queryString ? manufactory.filter(this.createStateFilter(queryString)) : manufactory;
        cb(results);
      },
      handleSelectManufactory(item) {
        // const baseTpl = {};
        this.parameterValueList = [];
        // item.providerParameterDefineList.forEach((val) => {
        //   Object.keys(val).forEach((key) => {
        //     baseTpl[key] = val[key];
        //   });
        //   this.parameterValueList.push(baseTpl);
        //   console.log('pushing baseTpl is', baseTpl);
        // });
        item.providerParameterDefineList.forEach((val) => {
          this.parameterValueList.push(val);
          this.rules[val.parameterKey] = [{ required: true, message: '必填字段，不能为空', trigger: 'blur' }];
        });
        this.$set(this.domainObject, 'providerCode', item.providerCode);
        this.$set(this.domainObject, 'supportRonglian', item.supportRonglian);
        this.$set(this.domainObject, 'supportThird', item.supportThird);
        this.$set(this.domainObject, 'type', item.type);
        // this.parameterValueList = item.providerParameterDefineList;
        // this.domainObject.providerCode = item.providerCode;
        // this.domainObject.supportRonglian = item.supportRonglian;
        // this.domainObject.supportThird = item.supportThird;
        console.log('item is', item);
        console.log('this.parameterValueList', this.parameterValueList);
        console.log('this.domainObject111111', this.domainObject);
        console.log('rules is', this.rules);
      }
    },
    created() {
      const self = this,
        params = getParamsFromURL(window.location.search),
        urlCode = params.code,
        urlEditable = params.editable;
      if (urlCode || urlEditable) {
        const paramObj = {
          code: urlCode
        };
        // console.log(urlCode, urlEditable);
        self.code = urlCode;
        self.isEdit = true;
        self.editable = urlEditable === 'true';
        get(paramObj, (success) => {
          if (!self.code && success.content.code) {
            self.code = success.content.code;
          }
          Object.keys(success.content).forEach((key) => {
            // console.log('key is', key, 'value is', success.content[key]);
            if (key === 'parameterValueList') {
              success.content[key].forEach((val) => {
                self.$set(self.domainObject, val.parameterKey, val.parameterValue);
              });
            } else {
              self.$set(self.domainObject, key, numtoStr(success.content[key]));
            }
          });
          console.log('this.domainObject is', this.domainObject);
          this.handleSelectManufactory({
            providerParameterDefineList: success.content.parameterValueList,
            providerCode: self.domainObject.providerCode,
            supportRonglian: self.domainObject.supportRonglian === 'true' || false,
            supportThird: self.domainObject.supportThird === 'true' || false
          });
        });
      } else {
        self.editable = true;
      }
    },
    mounted() {
      this.getOrgList();
      this.getManufactoryList();
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/base.scss";
  .form-page {
    .el-row {
      margin: 0 !important;
    }
    .tmp-title {
      margin: 0 0 20px;
    }
    .el-form-item {
      margin: 0 10px 10px;
    }
    .el-form-item__content {
      margin-left: 0 !important;
      display: inline-block;
    }
    .el-input {
      width: 226px;
    }
  }
  .el-autocomplete-suggestion {
    width: 226px !important;
  }
</style>
