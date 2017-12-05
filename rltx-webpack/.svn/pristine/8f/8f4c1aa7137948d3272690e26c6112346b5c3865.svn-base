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
        <!--<slot name="buttonChangeLog"></slot>-->
      </div>
      <span id="pageRefresh" class="page-refresh fr"><i class="ico-refresh"></i>刷新</span>
    </div>
    <!-- 1 -->
    <div class="section">

      <div class="el-row basic-info">
        <div class="el-col el-col-6">
          <slot name="clientOrgName"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="settlingMethod"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="amount"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="operateTime"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="description"></slot>
        </div>

      </div>
    </div>

    <div class="form-button" v-show='editable || !isEdit'>
      <slot name="buttonSubmit"></slot>
      <slot name="buttonReset"></slot>
    </div>
    <el-tabs type="border-card" v-if="isEdit">

      <el-tab-pane label="变更记录">
        <slot name="tabChangeLog"></slot>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      isEdit: Boolean,
      editable: Boolean,
      addMode: Boolean,
      objectName: ''
    },
    mounted() {
      console.log('layout mounted', this.$slots);
    },
    created() {
      // console.log('123');
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
  .el-col {
    height: 34px;
  }
  .block {
    .innerblock {
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .sepline {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: solid 1px #ddd;
  }
  .form-page {
    .el-select {
      vertical-align: top !important;
    }
  }
  .el-col-12:nth-child(6n), .el-col-12:nth-child(6n-1) {
    margin-bottom: 0 !important;
    border-bottom: 0 !important;
  }
  .bank-account .el-input {
    width: 320px;
  }
  .other-info .el-col-24 {
    height: auto;
    .el-textarea__inner {
      min-width: 1002px;
      height: 72px;
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
    .form-page .innerblock {
      margin-right: 3px !important;
    }
    .form-page .innerblock .el-date-editor {
      width: 165px !important;
    }
  }
</style>
