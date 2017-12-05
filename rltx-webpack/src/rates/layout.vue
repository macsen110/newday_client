<template>
  <div class="custom-page">
    <div class="page-header clearfix">
      <h2 class="page-title fl">
        {{ isEdit ? ( editable ? '编辑' + objectName : objectName + '详情' ): ( '新建' + objectName) }}
      </h2>
      <div class="hd-opr fr">
        <!-- <slot name="buttonEdit"></slot>
        <slot name="buttonCancel"></slot>
        <slot name="buttonSave"></slot> -->
        <!-- <slot name="buttonChangeLog"></slot> -->
      </div>
      <span id="pageRefresh" class="page-refresh fr"><i class="ico-refresh"></i>刷新
      </span>
    </div>
    <div class="section">
      <!-- <h2 class="tmp-title"></h2> -->
      <div class="el-row">
        <div class="el-col el-col-6">
          <slot name="partnerName"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="logisticsCode"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="meterageType"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="clientFreightPrice"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="driverReferencePrice"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="goodsUnitPrice"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="goodsLossMethod"></slot>
        </div>
        <div class="el-col el-col-6">
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
    <!-- <div class="form-button" v-show='editable || !isEdit'>
      <slot name="buttonSubmit"></slot>
      <slot name="buttonReset"></slot>
    </div> -->
  </div>
</template>

<script>
import * as utils from '../../api/Utils';

export default {
  props: {
    isEdit: Boolean,
    editable: Boolean,
    objectName: ''
  },
  created() {
    const params = utils.getParamsFromURL(window.location.search);
    this.code = params.code;
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../assets/sass/base.scss";
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
