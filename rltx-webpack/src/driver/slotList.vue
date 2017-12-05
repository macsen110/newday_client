/**
* slotList.vue
* Created by zyc on 17/7/4.
*/
<template>
  <div id="slotTest">
    <el-row :gutter="20">
      <v-table :searchData2="searchData2"></v-table>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import table from './table-list.vue';

  export default {
    name: 'slotList',
    data() {
      return {
      };
    },
    props: {
      searchData2: Array
    },
    beforeCreate() {
    },
    components: {
      'v-table': table
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
