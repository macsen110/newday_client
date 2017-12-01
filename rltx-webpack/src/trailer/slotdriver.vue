/**
* slotTest.vue
* Created by dsky on 17/6/5.
*/
<template>
  <div class="slotTest">
    <el-row :gutter="20">
      <v-table :searchData2="searchData2"></v-table>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import table from './drivertabel.vue';

  export default {
    name: 'slotTest',
    components: {
      'v-table': table
    },
    data() {
      return {
      };
    },
    props: {
      'searchData2': Array
    },
    beforeCreate() {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
