<template>
  <el-form-item
    :key="field.fieleConfigCode"
    :label='field.showName'>
    <el-input type="text" v-model="searchData[field.fieleConfigCode]"></el-input>
  </el-form-item>
</template>

<script>
  export default {
    name: 'FormItemInput',
    data() {
      return {};
    },
    props: {
      field: {
        type: Object,
        default() {
          return {};
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
      init() {
        if (this.searchData[this.field.fieldConfigCode] === undefined) {
          this.$set(this.searchData, this.field.fieldConfigCode, 'default');
        }
      }
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

<style lang="sass">

</style>
