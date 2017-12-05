/**
* list.vue
* 变更记录
* Created by zhuyi on 17/7/21.
*/
<template>
  <div id="template" class="list-page">
    <div class="list-wrap">
      <div class="page-header clearfix" v-if="isAdvanced">
        <h2 class="page-title fl">
          变更记录
        </h2>
        <span class="page-refresh fr" id="pageRefresh">
          <i class="ico-refresh"></i>刷新
        </span>
      </div>
      <v-table :columnsData="columnsData" :listData="listData" :selectable="false" :operatable="false" :toDetail="false" v-loading.fullscreen.lock="loading">
      </v-table>
      <v-page :page="page" :pageSize="pageSize" :total="total" v-on:change="change" v-if="needPage"></v-page>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import table from '../components/ele-table/eleTable.vue';
  import page from '../components/ele-table/elePage.vue';

  import { list } from '../../api/logService';

  require('../public.js');

  export default {
    name: 'logList',
    components: {
      'v-table': table,
      'v-page': page
    },
    data() {
      return {
        columnsData: [],
        listData: [],
        pageSize: 20,
        page: 1,
        total: null,
        loading: true
      };
    },
    props: {
      domain: '',
      type: '',
      code: '',
      isAdvanced: {
        type: Boolean,
        'default': true
      },
      needPage: {
        type: Boolean,
        'default': true
      }
    },
    methods: {
      getData() {
        const apiDomain = this.domain,
          apiType = this.type,
          apiCode = this.code;
        if (apiDomain && apiType && apiCode) {
          const paraObj = {
            url: `${apiDomain}/${apiType}/${apiCode}/changedata/list`,
            type: apiType,
            code: apiCode,
            size: this.pageSize,
            page: this.page
          };
          // console.log(paraObj);
          list(paraObj, (success) => {
            if (success) {
              const tempData = success.content;
              tempData.forEach((val) => {
                const textMap = val.changeDataContentMap,
                  textType = val.changeType,
                  textDate = val.operateDate,
                  textArray = [];
                val.changeDataContentMap = '';
                val.changeType = '';
                val.operateDate = '';
                Object.keys(textMap).forEach((key) => {
                  const text = `${key}${textMap[key]}`;
                  if (key !== '修改时间') {
                    textArray.push(text);
                  }
                });
                // console.log(textArray);
                // val.changeDataContentMap = textArray.join(',');
                // if (textArray.length === 0) {
                //   textArray.push('没有对信息进行修改');
                // }
                val.changeDataContentMap = textArray;
                switch (textType) {
                  case 'insert':
                    val.changeType = '添加';
                    break;
                  case 'update':
                    val.changeType = '修改';
                    break;
                  case 'delete':
                    val.changeType = '删除';
                    break;
                  default:
                    val.changeType = '';
                    break;
                }
                val.operateDate = textDate.slice(0, 19);
              });
              // console.log('tempData, ', tempData);
              this.listData = tempData;
              this.total = success.total;
              this.columnsData = [
                {
                  showName: '操作人',
                  fieldConfigCode: 'operatorUsername',
                  elementCode: 'label',
                  extraParams: [{
                    controlType: 'label',
                    field: 'operatorUsername'
                  }]
                },
                {
                  showName: '操作时间',
                  fieldConfigCode: 'operateDate',
                  elementCode: 'label',
                  extraParams: [{
                    controlType: 'label',
                    field: 'operateDate'
                  }]
                },
                {
                  showName: '操作动作',
                  fieldConfigCode: 'changeType',
                  elementCode: 'label',
                  extraParams: [{
                    controlType: 'label',
                    field: 'changeType'
                  }]
                },
                {
                  showName: '操作内容',
                  fieldConfigCode: 'changeDataContentMap',
                  elementCode: 'more',
                  extraParams: [{
                    controlType: 'more',
                    field: 'changeDataContentMap'
                  }]
                }
              ];
              // console.log('columnsData为：');
              // console.log(this.columnsData);
              // console.log('listData为：');
              // console.log(success.content);
              this.loading = false;
            }
          });
        }
      },
      change(newPage, newPageSize) {
        this.page = newPage;
        this.pageSize = newPageSize;
        this.getData();
      }
    },
    created() {
      this.getData();
    },
    mounted() {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/rl-fixed-table.min.scss";
  @import "../assets/sass/base.scss";
</style>

