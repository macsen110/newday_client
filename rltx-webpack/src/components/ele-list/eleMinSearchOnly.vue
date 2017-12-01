/**
* miniSearchOnly.vue
*/
<template>
  <el-form :inline="true" :model="searchModel" ref="searchModel">
    <el-form-item v-for="(searchField, index) in searchFields" :key="searchField.fieldConfigCode">
      <el-form-item :label="searchField.showName">
        <ele-block :field="searchField" :domainObject="searchModel"></ele-block>
      </el-form-item>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i> 立即筛选</el-button>
      <el-button @click="resetForm('searchModel')">重置条件</el-button>
      <!-- <span id="advanceSearch" v-if="isShow" @click="showAdvanceSearch">高级搜索</span> -->
    </el-form-item>
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
      'isShow': null
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
          this.searchModel[element] = null;
        });
        this.getData();
      }
      // showAdvanceSearch() {
      //   const listPage = document.querySelector('#list'),
      //     miniSearch = document.querySelector('#miniSearch');
      //   classUtil.toggleClass(listPage, 'opened');
      //   classUtil.toggleClass(miniSearch, 'hide');
      // }
    },
    created() {
      // console.log(this.searchData);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
