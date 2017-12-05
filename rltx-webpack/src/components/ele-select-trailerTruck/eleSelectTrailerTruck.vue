/**
* elePop.vue
* Created by dsky on 17/6/27.
*/
<template>
  <div class="block">
    <!-- <el-button @click="dialogOpen" type="primary" v-if="editable">选择</el-button> -->
    <div v-if="!editable">
      <a href="javascript:;" class="blue" @click="openWindow('/trailer/add.html?code=' + domainObject.trailerTruckCode + '&editable=true&objectName=挂车', '编辑挂车')" :data-link="'/trailer/add.html?code=' + domainObject.trailerTruckCode + '&editable=true'" data-title="编辑挂车">
        {{ domainObject.trailerTruckLicenseNo }}
      </a>
      <el-button type="text" @click="dialogOpen" v-if="!domainObject.trailerTruckCode">添加</el-button>
      <el-button type="text" @click="removeTruck" v-if="domainObject.trailerTruckCode">去除</el-button>
      <span v-if="domainObject.trailerTruckCode">|</span>
      <el-button type="text" @click="dialogOpen" v-if="domainObject.trailerTruckCode">更换</el-button>
    </div>
    <ele-pop-select ref="dialog" :configData="truckData" :handleSelect="handleSelect"
                    :editable="editable" :domainObject="domainObject">
    </ele-pop-select>
  </div>
</template>

<script type="text/ecmascript-6">
import { edit } from '../../../api/TransportService';
import elePopSelect from '../../components/ele-pop-select/elePopSelect.vue';

export default {
  name: 'elePop',
  props: {
    truckData: null,
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
    handleSelect(data) {
      const model = Object.assign({}, this.domainObject);
      delete model.actionMenuList;
      console.log('oldVersion', model, 'selected', data);
      model.trailerTruckCode = data.code;
      model.trailerTruckLicenseNo = data.truckLicenseNo;
      this.updateData(model.code, model);
    },
    removeTruck() {
      const model = Object.assign({}, this.domainObject);
      delete model.actionMenuList;
      model.trailerTruckCode = '';
      model.trailerTruckLicenseNo = '';
      this.updateData(model.code, model);
    },
    updateData(code, obj) {
      edit(code, obj, (success, error) => {
        if (success) {
          // TODO reload data
          window.location.reload();
        } else {
          console.log('update trailer error', error);
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
