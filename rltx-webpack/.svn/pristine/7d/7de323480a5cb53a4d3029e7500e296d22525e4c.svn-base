<template>
  <div class="custom-page">
  	<div class="page-header clearfix">
      <h2 class="page-title fl">
        {{ isEdit ? ( editable ? '编辑' + objectName : objectName + '信息' ): ( '新建' + objectName) }}
      </h2>
      <div class="hd-opr fr">
      	<slot name="buttonEdit"></slot>
        <slot name="buttonCancel"></slot>
        <slot name="buttonSave"></slot>
      </div>
      <span id="pageRefresh" class="page-refresh fr"><i class="ico-refresh"></i>刷新</span>
    </div>
  	<!-- 1 -->
    <div class="section">
        <!-- <h2 class="tmp-title">
      	    公司信息
        </h2> -->
	    <div class="el-row">
	    	<div class="el-col el-col-6">
	    		<slot name="orgFullName"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="certStatus"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="creditCode"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="transportCertificate"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="senderCode"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="area"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="address"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="linkmanPhone"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="yearBusinessMoney"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="mainBusiness"></slot>
	    	</div>
	    </div>
    </div>
    <!-- tabs -->
    <el-tabs type="border-card" v-if="isEdit">
      <el-tab-pane label="账户信息">
        <slot name="tabBankAccount"></slot>
      </el-tab-pane>
      <el-tab-pane label="附件">
        附件
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
.form-page .el-row .el-col-12:nth-child(6n), .form-page .el-row .el-col-12:nth-child(6n-1) {
	margin-bottom: 0 !important;
	border-bottom: 0 !important;
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
	.form-page .el-select {
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
