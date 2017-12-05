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
      <span id="pageRefresh" class="page-refresh fr"><i class="ico-refresh"></i>刷新
      </span>
    </div>
    <div class="section">
      <h2 class="tmp-title">挂车信息</h2>
      <div class="el-row">
        <div class="el-col el-col-6">
          <slot name="truckLicenseNo"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="brandName"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="idCode"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="code"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="totalWeight"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="curbWeight"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="regTonnage"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="truckLength"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="truckWidth"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="truckHeight"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="truckRegistrationDate"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="truckOwner"></slot>
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
    <div class="form-button" v-show='editable || !isEdit'>
      <slot name="buttonSubmit"></slot>
      <slot name="buttonReset"></slot>
    </div>
    <div class="section"></div>
    <!-- tab panel -->
    <div class="tab-panel" v-if="isEdit">
      <slot name="moreRecords"></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    isEdit: Boolean,
    editable: Boolean,
    objectName: ''
  },
  data() {
    return {

    };
  },
  created() {

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
