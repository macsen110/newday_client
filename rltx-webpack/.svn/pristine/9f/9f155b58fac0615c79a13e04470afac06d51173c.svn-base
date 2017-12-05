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
      	    货源信息
        </h2> -->
	    <div class="el-row">
	    	<div class="el-col el-col-6">
	    		<slot name="freightNo"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="status"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="meterageType"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="releaseRange"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="loadingArea"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="loadingAddress"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="unloadingArea"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="unloadingAddress"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="goodsName"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="goodsWeight"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="goodsVolume"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="goodsAmount"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="quoteType"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="truckModelRequire"></slot>
	    	</div>
	    	<div class="el-col el-col-24 el-col-auto">
	    		<slot name="truckLengthRequire"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="contactUserFullName"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="contactPhone"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="freightEndTime"></slot>
	    	</div>
	    	<div class="el-col el-col-24 el-col-description">
	    		<slot name="description"></slot>
	    	</div>
	    	<div class="el-col el-col-6" v-show="isEdit && !editable">
	    		<slot name="publishUserFullName"></slot>
	    	</div>
	    	<div class="el-col el-col-6" v-show="isEdit && !editable">
	    		<slot name="publishTime"></slot>
	    	</div>
	    </div>
    </div>
    <!-- tabs -->
    <el-tabs type="border-card" v-if="isEdit">
      <el-tab-pane label="接单记录" id="tabAcceptRecord">
        <slot name="tabAcceptRecord"></slot>
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

.el-col-length {
	height: 79px !important;
}
.el-col-12:nth-child(6n), .el-col-12:nth-child(6n-1) {
	margin-bottom: 0 !important;
	border-bottom: 0 !important;
}
.el-tab-pane {
	.advance-search {
		display: none;
	}
	.list-wrap {
		.page-header {
			display: none;
		}
		#advanceSearch {
			display: none;
		}
		.fix-table-wrap {
			height: auto !important;
		}
	}
}
.el-col-24 .el-checkbox-group {
	width: 520px;
	.el-checkbox {
		width: 76px;
		margin-right: 10px;
	}
	.el-checkbox+.el-checkbox {
		margin-left: 0;
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
