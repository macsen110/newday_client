<template>
  <div class="custom-page">
    <div class="page-header clearfix">
      <h2 class="page-title fl">
        {{ isEdit ? ( editable ? '编辑' + objectName : objectName + '详情' ): ( '新建' + objectName) }}
      </h2>
      <div class="hd-opr fr">
        <slot name="buttonEdit"></slot>
        <slot name="buttonCancel"></slot>
        <slot name="buttonSave"></slot>
        <!-- <slot name="buttonChangeLog"></slot> -->
      </div>
    </div>
    <div class="section">
      <!-- <h2 class="tmp-title">
          线路信息
      </h2> -->
      <div class="el-row">
        <div class="el-col el-col-6">
          <slot name="routeName"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="clientOrg"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="loadingOrg"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="loadingLinkmanFullName"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="loadingContact"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="loadingArea"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="loadingAddress"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="unloadingOrg"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="unloadingLinkmanFullName"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="unloadingContact"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="unloadingProvinceCode"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="unloadingAddress"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="standardDistance"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="standardTime"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="description"></slot>
        </div>
        <div class="el-col el-col-6" v-show="isEdit && !editable">
          <slot name="creatorUser"></slot>
        </div>
        <div class="el-col el-col-6" v-show="isEdit && !editable">
          <slot name="createTime"></slot>
        </div>
        <div class="el-col el-col-6" v-show="isEdit && !editable">
          <slot name="updateUser"></slot>
        </div>
        <div class="el-col el-col-6" v-show="isEdit && !editable">
          <slot name="updateTime"></slot>
        </div>
      </div>
    </div>
    <!-- tabs -->
    <el-tabs type="border-card" slot="moreRecords" v-if="isEdit">
      <el-tab-pane label="变更记录">
        <slot name="tabChangeLog"></slot>
      </el-tab-pane>
    </el-tabs>
    <div class="form-button" v-show='editable || !isEdit'>
      <slot name="buttonSubmit"></slot>
      <slot name="buttonReset"></slot>
    </div>
  </div>
</template>

<script>
import * as utils from '../../api/Utils';

export default {
  props: {
    isEdit: Boolean,
    editable: Boolean,
    objectName: '',
    fields: {
      type: Array,
      'default': []
    }
  },
  created() {
    const params = utils.getParamsFromURL(window.location.search);
    this.code = params.code;
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../assets/sass/base.scss";
.form-page {
  .innerblock {
    margin-right: 6px !important;
  }
}
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
.form-page .el-row .el-col-12:nth-child(6n), .form-page .el-row .el-col-12:nth-child(6n-1) {
  margin-bottom: 0 !important;
  border-bottom: 0 !important;
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
</style>
