/**
* drivreRecord.vue
* Created by dsky on 17/8/28.
*/
<template>
  <!--运单行车记录-->
  <div class="section clearfix" v-if="driveDate.length">
    <div class="page-header clearfix">
      <h2 class="page-title fl">
        行车记录
      </h2>
      <span class="fr">
        <el-button type="primary" @click="submitDriver" v-show="carEdit">提交</el-button>
        <el-button type="primary" @click="carEdit = true" v-show="!carEdit">编辑</el-button>
        <el-button @click="carEdit = false" v-show="carEdit">取消</el-button>
      </span>
    </div>
    <el-table
      :data="driveDate"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="72"
        align="center">
      </el-table-column>
      <el-table-column
        prop="drivingItemName"
        label="名称"
        align="center">
      </el-table-column>
      <el-table-column
        label="数量"
        align="center">
        <template scope="scope">
          <div class="block" v-show="carEdit">
            <el-input v-model="driveDate[scope.$index].drivingItemNumber" placeholder="数量" ></el-input>
          </div>
          <span v-show="!carEdit">{{ scope.row.drivingItemNumber ? scope.row.drivingItemNumber : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="描述"
        align="center">
        <template scope="scope">
          <div class="block" v-show="carEdit">
            <el-input v-model="driveDate[scope.$index].description" placeholder="费用描述" v-show="carEdit"></el-input>
          </div>
          <span v-show="!carEdit">{{ scope.row.description ? scope.row.description : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sourceCode"
        label="相关附件"
        align="center">
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
            @click="handleEmpty(scope.$index)" v-show="carEdit">清空</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as waybillService from '../../api/waybillService';

  export default {
    name: 'driverRecord',
    props: {
      domainObject: {},
      waybillCode: {
        type: String,
        'default': ''
      },
      getTotalAmount: Function,
      expressionArray: null
    },
    data() {
      return {
        driveDate: [],
        carEdit: false
      };
    },
    methods: {
      submitDriver() {
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
              waybillService.addDriver(this.waybillCode, self.driveDate, (success, error) => {
                if (error || success.code !== 200) {
                  this.$message({
                    type: 'error',
                    showClose: true,
                    message: error.content,
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
                  this.$set(this.domainObject, 'code', success.content.code);
                  this.carEdit = false;
//                  self.resetForm(formName);
                  // 获取运费总金额
                  this.getTotalAmount(self.waybillCode, null, null);
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
        this.$set(this.driveDate[index], 'description', '');
        this.$set(this.driveDate[index], 'drivingItemNumber', '');
//        [this.driveDate[index].description, this.driveDate[index].drivingItemNumber] = [...''];
      }
    },
    created() {
      //      运单行车记录
      waybillService.getDriverList(this.waybillCode, (success) => {
        if (success) {
          this.driveDate = success.content;
        }
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
