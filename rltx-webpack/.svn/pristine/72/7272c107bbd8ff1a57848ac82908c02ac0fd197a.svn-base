<template>
  <div class="custom-page form-page">
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
  	<!-- 1 -->
    <div class="section">
        <!-- <h2 class="tmp-title">
      	    保险信息
        </h2> -->
	    <div class="el-row">
	    	<div class="el-col el-col-6">
	    		<slot name="truckLicenseNo"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="insuranceType"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="insuranceCompany"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="insuranceDate"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="expireDate"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="remindDate"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="insuranceAmount"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="insuranceNo"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="lockNo"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="travelTaxAmount"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="premiumAmount"></slot>
	    	</div>
	    	<div class="el-col el-col-6 el-col-auto">
	    		<slot name="attachmentResourceCode1"></slot>
	    	</div>
	    	<div class="el-col el-col-6 el-col-auto">
	    		<slot name="attachmentResourceCode2"></slot>
	    	</div>
	    	<div class="el-col el-col-6 el-col-auto">
	    		<slot name="attachmentResourceCode3"></slot>
	    	</div>
	    	<div class="el-col el-col-24 el-col-description">
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
    <el-tabs type="border-card" v-if="isEdit">
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
.complex-control-2 {
	.el-input {
		width: 150px;
	}
}
.el-col-12:nth-child(6n), .el-col-12:nth-child(6n-1) {
  margin-bottom: 0 !important;
  border-bottom: 0 !important;
}

</style>
