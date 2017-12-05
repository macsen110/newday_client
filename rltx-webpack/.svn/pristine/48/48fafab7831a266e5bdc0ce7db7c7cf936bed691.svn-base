<script src="../../../api/httpUtil.js"></script>/**
* eleAutocomplete.vue
* Created by dsky on 17/6/20.
*/
<template>
  <div class="block">
    <el-form-item :prop="this.configData.field" :rules="rules" v-if="!isList && editable">
      <el-autocomplete
        v-if="editable"
        v-model="domainObject[configData.field]"
        :fetch-suggestions="querySearchAsync"
        :placeholder="configData.placeholder"
        ref="auto"
        @select="handleSelect">
      </el-autocomplete>
    </el-form-item>
    <template v-if="isList && editable">
      <el-autocomplete
        v-model="domainObject[configData.field]"
        :fetch-suggestions="querySearchAsync"
        :placeholder="configData.placeholder"
        ref="auto"
        @select="handleSelect">
      </el-autocomplete>
    </template>
    <span v-if="editable === false">
      <template v-if="isDetail">
        <a href="javascript:;" class="blue" :data-link="detailUrl" :data-title="`${objectName}详情`" title="查看详情">
          {{domainObject[configData.field]}}
        </a>
      </template>
      <template v-else>
        {{domainObject[configData.field]}}
      </template>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as DataSourceService from '../../../api/DataSourceService';
  import { dealInputKey } from '../../../api/Utils';
  import PublicArea from '../../../api/PublicArea';

  export default {
    props: {
      isList: Boolean,
      configData: Object,
      domainObject: Object,
      editable: {
        type: Boolean,
        'default': true
      },
      inputKey: Array,
      rules: Array
    },
    data() {
      return {
        autoComplete: [],
        code: '',
        objectName: '',
        isDetail: false,
        detailUrl: '',
//        state: '',
        timeout: null
      };
    },
    methods: {
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
      init() {
        this.$emit('change', this.domainObject[this.configData.field]);
      },
      loadAll() {
        return this.autoComplete;
      },
      querySearchAsync(query, cb) {
        let queryString = query,
          params = {};
        if (this.configData.maxLength && this.editable) {
          if (this.domainObject[this.configData.field] && this.domainObject[this.configData.field].length > this.configData.maxLength) {
            queryString = queryString.substring(0, this.configData.maxLength);
            this.domainObject[this.configData.field] = queryString;
            this.$refs.auto.$refs.input.setCurrentValue(queryString);
          }
        }
//        console.log(this.configData.datasource);
        const key = this.$parent.$parent.$children[1].field.field,
          dataSources = this.configData.datasource.split(',');
        if (queryString) {
          params = { keyword: queryString };
        } else {
          params = { keyword: '' };
        }
        DataSourceService.getAll(dataSources, params, (success) => {
          if (success) {
            const autoComplete = success;
            let results = queryString ? autoComplete.filter(this.createStateFilter(queryString)) : autoComplete;
            if (!results.length) {
              this.domainObject[key] = '';
              results = [{ 'value': '暂无数据', 'id': null }];
            }
            cb(results);
          }
        });
      },
      createStateFilter(queryString) {
        return state => state.value.indexOf(queryString) >= 0;
      },
      handleSelect(item) {
        // TODO 输出多个属性
//        (0, eval)(`vm.$children[0].domainObject.${this.configData.field} = "${item.value}"`);
        this.domainObject[this.configData.field] = item.name;
/*        this.$nextTick(() => {
        });*/
        if (this.configData.outputKey) {
          const outputKey = this.configData.outputKey;
          PublicArea.set(outputKey, item.data);
        }
      },
      returnObjName(val) {
        switch (val) {
          case 'truck':
            this.objectName = '车辆';
            break;
          case 'trailer':
            this.objectName = '挂车';
            break;
          case 'driver':
            this.objectName = '司机';
            break;
          case 'partner':
            this.objectName = '伙伴';
            break;
          case 'waybill':
            this.objectName = '运单';
            break;
          case 'route':
            this.objectName = '线路';
            break;
          case 'rates':
            this.objectName = '运价';
            break;
          case 'logistics':
            this.objectName = '订单';
            break;
          case 'transport':
            this.objectName = '运力';
            break;
          case 'tyre':
            this.objectName = '轮胎';
            break;
          default:
            this.objectName = '';
        }
      }
    },
    mounted() {
      const form = this.form();
      if (form) {
        form.$emit('eleMounted', this);
      }
    },
    created() {
      const form = this.form(),
        dataSources = this.configData.datasource.split(',');
      if (form) {
        form.$emit('eleCreated', this);
      }
//      console.log('configData: ', this.configData);
      // console.log('this text ', this.domainObject[this.configData.field]);
      this.$on('select', function (item) {
        this.handleSelect(item);
      });
      // console.log('autocomplete');
      // const dataSources = this.configData.datasource.split(',');
      // document.dispatchEvent(event);
      if (this.configData.controlType === 'autocomplete' && !DataSourceService[dataSources[0]]) {
//        console.error(`error, ${this.configData.field} in DataSourceService is not find`);
        return false;
      }
      // console.log('configData', this.configData);
      if (this.configData.inputKey) {
        dealInputKey(this.configData.inputKey, (inputFieldKey, outData) => {
          this.domainObject[this.configData.field] = outData[inputFieldKey];
        });
      }
      // console.log('this.configData', this.configData);
      // console.log('this.domainObject', this.domainObject);
      // 详情页跳转
      this.$nextTick(() => {
        // console.log('children is', this.$parent.$parent.$children);
        if (this.$parent.$parent.$children[1]) {
          this.code = this.domainObject[this.$parent.$parent.$children[1].field.field]; // 通过父元素拿相邻元素的CODE
          if (this.code) {
            this.returnObjName(this.configData.datasource);
            this.isDetail = true;
            const url = DataSourceService[dataSources[0]].getDetailUrl(this.code, this.objectName);
            this.detailUrl = `${url}?code=${this.code}&editable=false`;
//            this.detailUrl = DataSourceService[dataSources[0]].getDetailUrl(this.code, this.objectName);
          }
        }
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
