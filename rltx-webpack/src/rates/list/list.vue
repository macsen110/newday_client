/**
* list.vue
* 列表税率
* Created by zhuyi on 17/7/21.
*/
<template>
  <div>
    <ele-list :selectable="selectable" :operatable="operatable" :multiSelect="multiSelect" :selectedCode="selectedCode"
              :needAdd="false" :showImportButton="false" :showDownloadTemplate="false" :showExportButton="false"
              @query="query" @ready="query" @action="action" @more="more" @exportData="exportData" @select="handleSelect"
              :total="total" :loading="loading"
              :list-data="listData"
              ref="eleList"
              :customColumn="customColumn"
              :params="params"
              :needPage="needPage"
              :isAdvanced="isAdvanced"
              :downloadErrorData="downloadErrorData"
              :downloadTemplate="downloadTemplate"
              :importUrl="importUrl"
              :editUrl="editUrl"
              :getColumn="getColumn"
              :getList="getList"
              :exportCsv="exportCsv"
              :getSearch="getSearch"
              :objectName="objectName">
    </ele-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import eleList from '../../components/ele-list/eleList.vue';
  import { urlRedirect } from '../../../api/Utils';
  import { getColumn, list, getSearch } from '../../../api/rateService';
  import * as ApiConst from '../../../api/ApiConst';

  export default {
    name: 'RatesList',
    components: {
      'ele-list': eleList
    },
    props: {
      multiSelect: {
        type: Boolean,
        'default': true
      },
      selectedCode: {
        type: String,
        'default': null
      },
      selectable: {
        type: Boolean,
        'default': true
      },
      operatable: {
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
    data: () => {
      return {
        selectedData: null,
        listData: [],
        total: 0,
        loading: true,
        getColumn,
        getList: list,
        getSearch,
        objectName: '运价',
        downloadErrorData: Function,
        downloadTemplate: Function,
        importUrl: `${ApiConst.apiResourceDomain}/import/rates`,
        exportCsv: Function,
        editUrl: '/rates/add.html',
        listUrl: '/rates/list.html'
      };
    },
    methods: {
      handleSelect(model) {
        this.selectedData = model;
        console.log('select', model);
//        this.$emit('select', true, model);
      },
      openWindow(url, title) {
        urlRedirect(url, title);
      },
      more(model) {
//        console.log('more', `${this.listUrl}?objectName=${this.objectName}&${this.toParameterArray(model).join('&')}`);
        this.openWindow(`${this.listUrl}?objectName=${this.objectName}&${this.toParameterArray(model).join('&')}`, `${this.objectName}列表`);
      },
      toParameterArray(model) {
        const params = [];
        Object.keys(model).forEach((key) => {
          params.push(`${key}=${encodeURIComponent(model[key])}`);
        });
        return params;
      },
      action(command, menu, model) {
        console.log('action command', command, 'menu', menu, 'model', model);
        switch (command) {
          case 'add':
            this.openWindow(`${this.editUrl}?objectName=${this.objectName}`, `新建${this.objectName}`);
            break;
          case 'edit':
            this.openWindow(`${this.editUrl}?code=${model.code}&objectName=${this.objectName}`, `编辑${this.objectName}`);
            break;
          case 'detail':
            this.openWindow(`${this.editUrl}?code=${model.code}&objectName=${this.objectName}&editable=false`, `${this.objectName}详情`);
            break;
          case 'remove':
            this.doRemove(model);
            break;
          default:
            break;
        }
      },
      exportData(params) {
        console.log(params);
        // exportCsv(params, (success) => {
        //   window.location.href = success.content.url;
        // });
      },
      query(searchParams) {
        console.log('searchParams', searchParams);
        Object.assign(searchParams, this.params);
        console.log('query', searchParams);
        const self = this;
        this.total = 0;
        this.loading = true;
        list(searchParams, (success, error) => {
          if (error) {
            this.$message({
              type: 'error',
              message: error.content,
              duration: 5000
            });
          }
          if (success) {
            this.total = success.total;
            success.content.forEach((data) => {
              const actionList = [];
              actionList.push({ key: 'detail', name: '查看详情' });
              data.actionMenuList = actionList;
            });
            self.listData = success.content;
            this.loading = false;
//              self.listData.splice(self.listData.length);
            console.log('parent.listData', self.listData);
          }
        });
      }
    },
    created() {
      this.$on('submit', (e) => {
        console.log('on submit', e);
        this.$emit('done', true, this.selectedData);
      });
      this.$on('cancel', (e) => {
        console.log('on cancel', e);
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/sass/rl-fixed-table.min.scss";
  @import "../../assets/sass/base.scss";
</style>
