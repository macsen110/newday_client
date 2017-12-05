<template>
    <span>{{value}}</span>
</template>

<script>
  export default {
    name: 'table-cell-default',
    data() {
      return {};
    },
    computed: {
      value() {
        if (this.data[this.field.fieldConfigCode] && this.data[this.field.fieldConfigCode] !== '0') {
          if (this.formatterInfo && typeof this.formatterInfo === 'function') {
            return this.formatterInfo(this.data, this.field);
          }
        } else {
          // console.log('-', this.data[this.field.fieldConfigCode]);
          return '-';
        }
        return this.data[this.field.fieldConfigCode];
      }
    },
    props: {
      data: {
        required: true,
        type: Object,
        default() {
          return {};
        }
      },
      field: {
        required: true,
        type: Object,
        default() {
          return {};
        }
      },
      editInfo: {
        type: Object,
        default() {
          return {};
        }
      },
      formatterInfo: {
        type: Function
      }
    },
    methods: {
      init() { }
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
