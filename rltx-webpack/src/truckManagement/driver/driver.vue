/**
* add.vue
* Created by cc on 17/8/10.
*/
<template>
  <div class="block el-row form-page">
    <div class="el-col el-col-6">
      <div class="el-form-item">
        <label class="el-form-item__label" style="width: 100px;">主驾姓名</label>
        <div class="el-form-item__content" style="margin-left: 100px;">
          <span v-show="!changeStatus1">{{ driver.name }}</span>
          <a href="javascript:;" v-show="changeStatus1" @click="openWindow(`${editUrl}?code=${driver.code}&editable=false`, `${objectName}详情`)" class="blue" :data-link="`${editUrl}?code=${driver.code}&editable=false`" :data-title="`${objectName}详情`" :title="`查看${objectName}详情`">
            {{ driver.name }}
          </a>
          <div class="add" v-if="!driver.name && editable">
            <span @click="addDriver('driver')" class="btn-link">添加</span>
          </div>
          <div class="change" v-if="driver.name && editable">
            <span @click="changeDriver('driver')" class="btn-link">更换</span> |
            <span @click="deletDriver('driver')" class="btn-link">去除</span>
          </div>
        </div>
      </div>
    </div>
    <div class="el-col el-col-6">
      <div class="el-form-item">
        <label class="el-form-item__label" style="width: 100px;">手机号</label>
        <div class="el-form-item__content" style="margin-left: 100px;">
          <span>{{ driver.phone }}</span>
        </div>
      </div>
    </div>
    <div class="el-col el-col-6">
      <div class="el-form-item">
        <label class="el-form-item__label" style="width: 100px;">副驾姓名</label>
        <div class="el-form-item__content" style="margin-left: 100px;">
          <span v-show="!changeStatus2">{{ viceDriver.name }}</span>
          <a href="javascript:;" v-show="changeStatus2" @click="openWindow(`${editUrl}?code=${viceDriver.code}&editable=false`, `${objectName}详情`)" class="blue" :data-link="`${editUrl}?code=${viceDriver.code}&editable=false`" :data-title="`${objectName}详情`" :title="`查看${objectName}详情`">
            {{ viceDriver.name }}
          </a>
          <div class="add" v-if="!viceDriver.name">
            <span @click="addDriver('viceDriver')" class="btn-link">添加</span>
          </div>
          <div class="change" v-if="viceDriver.name">
            <span @click="changeDriver('viceDriver')" class="btn-link">更换</span> |
            <span @click="deletDriver('viceDriver')" class="btn-link">去除</span>
          </div>
        </div>
      </div>
    </div>
    <div class="el-col el-col-6">
      <div class="el-form-item">
        <label class="el-form-item__label" style="width: 100px;">手机号</label>
        <div class="el-form-item__content" style="margin-left: 100px;">
          <span>{{ viceDriver.phone }}</span>
        </div>
      </div>
    </div>
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
            <tr v-for="(list, index) in listData" :key="index">
              <td class="fix-col">
                <el-button type="primary" @click="setData(list)">选择</el-button>
                <el-button type="primary">删除</el-button>
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
import {
  list as transportList,
  add as transportAdd,
  edit as transportEdit
} from '../../../api/TransportService';
// import { list as truckList } from '../../../api/TruckService';
import {
  getParam,
  getParamsFromURL
} from '../../../api/Utils';
// import PublicArea from '../../../api/PublicArea';
// import eleBlock from '../../components/ele-block/eleBlock.vue';
import page from '../../components/ele-table/elePage.vue';

export default {
  name: 'elePop',
  props: {
    popData: Object
  },
  data() {
    return {
      editUrl: '/driver/add.html',
      changeStatus1: false,
      changeStatus2: false,
      transportData: {},
      editable: false,
      driver: {
        name: '',
        phone: '',
        code: ''
      },
      viceDriver: {
        name: '',
        phone: '',
        code: ''
      },
      dialogTableVisible: false,
      columnsData: [],
      target: '',
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
      objectName: '司机'
    };
  },
  components: {
    // 'ele-block': eleBlock
    'v-page': page
  },
  methods: {
    init() {

    },
    updateTransport(params) {
      console.log('params: ', params);
      console.log('this.transportData: ', this.transportData);
      console.log('query: ', Object.assign(this.transportData, params));
      if (this.transportData.code) {
        transportEdit(this.transportData.code, Object.assign(this.transportData, params), (res) => {
          console.log('res: ', res);
        });
      } else {
        params.mainTruckCode = this.popData.mainTruckCode;
        params.mainTruckLicenseNo = this.popData.mainTruckLicenseNo;
        params.powerType = this.popData.powerType;

        transportAdd(Object.assign(this.transportData, params), (res) => {
          console.log('res: ', res);
        });
      }
    },
    addDriver(target) {
      this.target = target;
      this.initTable();
    },
    changeDriver(target) {
      this.target = target;
      this.initTable();
    },
    deletDriver(target) {
      this[target].name = '';
      this[target].phone = '';
      this[target].code = '';
      const params = {};
      if (target === 'driver') {
        params.driverFullName = '';
        params.driverCode = '';
        params.driverPhone = '';
      }
      if (target === 'viceDriver') {
        params.viceDriverFullName = '';
        params.viceUserCode = '';
        params.viceDriverPhone = '';
      }
      this.updateTransport(params);
    },
    initTable() {
      this.dialogTableVisible = true;
      this.$nextTick(() => {
        this.getList();
        this.getColumns();
      });
    },
    dialogOpen() { },
    pageRefresh() {
      this.resetForm();
      this.getList();
    },
    change(newPage, newPageSize) {
      this.param.size = newPageSize;
      this.param.page = newPage;
      this.getList();
    },
    setData(list) {
      this.dialogTableVisible = false;
      console.log('target: ', this.target);
      // this.itemData.forEach((val) => {
      //   if (code === val.id) {
      //     console.log(code);
      //   }
      // });
      this[this.target].name = list.fullName;
      this[this.target].phone = list.phone;
      this[this.target].code = list.code;
      const params = {};
      if (this.target === 'driver') {
        params.driverFullName = this[this.target].name;
        params.driverCode = this[this.target].code;
        params.driverPhone = this[this.target].phone;
      }
      if (this.target === 'viceDriver') {
        params.viceDriverFullName = this[this.target].name;
        params.viceUserCode = this[this.target].code;
        params.viceDriverPhone = this[this.target].phone;
      }
      this.updateTransport(params);
      console.log(list);
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
    // getAddUrl(objectName) {
    //   return DataSourceService[this.popData.datasource].getAddUrl(objectName);
    // },
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
        this.columnsData = data;
      });
    },
    getSearch() {
      const localStorage = window.localStorage,
        eleDefine = JSON.parse(localStorage.getItem('eleDefine')),
        eleInfo = JSON.parse(localStorage.getItem('eleInfo'));
      DataSourceService[this.popData.datasource].getSearch((data) => {
        const paramData = getParam({
          data
        }, eleDefine, eleInfo);
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
    // window.rns[this.popData.field] = this;
    // const event = new Event('loadEleDone');
    // document.dispatchEvent(event);
    const code = getParamsFromURL(window.location.search).code,
      baseParams = {
        page: 1,
        size: 1
      },
      params = Object.assign({
        mainTruckCode: code
      }, baseParams);
    this.editable = getParamsFromURL(window.location.search).editable;
    transportList(params, (data) => {
      if (data.content.length) {
        this.changeStatus2 = true;
        const result = data.content[0];
        this.transportData = result;
        if (result.driverFullName) {
          this.changeStatus1 = true;
          this.driver.name = result.driverFullName;
          this.driver.phone = result.driverPhone;
          this.driver.code = result.driverCode;
        }
        if (result.viceDriverFullName) {
          this.changeStatus2 = true;
          this.viceDriver.name = result.viceDriverFullName;
          this.viceDriver.phone = result.viceDriverPhone;
          this.viceDriver.code = result.viceUserCode;
        }
      }
    });
  },
  beforeCreate() { }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../assets/sass/rl-table.scss";
.change {
  display: inline-block;
  margin-left: 5px;
}
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

.btn-link {
  color: #0178be;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
