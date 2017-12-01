<template>
  <div class="search-component">
    <div class="el-row">
      <el-form :inline="true">
        <component
          :searchData="searchData"
          v-for="(field,index) in searchParams"
          :key="index"
          :field="field"
          :is="updateCurComponent(field.elementCode)"></component>
      </el-form>
    </div>
  </div>
</template>

<script>
  import * as FormItems from './form-items/';

  export default {
    name: 'table-search',
    components: FormItems,
    data() {
      return {
        all_component: {
          text: 'FormItemInput',
          dateRange: 'FormItemDateRange'
        }
      };
    },
    computed: {
      /**
       * 调试测试参数
       * @returns {searchParams|{field1, field2, field3, field4, field5, field6, field7, field8, field9}|{}|URLSearchParams}
       */
      testParams() {
        return this.testData.searchParams;
      }
    },
    props: {
      /**
       * 调试测试参数
       */
      testData: {
        type: Object,
        default() {
          return {
            searchParams: {
              field1: '',
              field2: '',
              field3: '',
              field4: '',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: ''
            }
          };
        }
      },
      searchParams: {
        type: Array,
        default() {
          return [];
        }
      },
      searchData: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    methods: {
      updateCurComponent(type) {
        return this.all_component[type] ? this.all_component[type] : '';
      },
      init() {
      }
    },
    created() {
    },
    mounted() {
      this.init();
    },
    watch: {
      $route() {
        this.init();
      }
    }
  };
</script>

<style lang="scss">
  .table-action-btn-component{
    width:100%;
    height:42px;
    background: #f7ba2a;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    line-height: 42px;

    button{
      margin-left:10px;
      margin-right: 10px;
    }
  }
</style>
