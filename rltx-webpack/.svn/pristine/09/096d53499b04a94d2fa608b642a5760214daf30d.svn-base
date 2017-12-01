/**
* table-search-list.vue
* Created by zyc on 17/6/30.
*/
<template>
  <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
    <el-form-item v-for="search in searchData" :label="search.showName" :key="search.fieldConfigCode">
      <el-input :name="search.extraParams.field1" :placeholder="search.extraParams.placeholder1"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i> 立即筛选</el-button>
      <el-button @click="resetForm('searchForm')">重置条件</el-button>
      <span id="advanceSearch" v-if="isShow">高级搜索</span>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'tableSearch',
    props: {
      'getData': null,
      'searchData': Array,
      'isShow': null
    },
    data() {
      return {
        searchForm: {
        },
        fields: []
      };
    },
    methods: {
      onSubmit() {
        this.getData();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      console.log(this.searchData);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
