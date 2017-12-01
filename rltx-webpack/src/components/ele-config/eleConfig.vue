/**
* eleConfig.vue
* Created by dsky on 17/6/15.
*/
<template>
  <div class="innerblock">
    <template>
      <ele-hide v-if="field.controlType === 'hide'" :editable="editable" :configData="field" :domainObject="domainObject" :isList="isList"></ele-hide>
      <ele-label v-if="field.controlType === 'label'" :editable="editable" :configData="field" :domainObject="domainObject" :isList="isList"></ele-label>
      <ele-input v-if="field.controlType === 'text'" :editable="editable" :configData="field" :domainObject="domainObject" :rules="validateRule" :isList="isList"></ele-input>
      <ele-tag v-if="field.controlType === 'tag'" :editable="editable" :configData="field" :domainObject="domainObject" :rules="validateRule" :isList="isList"></ele-tag>
      <!-- <ele-tag-select v-if="field.controlType === 'tagSelect'" :editable="editable" :tagData="field" :domainObject="domainObject" :rules="validateRule"></ele-tag-select> -->
      <ele-textarea v-if="field.controlType === 'textarea'" :editable="editable" :configData="field" :domainObject="domainObject" :rules="validateRule" :isList="isList"></ele-textarea>
      <ele-radio v-if="field.controlType === 'radio'" :editable="editable" :configData="field" :domainObject="domainObject" :rules="validateRule" :isList="isList"></ele-radio>
      <ele-checkbox v-if="field.controlType === 'checkbox'" :editable="editable" :configData="field" :domainObject="domainObject" :rules="validateRule" :isList="isList"></ele-checkbox>
      <ele-autocomplete v-if="field.controlType === 'autocomplete'" :editable="editable" :configData="field" :domainObject="domainObject" :rules="validateRule" :isList="isList"></ele-autocomplete>
      <ele-date v-if="field.controlType === 'date'" :editable="editable" :configData="field" :domainObject="domainObject" :rules="validateRule" :isList="isList"></ele-date>
      <ele-image v-if="field.controlType === 'image'" :configData="field" :domainObject="domainObject" :uploadUrl="uploadUrl" :editable="editable" :isList="isList" :rules="validateRule"></ele-image>
      <ele-pop v-if="field.controlType === 'pop'" :editable="editable" :configData="field" :domainObject="domainObject" :rules="validateRule" :isList="isList"></ele-pop>
      <ele-select v-if="field.controlType === 'select'" :editable="editable" :configData="field" :domainObject="domainObject" :rules="validateRule" :isList="isList"></ele-select>
      <ele-number v-if="field.controlType === 'number'" :editable="editable" :configData="field" :domainObject="domainObject" :rules="validateRule" :isList="isList"></ele-number>
      <ele-pop-map v-if="field.controlType === 'pop-map'" :editable="editable" :configData="field" :domainObject="domainObject" :rules="validateRule" :isList="isList"></ele-pop-map>
      <ele-more v-if="field.controlType === 'more'" :editable="editable" :configData="field" :domainObject="domainObject" :isList="isList"></ele-more>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  import eleRadio from '../ele-radio/eleRadio.vue';

  import eleCheckbox from '../ele-checkbox/eleCheckbox.vue';

  import eleInput from '../ele-input/eleInput.vue';

  import eleTextarea from '../ele-textarea/eleTextarea.vue';

  import eleAutocomplete from '../ele-autocomplete/eleAutocomplete.vue';

  import eleDate from '../ele-date/eleDate.vue';

  import eleImage from '../ele-image/eleImage.vue';

  import elePop from '../ele-pop-select/elePopSelect.vue';
//  import elePop from '../ele-pop/elePop.vue';

  import elePopMap from '../ele-pop-map/elePopMap.vue';

  import eleSelect from '../ele-select/eleSelect.vue';

  import eleNumber from '../ele-number/eleNumber.vue';

  import eleTag from '../ele-tag/eleTag.vue';

  // import eleTagSelect from '../ele-tag-select/eleTagSelect.vue';

  import eleMore from '../ele-more/eleMore.vue';

  import eleHide from '../ele-hide/eleHide.vue';

  import eleLabel from '../ele-label/eleLabel.vue';

  export default {
    name: 'eleConfig',
    props: {
      field: Object,
      domainObject: Object,
      uploadUrl: String,
      editable: {
        type: Boolean,
        'default': true
      },
      isList: {
        type: Boolean,
        'default': false
      },
      inputKey: Array
    },
    components: {
      'ele-radio': eleRadio,
      'ele-checkbox': eleCheckbox,
      'ele-input': eleInput,
      'ele-textarea': eleTextarea,
      'ele-autocomplete': eleAutocomplete,
      'ele-date': eleDate,
      'ele-image': eleImage,
      'ele-pop': elePop,
      'ele-pop-map': elePopMap,
      'ele-select': eleSelect,
      'ele-number': eleNumber,
      'ele-tag': eleTag,
      'ele-more': eleMore,
      'ele-hide': eleHide,
      'ele-label': eleLabel
      // 'ele-tag-select': eleTagSelect
    },
    data() {
      return {
        validateRule: []
      };
    },
    created() {
      const controlType = this.field.controlType,
        requireStatus = this.field.required,
        validate = (rule, value, callback) => {
          if (this.field.checkRule && value) {
            if (new RegExp(`^${this.field.checkRule}$`).test(value)) {
              callback();
            } else {
              callback(new Error(this.field.checkMsg || ''));
            }
          } else {
            callback();
          }
        };
      if (controlType === 'text' || controlType === 'textarea' || controlType === 'number') {
        if (requireStatus === 'true') {
          this.validateRule.push({ required: true, trigger: 'blur', message: '不能为空' });
        }
        this.validateRule.push({ validator: validate, trigger: 'blur' });
      }
      if (controlType === 'radio' || controlType === 'checkbox' || controlType === 'data' || controlType === 'select' || controlType === 'autocomplete' || controlType === 'date') {
        if (requireStatus === 'true') {
          this.validateRule.push({ required: true, trigger: 'change', message: '不能为空' });
        }
        this.validateRule.push({ validator: validate, trigger: 'blur' });
      }
    },
    methods: {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
