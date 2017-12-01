<template>
  <div>
    <div class="form-page">
      <el-form :inline="true">
        <div class="block">
          <div class="el-row">
            <div class="el-col el-col-18">
              <el-form-item label="模板名称" prop="name">
                <el-input
                  v-model="data.name"
                  placeholder="test placeholdeer"></el-input>
              </el-form-item>
            </div>
            <div class="el-col el-col-18">
              <el-form-item label="打印字段" prop="fields">
                <div class="fields-container">
                  <span
                    v-for="(item,index) in fields"
                    :key="index"
                    class="ck-item">
                    <el-checkbox
                      v-model="tempFields"
                      :value="'$'+(item.chargeItemName || item.showName)+'$'"
                      :label="item.chargeItemName || item.showName"></el-checkbox>
                  </span>
                </div>
              </el-form-item>
            </div>
            <div class="el-col el-col-18">
              <el-form-item label="模板规格">
                <el-input
                  class="spec-input"
                  v-model="data.bgPicHeight"
                  placeholder="test bgPicHeight"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  class="spec-input"
                  v-model="data.bgPicHeight"
                  placeholder="test bgPicHeight"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    getWaybillPrintFieldsList
  } from '../../../api/waybillService';
  import {
    getOrgFields
  } from '../../../api/OrgService';

  export default {
    name: 'wayBillPrintAdd',
    components: {},
    data() {
      return {
        userinfo: {},
        data: {
          waybillPrintDocument: '',
          // 名称
          name: '',
          // 关联单据编码
          documentCode: '',
          // 模板背景图
          bgPicResourceCode: '',
          // 模板背景图宽度(单位毫米)
          bgPicWidth: '',
          // 模板背景图高度(单位毫米)
          bgPicHeight: '',
          // 包含字段格式占位符
          fields: '',
          // 模板内容
          context: '',
          // 描述
          description: ''
        },
        fields: [],
        tempFields: []
      };
    },
    methods: {
      getUserinfo() {
        try {
          this.userinfo = JSON.parse(localStorage.getItem('userInfo'));
        } catch (e) {
          this.userinfo = {};
        }

        this.userinfo = this.userinfo || {};
      },
      getDefaultPrintFields() {
        return new Promise((resolve, reject) => {
          getWaybillPrintFieldsList('waybill', {}, (res, err) => {
            if (res && res.code === 200 && res.content && Array.isArray(res.content)) {
              this.fields = this.fields.concat(res.content);
              resolve(this.fields);
            } else {
              reject(err || res);
            }
          });
        });
      },
      getOrgFields() {
        return new Promise((resolve, reject) => {
          getOrgFields({
            orgCode: this.userinfo.orgCode
          }, (res, err) => {
            if (res && res.code === 200 && res.content && Array.isArray(res.content)) {
              this.fields = this.fields.concat(res.content);
              resolve(this.fields);
            } else {
              reject(err || res);
            }
          });
        });
      },
      init() {
        this.fields = [];
        this.getUserinfo();
        Promise.all([this.getDefaultPrintFields(), this.getOrgFields()]).then(() => {
          console.log(this.fields);
        }).catch((err) => {
          console.log(err);
        });
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

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/sass/base.scss";

  .form-button {
    text-align: center;
    padding: 20px;
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

  .spec-input {
    float: left;
  }

  .fields-container {
    width: 716px;
    height: 204px;
    padding: 5px 10px 0;
    border: 1px solid #dadada;
    overflow: auto;
  }

  .ck-item {
    float: left;
    width: 25%;
  }
</style>
