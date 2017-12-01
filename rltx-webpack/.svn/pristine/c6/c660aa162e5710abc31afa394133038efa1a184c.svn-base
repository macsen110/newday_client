/**
* list.vue
* 结算公式列表
* Created by cc on 17/10/20.
*/
<template>
  <div id="list" class="list-page">
    <div class="list-wrap">
      <div class="page-header clearfix">
        <h2 class="page-title fl" v-if="isAdvanced">
          {{ objectName }}列表
        </h2>
        <div class="hd-opr fr">
          <a v-if="objectName === '结算公式' && !isAdvanced" href="javascript:;" :data-link="attachmentUrl" data-title="结算公式" class="el-button el-button--primary">查看更多</a>
          <a href="javascript:;" data-link="/expression/add.html" data-title="新建结算公式" class="el-button el-button--primary"><i class="el-icon-plus"></i> 新建{{ objectName }}</a>
        </div>
        <span class="page-refresh fr" id="pageRefresh" v-if="isAdvanced">
          <i class="ico-refresh"></i>刷新
        </span>
      </div>
      <div class="block">
        <div class="table-opr clearfix" v-if="isAdvanced">
          公司切换：
          <el-select v-model="searchModel.ownerOrgCode" placeholder="请选择" @change="handleSelectOrg">
            <el-option
              v-for="item in orgList"
              :key="item.orgCode"
              :label="item.orgName"
              :value="item.orgCode">
            </el-option>
          </el-select>
          <!-- <div class="mini-search fr" id="miniSearch">
            <v-minTableSearch :getData="getData" :searchFields="searchFields" :searchModel="searchModel" :isShow="true" ref="tableSearch"></v-minTableSearch>
          </div> -->
        </div>
        <v-table :selectable="selectable" :customColumn="customColumn" :getData="getData" :deleteFun="deleteFun" :editUrl="editUrl" :actionUrl="actionUrl"
         :columnsData="columnsData" :listData="listData"
         :searchData="searchData" :actionData="actionData" :operValues="operValues" :objectName="objectName" :uploadUrl="uploadUrl"
         v-loading.fullscreen.lock="loading">
        </v-table>
        <v-page :page="page" :pageSize="pageSize" :total="total" v-on:change="change" v-if="needPage"></v-page>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable arrow-body-style */
  // import minTableSearch from '../components/ele-table/eleMinSearchOnly.vue';
  import table from '../components/ele-table/eleTable.vue';
  import page from '../components/ele-table/elePage.vue';
  // import { elementDefine as getElementDefine, elementInfo as getElementInfo } from '../../api/ElementService';
  import { getParam } from '../../api/Utils';

  import { deleted, list, getColumn } from '../../api/ExpressionService';
  import { orgList } from '../../api/DeviceBindService';
  import ApiConst from '../../api/ApiConst';

  require('../public.js');

  export default {
    components: {
      // 'v-minTableSearch': minTableSearch,
      'v-table': table,
      'v-page': page
    },
    props: {
      selectable: {
        type: Boolean,
        'default': true
      },
      customColumn: Array,
      isAdvanced: {
        type: Boolean,
        'default': true
      },
      needPage: {
        type: Boolean,
        'default': true
      },
      params: {
        type: Object,
        'default': function () {
          return {};
        }
      }
    },
    data() {
      return {
        columnsData: [],
        listData: [],
        pageSize: 20,
        page: 1,
        total: null,
        loading: true,
        orgList: [],
        searchFields: [],
        searchModel: {},
        leftDistance: '',
        topDistance: '',
        editUrl: '/expression/add.html',
        deleteFun: deleted,
        actionUrl: '',
        searchData: [],
        actionData: {},
        operValues: {},
        objectName: '结算公式',
        attachmentUrl: '/expression/list.html',
        uploadUrl: `${ApiConst.apiPlatformDomain}`
      };
    },
    methods: {
      getOrgList() {
        orgList((success) => {
          this.orgList = success.content;
          this.orgList.forEach((val) => {
            val.value = val.orgName;
          });
          // console.log('orgList is', success.content);
        });
      },
      querySearchAsyncOrg(queryString, cb) {
        const org = this.orgList,
          results = queryString ? org.filter(this.createStateFilter(queryString)) : org;
        cb(results);
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelectOrg() {
        // this.searchModel.ownerOrgCode = item;
        this.getData();
      },
      adaptHeight() {
        if (document.querySelectorAll('.page-header')[0] && document.querySelectorAll('.table-opr')[0] && document.querySelectorAll('.pagination')[0]) {
          const winHeight = window.innerHeight,
            pageHeader = document.querySelectorAll('.page-header')[0].offsetHeight,
            tableOprHeight = document.querySelectorAll('.table-opr')[0].offsetHeight,
            pageHeight = document.querySelectorAll('.pagination')[0].offsetHeight;
            // console.log(winHeight,pageHeader, tableOprHeight, pageHeight);
          let tableHeight = null;
          tableHeight = winHeight - pageHeader - tableOprHeight - pageHeight - 1;
          document.querySelector('#list').style.height = `${winHeight}px`;
          document.querySelectorAll('.fix-table-wrap')[0].style.height = `${tableHeight}px`;
        }
      },
      resetScrollBar() {
        const tableWrap = document.querySelector('.fix-table-wrap');
        // console.log('翻页后top', this.topDistance);
        // console.log('翻页后left', this.leftDistance);
        tableWrap.scrollTop = this.topDistance;
        tableWrap.scrollLeft = this.leftDistance;
      },
      getData() {
        this.listData = [];
        this.total = 0;
        const self = this;
        this.paramObj = {
          size: this.pageSize,
          page: this.page
        };
        Object.keys(this.searchModel).forEach((key) => {
          self.paramObj[key] = self.searchModel[key];
        });
        Object.assign(this.paramObj, this.params);
        list(this.paramObj, (success) => {
          const tempData = success.content;
          tempData.forEach((val) => {
            const textType = val.transportType,
              textStatus = val.certStatus;
            val.certStatus = '';
            val.transportType = '';
            switch (textType) {
              case 'long_distance':
                val.transportType = '长途运输';
                break;
              case 'short_distance':
                val.transportType = '短途运输';
                break;
              default:
                val.transportType = '';
                break;
            }
            switch (textStatus) {
              case 'unauthenticated':
                val.certStatus = '未认证';
                break;
              case 'authenticating':
                val.certStatus = '认证中';
                break;
              case 'authenticated':
                val.certStatus = '认证成功';
                break;
              case 'failed':
                val.certStatus = '认证失败';
                break;
              default:
                val.certStatus = '';
                break;
            }
          });
          this.listData = tempData;
          this.total = success.total;
          this.$nextTick(() => {
            this.loading = false;
            this.resetScrollBar();
          });
        });
      },
      change(newPage, newPageSize) {
        const tableWrap = document.querySelector('.fix-table-wrap');
        this.topDistance = tableWrap.scrollTop;
        this.leftDistance = tableWrap.scrollLeft;
        // console.log('翻页前top', this.topDistance);
        // console.log('翻页前left', this.leftDistance);
        this.page = newPage;
        this.pageSize = newPageSize;
        this.getData();
      }
    },
    created() {
      // 获取检索区域
      const localStorage = window.localStorage,
        orgCode = JSON.parse(localStorage.getItem('userInfo')).orgCode,
        eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
        eleInfo = JSON.parse(localStorage.getItem('eleInfo'));
      this.getOrgList();
      this.$set(this.searchModel, 'ownerOrgCode', orgCode);
      // this.searchModel.ownerOrgCode = orgCode;
      this.getData();
      // getSearch((searchConfig) => {
      //   if (searchConfig) {
      //     getElementDefine((elementDefine) => {
      //       getElementInfo((elementInfo) => {
      //         const paramData = getParam({ data: { content: searchConfig.content } }, { data: { content: elementDefine.content } }, { data: { content: elementInfo.content } });
      //         paramData.field.forEach((field) => {
      //           field.extraParams.forEach((property) => {
      //             self.$set(self.searchModel, property.field, null);
      //           });
      //         });
      //         self.searchFields = paramData.field;
      //       });
      //     });
      //     this.getData();
      //   }
      // });
      // 获取列名
      getColumn((success) => {
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
            // console.log('newColumns data is', newColumns);
            const columns = getParam({ data: { content: newColumns } }, eleDefine, eleInfo);
            this.columnsData = columns.field;
          } else {
            const columns = getParam({ data: { content: resultData } }, eleDefine, eleInfo);
            this.columnsData = columns.field;
          }
        }
      });
    },
    mounted() {
      // 重置宽度
      function fixedTable() {
        const tableWrap = document.querySelector('.fix-table-wrap'),
          top = tableWrap.scrollTop,
          left = tableWrap.scrollLeft,
          fixHd = document.querySelectorAll('.fix-hd'),
          fixCol = document.querySelectorAll('.fix-col'),
          unit = 'px';
        for (let i = 0, len = fixHd.length; i < len; i++) {
          fixHd[i].style.top = top + unit;
        }
        for (let j = 0, len = fixCol.length; j < len; j++) {
          fixCol[j].style.left = left + unit;
        }
      }
      document.querySelector('.fix-table-wrap').addEventListener('scroll', fixedTable);
      // 检测高度
      const self = this;
      this.$nextTick(() => {
        self.adaptHeight();
        window.onresize = () => {
          self.adaptHeight();
        };
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/rl-fixed-table.min.scss";
  @import "../assets/sass/base.scss";
  #miniSearch {
    .el-input {
      width: 110px;
    }
    .el-form-item .el-form-item {
      margin-right: 0;
    }
    .el-form-item__label {
      padding: 5px;
    }
    .el-input__icon {
      width: 20px;
      right: 5px;
    }
    .el-input__icon+.el-input__inner {
      padding-right: 25px;
    }
    .complex-control-3 .innerblock:nth-child(2) {
      padding: 0 5px;
    }
    .complex-control-3 .el-input {
      width: 170px;
    }
  }
  @media (min-width: 1367px) {
    #miniSearch {
      .el-input {
        width: 180px;
      }
    }
  }
</style>

