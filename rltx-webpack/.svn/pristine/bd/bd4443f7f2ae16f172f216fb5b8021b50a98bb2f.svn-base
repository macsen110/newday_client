/**
* eleAutocomplete.vue
* Created by dsky on 17/6/20.
*/
<template>
  <div class="block">
    <el-form-item :prop="this.configData.field" :rules="rules" v-if="!isList && editable">
      <el-select
        v-model="domainObject[configData.field]"
        placeholder="请选择"
        clearable
        @change="handleSelect"
        v-if="editable">
        <el-option
          v-for="item in selectData"
          :key="item.id"
          :label="item.value"
          :value="item.id">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
    </el-form-item>
    <template v-if="isList && editable">
      <el-select
        v-model="domainObject[configData.field]"
        placeholder="请选择"
        clearable
        @change="handleSelect">
        <el-option
          v-for="item in selectData"
          :key="item.id"
          :label="item.value"
          :value="item.id">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
    </template>
    <span v-if="editable === false">{{text}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as DataSourceService from '../../../api/DataSourceService';
  import * as utils from '../../../api/Utils';
  import PublicArea from '../../../api/PublicArea';

  const merge = require('webpack-merge');

  export default {
    props: {
      isList: Boolean,
      configData: Object,
      editable: {
        type: Boolean,
        'default': true
      },
      domainObject: Object,
      rules: Array
    },
    data() {
      return {
        selectData: [],
        state: '',
        ready: false,
        text: '',
        timeout: null,
        params: {},
        initValue: null
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
      loadData(cb) {
        if (this.configData && this.configData.options && this.configData.optionsValue) {
          const optionValues = this.configData.optionsValue,
            optionLabels = this.configData.options,
            optionArray = [];
          for (let i = 0; i < optionValues.length; i += 1) {
            optionArray.push({ 'value': optionLabels[i], 'id': optionValues[i] });
          }
          cb(optionArray);
        } else if (this.configData.datasource) {
          const dataSources = this.configData.datasource.split(',');
          if (DataSourceService[dataSources[0]]) {
            DataSourceService.getAll(dataSources, this.params, cb);
          }
        } else {
          cb(null);
        }
      },
      dataReady(options) {
        this.selectData = options;
        this.ready = true;
        this.refreshSelect();
      },
      handleSelect(item) {
        if (item) {
          const outputKey = this.configData.outputKey,
            selectedOption = this.selectData.find(option => option.id === item);
//          console.log('config', this.configData, 'options', this.selectData, 'item', item);
          this.text = selectedOption.value;
          if (outputKey && this.selectData) {
            if (outputKey && selectedOption.data) {
              console.log('output', outputKey, selectedOption.data);
              PublicArea.set(outputKey, selectedOption.data);
            }
          }
        }
        this.$emit('change', item);
      },
      refreshSelect() {
//        console.log('field', this.configData.field, 'value', this.domainObject[this.configData.field], 'options', this.selectData);
        if (this.selectData) {
          this.selectData.forEach((value) => {
            if (value.id === this.domainObject[this.configData.field]) {
              this.text = value.value;
            }
          });
        }
      },
      onRefresh(params) {
//        console.log('field', this.configData.field, 'on refresh', params);
        if (params.datasource) {
          let datasource,
            result;
          datasource = params.datasource;

          /* eslint-disable no-cond-assign */
          while ((result = /\.([a-z])/.exec(datasource)) !== null) {
            datasource = datasource.replace(result[0], result[1].toUpperCase());
          }
          this.configData.datasource = datasource;
        }
        this.params = merge(this.params, params);
        this.loadData(this.dataReady);
      }
    },
    mounted() {
//      this.domainObject[this.configData.field] = this.initValue;
      const form = this.form();
      if (form) {
        form.$emit('eleMounted', this);
        form.$emit('emitEleSelect', this.configData.field, this.text);
      }
    },
    created() {
      const form = this.form();
      if (form) {
        form.$emit('eleCreated', this);
      }
      this.initValue = this.domainObject[this.configData.field] === null || isNaN(this.domainObject[this.configData.field]) ?
        this.domainObject[this.configData.field] : this.domainObject[this.configData.field].toString();
//      this.domainObject[this.configData.field] = null;
//      console.log('field', this.configData.field, 'value', this.domainObject[this.configData.field]);
      if (this.configData.inputKey) {
        utils.dealInputKey(this.configData.inputKey, (inputFieldKey, outData) => {
          this.domainObject[this.configData.field] = outData[inputFieldKey];
        });
      }
      if (this.configData.event && this.configData.event !== '' && form) {
        let event = this.configData.event.replace(new RegExp('current', 'g'), '_ele');
        event = event.replace(new RegExp('rns\\[', 'g'), '_form.dispatchEvent(');
        event = event.replace(new RegExp('\\]\\.\\$emit\\(', 'g'), ', ');
        console.log('field', this.configData.field, 'select event', event);
        /* eslint-disable no-new-func */
        const listenerDefine = new Function('_ele', '_form', event);
        listenerDefine(this, form);
      }
      this.loadData(this.dataReady);
      this.$on('refresh', this.onRefresh);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
