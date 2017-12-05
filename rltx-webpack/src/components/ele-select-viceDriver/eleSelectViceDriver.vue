/**
* elePop.vue
* Created by dsky on 17/6/27.
*/
<template>
  <div class="block">
    <!-- <el-button @click="dialogOpen" type="primary" v-if="editable">选择</el-button> -->
    <div v-if="!editable">
      <a href="javascript:;" class="blue" @click="openWindow('/driver/add.html?code=' + domainObject.viceDriverCode + '&editable=true&objectName=司机', '编辑司机')" :data-link="'/driver/add.html?code=' + domainObject.viceDriverCode + '&editable=true'" data-title="编辑司机">
        {{ domainObject.viceDriverFullName }}
      </a>
      <span v-if="domainObject.viceDriverCode">, {{ domainObject.viceDriverPhone }}</span>
      <el-button type="text" @click="dialogOpen" v-if="!domainObject.viceDriverCode">添加</el-button>
      <el-button type="text" @click="removeDriver" v-if="domainObject.viceDriverCode">去除</el-button>
      <span v-if="domainObject.viceDriverCode">|</span>
      <el-button type="text" @click="dialogOpen" v-if="domainObject.viceDriverCode">更换</el-button>
    </div>
    <ele-pop-select ref="dialog" :configData="driverData" :handleSelect="handleSelect"
                    :editable="editable" :domainObject="domainObject">
    </ele-pop-select>
  </div>
</template>

<script type="text/ecmascript-6">
import elePopSelect from '../../components/ele-pop-select/elePopSelect.vue';
import { edit } from '../../../api/TransportService';

export default {
  name: 'elePop',
  props: {
    driverData: null,
    editable: {
      type: Boolean,
      'default': false
    },
    domainObject: Object
  },
  components: {
    'ele-pop-select': elePopSelect
  },
  methods: {
    init() {},
    removeDriver() {
      const model = Object.assign({}, this.domainObject);
      delete model.actionMenuList;
      model.viceDriverCode = '';
      model.viceDriverPhone = '';
      model.viceDriverFullName = '';
      model.viceDriverLicenseNo = '';
      this.updateData(model.code, model);
    },
    updateData(code, obj) {
      edit(code, obj, (success, error) => {
        if (success) {
          // TODO reload data
          window.location.reload();
        } else {
          console.log('update vice driver error', error);
          this.$message({
            type: 'error',
            showClose: true,
            message: error.content,
            duration: 5000
          });
        }
      });
    },
    dialogOpen() {
      this.$refs.dialog.select();
    },
    handleSelect(data) {
      const model = Object.assign({}, this.domainObject);
      delete model.actionMenuList;
      console.log('oldVersion', model, 'selected', data);
      model.viceDriverCode = data.code;
      model.viceDriverPhone = data.phone;
      model.viceDriverFullName = data.fullName;
      model.viceDriverLicenseNo = data.driverLicenseNo;
      this.updateData(model.code, model);
    }
  },
  mounted() {
    this.$refs.dialog.$el.parentNode.removeChild(this.$refs.dialog.$el);
    document.body.appendChild(this.$refs.dialog.$el);
  },
  created() {},
  beforeCreate() {}
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../assets/sass/rl-table.scss";
.el-dialog__body {
  .fix-table-wrap {
    padding: 10px;
    box-sizing: border-box;
    .rl-fix-table {
      margin: 0;
    }
    .pagination {
      padding-left: 0;
    }
  }
  .text-c {
    text-align: center;
  }
  .text-r {
    text-align: right;
  }
  .el-form-item__label {
    text-align: right !important;
  }
}
</style>
