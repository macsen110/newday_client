<template>
  <div class="custom-page">
    <div class="page-header clearfix">
      <h2 class="page-title fl">
        {{ isEdit ? ( editable ? '编辑' + objectName : objectName + '详情' ): ( '新建' + objectName) }}
      </h2>
      <div class="truck-location fl" v-if="isEdit && hasLocation">
        车辆定位：
        <span class="el-tag el-tag--primary">GPS</span>
        <span class="address">{{truckAddress}}</span>
        <a :href="truckGpsUrl" class="blue" target="_blank">点击查看&gt;&gt;</a>
      </div>
      <div class="hd-opr fr">
        <slot name="buttonEdit"></slot>
        <slot name="buttonCancel"></slot>
        <slot name="buttonSave"></slot>
        <!-- <slot name="buttonChangeLog"></slot> -->
      </div>
      <span id="pageRefresh" class="page-refresh fr"><i class="ico-refresh"></i>刷新
      </span>
    </div>
    <!-- 1 -->
    <div class="section">
      <h2 class="tmp-title">
        车辆信息
      </h2>
      <div class="el-row">
        <div class="el-col el-col-6">
          <slot name="truckLicenseNo"></slot>
        </div>
        <div class="el-col el-col-6" v-show='isEdit && !editable'>
          <slot name="certStatus"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="transportStatus"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="truckType"></slot>
        </div>
        <!-- <div class="el-col el-col-6">
          <slot name="truckOwnerType"></slot>
        </div> -->
        <div class="el-col el-col-6">
          <slot name="belongOrg"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="truckLicenseType"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="truckFixedMobile"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="truckModelCode"></slot>
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
          <slot name="cubage"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="powerType"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="transportLicenseNo"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="description"></slot>
        </div>
        <div class="el-col el-col-24">
          <slot name="truckTag"></slot>
        </div>
      </div>
    </div>
    <!-- 2 -->
    <div class="section">
      <h2 class="tmp-title">
        行驶证信息
      </h2>
      <div class="el-row">
        <div class="el-col el-col-6">
          <slot name="brandName"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="idCode"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="motorNo"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="totalWeight"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="curbWeight"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="approvedWeight"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="gabariteSize"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="truckRegistrationDate"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="truckOwner"></slot>
        </div>
      </div>
    </div>
    <!-- 3 -->
    <div class="section" v-if="isEdit">
      <h2 class="tmp-title">
        司机信息
      </h2>
      <slot name="driverInfo"></slot>
      <div class="el-row" v-show="isEdit && !editable">
        <div class="el-col el-col-6">
          <slot name="creatorUser"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="createTime"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="updateUser"></slot>
        </div>
        <div class="el-col el-col-6">
          <slot name="updateTime"></slot>
        </div>
      </div>
    </div>
    <div class="form-button" v-show='editable || !isEdit'>
      <slot name="buttonSubmit"></slot>
      <slot name="buttonReset"></slot>
    </div>
    <!-- tab panel -->
    <div class="tab-panel" v-if="isEdit">
      <slot name="moreRecords"></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unused-vars */
  /* eslint-disable indent */
  /* eslint-disable no-var */
  /* eslint-disable vars-on-top */
  import * as utils from '../../api/Utils';
  import * as TruckService from '../../api/TruckService';
  import * as LbsService from '../../api/LbsService';
  import LbsLib from '../LbsLib';

  export default {
    props: {
      isEdit: Boolean,
      editable: Boolean,
      objectName: '',
      truckLicenseNo: ''
    },
    data() {
      return {
        truckAddress: '',
        truckGpsUrl: '',
        hasLocation: false
      };
    },
    filters: {
      getTruckGpsUrl(truckNo) {
        var url = `/truck/truck-gps.html?truckLicenseNo=${truckNo}`;
        console.log(url);
        return url;
      }
    },
    created() {
      // console.log('123');
      const params = utils.getParamsFromURL(window.location.search);
      this.code = params.code;
      console.log(this.code);

      if (this.code) {
        TruckService.get({
          code: this.code
        }, (truckSuccess, err) => {
          const truckLicenseNo = truckSuccess.content.truckLicenseNo;
          console.log(this.truckGpsUrl);

          LbsService.getPosition({
              truckLicenseNo
            },
            (lbsSuccess, lbsErr) => {
              if (lbsSuccess.content.length > 0) {
                const item = lbsSuccess.content[0];
                LbsService.getAddress({
                  type: 0,
                  lat: item.lat,
                  lng: item.lng
                }, (addressSuccess, addressError) => {
                  this.truckAddress = addressSuccess.content.address || '';
                  this.truckGpsUrl = `/truck/truck-gps.html?truckLicenseNo=${truckLicenseNo}`;
                  this.hasLocation = true;
                });
              }
            });
        });
      }
    }
  };
// scaffold
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/base.scss";
  .section {
    .el-row {
      padding-bottom: 0 !important;
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
