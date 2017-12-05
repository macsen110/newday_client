/**
* eleTag.vue
* Created by dsky on 17/10/13.
*/
<template>
  <div class="block">
    <el-form-item :prop="this.tagData.field" :rules="rules" v-if="editable">
      <el-select class="tag-select" v-model="value" multiple filterable allow-create placeholder="请选择" @change="handleSelect">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <span v-if="editable === false">{{text}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
import { dealInputKey } from '../../../api/Utils';

export default {
  name: 'eleTagSelect',
  props: {
    tagData: Object,
    editable: {
      type: Boolean,
      'default': true
    },
    domainObject: Object,
    rules: Array
  },
  data() {
    return {
      options: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
      value: [],
      inputVisible: false,
      inputValue: ''
    };
  },
  computed: {
    text() {
      if (this.domainObject && this.tagData && this.tagData.field in this.domainObject) {
        if (this.domainObject[this.tagData.field] instanceof Array) {
          return this.domainObject[this.tagData.field].join(',');
        }
        return this.domainObject[this.tagData.field];
      }
      return '';
    }
  },
  methods: {
    init() {

    },
    handleSelect() {
      this.$set(this.domainObject, this.tagData.field, this.value);
    }
  },
  created() {
    this.tagData.maxLength = this.tagData.maxLength ? Number(this.tagData.maxLength) : 1000;
    if (this.tagData.inputKey) {
      dealInputKey(this.tagData.inputKey, (inputFieldKey, outData) => {
        this.domainObject[this.tagData.field] = outData[inputFieldKey];
      });
    }
    this.domainObject[this.tagData.field] = this.domainObject[this.tagData.field] ? this.domainObject[this.tagData.field] : [];
    const event = new Event('loadEleDone');
    document.dispatchEvent(event);
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  .tag-select {
    width: 100% !important;
  }
</style>
