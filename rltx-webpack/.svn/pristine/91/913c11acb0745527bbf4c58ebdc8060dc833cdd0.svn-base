/**
* detail.vue
* Created by dsky on 17/6/27.
*/
<template>
  <el-row :gutter="20">
  	<el-col :span="6" v-for="field in fields" :key="field.fieldConfigCode">
  	  <div class="field-row clearfix">
	      <span class="field-name">
	      	{{ field.showName }}
	      </span>
	      <div class="field-value">
	      	{{ field.format }}
	      </div>
  	  </div>
  	</el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">

  import { getDetail } from '../../api/PartnerService';

  export default {
    data() {
      return {
        fields: []
      };
    },
    beforeCreate() {
      const self = this;
      getDetail((success, error) => {
        if (success) {
          const partnerDetailData = success.data;
          partnerDetailData.forEach((value) => {
            self.fields.push(value);
          });
        }
        if (error) {
          console.error(error);
        }
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
	body {
		color: #333;
		padding: 0;
		margin: 0;
		font-size: 14px;
	}
	.clearfix {
		&::before, &::after {
			content: "";
			display: block;
			height: 0;
			overflow: hidden;
		}
		&::after {
			clear: both;
		}
	}
	%ellipsis {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	%section {
		padding: 10px;
		margin-bottom: 20px;
		border: solid 1px #ddd;
	}
	.el-row {
		@extend %section;
		margin-left: 0 !important;
		margin-right: 0 !important;
	}
	.field-row {
		padding: 5px 5px 5px 100px;
		.field-name {
			float: left;
			margin-left: -100px;
			width: 90px;
			text-align: right;
			color: #999;
			&::after {
				content: ":";
				display: inline-block;
			}
		}
		.field-value {
			@extend %ellipsis;
		}
	}
</style>
