<template>
  <div class="section clearfix">
    <div class="page-header clearfix">
      <span class="fr">
        <el-button type="primary" @click="addVoucher">添加凭证</el-button>
      </span>
    </div>
    <el-table
      :data="voucherItemList"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="65"
        align="center">
        <template scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="primary" @click="editVoucher(scope.$index, scope.row)" v-show="!scope.row.editable">编辑</el-button>
          <el-button type="primary" @click="removeVoucher(scope.$index, scope.row)" v-show="!scope.row.editable">删除</el-button>
          <el-button @click="saveVoucher(scope.$index, scope.row)" v-show="scope.row.editable">保存</el-button>
          <el-button @click="cancelEditVoucher(scope.$index, scope.row)" v-show="scope.row.editable">取消</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ReportTime" label="凭证图片" align="center" width="168">
        <template scope="scope">
          <div class="imgUpload" v-if="scope.row.editable">
            <ele-file-upload
              :domainObject="scope.row"
              :action="actionUrl"
              list-type="picture-card"
              with-credentials
              :file-list="scope.row.attachments"
              :before-upload="handleUploadStart"
              :on-error="handleUploadError"
              :on-success="handleAvatarSuccess"
              :on-remove="handleRemove">
            </ele-file-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <div class="imgShow" v-show="!scope.row.editable">
            <img width="100%" :src="img.url" alt="" v-for="img in scope.row.attachments">
          </div>
        </template>
      </el-table-column>

      <el-table-column label="凭证类型" align="center">
        <template scope="scope">
          <div class="block" v-show="scope.row.editable">
            <el-select v-model="scope.row.voucherType">
              <el-option
                v-for="optKey in Object.keys(voucherTypeOptions)"
                :key="optKey"
                :label="voucherTypeOptions[optKey]"
                :value="optKey">
              </el-option>
              <!--<el-option v-for="optKey in Object.keys(voucherTypeOptions)" :value="optKey">voucherTypeOptions[optKey]</el-option>-->
            </el-select>
            <!--<el-input v-model="scope.row.voucherType" placeholder="凭证类型" v-show="scope.row.editable"></el-input>-->
          </div>
          <span v-show="!scope.row.editable">{{ scope.row.voucherType ? voucherTypeOptions[scope.row.voucherType] : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="凭证备注" align="center">
        <template scope="scope">
          <div class="block" v-show="scope.row.editable">
            <el-input v-model="scope.row.uploadAttachmentDesc" placeholder="凭证备注" v-show="scope.row.editable"></el-input>
          </div>
          <span v-show="!scope.row.editable">{{ scope.row.uploadAttachmentDesc ? scope.row.uploadAttachmentDesc : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="executeOrgName" label="上传公司" width="180" align="center"></el-table-column>
      <el-table-column prop="executeUserFullName" label="上传人" align="center"></el-table-column>
      <el-table-column prop="uploadAttachmentExecuteTime" label="上传时间" align="center"></el-table-column>
    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
  import { executeAction, getActionRecordWithParams, deleteActionRecord, getImgUrl } from '../../api/waybillService';
  import eleFileUpload from '../components/ele-file-upload/eleFileUpload.vue';

  export default {
    name: 'chargeList',
    components: {
      'ele-file-upload': eleFileUpload
    },
    props: {
      domainObject: Object,
      waybillCode: {
        type: String,
        'default': ''
      },
      actionCode: {
        type: String,
        'default': 'uploadAttachment'
      },
      uploadUrl: String
    },
    data() {
      return {
        voucherItemList: [],
        isEdit: false,
        actionUrl: `${this.uploadUrl}/fw/image/update`,
        dialogImageUrl: '',
        dialogVisible: false,
        dialogVisibleImg: false,
        uploadCounter: 0,
        showImageUrl: '',
        voucherTypeOptions: {
          'loading': '装货凭证',
          'unloading': '卸货凭证',
          'uploadAttachment': '其它凭证'
        }
      };
    },
    methods: {
      buildVoucherItem() {
        return {
          editable: false,
          attachments: [],
          voucherType: '',
          voucherDesc: '',
          executeOrgName: '',
          executeUserFullName: '',
          createTime: '',
          uploadCounter: 0,
          oldVersion: null
        };
      },
      toVoucherItem(voucherModel) {
        const voucherItem = this.buildVoucherItem();
        voucherItem.editable = false;
        Object.keys(voucherModel).forEach((key) => {
          if (key !== 'uploadAttachment' && key !== 'actionGroup') {
            voucherItem[key] = voucherModel[key];
          }
        });
        voucherItem.voucherType = voucherModel.actionGroup;
        if (voucherModel.uploadAttachment) {
          voucherModel.uploadAttachment.split(':').forEach((resourceCode) => {
            getImgUrl(resourceCode, (response) => {
              if (response) {
                voucherItem.attachments.push({ 'url': response.content.thumbnailList[0].url, 'resourceCode': resourceCode });
              }
            });
          });
        }
        return voucherItem;
      },
      toVoucherModel(voucherItem) {
        const voucherModel = {};
        Object.keys(voucherItem).forEach((key) => {
          if (key !== 'editable' && key !== 'attachments'
            && key !== 'oldVersion' && key !== 'uploadCounter'
            && key !== 'voucherType') {
            voucherModel[key] = voucherItem[key];
          }
        });
        voucherModel.actionGroup = voucherItem.voucherType;
        voucherModel.uploadAttachmentType = voucherItem.voucherType;
        if (voucherItem.attachments && voucherItem.attachments.length > 0) {
          const certificateAttachment = [];
          voucherItem.attachments.forEach((attachment) => {
            certificateAttachment.push(attachment.resourceCode);
          });
          voucherModel.uploadAttachment = certificateAttachment.join(':');
        } else {
          voucherModel.uploadAttachment = '';
        }
        return voucherModel;
      },
      copyVoucherItem(voucher) {
        return Object.assign({}, voucher);
      },
      addVoucher() {
        const voucher = this.buildVoucherItem();
        voucher.editable = true;
        this.voucherItemList.push(voucher);
      },
      editVoucher(index, voucher) {
        const oldVersion = this.copyVoucherItem(voucher);
        voucher.oldVersion = oldVersion;
        voucher.editable = true;
      },
      saveVoucher(index, voucher) {
        const voucherModel = this.toVoucherModel(voucher);
        executeAction(this.waybillCode, this.actionCode, voucherModel, null, (success, error) => {
          if (error) {
            this.$message({
              type: 'error',
              showClose: true,
              message: `保存失败：${error}`,
              duration: 5000
            });
          }
          if (success) {
//            this.voucherItemList[index] = this.toVoucherItem(success.content);
//            this.voucherItemList.splice(this.voucherItemList.length);
//            this.initData();
            const newVoucherModel = success.content[0];
            this.$set(this.voucherItemList, index, this.toVoucherItem(newVoucherModel));
          }
        });
      },
      cancelEditVoucher(index, voucher) {
        const oldVersion = voucher.oldVersion;
        if (oldVersion) {
          Object.keys(oldVersion).forEach((key) => {
            voucher[key] = oldVersion[key];
          });
          voucher.oldVersion = null;
          voucher.editable = false;
        } else {
          this.voucherItemList.splice(index, 1);
        }
      },
      removeVoucher(index, voucher) {
        console.log('remove voucher', index, voucher);
        deleteActionRecord(this.waybillCode, this.actionCode, voucher.actionRecordCode, (response) => {
          if (response) {
            this.voucherItemList.splice(index, 1);
          }
        });
      },
      handleUploadError(item) {
        if (item.isEdit) {
          item.uploadCounter -= 1;
          this.$message({
            type: 'error',
            showClose: true,
            message: '上传失败',
            duration: 5000
          });
        }
      },
      handleUploadStart(item) {
        item.uploadCounter += 1;
        console.log('uploadCounter', item.uploadCounter);
      },
      handleAvatarSuccess(res, file, fileList, item) {
        if (item.editable) {
          this.uploadCounter -= 1;
          console.log('handleAvatarSuccess', res, file, fileList, item);
          item.attachments.push({
            'url': res.content.thumbnailList[0].url,
            resourceCode: res.content.resourceCode
          });
        }
      },
      handleRemove(file, fileList, item) {
        if (item.editable) {
          for (let index = 0; index < item.attachments.length; index += 1) {
            const attachment = item.attachments[index],
              fileIndex = fileList.findIndex(f => attachment.resourceCode === f.resourceCode);
            if (fileIndex < 0) {
              item.attachments.splice(index, 1);
              break;
            }
          }
          console.log('handleRemove', file, fileList, item);
        }
      },
      initData() {
        this.voucherItemList = [];
        getActionRecordWithParams(this.waybillCode, { targetObject: 'attachment' }, (success) => {
          console.log('voucher record', success);
          if (success && success.content.length) {
            success.content.forEach((voucherModel) => {
              this.voucherItemList.push(this.toVoucherItem(voucherModel));
            });
            console.log('init voucherItemList', this.voucherItemList);
          }
        });
      }
    },
    created() {
      this.initData();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .section{
    .el-upload.el-upload--picture-card, .el-upload-list--picture-card .el-upload-list__item, .imgShow img{
      width: 36px;
      height: 36px;
      line-height: 36px;
    }
    .el-upload--picture-card i{
      font-size: 18px;
    }
    .el-dialog__header {
      border-bottom: none;
    }
  }
</style>
