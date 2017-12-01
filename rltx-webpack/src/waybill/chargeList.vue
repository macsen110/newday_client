<template>
  <div class="section charge-list clearfix" v-if="chargeItemList.length">
    <div class="page-header clearfix">
      <span class="fr">
        <el-button type="primary" @click="submitRecord" v-show="isEdit">提交</el-button>
        <el-button type="primary" @click="isEdit = true" v-show="!isEdit">编辑</el-button>
        <el-button @click="cancelEdit()" v-show="isEdit">取消</el-button>
      </span>
    </div>
    <el-table
      :data="chargeItemList"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="65"
        align="center">
        <template scope="scope">
          {{ scope.$index + 1 }}
          <i class="el-icon-plus" v-show="isEdit" v-if="!scope.row.removeable" @click="addChargeItem(scope.row)"></i>
          <i class="el-icon-minus" v-show="isEdit" v-if="scope.row.removeable" @click="delChargeItem(scope.$index)"></i>
        </template>
      </el-table-column>
      <el-table-column prop="chargeItemName" label="费用名称" align="center"></el-table-column>
      <el-table-column prop="chargeItemNumber" label="数量" align="center">
        <template scope="scope">
          <div class="block" v-show="isEdit">
            <el-input v-model="scope.row.chargeItemNumber" placeholder="数量" ></el-input>{{ scope.row.chargeItemNumberUnitName }}
          </div>
          <span v-show="!isEdit">{{ scope.row.chargeItemNumber ? scope.row.chargeItemNumber : 0 }} {{ scope.row.chargeItemNumberUnitName }}</span>
          <!--<span v-show="!isEdit">{{ scope.row.chargeItemNumber ? scope.row.chargeItemNumber + scope.row.chargeItemNumberUnitName : 0 + scope.row.chargeItemNumberUnitName }}</span>-->
        </template>
      </el-table-column>
      <el-table-column prop="ReportTime" label="金额" align="center">
        <template scope="scope">
          <div class="block" v-show="isEdit">
            <el-input v-model="scope.row.chargeAmounts" placeholder="金额" ></el-input>{{ scope.row.chargeAmountsUnitName }}
          </div>
          <span v-show="!isEdit">{{ scope.row.chargeAmounts ? scope.row.chargeAmounts : 0 }} {{ scope.row.chargeAmountsUnitName }}</span>
          <!--<span v-show="!isEdit">{{ scope.row.chargeAmounts ? scope.row.chargeAmounts + scope.row.chargeAmountsUnitName : 0 + scope.row.chargeAmountsUnitName }}</span>-->
        </template>
      </el-table-column>
      <el-table-column prop="description" label="费用描述" align="center">
        <template scope="scope">
          <div class="block fee-description" v-show="isEdit">
            <el-input v-model="scope.row.description" placeholder="费用描述" v-show="isEdit"></el-input>
          </div>
          <span v-show="!isEdit">{{ scope.row.description ? scope.row.description : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ReportTime" label="相关附件" align="center" width="168">
        <template scope="scope">
          <div class="imgUpload" v-if="isEdit">
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
          <div class="imgShow" v-show="!isEdit">
            <img width="100%" :src="img.url" alt="" v-for="img in scope.row.attachments">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="executeUserFullName" label="上报人" align="center"></el-table-column>
      <el-table-column prop="createTime" label="上报时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="68">
        <template scope="scope">
          <el-button size="small" type="default" @click="resetChargeItem(scope.row)" v-show="isEdit">清空</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
  import { addRecord, getChargeDefine, getSettleList, getImgUrl } from '../../api/waybillService';
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
      uploadUrl: String
    },
    data() {
      return {
        chargeItemList: [],
        chargeItemDefine: {},
        isEdit: false,
        actionUrl: `${this.uploadUrl}/fw/image/update`,
        dialogImageUrl: '',
        dialogVisible: false,
        dialogVisibleImg: false,
        uploadCounter: 0,
        showImageUrl: ''
      };
    },
    methods: {
      toChargeItem(chargeModel) {
        const chargeItem = Object.assign({}, chargeModel);
        if (chargeModel.chargeItemCode in this.chargeItemDefine) {
          chargeItem.removeable = true;
        } else {
          this.chargeItemDefine[chargeModel.chargeItemCode] = true;
          chargeItem.removeable = false;
        }
        chargeItem.attachments = [];
        if (chargeModel.attachmentList) {
          chargeModel.attachmentList.split(':').forEach((resourceCode) => {
            getImgUrl(resourceCode, (response) => {
              if (response) {
                chargeItem.attachments.push({ 'url': response.content.thumbnailList[0].url, 'resourceCode': resourceCode });
              }
            });
          });
        }
        return chargeItem;
      },
      toChargeModel(chargeItem) {
        const chargeModel = {};
        Object.keys(chargeItem).forEach((key) => {
          if (key !== 'removeable' && key !== 'attachments') {
            chargeModel[key] = chargeItem[key];
          }
        });
        if (chargeItem.attachments && chargeItem.attachments.length > 0) {
          const attachmentList = [];
          chargeItem.attachments.forEach((attachment) => {
            attachmentList.push(attachment.resourceCode);
          });
          chargeModel.attachmentList = attachmentList.join(':');
        } else {
          chargeModel.attachmentList = '';
        }
        return chargeModel;
      },
      copyChargeItem(chargeItem) {
        const newChargeItem = {};
        Object.keys(chargeItem).forEach((key) => {
          if (key !== 'removeable' && key !== 'attachments' && key !== 'chargeAmounts'
            && key !== 'description' && key !== 'chargeItemNumber'
            && key !== 'chargeItemPrice' && key !== 'id' && key !== 'code') {
            newChargeItem[key] = chargeItem[key];
          }
        });
        newChargeItem.removeable = true;
        return newChargeItem;
      },
      handleUploadError() {
        if (this.isEdit) {
          this.uploadCounter -= 1;
          this.$message({
            type: 'error',
            showClose: true,
            message: '上传失败',
            duration: 5000
          });
        }
      },
      handleUploadStart() {
        this.uploadCounter += 1;
        console.log('uploadCounter', this.uploadCounter);
      },
      resetChargeItem(chargeItem) {
        chargeItem.attachments = [];
        chargeItem.chargeAmounts = null;
        chargeItem.chargeItemNumber = null;
        chargeItem.chargeItemPrice = null;
        chargeItem.description = null;
      },
      handleAvatarSuccess(res, file, fileList, chargeItem) {
        if (this.isEdit) {
          this.uploadCounter -= 1;
          console.log('handleAvatarSuccess', res, file, fileList, chargeItem);
          chargeItem.attachments.push({
            'url': res.content.thumbnailList[0].url,
            resourceCode: res.content.resourceCode
          });
        }
      },
      handleRemove(file, fileList, chargeItem) {
        if (this.isEdit) {
          for (let index = 0; index < chargeItem.attachments.length; index += 1) {
            const attachment = chargeItem.attachments[index],
              fileIndex = fileList.findIndex(f => attachment.resourceCode === f.resourceCode);
            if (fileIndex < 0) {
              chargeItem.attachments.splice(index, 1);
              break;
            }
          }
          console.log('handleRemove', file, fileList, chargeItem);
        }
      },
      loadRecordData() {
        getSettleList(this.waybillCode, (success) => {
          if (success && success.content.length) {
            success.content.forEach((chargeModel) => {
              this.chargeItemList.push(this.toChargeItem(chargeModel));
            });
            console.log('init chargeItemList', this.chargeItemList);
          }
        });
      },
      initData() {
        this.chargeItemList = [];
        this.chargeItemDefine = {};
        getChargeDefine(this.waybillCode, (success) => {
          success.content.forEach((chargeModel) => {
            this.chargeItemList.push(this.toChargeItem(chargeModel));
          });
          this.loadRecordData();
        });
      },
      addChargeItem(chargeItem) {
        const newChargeItem = this.copyChargeItem(chargeItem);
        this.chargeItemList.push(newChargeItem);
      },
      delChargeItem(index) {
        this.chargeItemList.splice(index, 1);
      },
      cancelEdit() {
        this.isEdit = false;
        this.uploadCounter = 0;
        this.initData();
      },
      submitRecord() {
        if (this.uploadCounter > 0) {
          this.$message({
            type: 'error',
            showClose: true,
            message: `还有${this.uploadCounter}个文件未上传完成，请稍后再试`,
            duration: 5000
          });
          return;
        }
        const submitDataList = [],
          self = this;
        this.chargeItemList.forEach((chargeItem) => {
          submitDataList.push(this.toChargeModel(chargeItem));
        });
        console.log('submitDataList', submitDataList, this.chargeItemList);
        addRecord(this.waybillCode, submitDataList, (success, error) => {
          if (error || success.code !== 200) {
            this.$message({
              type: 'error',
              showClose: true,
              message: `error code ${error || success.code}, see console message please`,
              duration: 5000
            });
            return false;
          }
          self.isEdit = false;
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
  .charge-list {
    .el-input {
      width: 70px;
      margin-right: 8px;
    }
  }
  .fee-description {
    .el-input {
      width: 120px;
    }
  }
</style>
