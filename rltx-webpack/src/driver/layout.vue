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
      <!-- <h2 class="tmp-title">司机详情</h2> -->
      <div class="el-row">
        <div class="el-col el-col-24 el-col-auto">
          <slot name="pictureResourceCode"></slot>
        </div>
      </div>
      <div class="el-row">
        <div class='el-col el-col-6'>
          <slot name="fullName"></slot>
        </div>
        <div class='el-col el-col-6' v-show="isEdit && !editable">
          <slot name="driverCertStatus"></slot>
        </div>
        <div class='el-col el-col-6' v-show="isEdit && !editable">
          <slot name="userStatus"></slot>
        </div>
        <div class='el-col el-col-6' v-show="isEdit && !editable">
          <slot name="usingStatus"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="phone"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="userTag"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="gender"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="driverLicense"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="identityNumber"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="politicalStatus"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="maritalStatus"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="nativePlace"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="registedResidence"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="identityCardAddress"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="currentResidence"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="emergencyContactPerson"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="emergencyContactPhone"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="education"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="major"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="startDateOfFirstJob"></slot>
        </div>
        <div class='el-col el-col-6'>
          <slot name="employmentDate"></slot>
        </div>
        <div class='el-col el-col-24 el-col-description sepline'>
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
  .el-col-6 {
    .el-form-item__content {
      white-space: nowrap;
      overflow: hidden;
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
  .el-tab-pane {
    .page-title, #pageRefresh, .hd-opr .innerblock, .hd-opr .el-button--default, .opr-button {
      display: none;
    }
    .list-page .page-header {
      padding: 0;
      border-bottom: 0;
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
</style>
