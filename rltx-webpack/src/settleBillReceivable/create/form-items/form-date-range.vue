<template>
  <el-form-item
    :key="field.fieleConfigCode"
    :label='field.showName'>
    <el-date-picker
      :type="start.controlType"
      :format="start.format"
      placeholder="选择开始日期">
    </el-date-picker>
    <span>{{placeholder.default}}</span>
    <el-date-picker
      :type="start.controlType"
      :format="end.format"
      placeholder="选择结束日期">
    </el-date-picker>
  </el-form-item>
</template>

<script>
  export default {
    name: 'FormItemDateRange',
    data() {
      return {};
    },
    computed: {
      start() {
        return this.field.extraParams[0];
      },
      placeholder() {
        return this.field.extraParams[1];
      },
      end() {
        return this.field.extraParams[2];
      }
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
