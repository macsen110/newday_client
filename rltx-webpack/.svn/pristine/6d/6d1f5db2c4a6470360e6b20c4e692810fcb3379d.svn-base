/**
* eleDate.vue
* Created by dsky on 17/6/20.
*/
<template>
  <div class="block">
    <el-form-item :prop="configData.field" :rules="rules" v-if="!isList && editable">
      <el-date-picker
        v-if="editable"
        :type="dateFormat"
        v-model="model"
        @change="handleChange"
        placeholder="选择日期"
        :class="configData.field"
        :format="configData.format">
      </el-date-picker>
    </el-form-item>
    <template v-if="isList && editable">
      <el-date-picker
        :type="dateFormat"
        v-model="model"
        @change="handleChange"
        placeholder="选择日期"
        :class="configData.field"
        :format="configData.format">
      </el-date-picker>
    </template>
    <span v-if="editable === false">{{domainObject[configData.field]}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { dealInputKey } from '../../../api/Utils';

  export default {
    name: 'eleDate',
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
        dateFormat: 'date',
        model: '',
        sync: true
      };
    },
    computed: {
      text() {
        return this.domainObject[this.configData.field];
      }
    },
    mounted() {
      const form = this.form();
      if (form) {
        form.$emit('eleMounted', this);
      } else {
        // 如果不在ele-form下使用此控件需要手动调用init方法
        this.init();
      }
    },
    created() {
      const form = this.form();
      if (form) {
        form.$emit('eleCreated', this);
      }
//      window.rns[this.configData.field] = this;
      if (this.configData.inputKey) {
        dealInputKey(this.configData.inputKey, (inputFieldKey, outData) => {
          this.domainObject[this.configData.field] = outData[inputFieldKey];
        });
      }
      this.dateFormat = this.configData.format ? 'datetime' : 'date';
      this.model = this.domainObject[this.configData.field];
      // const event = new Event('loadEleDone');
      // document.dispatchEvent(event);
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
      handleChange(val) {
        console.log('changed', val, 'model', this.model);
        this.sync = false;
        this.domainObject[this.configData.field] = val;
      },
      init() {
//        console.log('field', this.configData.field, 'value', this.model);
        this.$watch(`domainObject.${this.configData.field}`, (val) => {
//          console.log('old', oldVal, 'new', val);
          if (this.sync) {
            this.model = val;
          } else {
            this.sync = true;
          }
        });
      }
    },
    watch: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
