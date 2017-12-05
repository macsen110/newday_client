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
      	    轮胎信息
        </h2> -->
	    <div class="el-row">
	    	<div class="el-col el-col-12">
	    		<slot name="truckLicenseNo"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="tyreNo"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="tyreBrand"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="purchasePrice"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="onDate"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="onMileage"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="changeTyreNo"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="status"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="offDate"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="offMileage"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="tyreSalvage"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="totalMileage"></slot>
	    	</div>
	    	<div class="el-col el-col-24 el-col-description">
	    		<slot name="description"></slot>
	    	</div>
	    	<div class="el-col el-col-12" v-show="isEdit && !editable">
	    		<slot name="creatorUser"></slot>
	    	</div>
	    	<div class="el-col el-col-12" v-show="isEdit && !editable">
	    		<slot name="createTime"></slot>
	    	</div>
	    	<div class="el-col el-col-12" v-show="isEdit && !editable">
	    		<slot name="updateUser"></slot>
	    	</div>
	    	<div class="el-col el-col-12" v-show="isEdit && !editable">
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
  width: 130px !important;
}
.el-form-item__content {
  margin-left: 130px !important;
  .el-form-item__content {
    margin-left: 0 !important;
  }
}
.el-col-12:nth-child(6n), .el-col-12:nth-child(6n-1) {
  margin-bottom: 0 !important;
  border-bottom: 0 !important;
}

</style>
