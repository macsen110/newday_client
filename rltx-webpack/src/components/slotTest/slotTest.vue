/**
* slotTest.vue
* Created by dsky on 17/6/5.
*/
<template>
  <div class="slotTest">
    <el-row :gutter="20">
      <v-table></v-table>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import table from '../table/table.vue';

  export default {
    name: 'slotTest',
    data() {
      return {
      };
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
