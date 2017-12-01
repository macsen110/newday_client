<template>
  <div class="user-avatar fr" id="avatar">
  </div>
  <ul class="text-list">
	  <li>
	    <span class="name">用户ID：</span>
	    <div class="value">
		    {{ code }}
	    </div>
	  </li>
	  <li>
	    <span class="name">用户名：</span>
	    <div class="value">
		    {{ fullName }}
	    </div>
	  </li>
	  <li>
	    <span class="name">手机号码：</span>
	    <div class="value">
	      {{ phone }}
	    </div>
	  </li>
  </ul>
  <p class="msgnoti">
    注：如需修改密码或验证手机号码，请到
    <a href="javascript:;" data-link="/safe/safe.html" data-title="安全设置">安全设置</a>
  </p>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-box {
    display: inline;
    float: right;
    margin-right: 50px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
  .el-button {
    width: 100%;
    display: inline-block;
    line-height: 10px;
  }
</style>

<script>
  import * as apiConst from '../../../api/ApiConst';
  import info from './info.vue';

  const Axios = require('axios');

  Axios.defaults.withCredentials = true;

  export default {
    data() {
      return {
        imageUrl: '',
        actionUrl: `${apiConst.apiPersonDomain}/fw/image/update`,
        actionParams: {
          type: 'headWeb',
          premission: false
        },
        editParams: obj
      };
    },
    beforeCreate() {
      // Axios.get(`${apiConst.apiPersonDomain}/person/self/info`).then((res) => {
        // this.editParams.resourceCode = res.content.resourceCode;
      // });
    },
    methods: {
      handleAvatarSuccess(res, file) {
//        console.log(this.editParams);
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg',
          isLt4M = file.size / 1024 / 1024 < 4;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt4M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt4M;
      },
      editInfo() {
//        console.log(this.editParams);
        Axios.post(`${apiConst.apiPersonDomain}/person/self/edit`, this.editParams)
          .then((res) => {
//            console.log(res);
          });
      }
    }
  };
</script>
