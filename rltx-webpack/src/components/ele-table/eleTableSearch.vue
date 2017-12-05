/**
* tableSearch.vue
*/

<template>
  <el-form :inline="false" :model="searchModel" ref="searchModel" class="demo-form-inline">
    <el-row v-for="(searchField, index) in searchFields" :key="searchField.fieldConfigCode">
      <el-form-item :label="searchField.showName">
        <ele-block :field="searchField" :domainObject="searchModel"></ele-block>
      </el-form-item>
    </el-row>
    <el-row class="as-ft">
      <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i> 立即筛选</el-button>
      <el-button @click="resetForm('searchModel')">重置条件</el-button>
      <span id="advanceSearch" v-if="isShow">高级搜索</span>
    </el-row>
  </el-form>
</template>

<script type="text/ecmascript-6">
  import eleBlock from '../ele-block/eleBlock.vue';

  export default {
    name: 'tableSearch',
    props: {
      'getData': null,
      'searchFields': Array,
      'searchModel': {},
      'isShow': null,
      'defaultSearchModel': {}
    },
    components: {
      'ele-block': eleBlock
    },
    data() {
      return {
        fields: []
      };
    },
    methods: {
      onSubmit() {
        this.getData();
      },
      resetForm() {
        // console.log(this.$refs[formName][0]);
        // this.$refs[formName].resetFields();
        const keyArray = Object.keys(this.searchModel);
        keyArray.forEach((element) => {
          if (this.defaultSearchModel) {
            this.searchModel[element] = this.defaultSearchModel[element];
          } else {
            this.searchModel[element] = null;
          }
        });
        this.getData();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
