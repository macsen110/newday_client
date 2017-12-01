<template>
  <div>
    <el-button @click="select()" v-if="editable">选择</el-button>
    <ele-dialog ref="dialog" :title="objectName" @done="handleDone">
      <component ref="list" :is="listElement" :selectable="true" :operatable="false" :multiSelect="false" :selectedCode="selectedCode"
                :showImportButton="false" :showDownloadTemplate="false" :showExportButton="false" :isHide="true"
                @query="query" @select="handleClick"
                :total="total" :loading="loading" :list-data="listData"
                :needPage="true" :isAdvanced="false"
                :needAdd="true" :editUrl="editUrl" :addUrl="addUrl"
                :getColumn="getColumns" :getSearch="getSearch"
                :objectName="objectName">
      </component>
    </ele-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import eleDialog from '../ele-dialog/eleDialog.vue';
//  import eleList from '../ele-list/eleList.vue';
  import * as DataSourceService from '../../../api/DataSourceService';
  import PublicArea from '../../../api/PublicArea';

  export default {
    components: {
      'ele-dialog': eleDialog
    },
    props: {
      configData: Object,
      editable: {
        type: Boolean,
        'default': true
      },
      handleSelect: {
        type: Function,
        'default': null
      },
      domainObject: Object
    },
    data() {
      return {
        listElement: 'eleList',
        selectedCode: null,
        selectedModel: null,
        editUrl: '',
        addUrl: '',
        objectName: '',
        total: 0,
        loading: true,
        params: {},
        listData: []
      };
    },
    methods: {
      init() {
        try {
          const sources = this.configData.datasource.split(','),
            dataSource = DataSourceService[sources[0]];
          this.objectName = dataSource.getObjectName();
          this.addUrl = dataSource.getAddUrl(this.objectName);
          this.editUrl = dataSource.getEditUrl(this.objectName);
        } catch (e) {
          console.log('pop select init error', e, 'config', this.configData);
        }
        this.selectedCode = this.domainObject[this.configData.field];
      },
      form() {
        let parent = this.$parent;
        if (parent) {
          while (parent && parent.$options && parent.$options.componentName !== 'eleForm') {
            parent = parent.$parent;
          }
          return parent;
        }
        return null;
      },
      onRefresh(params) {
        console.log('params', params);
        this.params = params;
      },
      query(searchParams) {
        console.log('searchParams', searchParams);
        Object.assign(searchParams, this.params);
        console.log('query', searchParams);
        this.total = 0;
        this.loading = true;
        this.getList(searchParams, (success, error) => {
          if (error) {
            this.$message({
              type: 'error',
              message: error.content,
              duration: 5000
            });
          }
          if (success) {
            this.total = success.total;
            this.listData = success.content;
            this.loading = false;
          }
        });
      },
      getList(params, cb) {
        const sources = this.configData.datasource.split(',');
        DataSourceService.getAllListData(sources, params, cb);
      },
      getColumns(cb) {
        const sources = this.configData.datasource.split(',');
        DataSourceService[sources[0]].getColumns(cb);
      },
      getSearch(cb) {
        const sources = this.configData.datasource.split(',');
        DataSourceService[sources[0]].getSearch(cb);
      },
      select() {
        this.$refs.dialog.open();
        this.$nextTick(() => {
          this.$refs.list.dispatchQueryEvent();
          this.$refs.list.$on('submit', this.handleSubmit);
        });
      },
      handleSubmit() {
        this.$refs.list.$emit('done', true, this.selectedModel);
      },
      handleClick(model) {
        this.selectedModel = model;
        this.$refs.dialog.submit();
      },
      onSelect(model) {
        this.handleDone(model);
      },
      handleDone(model) {
        if (this.$refs.list) {
          this.$refs.list.$off('submit', this.handleSubmit);
        }
        if (model) {
          if (this.handleSelect) {
            this.handleSelect(model);
          } else {
            this.domainObject[this.configData.field] = model.code;
            this.selectedCode = this.domainObject[this.configData.field];
            if (this.configData.outputKey) {
              const outputKey = this.configData.outputKey;
              console.log('output', outputKey, 'value', model);
              PublicArea.set(outputKey, model);
            }
          }
        }
        this.$emit('change', model);
      }
    },
    beforeCreate() {
      /* eslint-disable global-require */
      this.$options.components.eleList = require('../ele-list/eleList.vue');
    },
    mounted() {
      const form = this.form();
      if (form) {
        form.$emit('eleMounted', this);
      }
    },
    created() {
      const form = this.form();
      if (form) {
        form.$emit('eleCreated', this);
      }
      if (this.configData.event && this.configData.event !== '' && form) {
        let event = this.configData.event.replace(new RegExp('current', 'g'), '_ele');
        event = event.replace(new RegExp('rns\\[', 'g'), '_form.dispatchEvent(');
        event = event.replace(new RegExp('\\]\\.\\$emit\\(', 'g'), ', ');
        console.log('field', this.configData.field, 'pop select event', event);
        /* eslint-disable no-new-func */
        const listenerDefine = new Function('_ele', '_form', event);
        listenerDefine(this, form);
      }
      this.$on('refresh', this.onRefresh);
      this.$on('select', this.onSelect);
    }
  };
</script>
