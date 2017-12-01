<template>
  <div class="custom-page">
    <!-- 1 -->
    <div class="section">
      <h2 class="tmp-title">
        运单结算信息
      </h2>
      <div class="el-row">
        <div class="el-col el-col-6">
          <slot name="loadingGoodsWeight"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="loadingGoodsVolume"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="loadingGoodsNum"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="loadingTime"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="unloadingGoodsWeight"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="unloadingGoodsVolume"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="unloadingGoodsNum"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="unloadingTime"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="settlingMethod"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="settleVolume"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="actualGoodsLoss"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="settleGoodsLossReasonable"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="settleGoodsLossVolume"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="settleLossDeduction"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="settleDriverFreight"></slot>
        </div>
        <div class="el-col el-col-6 el-col-adjust">
          <slot name="settleTotalPayment"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="settleAdjustAmount"></slot>
        </div>
        <div class="el-col el-col-24">
          <slot name="settleDriverPayment"></slot>
        </div>
        <div class="el-col el-col-24">
          <slot name="settleResult"></slot>
        </div>
        <div class="el-col el-col-24 el-col-description">
          <slot name="settleReason"></slot>
        </div>
      </div>
    </div>
    <div class="form-button">
      <slot name="buttonSubmit"></slot>
    </div>
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
  .el-textarea__inner {
    min-width: auto !important;
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
  .el-col-adjust {
    .el-form-item__label {
      width: 140px !important;
    }
    .el-form-item__content {
      margin-left: 140px !important;
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
