/**
* more.vue
* Created by cc on 17/8/18.
*/
<template>
  <div class="block">
    <div v-if="this.allArray" class="has-more">
      <div v-show="isShow === false" class="record-list">
        <ol>
          <li v-for="(text,index) in shortArray">
            {{ index + 1 }}、{{ text }}。
          </li>
        </ol>
        <el-button type="text" @click="isShow=true">展开全部</el-button>
      </div>
      <div v-show="isShow === true" class="record-list">
        <ol>
          <li v-for="(text,index) in allArray">
            {{ index + 1 }}、{{ text }}。
          </li>
        </ol>
        <el-button v-if="domainObject[configData.field].length > 3" type="text" @click="isShow=false">收起</el-button>
      </div>
    </div>
    <div v-else class="no-more">
      <template v-if="shortArray.length === 0">
        <ol>
          <li>
            没有对信息进行修改。
          </li>
        </ol>
      </template>
      <template v-else>
        <ol>
          <li v-for="(text,index) in shortArray">
            {{ index + 1 }}、{{ text }}。
          </li>
        </ol>
      </template>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'eleMore',
    data() {
      return {
        isShow: false,
        shortArray: '',
        allArray: ''
      };
    },
    props: {
      configData: Object,
      editable: {
        type: Boolean,
        'default': true
      },
      domainObject: Object
    },
    methods: {
      init() {},
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
      getData() {
        const textArray = this.domainObject[this.configData.field];
        // console.log('textArray is', textArray);
        if (textArray.length > 3) {
          this.shortArray = textArray.slice(0, 3);
          this.allArray = textArray;
        } else {
          this.shortArray = textArray;
        }
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
      this.getData();
      // console.log('text is', this.configData);
      // console.log('domainObject is', this.domainObject);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .has-more {
    white-space: normal;
    .el-button {
      padding: 0 !important;
    }
  }
</style>
