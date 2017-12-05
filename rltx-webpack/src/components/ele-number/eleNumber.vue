/**
* eleNumber.vue
* Created by dsky on 17/6/19.
*/
<template>
  <div class="block">
    <el-form-item v-if="!isList && editable" :prop="this.configData.field" :rules="rules">
      <el-input
        v-model="domainObject[configData.field]"
        :name="configData.field"
        :class="configData.field"
        :maxlength="configData.maxLength"
        :readonly="configData.readonly ? true : false"
        :placeholder="configData.placeholder?configData.placeholder:'请填写数字'"
        @focus="handleFocus"
        @change="handleChange"
        :disabled="configData.readonly==='readonly'"></el-input>
    </el-form-item>
    <template v-if="isList && editable">
      <el-input
        v-model="domainObject[configData.field]"
        :name="configData.field"
        :class="configData.field"
        :maxlength="configData.maxLength"
        :readonly="configData.readonly ? true : false"
        :placeholder="configData.placeholder?configData.placeholder:'请填写数字'"
        @focus="handleFocus"
        @change="handleChange"
        :disabled="configData.readonly==='readonly'"></el-input>
    </template>
    <span v-if="editable === false">{{text}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { dealInputKey } from '../../../api/Utils';

  export default {
    name: 'eleNumber',
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
    mounted() {
      const form = this.form();
      if (form) {
        form.$emit('eleMounted', this);
        form.$emit('emitEleNumber', this.configData.field, this.text);
      }
    },
    created() {
      const form = this.form();
      if (form) {
        form.$emit('eleCreated', this);
      }
      // console.log(this.configData.field);
      this.configData.maxLength = this.configData.maxLength ? Number(this.configData.maxLength) : 1000;
      if (this.configData.inputKey) {
        dealInputKey(this.configData.inputKey, (inputFieldKey, outData) => {
          this.domainObject[this.configData.field] = outData[inputFieldKey];
        });
      }
      // const event = new Event('loadEleDone');
      // document.dispatchEvent(event);
    },
    computed: {
      text() {
        if (this.domainObject && this.configData && this.configData.field in this.domainObject) {
          return this.domainObject[this.configData.field];
        }
        return '';
      }
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

      },
      handleFocus() {
//        this.$forceUpdate();
      },
      handleChange(val) {
        if (isNaN(val)) {
          const len = val.length,
            text = val.substr(0, len - 1);
          this.$nextTick(() => {
            this.domainObject[this.configData.field] = text;
          });
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
