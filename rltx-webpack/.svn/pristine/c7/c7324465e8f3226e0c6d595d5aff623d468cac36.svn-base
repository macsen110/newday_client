<template>
  <div class="table-action-btn-component">
    <el-button
      @click="btn.fn && typeof btn.fn==='function' ? btn.fn({ btn, list, index }) : onClickBtn({ btn, list, index })"
      :key="index"
      v-if="!readonly || (readonly && btn.key==='export')"
      v-for="(btn,index) in list">{{btn.text || ''}}
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'table-action-btn',
    data() {
      return {};
    },
//    computed: {
//      list() {
//        return this.list || [];
//      }
//    },
    props: {
      list: {
        type: Array,
        default() {
          return [];
        }
      },
      readonly: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    methods: {
      onClickBtn(opts) {
        this.$emit('onClickBtn', opts);
      },
      init() {

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

<style lang="scss">

</style>
