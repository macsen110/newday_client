<template>
    <!-- fix-table-wrap -->
    <div class="fix-table-wrap">
      <table class="rl-fix-table table-bordered">
        <thead>
        <tr>
          <th class="fix-hd fix-col" v-if="selectable"><input type="checkbox" class="ck-all"></th>
          <th class="fix-hd fix-col" v-if="operatable">操作</th>
          <!-- <th class="fix-hd fix-col">ID</th> -->
          <th v-for="column in columnsData" class="fix-hd">
            {{ column.showName }}
          </th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="list in listData" :data-error="list.error">
            <td class="fix-col" v-if="selectable">
              <input type="checkbox" class="ck-single">
            </td>
            <td class="fix-col" v-if="operatable">
              <div class="cell" style="width: 100px">
                <!--<a href="JavaScript:;" :data-link="editUrl + '?' + list.code" :data-title="'编辑' + objectName" class="el-button el-button&#45;&#45;small el-button&#45;&#45;primary">编辑</a>-->
                <!--<button type="button" class="el-button el-button&#45;&#45;default el-button&#45;&#45;small"  @click="handleDelete(list)">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;<span>删除</span></button>-->
                <!--<a href="JavaScript:;" data-link="" v-for="action in actionData">-->
                  <!--{{ action.actionName }}-->
                <!--</a>-->
                <el-select v-model="operValues[list.code]" placeholder="请选择">
                  <el-option v-if="editUrl && objectName !== '接单记录'" :key="'编辑'" :label="'编辑'" :value="'编辑'">
                    <div @click="openWindow(editUrl + '?code=' + list.code + '&editable=true&objectName=' + objectName, '编辑' + objectName)" :data-link="editUrl + '?code=' + list.code + '&editable=true'" :data-title="'编辑' + objectName">
                      <a href="JavaScript:;">编辑</a>
                    </div>
                  </el-option>
                  <el-option v-if="objectName === '接单记录' && list.driverAcceptStatus === 'undispatched'" :key="'派车'" :label="'派车'" :value="'派车'">
                    <div @click="sendWaybill(list)">
                      <a href="JavaScript:;">派车</a>
                    </div>
                  </el-option>
                  <el-option v-if="objectName === '接单记录' && list.driverAcceptStatus === 'undispatched'" :key="'忽略'" :label="'忽略'" :value="'忽略'">
                    <div @click="ignore(list)">
                      <a href="JavaScript:;">忽略</a>
                    </div>
                  </el-option>
                  <el-option v-if="objectName === '接单记录' && list.driverAcceptStatus === 'dispatched'" :key="'查看运单详情'" :label="'查看运单详情'" :value="'查看运单详情'">
                    <div  @click="openWindow('/waybill/add.html?code=' + list.waybillCode + '&editable=false', '运单详情')">
                      <a href="JavaScript:;">查看运单详情</a>
                    </div>
                  </el-option>
                  <el-option v-if="(list.rootFlag ? false : true) && dispatchDelete && objectName !== '接单记录'" :key="'删除'" :label="'删除'" :value="'删除'">
                    <div @click="handleDelete(list)">
                      <a href="JavaScript:;">删除</a>
                    </div>
                  </el-option>
                  <el-option v-if="dispatch" :key="'派车'" :label="'派车'" :value="'派车'">
                    <div @click="openWindow(dispatchUrl + '?logisticsCode=' + list.code, '派车')" :data-link="dispatchUrl + '?logisticsCode=' + list.code" :data-title="'派车'">
                      <a href="JavaScript:;">派车</a>
                    </div>
                  </el-option>

                  <el-option v-if="refreshFreightDispatch" :key="'刷新货源'" :label="'刷新货源'" :value="'刷新货源'">
                    <div @click="handleRefresh(list)">
                      <a href="JavaScript:;">刷新货源</a>
                    </div>
                  </el-option>
                  <el-option v-if="closeFreightDispatch" :key="'结束发布'" :label="'结束发布'" :value="'结束发布'">
                    <div @click="handleClose(list)">
                      <a href="JavaScript:;">结束发布</a>
                    </div>
                  </el-option>
                  <el-option v-if="dispatchFreightSendCar" :key="'去派车'" :label="'去派车'" :value="'去派车'">
                    <div @click="openWindow(dispatchFreightSendCarUrl + '?freightCode=' + list.code, '去派车')" :data-link="dispatchFreightSendCarUrl + '?freightCode=' + list.code" :data-title="去派车">
                      <a href="JavaScript:;">去派车</a>
                    </div>
                  </el-option>
                  <el-option v-if="list.waybillStatus === 'finish' && list.reportStatus !== '2'" :key="'上报运单'" :label="'上报运单'" :value="'上报运单'">
                    <div @click="openWindow('/waybill/report.html?code=' + list.code + '&editable=true', '上报运单')" :data-link="'/waybill/report.html?code=' + list.code + '&editable=true'" :data-title="上报运单">
                      <a href="JavaScript:;">上报运单</a>
                    </div>
                  </el-option>
                  <el-option v-if="list.waybillStatus === 'finish' && list.reportStatus === '2'" :key="'上报详情'" :label="'上报详情'" :value="'上报详情'">
                    <div @click="openWindow('/waybill/report.html?code=' + list.code , '上报详情')" :data-link="'/waybill/report.html?code=' + list.code " :data-title="上报详情">
                      <a href="JavaScript:;">上报详情</a>
                    </div>
                  </el-option>
                  <el-option v-if="popWaybillTruckMap" :key="'显示车辆'" :label="'显示车辆'" :value="'显示车辆'">
                    <div @click="showWaybillPopTrucks(list.code)">
                      显示车辆
                    </div>
                  </el-option>
                  <el-option v-if="popLogsitcsTruckMap" :key="'显示车辆'" :label="'显示车辆'" :value="'显示车辆'">
                    <div @click="showLogsiticsPopTrucks(list.code)">
                      显示车辆
                    </div>
                  </el-option>
                  <el-option v-for="action in actionData[list.code]" :key="action.actionCode" :label="action.actionName" :value="action.actionCode">
                    <!-- 装货 -->
                    <template v-if="action.actionCode === 'loading'">
                      <!-- <div @click="openWindow(editUrl + '?code=' + list.code + '&editable=false&objectName=' + objectName + '&goto=loading', action.actionName)" :data-link="editUrl + '?code=' + list.code + '&editable=false&objectName=' + objectName + '&goto=loading'" :data-title="action.actionName">
                        <a href="JavaScript:;">{{ action.actionName }}</a>
                      </div> -->
                      <span class="show" @click="showDialog(list.code, 'loading')">{{ action.actionName }}</span>
                    </template>
                    <!-- 卸货 -->
                    <template v-else-if="action.actionCode === 'unloading'">
                      <!-- <div @click="openWindow(editUrl + '?code=' + list.code + '&editable=false&objectName=' + objectName + '&goto=unloading', action.actionName)" :data-link="editUrl + '?code=' + list.code + '&editable=false&objectName=' + objectName + '&goto=unloading'" :data-title="action.actionName">
                        <a href="JavaScript:;">{{ action.actionName }}</a>
                      </div> -->
                      <span class="show" @click="showDialog(list.code, 'unloading')">{{ action.actionName }}</span>
                    </template>
                    <!-- 上报费用 -->
                    <template v-else-if="action.actionCode === 'reportFee'">
                      <span class="show" @click="reportFee(list.code, 'reportFee')">{{ action.actionName }}</span>
                    </template>
                    <template v-else>
                      <div @click="openWindow('/'+actionUrl + '?code=' + list.code + '&actionCode=' + action.actionCode, action.actionName)" :data-link="'/'+actionUrl + '?code=' + list.code + '&actionCode=' + action.actionCode" :data-title="action.actionName">
                        <a href="JavaScript:;">{{ action.actionName }}</a>
                      </div>
                    </template>
                  </el-option>

                </el-select>
                <!-- <el-button type="text" v-if="objectName === '接单记录' && list.driverAcceptStatus === 'dispatched'"  @click="openWindow('/waybill/add.html?code=' + list.waybillCode + '&editable=false', '运单详情')">查看运单</el-button> -->
              </div>
            </td>
            <!-- <td class="fix-col">
              <a href="javascript:;" class="blue" :data-link="`${editUrl}?code=${list.code}&editable=false`" :data-title="`${objectName}详情`" :title="`查看${objectName}详情`">
              {{ list.code }}
              </a>
            </td> -->
            <td v-for="(column,index) in columnsData">
              <!--{{ getContent(list, column) }}-->
              <template v-if="column.detailLinkVisiable==='true' && editUrl">
                <a href="javascript:;" @click="openWindow(`${editUrl}?code=${list.code}&editable=false`, `${objectName}详情`)" class="blue" :data-link="`${editUrl}?code=${list.code}&editable=false`" :data-title="`${objectName}详情`" :title="`查看${objectName}详情`">
                  <ele-block :field="column" :domainObject="list" :editable="false" :uploadUrl="uploadUrl"></ele-block>
                </a>
              </template>
              <template v-else>
                <ele-block :field="column" :domainObject="list" :editable="false" :uploadUrl="uploadUrl" :isList="isList"></ele-block>
              </template>
              <!--<ele-config :domainObject="list" v-for="field in column.extraParams" :editable="false" :field="field"></ele-config>-->
            </td>
          </tr>
        </tbody>
      </table>
      <!-- show dialog -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
        <el-form :model="dialogFormObject" ref="dialogFormObject" label-width="140px" :inline="false">
          <el-form-item v-for="field in fields" :key="field.fieldConfigCode" :label="field.showName" :required="field.required ==='true'">
            <ele-block :field="field" :domainObject="dialogFormObject" :inputKey="inputKey" :editable="editable" :uploadUrl="dialogUploadUrl"></ele-block>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('dialogFormObject')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- report fee -->
      <el-dialog title="上报费用" :visible.sync="dialogReportFeeVisible" size="large">
        <waybill-action :id="code" :action="actionCode" ref="reportAction" :isDialog="true"></waybill-action>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editReportFeeForm" v-show="showButton">编 辑</el-button>
          <el-button @click="dialogReportFeeVisible = false" v-show="!showButton">取 消</el-button>
          <el-button type="primary" @click="submitReportFeeForm" v-show="!showButton">确 定</el-button>
        </div>
      </el-dialog>
      <!-- <el-dialog title="车辆位置" :visible.sync="dialogTruckMapVisible" size="large">
        <div class="fix-table-wrap">
          <baidu-map class="pop-map" @ready="popMapReady">
            <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>
            <bm-marker :show="mapShowMarker" v-for="marker in mapMarkers" :key="marker.id" :rotation="marker.rotation" :position="marker.position" :icon="marker.icon" :dragging="marker.dragging"></bm-marker>
            <bm-polyline :show="mapShowPolyline" v-for="line in mapPolylines" :key="line.id" :stoke-color="line.stroke.color" :stroke-opacity="line.stroke.opacity" :stroke-weight="line.stroke.weight"></bm-polyline>
          </baidu-map>
        </div>
      </el-dialog> -->
      <ele-waybill-pop-map ref="waybillMapDialog" :dialog-visible="waybillPopMapVisible" :code="waybillCode"></ele-waybill-pop-map>
      <ele-logistic-pop-map ref="logisticsMapDialog" :dialog-visible="logisticsPopMapVisible" :code="logisticCode"></ele-logistic-pop-map>
    </div>
</template>

<script type="text/ecmascript-6">
import { urlRedirect, getParam } from '../../../api/Utils';
/* eslint-disable no-new */
/* eslint-disable no-unused-vars */

import eleConfig from '../ele-config/eleConfig.vue';
import eleBlock from '../ele-block/eleBlock.vue';
import waybillAction from '../../waybill/action.vue';
import eleWaybillPopMap from '../ele-pop-map/eleWaybillPopMap.vue';
import eleLogisticPopMap from '../ele-pop-map/eleLogisticPopMap.vue';
import ApiConst from '../../../api/ApiConst';

import { addAction } from '../../../api/waybillService';

const axios = require('axios');

export default {
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '',
      customColumns: [],
      dialogFormObject: {},
      fields: [],
      editable: true, // 控制页面状态
      loading: true,
      isList: true,
      code: '',
      btnDisabled: false,
      dialogUploadUrl: '',
      dialogReportFeeVisible: false,
      actionCode: '',
      showButton: true,
      dialogTruckMapVisible: false,
      mapShowMarker: true,
      mapShowPolyline: false,
      mapPolylines: [],
      mapMarkers: [],
      waybillPopMapVisible: false,
      waybillCode: '',
      logisticsPopMapVisible: false,
      logisticCode: ''
    };
  },
  components: {
    'ele-config': eleConfig,
    'ele-block': eleBlock,
    'waybill-action': waybillAction,
    'ele-waybill-pop-map': eleWaybillPopMap,
    'ele-logistic-pop-map': eleLogisticPopMap
  },
  props: {
    columnsData: Array,
    listData: Array,
    searchData: Array,
    getData: Function,
    editUrl: '',
    dispatchDelete: {
      type: Boolean,
      'default': true
    },
    actionUrl: '',
    objectName: '',
    deleteFun: Function,
    actionData: Object,
    operValues: Object,
    uploadUrl: String,
    refreshFreightFun: Function,
    closeFreightFun: Function,
    batchSubmit: Function,
    batchIgnored: Function,
    refreshFreightDispatch: {
      type: Boolean,
      'default': false
    },
    closeFreightDispatch: {
      type: Boolean,
      'default': false
    },
    dispatch: {
      type: Boolean,
      'default': false
    },
    dispatchUrl: '',
    dispatchFreightSendCar: {
      type: Boolean,
      'default': false
    },
    dispatchFreightSendCarUrl: '',
    selectable: {
      type: Boolean,
      'default': true
    },
    operatable: {
      type: Boolean,
      'default': true
    },
    isAlreadyReport: {
      type: Boolean,
      'default': false
    },
    popWaybillTruckMap: {
      type: Boolean,
      'default': false
    },
    popLogsitcsTruckMap: {
      type: Boolean,
      'default': false
    }
  },
  methods: {
    // getContent(list, column) {
    //   const extraParams = column.extraParams,
    //     params = JSON.parse(extraParams),
    //     field1 = params.field1;
    //   return list[field1];
    // },
    handleDelete(row) {
      const paramObj = {
          code: row.code
        },
        h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h('p', null, [h('span', null, '确认删除吗？ ')]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            this.deleteFun(paramObj, (success, error) => {
              if (success) {
                this.$message({
                  type: 'success',
                  message: '删除成功',
                  duration: 1000
                });
                done();
                instance.confirmButtonLoading = false;
              }
              if (error) {
                this.$message({
                  type: 'warning',
                  message: `${error}`,
                  duration: 1000
                });
                instance.confirmButtonLoading = false;
                done();
              }
            });
          } else {
            done();
          }
        }
      }).then(() => {
        this.getData();
      });
    },
    handleRefresh(row) {
      const paramObj = {
          code: row.code
        },
        h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h('p', null, [h('span', null, '确认刷新吗？ ')]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            this.refreshFreightFun(paramObj.code, {}, (success, error) => {
              if (success) {
                this.$message({
                  type: 'success',
                  message: '刷新成功',
                  duration: 1000
                });
                done();
                instance.confirmButtonLoading = false;
              }
              if (error) {
                this.$message({
                  type: 'warning',
                  message: `${error}`,
                  duration: 1000
                });
                instance.confirmButtonLoading = false;
                done();
              }
            });
          } else {
            done();
          }
        }
      }).then(() => {
        this.getData();
      });
    },
    handleClose(row) {
      const paramObj = {
          code: row.code
        },
        h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h('p', null, [h('span', null, '确认关闭吗？ ')]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            this.closeFreightFun(paramObj.code, {}, (success, error) => {
              if (success) {
                this.$message({
                  type: 'success',
                  message: '关闭成功',
                  duration: 1000
                });
                done();
                instance.confirmButtonLoading = false;
              }
              if (error) {
                this.$message({
                  type: 'warning',
                  message: `${error}`,
                  duration: 1000
                });
                instance.confirmButtonLoading = false;
                done();
              }
            });
          } else {
            done();
          }
        }
      }).then(() => {
        this.getData();
      });
    },
    sendWaybill(row) {
      const paramObj = {
        code: row.code
      };
      this.batchSubmit(paramObj, (success) => {
        if (success && success.code === 200) {
          this.$alert('恭喜您，派车成功！', '派车成功', {
            confirmButtonText: '确定',
            callback: () => {
              const refresh = document.querySelector('#pageRefresh');
              if (refresh) {
                refresh.click();
              }
            }
          });
        }
      });
    },
    ignore(row) {
      this.batchIgnored(row.code, (success) => {
        if (success && success.code === 200) {
          this.$alert('恭喜您，成功忽略掉该接单数据！', '忽略成功', {
            confirmButtonText: '确定',
            callback: () => {
              const refresh = document.querySelector('#pageRefresh');
              if (refresh) {
                refresh.click();
              }
            }
          });
        }
      });
    },
    popMapReady() {},
    openWindow(url, title) {
      // console.log(url, title);
      urlRedirect(url, title);
    },
    showWaybillPopTrucks(code) {
      this.$refs.waybillMapDialog.showDialog(code);
    },
    showLogsiticsPopTrucks(code) {
      this.$refs.logisticsMapDialog.showDialog(code);
    },
    showDialog(code, actionCode) {
      document.addEventListener('loadDone', this.loadFinish, false);
      this.code = code;
      this.actionCode = actionCode;
      this.$set(this.dialogFormObject, 'code', code);
      this.$set(this.dialogFormObject, 'actionCode', actionCode);
      this.dialogVisible = true;
      this.dialogUploadUrl = `${ApiConst.apiWayBillDomain}`;
      const localStorage = window.localStorage,
        eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
        eleInfo = JSON.parse(localStorage.getItem('eleInfo')),
        waibillUrl = ApiConst.apiWayBillDomain,
        configUrl = `${waibillUrl}/detail_render_info/waybill/list`;
      function elementConfig() {
        return axios({
          method: 'get',
          url: configUrl,
          headers: { Accept: 'application/json' }
        });
      }
      switch (actionCode) {
        case 'loading':
          this.dialogTitle = '装货信息';
          this.customColumns = [
            'loadingGoodsWeight',
            'loadingGoodsVolume',
            'loadingGoodsNum',
            'loadingTime',
            'departDate',
            'departMileage',
            'loadingAttachment'
          ];
          break;
        case 'unloading':
          this.dialogTitle = '卸货信息';
          this.customColumns = [
            'unloadingGoodsWeight',
            'unloadingGoodsVolume',
            'unloadingGoodsNum',
            'unloadingTime',
            'returnDate',
            'returnMileage',
            'unloadingAttachment'
          ];
          break;
        default:
          this.dialogTitle = '';
      }
      axios.all([elementConfig()]).then(axios.spread((eleResult) => {
        const newColumns = [];
        let paramData = {},
          count = 0,
          len = 0;
        eleResult.data.content.forEach((val) => {
          if (this.customColumns.indexOf(val.fieldConfigCode) > -1) {
            newColumns.push(val);
          }
        });
        paramData = getParam(
          { data: { content: newColumns } },
          eleDefine,
          eleInfo
        );
        this.inputKey = paramData.inputKey;
        function cb() {
          count += 1;
          if (count === len) {
            const event = new Event('loadDone');
            document.dispatchEvent(event);
          }
        }
        paramData.field.forEach((field) => {
          field.extraParams.forEach((property) => {
            if (property.default) {
              this.$set(
                this.dialogFormObject,
                property.field,
                property.default
              );
            } else {
              this.$set(this.dialogFormObject, property.field, null);
            }
            len += 1;
          });
        });
        this.fields = paramData.field;
        this.loading = false;
        document.addEventListener('loadEleDone', cb, false);
      }));
    },
    submitForm(formName) {
      const self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          self.btnDisabled = true;
          const event = new Event('submitDone');
          addAction(this.dialogFormObject, {}, (success, error) => {
            if (error || success.code !== 200) {
              this.$message({
                type: 'error',
                message: error.content,
                duration: 5000
              });
              self.btnDisabled = false;
              return false;
            }
            if (success) {
              this.$message({
                type: 'success',
                message: `${this.dialogTitle}提交成功！`,
                duration: 1000
              });
              self.btnDisabled = false;
              // self.editable = false;
              self.dialogVisible = false;
              document.dispatchEvent(event);
              window.setTimeout(this.refresh, 1000);
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    refresh() {
      window.location.reload();
    },
    reportFee(code, actionCode) {
      this.code = code;
      this.actionCode = actionCode;
      this.dialogReportFeeVisible = true;
    },
    editReportFeeForm() {
      this.showButton = false;
      this.$refs.reportAction.isEdit = true;
    },
    submitReportFeeForm() {
      this.$refs.reportAction.submitForm();
      this.dialogReportFeeVisible = false;
      window.setTimeout(this.refresh, 1000);
    }
  },
  created() {}
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../assets/sass/rl-table.scss";
.el-dialog__body {
  .el-form-item__label {
    &:after {
      content: "：";
      display: inline-block;
    }
  }
  .innerblock {
    margin-right: 10px;
  }
  .el-date-editor {
    width: 174px !important;
  }
  .el-select {
    width: 100px !important;
  }
  .form-page {
    .el-row {
      padding: 0 !important;
    }
    .el-col-24 {
      display: none;
    }
  }
}
</style>
