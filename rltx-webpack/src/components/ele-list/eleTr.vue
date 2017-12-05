<template>
  <tr>
    <slot></slot>
  </tr>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'eleForm',
    componentName: 'eleForm',
    data() {
      return {
        elementCount: 0,
        elementLoadedCount: 0,
        elementChildren: []
      };
    },
    methods: {
      dispatchEvent(target, event, data) {
//        console.log('dispatch event', event, 'to', target, 'data', data);
        this.elementChildren.forEach((ele) => {
          if (ele.configData.field === target) {
            ele.$emit(event, data);
          }
        });
      },
      getElementByField(field) {
        return this.elementChildren.find(ele => ele.configData.field === field);
      },
      mountedDone() {
        this.elementChildren.forEach((ele) => {
          ele.init();
        });
        this.$emit('formMounted', this);
      }
    },
    created() {
      this.$on('eleCreated', (ele) => {
        this.elementChildren.push(ele);
      });
      this.$on('eleMounted', () => {
        this.elementLoadedCount += 1;
        if (this.elementLoadedCount === this.elementChildren.length) {
          this.mountedDone();
        }
      });
    }
  };
</script>
