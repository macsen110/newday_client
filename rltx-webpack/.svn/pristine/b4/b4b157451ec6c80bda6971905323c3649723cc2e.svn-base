<template>
  <el-upload
    :action="action"
    :name="name"
    :data="data"
    :multiple="multiple"
    :accept="accept"
    :list-type="listType"
    :with-credentials="withCredentials"
    :headers="headers"
    :file-list="fileList"
    :on-success="_onSuccess"
    :on-error="_onError"
    :on-start="onStart"
    :on-progress="onProgress"
    :before-upload="_beforeUpload"
    :disabled="disabled"
    :on-remove="_onRemove">
    <i class="el-icon-plus"></i>
  </el-upload>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'eleFileUpload',
    props: {
      domainObject: Object,
      type: String,
      action: {
        type: String,
        required: true
      },
      name: {
        type: String,
        'default': 'file'
      },
      data: Object,
      headers: Object,
      withCredentials: Boolean,
      multiple: Boolean,
      accept: String,
      onStart: Function,
      onProgress: Function,
      onSuccess: Function,
      onError: Function,
      beforeUpload: Function,
      onRemove: Function,
      fileList: Array,
      listType: String,
      disabled: Boolean
    },
    methods: {
      _beforeUpload() {
        this.beforeUpload(this.domainObject);
      },
      _onError() {
        this.onError(this.domainObject);
      },
      _onSuccess(res, file, fileList) {
        this.onSuccess(res, file, fileList, this.domainObject);
      },
      _onRemove(file, fileList) {
        this.onRemove(file, fileList, this.domainObject);
      },
      _onPreview() {
        if (this.onPreview) {
          this.onPreview();
        }
      }
    }
  };
</script>
