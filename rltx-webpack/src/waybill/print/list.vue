<template>
  <div>
    Hello list
  </div>
</template>

<script type="text/ecmascript-6">
  import { getWaybillPrintList } from '../../../api/waybillService';

  export default {
    name: 'wayBillPrintList',
    data() {
      return {};
    },
    methods: {
      onGetList() {
        getWaybillPrintList('print_document', {
          size: 20
        }, (res, err) => {
          console.log(res);
          console.log(err);
        });
      },
      init() {
        this.onGetList();
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

<style lang="scss" rel="stylesheet/scss">

</style>
