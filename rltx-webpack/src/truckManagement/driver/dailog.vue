/**
* elePop.vue
* Created by dsky on 17/6/27.
*/
<template>
  <div class="block">
    <el-form-item label="主驾姓名：">
      {{ mainDriverName }}
      <div class="add" v-show="!changeStatus1">
        <span @click="addDriver(item, changeStatus1)">添加</span>
      </div>
      <div class="change" v-show="!changeStatus1">
        <span @click="changeDriver(item, changeStatus1)">更换</span> |
        <span @click="deletDriver(item, changeStatus1)">去除</span>
      </div>
    </el-form-item>
    <el-form-item label="手机号：">
      {{ mainDriverPhone }}
    </el-form-item>
    <el-form-item label="副驾姓名：">
      {{ passengerName }}
      <div class="add" v-show="!changeStatus2">
        <span @click="addDriver(item, changeStatus2)">添加</span>
      </div>
      <div class="change" v-show="!changeStatus2">
        <span @click="changeDriver(item, changeStatus2)">更换</span> |
        <span @click="deletDriver(item, changeStatus2)">去除</span>
      </div>
    </el-form-item>
    <el-form-item label="手机号：">
      {{ passengerPhone }}
    </el-form-item>
    <!-- <el-button @click="dialogOpen" type="primary" v-if="editable">点击打开</el-button> -->
    <el-dialog title="请选择司机" :visible.sync="dialogTableVisible" size="large">
      <el-form :model="searchModel" ref="searchModel" label-width="140px" :inline="true" class="text-r">
        <span class="page-refresh fr" id="pageRefresh" @click="pageRefresh">
          <i class="ico-refresh"></i>刷新
        </span>
        <el-form-item label="搜索">
          <el-input v-model="param.keyword"></el-input>
        </el-form-item>
        <el-form-item class="text-r">
          <el-button type="primary" @click="submitForm('searchModel')">查询</el-button>
          <el-button @click="resetForm('searchModel')">重置</el-button>
          <div class="el-button el-button--primary" :data-link="getAddUrl(objectName)" :data-title="'新建' + objectName">新建{{ objectName }}</div>
        </el-form-item>
      </el-form>
      <div class="fix-table-wrap">
        <table class="rl-fix-table table-bordered">
          <thead>
            <tr>
              <th class="fix-hd fix-col">操作</th>
              <th v-for="column in columnsData" :key="column.fieldConfigCode">
                {{ column.showName }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list, index) in listData" :key="index" :class="{ active : domainObject[popData.field] === itemData[index].name }">
              <td class="fix-col">
                <el-button type="primary" @click="setData(list)">选择</el-button>
                <div class="el-button el-button--primary" :data-link="getEditUrl(itemData[index].id, objectName)" :data-title="'编辑' + objectName">编辑</div>
              </td>
              <td v-for="column in columnsData" :key="column.fieldConfigCode">
                {{ list[column.fieldConfigCode] }}
              </td>
            </tr>
          </tbody>
        </table>
        <v-page :page="param.page" :pageSize="param.size" :total="total" v-on:change="change"></v-page>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">

import * as DataSourceService from '../../../api/DataSourceService';
import * as utils from '../../../api/Utils';
import PublicArea from '../../../api/PublicArea';
// import eleBlock from '../../components/ele-block/eleBlock.vue';
import page from '../../components/ele-table/elePage.vue';

export default {
  name: 'elePop',
  props: {
    popData: Object,
    domainObject: Object
  },
  data() {
    return {
      changeStatus1: false,
      changeStatus2: false,
      mainDriverName: '',
      mainDriverPhone: '',
      passengerName: '',
      passengerPhone: '',
      dialogTableVisible: false,
      columnsData: [],
      listData: [],
      searchData: [],
      itemData: [],
      param: {
        size: 10,
        page: 1,
        keyword: ''
      },
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

    },
    addDriver(item, changeStatus) {
      this.dialogTableVisible = true;
      console.log(changeStatus);
    },
    changeDriver(item, changeStatus) {
      this.dialogTableVisible = true;
      console.log(changeStatus);
    },
    deletDriver(item, changeStatus) {
      this.dialogTableVisible = true;
      console.log(changeStatus);
    },
    dialogOpen() {
      this.dialogTableVisible = true;
      this.$nextTick(() => {
        this.getList();
        this.getColumns();
        // this.getSearch();
        // this.getObjectName();
      });
    },
    pageRefresh() {
      this.resetForm();
      this.getList();
    },
    change(newPage, newPageSize) {
      this.param.size = newPageSize;
      this.param.page = newPage;
      this.getList();
    },
    setData(data) {
      this.dialogTableVisible = false;
      this.itemData.forEach((val) => {
        if (data.code === val.id) {
          this.$set(this.domainObject, this.popData.field, val.name);
        }
      });
      if (this.popData.outputKey) {
        const outputKey = this.popData.outputKey;
        PublicArea.set(outputKey, data);
      }
    },
    submitForm() {
      this.getList();
    },
    resetForm() {
      this.param.keyword = '';
    },
    getEditUrl(code, objectName) {
      return DataSourceService[this.popData.datasource].getEditUrl(code, objectName);
    },
    getAddUrl(objectName) {
      return DataSourceService[this.popData.datasource].getAddUrl(objectName);
    },
    // getObjectName() {
    //   this.objectName = DataSourceService[this.popData.datasource].getObjectName();
    // },
    getList() {
      DataSourceService[this.popData.datasource].getListData(this.param, (success) => {
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
      DataSourceService[this.popData.datasource].getColumns((data) => {
        this.columnsData = data.content;
      });
    },
    getSearch() {
      const localStorage = window.localStorage,
        eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
        eleInfo = JSON.parse(localStorage.getItem('eleInfo'));
      DataSourceService[this.popData.datasource].getSearch((data) => {
        const paramData = utils.getParam({ data }, eleDefine, eleInfo);
        // console.log('self.searchData: ', self.searchData);
        paramData.field.forEach((field) => {
          field.extraParams.forEach((property) => {
            if (!(property.field in self.searchModel)) {
              if (property.default) {
                this.$set(this.searchModel, property.field, property.default);
              } else {
                this.$set(this.searchModel, property.field, null);
              }
            }
          });
        });
        this.searchFields = paramData.field;
      });
    }
  },
  created() {
    window.rns[this.popData.field] = this;
    const event = new Event('loadEleDone');
    document.dispatchEvent(event);
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
  .text-r {
    text-align: right;
  }
}
</style>

