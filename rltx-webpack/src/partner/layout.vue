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
  	<!-- 1 -->
    <div class="section">
        <!-- <h2 class="tmp-title">
      	    伙伴信息
        </h2> -->
	    <div class="el-row">
	    	<div class="el-col el-col-6">
	    		<slot name="orgFullName"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="orgName"></slot>
	    	</div>
				<div class="el-col el-col-6">
	    		<slot name="orgType"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="linkmanFullName"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="linkmanPhone"></slot>
	    	</div>
	    	<div class="el-col el-col-6" v-show="isEdit && !editable">
	    		<slot name="certStatus"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="orgArea"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="orgAddress"></slot>
	    	</div>
	    	<div class="el-col el-col-24 el-col-description">
	    		<slot name="description"></slot>
	    	</div>
				<div class="el-col el-col-24 sepline">
	    		<slot name="orgTag"></slot>
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
