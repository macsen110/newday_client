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
      <h2 class="tmp-title">
        基本信息
      </h2>
      <div class="el-row basic-info">
        <div class="el-col el-col-6">
          <slot name="waybillNo"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="waybillStatus"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="settleStatus"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="meterageType"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="clientOrg"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="route"></slot>
        </div>
        <div class="el-col el-col-12 sepline">
          <slot name="logisticsCode"></slot>
        </div>
        <div class="el-col el-col-6 sepline">
          <slot name="goodsName"></slot>
        </div>
        <div class="el-col el-col-6 sepline">
          <slot name="reportStatus"></slot>
        </div>
        <!-- 运价 -->
        <div class="el-col el-col-6" v-show="editable">
          <slot name="ratesCode"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="clientFreightPrice"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="driverPrice"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="goodsPrice"></slot>
        </div>
        <div class="el-col el-col-12 sepline">
          <slot name="freightLoss"></slot>
        </div>
        <div class="el-col el-col-12 sepline">
          <slot name="settlingMethod"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="loadingOrgName"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="loadingArea"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="loadingAddr"></slot>
        </div>
        <div class="el-col el-col-6 sepline">
          <slot name="loadingUserFullName"></slot>
        </div>
        <div class="el-col el-col-18 sepline">
          <slot name="loadingUserPhone"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="unloadingOrgName"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="unloadingArea"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="unloadingAddr"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="unloadingUserFullName"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="unloadingUserPhone"></slot>
        </div>
      </div>
    </div>
    <div class="section">
      <h2 class="tmp-title">车辆司机</h2>
      <div class="el-row">
        <div class="el-col el-col-6">
          <slot name="truckLicenseNo"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="truckPowerType"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="trailerTruckLicenseNo"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="carrierOrgName"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="driverFullName"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="driverPhone"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="viceDriverName"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="viceDriverPhone"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="driverLicenseNo"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="viceDriverLicenseNo"></slot>
        </div>
      </div>
    </div>
    <div>
      <h2 class="tmp-title">银行账号</h2>
      <div class="el-row bank-account">
        <div class="el-col el-col-12">
          <slot name="driverPayeeBankName"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="driverPayeeBankAccountName"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="driverPayeeBankAccountNo"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="viceDriverPayeeBankName"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="viceDriverPayeeBankAccountName"></slot>
        </div>
        <div class="el-col el-col-12">
          <slot name="viceDriverPayeeBankAccountNo"></slot>
        </div>
      </div>
    </div>
    <div>
      <h2 class="tmp-title">装卸信息</h2>
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
      </div>
    </div>
    <div>
      <h2 class="tmp-title">其它信息</h2>
      <div class="el-row other-info">
        <div class="el-col el-col-6">
          <slot name="departDate"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="departMileage"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="returnDate"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="returnMileage"></slot>
        </div>
        <div class="el-col el-col-24 el-col-description">
          <slot name="description"></slot>
        </div>
      </div>
    </div>
    <div v-if="isEdit">
      <h2 class="tmp-title">费用信息</h2>
      <slot name="slotChargeList"></slot>
    </div>
    <el-tabs type="border-card" v-if="isEdit">
      <el-tab-pane label="凭证记录">
        <slot name="tabVoucherList"></slot>
      </el-tab-pane>
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
  .el-tabs {
    margin-top: 20px;
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
