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
      	    车辆绑定信息
        </h2> -->
	    <div class="el-row">
	    	<div class="el-col el-col-6">
	    		<slot name="deviceName"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="deviceNo"></slot>
	    	</div>
	    	<div class="el-col el-col-12">
	    		<slot name="truckLicenseNo"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="simCardNo"></slot>
	    	</div>
	    	<div class="el-col el-col-6">
	    		<slot name="expiryDate"></slot>
	    	</div>
	    	<!-- <div class="el-col el-col-6" v-show="isEdit && !editable">
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
	    	</div> -->
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
</style>
