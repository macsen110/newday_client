<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="list" class="list-page">
    <!-- advance search -->
    <div class="advance-search">
      <div class="as-hd clearfix">
        <h3 class="tit fl">高级搜索</h3>
        <span class="as-close fr" id="asClose" @click="closeAdvanceSearch">
            <i class="el-icon-close"></i>
        </span>
      </div>
      <div class="as-bd" id="asBd">
        <v-tableSearch :getData="getData" :searchFields="searchFields" :searchModel="searchModel" :defaultSearchModel="defaultSearchModel" :isShow="false" ref="tableSearch"></v-tableSearch>
      </div>
    </div>

    <div class="list-wrap">
      <div class="page-header clearfix">
        <h2 class="page-title fl">
          {{ objectName }}
        </h2>
        <span>数据范围：{{searchLabel}}</span>
        <span class="page-refresh fr" id="pageRefresh">
          <i class="ico-refresh"></i>刷新
        </span>
      </div>
      <div class="block">
        <div class="table-opr clearfix">
          <div class="mini-search fr" id="miniSearch">
            <v-minTableSearch :getData="getData" :searchFields="searchFields" :searchModel="searchModel" :defaultSearchModel="defaultSearchModel" :isShow="true" ref="tableSearch"></v-minTableSearch>
          </div>
        </div>
        <v-table :getData="getData" :columnsData="columnsData" :listData="listData" :searchData="searchData" :selectable="false" :operatable="false" :toDetail="false" v-loading.fullscreen.lock="loading">
        </v-table>
        <v-page :page="page" :pageSize="pageSize" :total="total" v-on:change="change"></v-page>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import table from '../../components/ele-table/eleTable.vue';
  import tableSearch from '../../components/ele-table/eleTableSearch.vue';
  import page from '../../components/ele-table/elePage.vue';
  import minTableSearch from '../../components/ele-table/eleMinTableSearch.vue';
  import { toggleClass } from '../../../api/classUtil';
  import { elementDefine as getelementDefine, elementInfo as getelementInfo } from '../../../api/ElementService';
  import { dateFormat, getParam, adaptHeight } from '../../../api/Utils';

  // 引入tab跳转
  require('../../public.js');

  export default {
    name: 'reportList',
    components: {
      'v-table': table,
      'v-tableSearch': tableSearch,
      'v-minTableSearch': minTableSearch,
      'v-page': page
    },
    props: {
      getColumn: Function,
      getList: Function,
      getSearch: Function,
      objectName: null,
      extraSearchParamObj: {},
      defaultSearchModel: Object
    },
    data: () => {
      return {
        columnsData: [],
        listData: [],
        searchData: [],
        pageSize: 50,
        page: 1,
        total: null,
        searchFields: [],
        searchModel: {},
        loading: true,
        leftDistance: '',
        topDistance: '',
        searchLabel: ''
      };
    },
    methods: {
      resetScrollBar() {
        const tableWrap = document.querySelector('.fix-table-wrap'),
          fixHd = document.querySelectorAll('.fix-hd'),
          fixCol = document.querySelectorAll('.fix-col');
        tableWrap.scrollTop = this.topDistance;
        tableWrap.scrollLeft = this.leftDistance;
        for (let i = 0, len = fixHd.length; i < len; i++) {
          fixHd[i].style.top = `${this.topDistance}px`;
        }
        for (let j = 0, len = fixCol.length; j < len; j++) {
          fixCol[j].style.left = `${this.leftDistance}px`;
        }
        // console.log('翻页后top应该为', this.topDistance, '翻页后left应该为', this.leftDistance);
        // console.log('翻页后top实际为', tableWrap.scrollTop, '翻页后left实际为', tableWrap.scrollLeft);
      },
      closeAdvanceSearch() {
        const listPage = document.querySelector('#list'),
          miniSearch = document.querySelector('#miniSearch');
        toggleClass(listPage, 'opened');
        toggleClass(miniSearch, 'hide');
      },
      getData() {
        this.listData = [];
        this.total = 0;
        const self = this,
          codeArr = [];
        this.paramObj = {
          size: this.pageSize,
          page: this.page
        };
        Object.keys(this.searchModel).forEach((key) => {
          self.paramObj[key] = self.searchModel[key];
        });
        // 合并传进来的数据作为搜索条件
        if (this.extraSearchParamObj && Object.keys(this.extraSearchParamObj).length > 0) {
          Object.assign(this.paramObj, this.extraSearchParamObj);
        }
        this.getList(this.paramObj, (success) => {
          // console.log(success.content);
          this.listData = success ? success.content : [];
          this.total = success ? success.total : 0;
          this.listData.forEach((data) => {
            codeArr.push(data.code);
          });
          this.$nextTick(() => {
            this.loading = false;
            this.resetScrollBar();
          });
          let searchLabel = '';
          this.searchFields.forEach((field) => {
            searchLabel += searchLabel ? ' ' : '';
            switch (field.elementCode) {
              case 'dateRange':
                if (this.searchModel[field.extraParams[0].field] || this.searchModel[field.extraParams[2].field]) {
                  searchLabel += field.showName;
                  searchLabel += '：';
                  searchLabel += this.searchModel[field.extraParams[0].field] ? dateFormat(this.searchModel[field.extraParams[0].field], 'day') : '∞';
                  searchLabel += field.extraParams[1].default;
                  searchLabel += this.searchModel[field.extraParams[2].field] ? dateFormat(this.searchModel[field.extraParams[2].field], 'day') : '∞';
                }
                break;
              default:
                if (this.searchModel[field.extraParams[0].field]) {
                  searchLabel += field.showName;
                  searchLabel += '：';
                  searchLabel += this.searchModel[field.extraParams[0].field];
                }
            }
          });
          this.searchLabel = searchLabel;
        });
      },
      change(newPage, newPageSize) {
        const tableWrap = document.querySelector('.fix-table-wrap');
        this.topDistance = tableWrap.scrollTop;
        this.leftDistance = tableWrap.scrollLeft;
        // console.log('翻页前保存top为', this.topDistance, '翻页前保存left为', this.leftDistance);
        this.page = newPage;
        this.pageSize = newPageSize;
        this.getData();
      }
    },
    created() {
      // 获取检索区域
      const self = this,
        localStorage = window.localStorage,
        eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
        eleInfo = JSON.parse(localStorage.getItem('eleInfo'));
      this.getSearch((searchConfig) => {
        if (searchConfig) {
          const paramData = getParam({ data: { content: searchConfig.content } }, eleDefine, eleInfo);
          paramData.field.forEach((field) => {
            field.extraParams.forEach((property) => {
              if (property.field) {
                self.$set(self.searchModel, property.field, self.defaultSearchModel ? self.defaultSearchModel[property.field] : null);
              }
            });
          });
          self.searchFields = paramData.field;
          this.getData();
        }
      });
      // 获取列名
      this.getColumn((success) => {
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
  @import "../../assets/sass/rl-fixed-table.min.scss";
  @import "../../assets/sass/base.scss";
  .el-date-editor {
    width: 120px !important;
  }
</style>
