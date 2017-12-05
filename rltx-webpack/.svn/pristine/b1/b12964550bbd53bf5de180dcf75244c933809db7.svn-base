<template>
  <el-form :model="domainObject" ref="form" label-width="100px" :inline="inline">
    <slot></slot>
  </el-form>
</template>
<script type="text/ecmascript-6">
  import { urlRedirect, getParamsFromURL, getParam, NumtoStr as numtoStr } from '../../../api/Utils';
  import { removeClass } from '../../../api/classUtil';

  const axios = require('axios');

  export default {
    name: 'eleForm',
    componentName: 'eleForm',
    props: {
      isList: {
        type: Boolean,
        'default': false
      },
      domainObject: Object,
      objectName: String,
      isEdit: Boolean,
      listUrl: String,
      listTitle: String,
//      layout: String,
      editable: Boolean,
      configUrl: String,
      inline: Boolean,
      getInfo: Function,
      addFun: Function,
      editFun: Function
    },
    data() {
      return {
        elementCount: 0,
        elementLoadedCount: 0,
        elementChildren: []
      };
    },
    methods: {
      isArray(val) {
        if (typeof Array.isArray === 'function') {
          return Array.isArray(val);
        }
        return Object.prototype.toString.call(val) === '[object Array]';
      },
      initForm(callback) {
        const params = getParamsFromURL(window.location.search),
          urlCode = params.code,
          originalCode = params.originalCode,
          urlEditable = params.editable,
          urlGoto = params.goto,
          localStorage = window.localStorage,
          eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
          eleInfo = JSON.parse(localStorage.getItem('eleInfo')),
          self = this;

        function elementConfig() {
          return axios({
            method: 'get',
            url: self.configUrl,
            headers: { 'Accept': 'application/json' }
          });
        }

        axios.all([elementConfig()])
          .then(axios.spread((eleConfig) => {
            const paramData = getParam(eleConfig, eleDefine, eleInfo),
              formData = {};

            formData.paramData = paramData;
            formData.model = {};
            formData.isEdit = false;
            formData.editable = !(urlEditable === 'false');
            formData.urlGoto = urlGoto;

            if (urlCode || urlEditable) {
              const paramObj = {
                code: urlCode
              };
              formData.isEdit = true;
              formData.code = urlCode;
              self.getInfo(paramObj, (success, error) => {
                if (error) {
                  callback(error);
                }
                if (success) {
                  Object.keys(success.content).forEach((key) => {
                    if (self.isArray(success.content[key])) {
                      formData.model[key] = success.content[key];
                    } else {
                      formData.model[key] = numtoStr(success.content[key]);
                    }
                  });
                  // console.log('domainObject is', self.domainObject);
                  paramData.field.forEach((field) => {
                    field.extraParams.forEach((property) => {
                      if (!(property.field in formData.model)) {
                        if (property.default) {
                          formData.model[property.field] = property.default;
                        } else {
                          formData.model[property.field] = null;
                        }
                      }
//                      self.elementCount += 1;
                    });
                  });
//                  console.log('init done', self.elementCount);
                  callback(null, formData);
                }
              });
            } else if (originalCode) {
              const paramObj = {
                code: originalCode
              };
              formData.isEdit = false;
              self.getInfo(paramObj, (success, error) => {
                if (error) {
                  callback(error);
                }
                if (success) {
                  Object.keys(success.content).forEach((key) => {
                    if (key === 'freightNo' || key === 'code') {
                      formData.model[key] = null;
                    } else if (self.isArray(success.content[key])) {
                      formData.model[key] = success.content[key];
                    } else {
                      formData.model[key] = numtoStr(success.content[key]);
                    }
                  });
                  // console.log('domainObject is', self.domainObject);
                  paramData.field.forEach((field) => {
                    field.extraParams.forEach((property) => {
                      if (!(property.field in formData.model)) {
                        if (property.default) {
                          formData.model[property.field] = property.default;
                        } else {
                          formData.model[property.field] = null;
                        }
                      }
//                      self.elementCount += 1;
                    });
                  });
//                  console.log('init done', self.elementCount);
                  callback(null, formData);
                }
              });
            } else {
              paramData.field.forEach((field) => {
                field.extraParams.forEach((property) => {
                  if (property.default) {
                    formData.model[property.field] = property.default;
                  } else {
                    formData.model[property.field] = null;
                  }
//                  self.elementCount += 1;
                });
              });
//              console.log('init done', self.elementCount);
              callback(null, formData);
            }
          })
        );
      },
      submitForm() {
        const self = this;
        self.$refs.form.validate((valid) => {
          if (valid) {
            self.btnDisabled = true;
            self.$emit('beforeSubmit', self.domainObject);
//            const event = new Event('submitDone');

            if (this.isEdit) {
              this.editFun(self.domainObject.code, self.domainObject, (success, error) => {
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
                  self.$emit('editSuccess', success.content);
//                  document.dispatchEvent(event);
                }
                self.$emit('submitDone');
              });
            } else {
              console.log('domainObject is', self.domainObject);
              this.addFun(self.domainObject, (success, error) => {
                if (error || success.code !== 200) {
                  this.$message({
                    type: 'error',
                    showClose: true,
                    message: error.content,
                    duration: 5000
                  });
//                  self.btnDisabled = false;
                  return false;
                }
                if (success) {
//                  self.btnDisabled = false;
                  this.$confirm(`恭喜您,新建${self.objectName}成功！ 是否继续新建${self.objectName}?`, '提示', {
                    confirmButtonText: '继续新建',
                    cancelButtonText: `返回${self.objectName}列表`,
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
                  self.$emit('addSuccess', success.content);
//                  document.dispatchEvent(event);
                  self.$emit('submitDone');
                }
              });
            }
          } else {
            self.$emit('submitDone');
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        if (document.querySelector('#pictureResourceCode')) {
          const imglist = document.querySelector('#pictureResourceCode .el-upload-list').querySelectorAll('li'),
            uploadCard = document.querySelector('#pictureResourceCode .el-upload--picture-card');
          if (imglist.length > 0) {
            document.querySelector('#pictureResourceCode .el-upload-list').innerHTML = '';
            removeClass(uploadCard, 'hide');
          }
        }
        this.$refs.form.resetFields();
      },
      dispatchEvent(target, event, data) {
        console.log('dispatch event', event, 'to', target, 'data', data);
        this.elementChildren.forEach((ele) => {
          if (ele.configData.field === target) {
            ele.$emit(event, data);
          }
        });
      },
      getElementByField(field) {
        return this.elementChildren.find(ele => ele.configData.field === field);
      },
      mountedDone() {
        this.elementChildren.forEach((ele) => {
          ele.init();
        });
        console.log('ele-form init done');
        this.$emit('formMounted', this);
      }
    },
    created() {
      const self = this;

      this.$on('eleCreated', (ele) => {
        this.elementChildren.push(ele);
      });

      this.$on('eleMounted', () => {
//        console.log('field', ele.configData.field, 'mounted');
        this.elementLoadedCount += 1;
        if (this.elementLoadedCount === this.elementChildren.length) {
          this.mountedDone();
        }
      });

      this.initForm((error, formData) => {
        if (error) {
          console.error('error', error);
        } else {
          const model = formData.model;

          Object.keys(model).forEach((key) => {
            self.$set(self.domainObject, key, model[key]);
          });
          console.log('form ready');
          self.$emit('formReady', formData);
        }
      });
    }
  };
</script>
