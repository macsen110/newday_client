/**
* eleQuote.vue
* Created by cc on 17/9/13.
*/
<template>
  <div>
    <div class="innerblock selectQuote">
      <ele-radio :editable="editable" :configData="radioData" :domainObject="domainObject" @change="changeHandle" :rules="radioDataRule"></ele-radio>
      <ele-input :editable="editable" :configData="inputData" :domainObject="domainObject" v-show="isQuote" :rules="inputDataRule"></ele-input>
      <ele-select ref="select" :editable="editable" :configData="autoData" :domainObject="domainObject" :rules="autoDataRule"></ele-select>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import eleRadio from '../ele-radio/eleRadio.vue';
  import eleInput from '../ele-input/eleInput.vue';
  import eleSelect from '../ele-select/eleSelect.vue';


  export default {
    name: 'eleQuote',
    data() {
      return {
        radioData: {},
        inputData: {},
        autoData: {},
        isQuote: true,
        text: '',
        radioDataRule: [],
        inputDataRule: [],
        autoDataRule: []
      };
    },
    props: {
      quoteData: Array,
      editable: {
        type: Boolean,
        'default': true
      },
      domainObject: Object
    },
    components: {
      'ele-radio': eleRadio,
      'ele-input': eleInput,
      'ele-select': eleSelect
    },
    methods: {
      getRadioText() {
        let modelValue = this.domainObject[this.radioData.field];
        if (modelValue !== null && typeof modelValue !== 'undefined' && this.radioData.optionsValue) {
          modelValue = modelValue.toString();
          for (let i = 0, len = this.radioData.optionsValue.length; i < len; i += 1) {
            if (modelValue === this.radioData.optionsValue[i].toString()) {
              modelValue = this.radioData.options[i];
              break;
            }
          }
        }
        return modelValue;
      },
      getInputText() {
        return this.domainObject[this.inputData.field];
      },
      getSelectText() {
        return this.$refs.select.getText();
      },
      changeHandle(val) {
        // console.log('change val is', val);
        if (val === 'price') {
          this.isQuote = true;
          this.inputDataRule.push({ required: true, trigger: 'blur', message: '不能为空' });
        } else {
          this.isQuote = false;
          this.inputDataRule = [];
        }
      }
    },
    created() {
      // console.log('this quoteData is:', this.quoteData);
      this.radioData = this.quoteData[0];
      this.inputData = this.quoteData[1];
      this.autoData = this.quoteData[2];

      if (this.radioData.required === 'true') {
        this.radioDataRule.push({ required: true, trigger: 'change', message: '不能为空' });
      }
      if (this.inputData.required === 'true') {
        this.inputDataRule.push({ required: true, trigger: 'blur', message: '不能为空' });
      }
      if (this.autoData.required === 'true') {
        this.autoDataRule.push({ required: true, trigger: 'change', message: '不能为空' });
      }

      // console.log('quoteData is', this.quoteData);
      // const event = new Event('loadEleDone');
      // document.dispatchEvent(event);
      // document.dispatchEvent(event);
      // document.dispatchEvent(event);
      // this.$nextTick(() => {
      //   if (this.editable === false) {
      //     this.text = this.getRadioText() + this.getInputText() + this.getSelectText();
      //   }
      // });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .selectQuote {
    .el-form-item {
      display: inline-block;
    }
    .block {
      display: inline-block;
      margin-left: 6px;
    }
    .el-input {
      width: 90px !important;
    }
  }
</style>
