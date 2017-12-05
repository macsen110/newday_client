/**
* eleInput.vue
* Created by dsky on 17/6/19.
*/
<template>
  <div class="block">
    <span>{{text}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { dealInputKey } from '../../../api/Utils';

  export default {
    name: 'eleLabel',
    props: {
      configData: Object,
      editable: {
        type: Boolean,
        'default': true
      },
      domainObject: Object
    },
    computed: {
      text() {
        if (this.domainObject && this.configData && 'field' in this.configData && this.configData.field in this.domainObject) {
          let modelValue = this.domainObject[this.configData.field];
          if (modelValue !== null && typeof modelValue !== 'undefined' && this.configData.optionsValue) {
            modelValue = modelValue.toString();
            for (let i = 0, len = this.configData.optionsValue.length; i < len; i += 1) {
              if (modelValue === this.configData.optionsValue[i].toString()) {
                modelValue = this.configData.options[i];
                break;
              }
            }
          }
          return modelValue;
//          return this.domainObject[this.configData.field];
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
    },
    updated() {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
