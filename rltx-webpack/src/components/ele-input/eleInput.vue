/**
* eleInput.vue
* Created by dsky on 17/6/19.
*/
<template>
  <div class="block">
    <el-form-item :prop="this.configData.field" :rules="rules" v-if="!isList && editable">
      <el-input
        v-model="domainObject[configData.field]"
        :name="configData.field"
        :placeholder="configData.placeholder"
        :maxlength="configData.maxLength"
        :readonly="configData.readonly ? true : false"
        @focus="handleFocus"
        :disabled="configData.readonly==='readonly'"></el-input>
    </el-form-item>
    <template v-if="isList && editable">
      <el-input
        v-model="domainObject[configData.field]"
        :name="configData.field"
        :placeholder="configData.placeholder"
        :maxlength="configData.maxLength"
        :readonly="configData.readonly ? true : false"
        @focus="handleFocus"
        :disabled="configData.readonly==='readonly'"></el-input>
    </template>
    <span v-if="editable === false">{{text}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { dealInputKey } from '../../../api/Utils';

  export default {
    name: 'eleInput',
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
    computed: {
      text() {
        // console.log('input.text', this.domainObject, this.configData, this.editable, this.configData.default);
        if (this.domainObject && this.configData && 'field' in this.configData && this.configData.field in this.domainObject) {
//          console.log('input.text.model');
          return this.domainObject[this.configData.field];
        }
        return this.configData.default ? this.configData.default : '';
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
        this.$forceUpdate();
      }
    },
    beforeCreate() {
//      console.log('beforeCreate domainObject', this.domainObject);
//      console.log('beforeCreate configData', this.configData);
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
      this.configData.maxLength = this.configData.maxLength ? Number(this.configData.maxLength) : 1000;
      if (this.configData.inputKey) {
        dealInputKey(this.configData.inputKey, (inputFieldKey, outData) => {
          this.domainObject[this.configData.field] = outData[inputFieldKey];
        });
      }
//      console.log('create domainObject', this.domainObject);
//      console.log('create configData', this.configData);
      // const event = new Event('loadEleDone');
      // document.dispatchEvent(event);
    },
    updated() {
//      console.log('updated domainObject', this.domainObject);
//      console.log('updated configData', this.configData);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
