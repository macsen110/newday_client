/**
* eleBlock.vue
* Created by dsky on 17/6/23.
*/
<template>
  <div class="block" :class="['complex-control-' + field.extraParams.length]">
    <ele-select-area
      v-if="field.elementCode === 'selectArea'"
      :selectAreaData="field.extraParams"
      :domainObject="domainObject"
      :editable="editable">
    </ele-select-area>
    <ele-quote
      v-else-if="field.elementCode === 'quoteType'"
      :quoteData="field.extraParams"
      :domainObject="domainObject"
      :editable="editable">
    </ele-quote>
    <ele-tag-select
      v-else-if="field.elementCode === 'tagSelect'"
      :tagData="field.extraParams"
      :domainObject="domainObject"
      :editable="editable">
    </ele-tag-select>
    <ele-select-driver
      v-else-if="field.elementCode === 'listDriver'"
      :domainObject="domainObject"
      :driverData="field.extraParams[0]"
      :editable="editable">
    </ele-select-driver>
    <ele-select-viceDriver
      v-else-if="field.elementCode === 'listViceDriver'"
      :domainObject="domainObject"
      :driverData="field.extraParams[0]"
      :editable="editable">
    </ele-select-viceDriver>
    <ele-select-trailerTruck
      v-else-if="field.elementCode === 'listTrailerTruck'"
      :domainObject="domainObject"
      :truckData="field.extraParams[0]"
      :editable="editable">
    </ele-select-trailerTruck>
    <ele-config
      v-else
      :domainObject="domainObject"
      :field="param"
      :inputKey="inputKey"
      :editable="editable"
      :isList="isList"
      :uploadUrl="uploadUrl"
      v-for="param in field.extraParams"
      :key="field.fieldConfigCode"></ele-config>
  </div>
</template>

<script type="text/ecmascript-6">
  import eleConfig from '../ele-config/eleConfig.vue';
  import eleSelectArea from '../ele-select-area/eleSelectArea.vue';
  import eleQuote from '../ele-quote/eleQuote.vue';
  import eleSelectDriver from '../ele-select-driver/eleSelectDriver.vue';
  import eleSelectViceDriver from '../ele-select-viceDriver/eleSelectViceDriver.vue';
  import eleSelectTrailerTruck from '../ele-select-trailerTruck/eleSelectTrailerTruck.vue';
  import eleTagSelect from '../ele-tag-select/eleTagSelect.vue';

  export default {
    name: 'eleBlock',
    props: {
      field: Object,
      domainObject: Object,
      uploadUrl: String,
      editable: {
        type: Boolean,
        'default': true
      },
      isList: {
        type: Boolean,
        'default': false
      },
      inputKey: Array
    },
    data() {
      return {
      };
    },
    components: {
      'ele-config': eleConfig,
      'ele-select-area': eleSelectArea,
      'ele-quote': eleQuote,
      'ele-tag-select': eleTagSelect,
      'ele-select-viceDriver': eleSelectViceDriver,
      'ele-select-trailerTruck': eleSelectTrailerTruck,
      eleSelectDriver
    },
    methods: {
      form() {
        let parent = this.$parent;
        if (parent) {
          while (parent && parent.$options && parent.$options.componentName !== 'eleForm') {
            parent = parent.$parent;
          }
          return parent;
        }
        return null;
      }
    },
    mounted() {
      if (this.field.event) {
        const form = this.form();

        if (form) {
          let event = this.field.event;
          event = event.replace(new RegExp('field1', 'g'), '_ele1');
          event = event.replace(new RegExp('field2', 'g'), '_ele2');
          event = event.replace(new RegExp('field3', 'g'), '_ele3');
          console.log('property', this.field.fieldConfigCode, 'event', this.field.event, 'exp', event);

          /* eslint-disable no-new-func */
          const ele1 = form.getElementByField(this.field.extraParams[0].field),
            ele2 = form.getElementByField(this.field.extraParams[1].field),
            ele3 = form.getElementByField(this.field.extraParams[2].field),
            listenerDefine = new Function('_ele1', '_ele2', '_ele3', event);
//          console.log(this.field.extraParams[0].field, ele1, this.field.extraParams[1].field, ele2, this.field.extraParams[2].field, ele3);
          listenerDefine(ele1, ele2, ele3);
        }
        /*
        (0, eval)(event);

        window.rns[this.field.extraParams[0].field].init();
        window.rns[this.field.extraParams[1].field].init();
        window.rns[this.field.extraParams[2].field].init();
        */
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
