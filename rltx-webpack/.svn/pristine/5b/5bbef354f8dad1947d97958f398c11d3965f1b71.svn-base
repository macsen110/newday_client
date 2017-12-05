/**
* textArea.vue
* Created by dsky on 17/6/19.
*/
<template>
  <div class="block">
    <el-form-item :prop="this.configData.field" :rules="rules" v-if="!isList && editable">
      <el-input type="textarea"
        :name="configData.field"
        :placeholder="configData.placeholder"
        v-model="domainObject[configData.field]"
        :maxlength="configData.maxLength"
        v-if="editable" :disabled="configData.readonly==='readonly'">
      </el-input>
    </el-form-item>
    <template v-if="isList && editable">
      <el-input type="textarea"
                :name="configData.field"
                :placeholder="configData.placeholder"
                v-model="domainObject[configData.field]"
                :maxlength="configData.maxLength"
                :disabled="configData.readonly==='readonly'">
      </el-input>
    </template>
    <span v-if="editable === false">{{domainObject[configData.field]}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { dealInputKey } from '../../../api/Utils';

  export default {
    name: 'eleTextarea',
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
      init() {}
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
      // const event = new Event('loadEleDone');
      // document.dispatchEvent(event);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
