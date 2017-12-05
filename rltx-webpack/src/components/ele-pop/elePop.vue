/**
* elePop.vue
* Created by dsky on 17/6/27.
*/
<template>
  <div class="block">
    <el-button @click="dialogOpen" type="primary" v-if="editable">选择</el-button>
    <el-dialog :title="'选择' + objectName" :visible.sync="dialogTableVisible" v-if="editable" size="large" :close-on-click-modal="false">
      <el-form :model="searchModel" ref="searchModel" label-width="80px" :inline="true" class="text-r">
        <span class="page-refresh fr" @click="pageRefresh">
          <i class="ico-refresh"></i>刷新
        </span>
        <div class="innerblock" v-for="field in searchFields">
          <el-form-item :label="field.showName">
            <el-input v-model="searchModel[field.model]" v-if="field.type==='text'" :placeholder="field.placeholder"></el-input>
            <el-select v-model="searchModel[field.model]" v-if="field.type==='select'">
              <el-option v-for="item in field.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item class="text-r">
          <el-button type="primary" @click="submitForm('searchModel')">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
          <div class="el-button el-button--primary" :data-link="getAddUrl(objectName)" :data-title="'新建' + objectName">新建{{ objectName }}</div>
        </el-form-item>
      </el-form>
      <div class="fix-table-wrap">
        <table class="rl-fix-table table-bordered">
          <thead>
            <tr>
              <th class="fix-hd fix-col text-c" width="100">操作</th>
              <th v-for="column in columnsData" :key="column.fieldConfigCode">
                {{ column.showName }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list, index) in listData" :key="index" :class="{ active : domainObject[configData.field] === itemData[index].name }">
              <td class="fix-col text-c">
                <el-button type="primary" @click="setData(list)">选择</el-button>
                <!-- <div class="el-button el-button--primary" :data-link="getEditUrl(itemData[index].id, objectName)" :data-title="'编辑' + objectName">编辑</div> -->
              </td>
              <td v-for="column in columnsData" :key="column.fieldConfigCode">
                {{ list[JSON.parse(column.extraParams).field1] }}
              </td>
            </tr>
          </tbody>
        </table>
        <v-page :page="searchModel.page" :pageSize="searchModel.size" :total="total" v-on:change="change"></v-page>
      </div>
    </el-dialog>
    <span v-if="editable === false"></span>
  </div>
</template>

<script type="text/ecmascript-6">

import * as DataSourceService from '../../../api/DataSourceService';
// import { getParam } from '../../../api/Utils';
import PublicArea from '../../../api/PublicArea';
// import eleBlock from '../../components/ele-block/eleBlock.vue';
import page from '../../components/ele-table/elePage.vue';

export default {
  name: 'elePop',
  props: {
    configData: Object,
    editable: {
      type: Boolean,
      'default': true
    },
    domainObject: Object
  },
  data() {
    return {
      dialogTableVisible: false,
      columnsData: [],
      listData: [],
      searchData: [],
      itemData: [],
      searchBase: {
        size: 10,
        page: 1
      },
      searchParams: {},
      searchModel: {},
      searchFields: [],
      total: 0,
      addUrl: '',
      editUrl: '',
      objectName: ''
    };
  },
  components: {
    // 'ele-block': eleBlock
    'v-page': page
  },
  methods: {
    init() {
      this.$on('change', (data) => {
        this.setData(data);
      });
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
    resetParams() {
      // console.log('this.searchParams: ', this.searchParams);
      Object.keys(this.searchParams).forEach((key) => {
        this.searchParams[key] = '';
      });
    },
    contactModel(target, ...sources) {
      sources.forEach((source) => {
        Object.assign(target, source);
      });
      return target;
    },
    dialogOpen() {
      this.dialogTableVisible = true;
      this.$nextTick(() => {
        this.getObjectName();
        this.getSearch();
        this.getColumns();
        this.getList();
      });
    },
    pageRefresh() {
      this.resetForm();
      this.getList();
    },
    change(newPage, newPageSize) {
      this.searchBase.size = newPageSize;
      this.searchBase.page = newPage;
      this.contactModel(this.searchModel, this.searchParams, this.searchBase);
      this.getList();
    },
    setData(data) {
      this.dialogTableVisible = false;
      this.resetParams();
      this.contactModel(this.searchModel, this.searchParams, this.searchBase);
      this.itemData.forEach((val) => {
        if (data.code === val.id) {
          this.$set(this.domainObject, this.configData.field, val.name);
        }
      });
      if (this.configData.outputKey) {
        const outputKey = this.configData.outputKey;
        PublicArea.set(outputKey, data);
      }
    },
    submitForm() {
      // console.log('new searchModel is ', this.searchModel);
      this.getList();
    },
    resetForm() {
      this.resetParams();
      this.contactModel(this.searchModel, this.searchParams, this.searchBase);
      this.getList();
      // console.log('resetForm, this.searchModel: ', this.searchModel);
    },
    getEditUrl(code, objectName) {
      return DataSourceService[this.configData.datasource].getEditUrl(code, objectName);
    },
    getAddUrl(objectName) {
      if (this.configData.datasource && DataSourceService[this.configData.datasource]) {
        return DataSourceService[this.configData.datasource].getAddUrl(objectName);
      }
      return '';
    },
    getObjectName() {
      this.objectName = DataSourceService[this.configData.datasource].getObjectName();
    },
    getList() {
      // console.log('getList this.searchModel: ', this.searchModel);
      DataSourceService[this.configData.datasource].getListData(this.searchModel, (success) => {
        if (success) {
          this.listData = [];
          this.itemData = success.autoData;
          this.total = success.total;
          if (this.itemData.length) {
            this.itemData.forEach((val) => {
              this.listData.push(val.data);
            });
          }
        }
      });
    },
    getColumns() {
      DataSourceService[this.configData.datasource].getColumns((data) => {
        this.columnsData = data;
        // console.log('columnsData is ', this.columnsData);
      });
    },
    getSearch() {
      DataSourceService[this.configData.datasource].getSearch((data) => {
        this.searchFields = data;
        data.forEach((value) => {
          this.searchParams[value.model] = '';
        });
        this.searchModel = this.contactModel({}, this.searchParams, this.searchBase);
      });
    }
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
    // console.log('configData is ', this.configData);
//    window.rns[this.configData.field] = this;
//    const event = new Event('loadEleDone');
//    document.dispatchEvent(event);
  },
  beforeCreate() {
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../assets/sass/rl-table.scss";
.el-dialog__body {
  .fix-table-wrap {
    padding: 10px;
    box-sizing: border-box;
    .rl-fix-table {
      margin: 0;
    }
    .pagination {
      padding-left: 0;
    }
  }
  .text-c {
    text-align: center;
  }
  .text-r {
    text-align: right;
  }
  .el-form-item__label {
    text-align: right !important;
  }
}
</style>
