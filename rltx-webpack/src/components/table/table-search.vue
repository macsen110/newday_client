/**
* table-search.vue
* Created by dsky on 17/6/9.
*/
<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item v-for="search in searchData" :label="search.showName" :key="search.fieldConfigCode">
      <el-input :name="search.extraParams.field1" :placeholder="search.extraParams.placeholder1"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i> 查询</el-button>
      <a href="add.html" class="el-button el-button--info" target="_blank"><i class="el-icon-plus"></i> 添加数据</a>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'tableSearch',
    props: {
      'getData': null,
      'searchData': Array
    },
    methods: {
      onSubmit() {
        this.getData();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
