/**
* eleTag.vue
* Created by dsky on 17/8/2.
*/
<template>
  <div class="block">
    <el-form-item :prop="this.configData.field" :rules="rules" v-if="!isList && editable">
      <el-tag
        :key="tag"
        v-for="tag in domainObject[configData.field]"
        :closable="true"
        type="primary"
        :close-transition="false"
        @close="handleClose(tag)"
      >
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        :maxlength="configData.maxLength"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
    </el-form-item>
    <template v-if="isList && editable">
      <el-tag
        :key="tag"
        v-for="tag in domainObject[configData.field]"
        :closable="true"
        type="primary"
        :close-transition="false"
        @close="handleClose(tag)"
      >
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        :maxlength="configData.maxLength"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
    </template>
    <span v-if="editable === false">{{text}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { dealInputKey } from '../../../api/Utils';

  export default {
    name: 'eleTag',
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
        if (this.domainObject && this.configData && this.configData.field in this.domainObject) {
          if (this.domainObject[this.configData.field] instanceof Array) {
            return this.domainObject[this.configData.field].join(',');
          }
          return this.domainObject[this.configData.field];
        }
        return '';
      }
    },
    data() {
      return {
        inputVisible: false,
        inputValue: ''
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

      },
      handleClose(tag) {
        this.domainObject[this.configData.field].splice(this.domainObject[this.configData.field].indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        const inputValue = this.inputValue;
        if (inputValue) {
          this.domainObject[this.configData.field] = this.domainObject[this.configData.field] || [];
          this.domainObject[this.configData.field].push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
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
      this.domainObject[this.configData.field] = this.domainObject[this.configData.field] ? this.domainObject[this.configData.field] : [];
      // const event = new Event('loadEleDone');
      // document.dispatchEvent(event);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
