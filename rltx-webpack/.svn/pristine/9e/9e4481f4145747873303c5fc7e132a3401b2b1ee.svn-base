<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="uc-content table2">
    <el-form :inline="true" :model="searchModel" ref="searchModel" class="demo-form-inline">
      <el-form-item v-for="(searchField, index) in searchFields" :key="searchField.fieldConfigCode">
        <el-form-item :label="searchField.showName">
          <ele-block :field="searchField" :domainObject="searchModel"></ele-block>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i> 待选内搜索</el-button>
        <el-button @click="resetForm">重置条件</el-button>
      </el-form-item>
    </el-form>
    <div class="list-opr-choose clearfix">
      <div class="hd-opr loc-left fl">
        <el-button type="primary" @click="deleteSelected">批量移出</el-button>
        <el-button type="primary" @click="clearSelected">清空全部已选运单</el-button>
      </div>
    </div>
    <v-table ref="eleTable"
             @menuClick="menuClick"
             :selectable="selectable"
             :multiSelect="multiSelect"
             :getData="getData"
             :columnsData="columnsData"
             :listData="listData"
             :footerEnable="false"
             v-loading.fullscreen.lock="loading">
    </v-table>
    <v-page :page="page" :pageSize="pageSize" :total="total" v-on:change="change"></v-page>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import table from '../../components/ele-list/eleTable.vue';
  import page from '../../components/ele-list/elePage.vue';
  import eleBlock from '../../components/ele-block/eleBlock.vue';

  import { settlePayableSelectSelectedWaybillList, settlePayableWaybillColumns, settlePayableWaybillSearch, settlePayableClearSelectedWaybill, settlePayableWaybillRemove } from '../../../api/SettleBillService';
  import { getParam, adaptHeight, getParamsFromURL } from '../../../api/Utils';
  import { toggleClass, addClass, removeClass, hasClass } from '../../../api/classUtil';

  export default {
    components: {
      'v-table': table,
      'v-page': page,
      'ele-block': eleBlock
    },
    props: {
      params: {},
      multiSelect: {
        type: Boolean,
        'default': true
      },
      selectable: {
        type: Boolean,
        'default': true
      }
    },
    data() {
      return {
        leftDistance: '',
        topDistance: '',
        searchFieldsDone: false,
        columnFieldsDone: false,
        columnsData: [],
        searchData: [],
        listData: [],
        pageSize: 10,
        page: 1,
        total: 0,
        searchFields: [],
        searchModel: {},
        loading: Boolean
      };
    },
    methods: {
      onSubmit() {
        this.getData();
      },
      resetForm() {
        const keyArray = Object.keys(this.searchModel);
        keyArray.forEach((element) => {
          this.searchModel[element] = null;
        });
      },
      change(newPage, newPageSize) {
        const tableWrap = document.querySelector('.table2 .fix-table-wrap');
        this.topDistance = tableWrap.scrollTop;
        this.leftDistance = tableWrap.scrollLeft;
        this.page = newPage;
        this.pageSize = newPageSize;
        this.getData();
      },
      resetScrollBar() {
        const tableWrap = document.querySelector('.table2 .fix-table-wrap'),
          fixHd = document.querySelectorAll('.table2 .fix-hd'),
          fixCol = document.querySelectorAll('.table2 .fix-col');
        tableWrap.scrollTop = this.topDistance;
        tableWrap.scrollLeft = this.leftDistance;
        for (let i = 0, len = fixHd.length; i < len; i++) {
          fixHd[i].style.top = `${this.topDistance}px`;
        }
        for (let j = 0, len = fixCol.length; j < len; j++) {
          fixCol[j].style.left = `${this.leftDistance}px`;
        }
      },
      menuClick(command, menu, model) {
        const that = this,
          params = {
            carrierOrgName: that.params.carrierOrgName,
            billCode: that.params.billCode
          };
        if (command === 'remove') {
          params.codeList = model.code;
          this.$msgbox({
            title: '提示',
            message: `您确认把运单${model.waybillNo}移出吗？移出后该运单将不再已选运单列表中。`,
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                settlePayableWaybillRemove(params, (success, error) => {
                  this.$refs.eleTable.batchSelect = false;
                  this.getData();
                  if (success) {
                    this.$message({
                      type: 'success',
                      message: '移出成功',
                      duration: 1000
                    });
                    done();
                    instance.confirmButtonLoading = false;
                    this.$emit('unselect');
                  }
                  if (error) {
                    this.$message({
                      type: 'warning',
                      message: `${error.content}`,
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
          });
        }
      },
      deleteSelected() {
        const that = this,
          params = {
            carrierOrgName: that.params.carrierOrgName,
            billCode: that.params.billCode
          },
          selectList = [];
        this.listData.forEach((item) => {
          if (item.checked) {
            selectList.push(item.code);
          }
        });
        if (!selectList.length) {
          this.$message({
            type: 'warning',
            message: '请选择您要移出的运单！',
            duration: 1000
          });
          return;
        }
        params.codeList = selectList.join(',');
        this.$msgbox({
          title: '提示',
          message: `共选中${selectList.length}条，您确认移出这些运单吗？移出后这些运单将不再已选运单列表中。`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              settlePayableWaybillRemove(params, (success, error) => {
                this.$refs.eleTable.batchSelect = false;
                this.getData();
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '移出成功',
                    duration: 1000
                  });
                  done();
                  instance.confirmButtonLoading = false;
                  this.$emit('unselect');
                }
                if (error) {
                  this.$message({
                    type: 'warning',
                    message: `${error.content}`,
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
        });
      },
      clearSelected() {
        const that = this,
          params = {
            carrierOrgName: that.params.carrierOrgName,
            billCode: that.params.billCode
          };
        this.$msgbox({
          title: '提示',
          message: '您确认清空当前已选运单列表吗？移出后这些运单将不再已选运单列表中。',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              settlePayableClearSelectedWaybill(params, (success, error) => {
                this.$refs.eleTable.batchSelect = false;
                this.getData();
                if (success) {
                  this.$message({
                    type: 'success',
                    message: '移出成功',
                    duration: 1000
                  });
                  done();
                  instance.confirmButtonLoading = false;
                  this.$emit('unselect');
                }
                if (error) {
                  this.$message({
                    type: 'warning',
                    message: `${error.content}`,
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
        });
      },
      getData() {
        const that = this;
        this.loading = true;
        this.paramObj = {
          size: this.pageSize,
          page: this.page
        };
        Object.keys(that.searchModel).forEach((key) => {
          that.paramObj[key] = that.searchModel[key];
        });
        Object.assign(this.paramObj, that.params);
        settlePayableSelectSelectedWaybillList(this.paramObj, (success, error) => {
          if (error) {
            that.loading = false;
            this.$message({
              type: 'error',
              message: error.content,
              duration: 5000
            });
          }
          if (success) {
            that.listData = success.content;
            that.listData.forEach((row) => {
              const actionList = [];
              actionList.push({ key: 'remove', name: '移出' });
              row.actionMenuList = actionList;
            });
            that.total = success.total;
            this.$nextTick(() => {
              that.loading = false;
              this.resetScrollBar();
            });
          }
        });
      }
    },
    created() {
      // 获取检索区域
      const self = this,
        localStorage = window.localStorage,
        queryParams = getParamsFromURL(window.location.search),
        eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
        eleInfo = JSON.parse(localStorage.getItem('eleInfo'));
      settlePayableWaybillSearch((searchConfig) => {
        if (searchConfig) {
          const paramData = getParam({ data: { content: searchConfig.content } }, eleDefine, eleInfo);
          paramData.field.forEach((field) => {
            field.extraParams.forEach((property) => {
              self.$set(self.searchModel, property.field, queryParams[property.field] ? queryParams[property.field] : null);
            });
          });
          self.searchFields = paramData.field;
          //        this.getData();
        }
        this.searchFieldsDone = true;
      });
      // 获取列名
      settlePayableWaybillColumns((success) => {
        if (success) {
          const resultData = success.content,
            customColumn = this.customColumn,
            newColumns = [];
          if (customColumn && customColumn.length > 0) {
            resultData.forEach((val) => {
              if (customColumn.indexOf(val.fieldConfigCode) > -1) {
                newColumns.push(val);
              }
            });
            const columns = getParam({ data: { content: newColumns } }, eleDefine, eleInfo);
            this.columnsData = columns.field;
            this.columnFieldsDone = true;
          } else {
            const columns = getParam({ data: { content: resultData } }, eleDefine, eleInfo);
            this.columnsData = columns.field;
            this.columnFieldsDone = true;
          }
        }
      });
    },
    mounted() {
      // 重置宽度
      function fixedTable(event) {
        const tableWrap = event.target,
          top = tableWrap.scrollTop,
          left = tableWrap.scrollLeft,
          fixHd = tableWrap.querySelectorAll('.table2 .fix-hd'),
          fixCol = tableWrap.querySelectorAll('.table2 .fix-col'),
          unit = 'px';
        for (let i = 0, len = fixHd.length; i < len; i++) {
          fixHd[i].style.top = top + unit;
        }
        for (let j = 0, len = fixCol.length; j < len; j++) {
          fixCol[j].style.left = left + unit;
        }
      }
      document.querySelectorAll('.table2 .fix-table-wrap').forEach((value) => {
        value.addEventListener('scroll', fixedTable);
      });
      // 检测高度
      this.$nextTick(() => {
        adaptHeight();
        window.onresize = () => {
          adaptHeight();
        };
      });
    }
  };
</script>
