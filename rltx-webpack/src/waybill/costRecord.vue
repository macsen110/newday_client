/**
* costRecord.vue
* Created by dsky on 17/8/28.
*/
<template>
  <!--运单结算费用记录-->
  <div class="section clearfix" v-if="tableDate.length">
    <div class="page-header clearfix">
      <h2 class="page-title fl">
        费用记录
      </h2>
      <span class="fr">
        <el-button type="primary" @click="submitRecord" v-show="isEdit">提交</el-button>
        <el-button type="primary" @click="isEdit = true" v-show="!isEdit">编辑</el-button>
        <el-button @click="isEdit = false" v-show="isEdit">取消</el-button>
      </span>
    </div>
    <el-table
      :data="tableDate"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="65"
        align="center">
        <template scope="scope">
          {{ scope.$index + 1 }} <i class="el-icon-plus" v-show="isEdit" v-if="!scope.row.isAdd" @click="addTpl(scope.$index)"></i><i class="el-icon-minus" v-show="isEdit" v-if="scope.row.isAdd" @click="deleteTpl(scope.$index)"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="chargeItemName"
        label="费用名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="usageDesc"
        label="用途类型"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ReportTime"
        label="金额"
        width="180"
        align="center">
        <template scope="scope">
          <div class="block" v-show="isEdit">
            <el-input v-model="tableDate[scope.$index].chargeAmounts" placeholder="金额" ></el-input>{{ scope.row.chargeAmountsUnitName }}
          </div>
          <span v-show="!isEdit">{{ scope.row.chargeAmounts ? scope.row.chargeAmounts + scope.row.chargeAmountsUnitName : 0 + scope.row.chargeAmountsUnitName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="费用描述 "
        align="center">
        <template scope="scope">
          <div class="block" v-show="isEdit">
            <el-input v-model="tableDate[scope.$index].description" placeholder="费用描述" v-show="isEdit"></el-input>
          </div>
          <span v-show="!isEdit">{{ scope.row.description ? scope.row.description : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="ReportTime"
        label="相关附件"
        align="center"
        width="168">
        <template scope="scope">
          <div class="imgUpload" :data-index="scope.$index" v-if="isEdit" @click="clickImg(scope.$index)">
            <el-upload
              :action="actionUrl"
              list-type="picture-card"
              with-credentials
              :file-list="imgData[scope.$index]"
              :on-success="handleAvatarSuccess"
              :on-remove="handleRemove">
              <i class="el-icon-plus" :data-index="scope.$index"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <div class="imgShow" v-show="!isEdit">
            <img width="100%" :src="img.url" alt="" v-for="img in imgData[scope.$index]" @click="showImgDialog(img.url)">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="creatorUsername"
        label="上报人"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="上报时间"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="68">
        <template scope="scope">
          <el-button
            size="small"
            type="default"
            @click="handleEmpty(scope.$index)" v-show="isEdit">清空</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisibleImg" size="tiny">
      <img width="100%" :src="showImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { addRecord, getSettleList, getImgUrl } from '../../api/waybillService';
  // import eleImgMore from '../components/ele-img-more/eleImgMore.vue';

  export default {
    name: 'costRecord',
    props: {
      domainObject: {},
      waybillCode: {
        type: String,
        'default': ''
      },
      getTotalAmount: Function,
      expressionArray: null,
      uploadUrl: ''
    },
    data() {
      return {
        tableDate: [],
        isEdit: false,
        actionUrl: `${this.uploadUrl}/fw/image/update`,
        dialogImageUrl: '',
        dialogVisible: false,
        dialogVisibleImg: false,
        imgData: [],
        showImageUrl: ''
      };
    },
    components: {
      // eleImgMore
    },
    watch: {
      isEdit(status) {
        if (status) {
          this.$nextTick(() => {
            this.imgData.forEach((val, index) => {
              const classList = document.querySelectorAll('.section .el-upload.el-upload--picture-card')[index].classList;
              if (val.length >= this.imgMax) {
                classList.add('hide');
              } else {
                classList.remove('hide');
              }
            });
          });
        }
      }
    },
    methods: {
      clickImg(index) {
        this.index = index;
      },
      showImgDialog(url) {
        this.dialogVisibleImg = true;
        this.showImageUrl = url;
      },
      handleAvatarSuccess(res, file, fileList) {
        console.log('this.tableDate[this.index].attachmentList: ', this.tableDate[this.index].attachmentList);
        if (!(this.tableDate[this.index].attachmentList instanceof Array)) {
          this.tableDate[this.index].attachmentList = this.tableDate[this.index].attachmentList.split(':');
        }
        this.tableDate[this.index].attachmentList.push(res.content.resourceCode);
        this.imgData[this.index].push({
          url: res.content.thumbnailList[0].url,
          resourceCode: res.content.resourceCode
        });
        const classList = document.querySelectorAll('.section .el-upload.el-upload--picture-card')[this.index].classList;
        if (fileList.length >= this.imgMax) {
          classList.add('hide');
        }
      },
      handleRemove(file, fileList) {
        setTimeout(() => {
          const classList = document.querySelectorAll('.section .el-upload.el-upload--picture-card')[this.index].classList;
          if (fileList.length < this.imgMax) {
            classList.remove('hide');
          }
          this.deleteImg(file.url);
        }, 20);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      deleteImg(url) {
        this.imgData.forEach((val, index) => {
          val.forEach((data) => {
            if (data.url === url) {
              if (!(this.tableDate[this.index].attachmentList instanceof Array)) {
                this.tableDate[this.index].attachmentList = this.tableDate[this.index].attachmentList.split(':');
              }
              const indexOf = this.tableDate[index].attachmentList.indexOf(data.resourceCode);
              this.tableDate[index].attachmentList.splice(indexOf, 1);
              this.imgData[index].splice(indexOf, 1);
            }
          });
        });
      },
      submitRecord() {
        const self = this,
          h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '确认提交吗？ ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              addRecord(this.waybillCode, self.tableDate, (success, error) => {
                if (error || success.code !== 200) {
                  this.$message({
                    type: 'error',
                    showClose: true,
                    message: `error code ${error || success.code}, see console message please`,
                    duration: 5000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                  return false;
                }
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '提交成功',
                    duration: 1000
                  });
                  instance.confirmButtonLoading = false;
                  done();
                  this.isEdit = false;
                  // 获取运费总金额
                  this.getTotalAmount(this.waybillCode, this.domainObject, this.tableDate);
                }
              });
            } else {
              done();
            }
          }
        }).then(() => {
        });
      },
      handleEmpty(index) {
        this.$set(this.tableDate[index], 'description', '');
        this.$set(this.tableDate[index], 'chargeAmounts', '');
//        [this.tableDate[index].description, this.tableDate[index].chargeAmounts] = [...''];
      },
      addTpl(index) {
        const tableData = this.tableDate[index],
          dataTpl = {};
        Object.keys(tableData).forEach((key) => {
          dataTpl[key] = tableData[key];
        });
        dataTpl.isAdd = true;
        this.tableDate.splice(index + 1, 0, dataTpl);
      },
      deleteTpl(index) {
        this.tableDate.splice(index, 1);
      }
    },
    created() {
      //      运单结算费用记录
      this.imgMax = 3;
      this.index = 0;
      getSettleList(this.waybillCode, (success) => {
        if (success) {
          if (success.content.length) {
            this.tableDate = success.content;
            success.content.forEach((value, index) => {
              if (value.id) {
                value.isAdd = true;
              } else {
                value.isAdd = false;
              }
              this.imgData[index] = [];
              if (value.attachmentList) {
                const attachmentList = value.attachmentList.split(':');
                this.tableDate[index].attachmentList = attachmentList;
                attachmentList.forEach((val) => {
                  getImgUrl(val, (res) => {
                    if (res) {
                      const imgData = {
                        url: res.content.thumbnailList[0].url,
                        resourceCode: val
                      };
                      this.imgData[index].push(imgData);
                    }
                  });
                });
              } else {
                this.tableDate[index].attachmentList = [];
              }
            });
          }
          // 获取运费总金额
          this.getTotalAmount(this.waybillCode, this.domainObject, this.tableDate);
        }
      });
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
