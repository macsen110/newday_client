/**
* tableTotal.vue
*/
<template v-if="totalData.length">
  <tr>
    <td v-if="operatable" class="fix-col"></td>
    <td v-if="selectable" class="fix-col"></td>
    <td v-for="list in totalData">
      {{ list }}
    </td>
  </tr>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    operatable: Boolean,
    selectable: Boolean,
    columnsData: Array,
    totalNum: Array,
    totalUnit: Array
  },
  data() {
    return {
      totalData: []
    };
  },
  methods: {
    setTotalData(array) {
      array.forEach((val, index) => {
        if (val.num) {
          this.totalUnit.forEach((unit) => {
            if (val.unitCode in unit) {
              // this.totalData[index] = val.num + unit[val.unitCode];
              this.totalData.splice(index, 1, val.num + unit[val.unitCode]);
            }
          });
        } else {
          // this.totalData[index] = '-';
          this.totalData.splice(index, 1, '-');
        }
      });
    }
  },
  watch: {
    totalNum() {
      const totalArray = [];
      this.columnsData.forEach((val, index) => {
        totalArray[index] = {};
        const extraParams = val.extraParams,
          extraLen = extraParams.length,
          totalNum = this.totalNum,
          totalNumLen = totalNum.length;
        for (let i = 0; i < extraLen; i += 1) {
          for (let j = 0; j < totalNumLen; j += 1) {
            if (extraParams[i].field in totalNum[j]) {
              totalArray[index].num = totalNum[j][extraParams[i].field];
            } else {
              totalArray[index].unitCode = extraParams[i].field;
            }
          }
        }
      });
      this.setTotalData(totalArray);
    },
    columnsData() {
    },
    listData() {
      // const columnsData = this.columnsData,
      //   listData = this.listData,
      //   totalArray = [];
      // columnsData.forEach((val, columnsIndex) => {
      //   const extraParams = val.extraParams,
      //     len = extraParams.length;
      //   totalArray[columnsIndex] = [];
      //   listData.forEach((list, listIndex) => {
      //     totalArray[columnsIndex][listIndex] = {};
      //     for (let i = 0; i < len; i += 1) {
      //       if (extraParams[i].controlType === 'number') {
      //         totalArray[columnsIndex][listIndex].isNum = true;
      //         totalArray[columnsIndex][listIndex].num = list[extraParams[i].field];
      //       } else {
      //         if (!totalArray[columnsIndex][listIndex].isNum) {
      //           totalArray[columnsIndex][listIndex].isNum = false;
      //         }
      //         totalArray[columnsIndex][listIndex].unitCode = list[extraParams[i].field];
      //         totalArray[columnsIndex][listIndex].dataSources = extraParams[i].dataSources;
      //         totalArray[columnsIndex][listIndex].options = extraParams[i].options;
      //         totalArray[columnsIndex][listIndex].optionsValue = extraParams[i].optionsValue;
      //       }
      //     }
      //   });
      // });
      // console.log('totalArray: ', totalArray);
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
