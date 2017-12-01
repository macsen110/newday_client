/**
* list.vue
* 围栏记录
* Created by cc on 17/7/21.
*/
<template>
  <div id="list" class="list-page">
    <div class="list-wrap">
      <div class="page-header clearfix">
        <h2 class="page-title fl">
          围栏记录
        </h2>
        <span class="page-refresh fr" id="pageRefresh">
          <i class="ico-refresh"></i>刷新
        </span>
      </div>
      <div class="block">
        <div class="table-opr clearfix">
          <div class="mini-search fr" id="miniSearch">
            <v-minTableSearch :getData="getData" :searchFields="searchFields" :searchModel="searchModel" :isShow="true" ref="tableSearch"></v-minTableSearch>
          </div>
        </div>
        <v-table :columnsData="columnsData" :listData="listData" :selectable="false" :operatable="false" v-loading.fullscreen.lock="loading">
        </v-table>
        <v-page :page="page" :pageSize="pageSize" :total="total" v-on:change="change"></v-page>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import minTableSearch from '../components/ele-table/eleMinSearchOnly.vue';
  import table from '../components/ele-table/eleTable.vue';
  import page from '../components/ele-table/elePage.vue';
  import { elementDefine as getelementDefine, elementInfo as getelementInfo } from '../../api/ElementService';
  import { getParam, adaptHeight } from '../../api/Utils';

  import { list, getSearch, getColumn } from '../../api/FenceService';

  require('../public.js');

  export default {
    name: 'fenceList',
    components: {
      'v-minTableSearch': minTableSearch,
      'v-table': table,
      'v-page': page
    },
    data() {
      return {
        columnsData: [],
        listData: [],
        pageSize: 50,
        page: 1,
        total: null,
        loading: true,
        searchFields: [],
        searchModel: {},
        leftDistance: '',
        topDistance: ''
      };
    },
    methods: {
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
        list(this.paramObj, (success) => {
          const tempData = success.content;
          tempData.forEach((val) => {
            const textType = val.accessType;
            val.accessType = '';
            switch (textType) {
              case 1:
                val.accessType = '进入围栏';
                break;
              case 2:
                val.accessType = '离开围栏';
                break;
              default:
                val.accessType = '';
                break;
            }
          });
          // console.log(success.content);
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
      getSearch((searchConfig) => {
        const self = this;
        if (searchConfig) {
          getelementDefine((elementDefine) => {
            getelementInfo((elementInfo) => {
              const paramData = getParam({ data: { content: searchConfig.content } }, { data: { content: elementDefine.content } }, { data: { content: elementInfo.content } });
              paramData.field.forEach((field) => {
                field.extraParams.forEach((property) => {
                  self.$set(self.searchModel, property.field, null);
                });
              });
              self.searchFields = paramData.field;
            });
          });
          this.getData();
        }
      });
      // 获取列名
      getColumn((success) => {
        if (success) {
          getelementDefine((elementDefine) => {
            getelementInfo((elementInfo) => {
//              console.log('outer success', success);
              const columns = getParam(
                { data: { content: success.content } },
                { data: { content: elementDefine.content } },
                { data: { content: elementInfo.content } }
              );
              this.columnsData = columns.field;
//              console.log('outer columnsData', this.columnsData);
            });
          });
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
      this.$nextTick(() => {
        adaptHeight();
        window.onresize = () => {
          adaptHeight();
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

