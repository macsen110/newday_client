<template>
    <!-- fix-table-wrap -->
    <div class="fix-table-wrap">
      <table class="rl-fix-table table-bordered">
        <thead>
        <tr>
          <th class="fix-hd fix-col" v-if="selectable">
            <input type="checkbox" class="ck-all" v-if="multiSelect" v-model="batchSelect" @change="selectAll">
            <label v-else="multiSelect">选择</label>
          </th>
          <th class="fix-hd fix-col" v-if="operatable">操作</th>
          <!-- <th class="fix-hd fix-col">ID</th> -->
          <th v-for="column in columnsData" class="fix-hd">
            {{ column.showName }}
          </th>
        </tr>
        </thead>
        <tbody>
          <!--<tr v-for="list in listData" :data-error="list.error">-->
          <ele-tr :isList="true" v-for="(list,index) in listData" :key="index" :data-error="list.error" @emitEleNumber="getEleNumber" @emitEleSelect="getEleSelect">
            <td class="fix-col" v-if="selectable">
              <input type="checkbox" class="ck-single" v-if="multiSelect" v-model="list.checked">
              <el-button v-else="multiSelect" class="el-button--line" @click="handleSelect(list,index)" :disabled="list.code == selectedCode">
                {{ list.code == selectedCode ? '选中' : '选用' }}
              </el-button>
            </td>
            <td class="fix-col" v-if="operatable">
              <div class="cell" v-if="list.actionMenuList && list.actionMenuList.length">
                <ele-menu :handle-select="handleMenuSelect" :menu-items="list.actionMenuList" :domain-object="list"></ele-menu>
              </div>
            </td>

            <td v-for="(column,index) in columnsData">
              <!--{{ getContent(list, column) }}-->
              <template v-if="column.detailLinkVisiable==='true' && editUrl">
                <a href="javascript:;" @click="openWindow(`${editUrl}?code=${list.code}&editable=false`, `${objectName}详情`)" class="blue" :data-link="`${editUrl}?code=${list.code}&editable=false`" :data-title="`${objectName}详情`" :title="`查看${objectName}详情`">
                  <ele-block :field="column" :domainObject="list" :editable="false" :uploadUrl="uploadUrl" :isList="true"></ele-block>
                </a>
              </template>
              <template v-else>
                <ele-block :field="column" :domainObject="list" :editable="list.editable ? list.editable : false" :uploadUrl="uploadUrl" :isList="true"></ele-block>
              </template>
              <!--<ele-config :domainObject="list" v-for="field in column.extraParams" :editable="false" :field="field"></ele-config>-->
            </td>
          </ele-tr>
          <!--</tr>-->
        </tbody>
        <tfoot v-if="footerEnable">
          <ele-total :selectable="selectable" :operatable="operatable" :columnsData="columnsData" :totalNum="totalNum" :totalUnit="totalUnit"></ele-total>
        </tfoot>
      </table>
     </div>
</template>

<script type="text/ecmascript-6">
import eleTr from '../ele-list/eleTr.vue';
/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
import eleConfig from '../ele-config/eleConfig.vue';
import eleBlock from '../ele-block/eleBlock.vue';
import eleMenu from '../ele-menu/eleMenu.vue';
import eleTotal from '../ele-table/eleTotal.vue';
import { urlRedirect } from '../../../api/Utils';

const axios = require('axios');

export default {
  data() {
    return {
      currentSelectedCode: null,
      actionMenuList: [],
      dialogVisible: false,
      dialogTitle: '',
      customColumns: [],
      dialogFormObject: {},
      fields: [],
      editable: true, // 控制页面状态
      loading: true,
      isList: true,
      batchSelect: false,
      totalNum: [],
      totalUnit: []
    };
  },
  components: {
    'ele-config': eleConfig,
    'ele-block': eleBlock,
    'ele-menu': eleMenu,
    'ele-tr': eleTr,
    'ele-total': eleTotal
  },
  props: {
    footerEnable: {
      type: Boolean,
      'default': false
    },
    columnsData: Array,
    listData: Array,
    searchData: Array,
    getData: Function,
    editUrl: '',
    actionUrl: '',
    objectName: '',
    uploadUrl: String,
    selectable: {
      type: Boolean,
      'default': true
    },
    multiSelect: {
      type: Boolean,
      'default': true
    },
    selectedCode: {
      type: String,
      'default': null
    },
    operatable: {
      type: Boolean,
      'default': true
    }
  },
  methods: {
    getEleNumber(field, num) {
      const obj = {};
      if (!this.totalNum.length) {
        obj[field] = Number(num);
        this.totalNum.push(obj);
      } else {
        const len = this.totalNum.length;
        for (let i = 0; i < len; i += 1) {
          if (field in this.totalNum[i]) {
            this.totalNum[i][field] += Number(num);
            break;
          }
          if (i === len - 1) {
            obj[field] = Number(num);
            this.totalNum.push(obj);
          }
        }
      }
    },
    getEleSelect(field, text) {
      const obj = {};
      if (!this.totalUnit.length) {
        obj[field] = text;
        this.totalUnit.push(obj);
      } else {
        const len = this.totalUnit.length;
        for (let i = 0; i < len; i += 1) {
          if (field in this.totalUnit[i]) {
            break;
          }
          if (i === len - 1) {
            obj[field] = text;
            this.totalUnit.push(obj);
          }
        }
      }
      // console.log('this.totalUnit: ', this.totalUnit);
    },
    dataChanged() {
      this.batchSelect = false;
    },
    selectAll() {
      console.log('batchSelect', this.batchSelect);
      this.listData.forEach((item) => {
        item.checked = this.batchSelect;
      });
      this.listData.splice(this.listData.length);
    },
    handleMenuSelect(key, menu, model) {
      console.log('handle menu select, key', key, 'menu', menu, 'model', model);
      this.$emit('menuClick', key, menu, model);
    },
    handleSelect(row, index) {
//      this.selectedCode = row.code;
      this.$emit('select', row, index);
    },
    openWindow(url, title) {
      urlRedirect(url, title);
    },
    // getContent(list, column) {
    //   const extraParams = column.extraParams,
    //     params = JSON.parse(extraParams),
    //     field1 = params.field1;
    //   return list[field1];
    // },


    refresh() {
      window.location.reload();
    }
  },
  created() {
    this.currentSelectedCode = this.selectedCode;
  }
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
