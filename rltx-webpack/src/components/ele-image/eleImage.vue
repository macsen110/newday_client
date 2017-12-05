/**
* eleImage.vue
* Created by dsky on 17/6/23.
*/
<template>
  <div class="block">
    <el-form-item :prop="this.configData.field" :rules="rules" v-if="!isList && editable">
      <el-upload v-if="editable" class="avatar-uploader" :id="id" :action="actionUrl" :data="param" list-type="picture-card" with-credentials :on-remove="handleRemove" :on-success="handleAvatarSuccess" :on-error="handleAvatarError" :on-preview="handlePictureCardPreview" :before-upload="beforeAvatarUpload" :file-list="fileList">
        <i class="el-icon-plus avatar-uploader-icon" v-if="editable"></i>
      </el-upload>
      <el-dialog v-model="dialogVisible" v-if="editable" custom-class="el-dialog_img">
        <img width="100%" :src="imageUrl" alt="">
      </el-dialog>
    </el-form-item>
    <!-- <img class="tableImg" v-if="editable === false && imageUrl" :src="imageUrl" alt=""> -->
    <el-button type="text" @click="showImgDialog" v-if="isList">{{ len }}</el-button>
    <el-dialog v-model="dialogImgVisible" v-if="isList" custom-class="el-dialog_img">
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
    <img class="tableImg" v-if="!isList && !editable && imageUrl" :src="imageUrl" alt="">
  </div>
</template>

<script type="text/ecmascript-6">
import { getParamsFromURL } from '../../../api/Utils';

const axios = require('axios');

axios.defaults.withCredentials = true;
export default {
  props: {
    configData: Object,
    editable: {
      type: Boolean,
      'default': true
    },
    isList: {
      type: Boolean,
      'default': false
    },
    domainObject: Object,
    uploadUrl: String,
    rules: Array
  },
  data() {
    return {
      fileList: [],
      imageUrl: '',
      param: {
        type: 'waybillWeb',
        permission: false
      },
      dialogVisible: false,
      dialogImgVisible: false,
      actionUrl: `${this.uploadUrl}/fw/image/update`,
      getImgUrl: `${this.uploadUrl}/fw/image/${this.domainObject[this.configData.field]}/get`,
      id: `avatar${this.configData.field}`,
      imgMax: 1,
      len: 0
    };
  },
  watch: {
    'editable': function (val) {
      if (val === true) {
        this.$nextTick(() => {
          this.showImgEdit();
        });
      }
    },
    isList() {
      console.log('isList: ', this.isList);
    }
  },
  computed: {
  },
  methods: {
    form() {
      let parent = this.$parent;
      if (parent) {
        while (parent && parent.$options && parent.$options.componentName !== 'eleForm') {
          parent = parent.$parent;
        }
        return parent;
      }
      return null;
    },
    init() {

    },
    showImgDialog() {
      if (this.len) {
        this.dialogImgVisible = true;
      }
    },
    handleAvatarSuccess(res, file) {
      this.id = `avatar${res.content.resourceCode}`;
      this.domainObject[this.configData.field] = res.content.resourceCode;
      this.imageUrl = URL.createObjectURL(file.raw);
      this.fileList = [];
      this.fileList.push({
        url: URL.createObjectURL(file.raw)
      });
      // 上传头像之后更新图片的id
      this.$nextTick(() => {
        const $el = document.querySelector(`#${this.id}`),
          uploadItem = $el.querySelector('.el-upload.el-upload--picture-card');
        uploadItem.classList.add('hide');
      });
    },
    handleAvatarError() {
      const $el = document.querySelector(`#${this.id}`),
        uploadItem = $el.querySelector('.el-upload.el-upload--picture-card');
      uploadItem.classList.remove('hide');
    },
    beforeAvatarUpload(file) {
      const isType = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png',
        isLt3M = file.size / 1024 / 1024 < 3,
        $el = document.querySelector(`#${this.id}`),
        uploadItem = $el.querySelector('.el-upload.el-upload--picture-card');
      if (!isType) {
        this.$message.error('上传头像图片仅限JPG、GIF、PNG格式!');
        return false;
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!');
        return false;
      }
      uploadItem.classList.add('hide');
      return isType && isLt3M;
    },
    handleRemove() {
      this.domainObject[this.configData.field] = null;
      this.imageUrl = '';
      const $el = document.querySelector(`#${this.id}`),
        uploadItem = $el.querySelector('.el-upload.el-upload--picture-card');
      uploadItem.classList.remove('hide');
    },
    handlePictureCardPreview(file) {
      this.imageUrl = file.url;
      this.dialogVisible = true;
    },
    showImgEdit() {
      if (this.id === `avatar${this.configData.field}` || this.editable === false) {
        return false;
      }
      this.$nextTick(() => {
        const $el = document.querySelector(`#${this.id}`).querySelector('.el-upload--picture-card');
        $el.classList.add('hide');
      });
    }
  },
  beforeCreate() {
  },
  mounted() {
    const params = getParamsFromURL(window.location.search),
      form = this.form();
    if (form) {
      form.$emit('eleMounted', this);
    }
    if (params.code && this.domainObject[this.configData.field]) {
      axios.get(this.getImgUrl, {
        params: {
        }
      })
        .then((res) => {
          this.id = `avatar${this.domainObject[this.configData.field]}`;
          this.imageUrl = res.data.content.thumbnailList[0].url;
          this.fileList.push({
            url: res.data.content.thumbnailList[0].url
          });
          this.showImgEdit();
        });
    }
    if (this.editable === false && this.domainObject[this.configData.field]) {
      axios.get(this.getImgUrl, {
        params: {
        }
      })
        .then((res) => {
          this.imageUrl = res.data.content.thumbnailList[0].url;
          if (this.imageUrl) {
            this.len = 1;
          }
        });
    }
    // document.dispatchEvent(event);
  },
  created() {
    const form = this.form();
    if (form) {
      form.$emit('eleCreated', this);
    }
    // console.log('isList: ', this.isList);
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}

.avatar {
  width: 148px;
  height: 148px;
  display: block;
}

.tableImg {
  width: 40px;
  height: auto;
}

.el-dialog.el-dialog_img {
  width: auto;
  max-width: 86%;
  max-height: 86%;
  top: 8% !important;
}

.el-dialog_img .el-dialog__header {
  border-bottom: none;
}

.el-dialog.el-dialog_img img {
  max-height: 500px;
  max-width: 900px;
  width: auto;
  height: auto;
}
</style>
