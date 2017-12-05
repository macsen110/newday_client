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
	    <div class="el-row">
	    	<div class="el-col el-col-6">
	    		<slot name="logisticsNo"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="logisticsStatus"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="meterageType"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="goodsName"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="clientOrg"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="route"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="goodsWeight"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="goodsVolume"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="goodsNum"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="truckQty"></slot>
	    	</div>
	    	<div class="el-col el-col-6 sepline">
	    		<slot name="clientContract"></slot>
	    	</div>
	    	<div class="el-col el-col-6 sepline">
	    		<slot name="settlingMethod"></slot>
	    	</div>
	    	<div class="el-col el-col-6 sepline">
	    		<slot name="carrierOrgName"></slot>
	    	</div>
	    	<div class="el-col el-col-6 sepline">
	    		<slot name="description"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="loadingOrg"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="loadingArea"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="loadingAddress"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="loadingUserFullName"></slot>
	    	</div>
	    	<div class="el-col el-col-18">
	    		<slot name="loadingUserPhone"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="unloadingOrg"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="unloadingArea"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="unloadingAddress"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="unloadingUserFullName"></slot>
	    	</div>
	    	<div class="el-col el-col-18">
	    		<slot name="unloadingUserPhone"></slot>
	    	</div>
	    </div>
      <div>
        <slot name="logisticsPrice"></slot>
      </div>
    </div>
    <el-tabs type="border-card" v-if="isEdit">
      <el-tab-pane label="运单记录">
        <slot name="tabWaybill"></slot>
      </el-tab-pane>
      <el-tab-pane label="调价记录">
        <slot name="tabPriceChangeLog"></slot>
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
.el-col-12.sepline {
	height: 31px !important;
}
.form-page {
	.el-select {
		vertical-align: top !important;
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
