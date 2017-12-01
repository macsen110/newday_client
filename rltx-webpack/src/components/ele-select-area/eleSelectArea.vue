/**
* eleCitySelect.vue
* Created by dsky on 17/8/2.
*/
<template>
  <div class="innerblock selectArea" v-if="editable">
    <el-form-item :prop="provinceFieldName" :rules="provinceFieldRule">
      <!--<el-input v-model='ruleForm.province' placeholder="请选择省" name="province"></el-input>-->
      <el-select v-model="domainObject[provinceFieldName]" placeholder="请选择省" @change="provinceChange">
        <el-option
          v-for="item in province"
          :key="item.id"
          :label="item.value"
          :value="item.id"
          name="province">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :prop="cityFieldName" :rules="cityFieldRule">
      <!--<el-input v-model='ruleForm.city' placeholder="请选择市" name="city"></el-input>-->
      <el-select v-model="domainObject[cityFieldName]" placeholder="请选择市" @change="cityChange">
        <el-option
          v-for="item in city"
          :key="item.id"
          :label="item.value"
          :value="item.id"
          name="city">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :prop="countyFieldName" :rules="countyFieldRule">
      <!--<el-input v-model='ruleForm.county' placeholder="请选择区" name="county"></el-input>-->
      <el-select v-model="domainObject[countyFieldName]" placeholder="请选择区">
        <el-option
          v-for="item in county"
          :key="item.id"
          :label="item.value"
          :value="item.id"
          name="county">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
  <span v-else>{{text}}</span>
</template>

<script type="text/ecmascript-6">
  import { dealInputKey } from '../../../api/Utils';
  import * as DataSourceService from '../../../api/DataSourceService';

  export default {
    name: 'eleSelectArea',
    props: {
      selectAreaData: Array,
      editable: {
        type: Boolean,
        'default': true
      },
      domainObject: Object
    },
    data() {
      return {
        provinceFieldName: '',
        cityFieldName: '',
        countyFieldName: '',
        province: [],
        city: [],
        county: [],
        provinceFieldRule: [],
        cityFieldRule: [],
        countyFieldRule: []
      };
    },
    computed: {
      text() {
        const provinceIndex = this.indexOf(this.domainObject[this.provinceFieldName], this.province),
          cityIndex = this.indexOf(this.domainObject[this.cityFieldName], this.city),
          countyIndex = this.indexOf(this.domainObject[this.countyFieldName], this.county);
        let txt = '';
        if (provinceIndex >= 0) {
          txt = this.province[provinceIndex].value;
        }
        if (cityIndex >= 0) {
          txt += ` - ${this.city[cityIndex].value}`;
        }
        if (countyIndex >= 0) {
          txt += ` - ${this.county[countyIndex].value}`;
        }
        return txt;
      }
    },
    methods: {
      init() {

      },
      indexOf(value, array) {
        for (let i = 0, j = array.length; i < j; i += 1) {
          if (array[i].id === value) {
            return i;
          }
        }
        return -1;
      },
      provinceChange(item) {
//        console.log('selectArea.provinceChange', item);
        DataSourceService.city.getData({ keyword: item }, (dataSource) => {
          this.city = dataSource;
          const index = this.indexOf(this.domainObject[this.cityFieldName], this.city);
          if (index < 0) {
            this.domainObject[this.cityFieldName] = null;
          }
          if (this.domainObject[this.cityFieldName]) {
            this.cityChange(this.domainObject[this.cityFieldName]);
          }
        });
      },
      cityChange(item) {
//        console.log('selectArea.cityChange', item);
        DataSourceService.county.getData({ keyword: item }, (dataSource) => {
          this.county = dataSource;
          const index = this.indexOf(this.domainObject[this.countyFieldName], this.county);
          if (index < 0) {
            this.domainObject[this.countyFieldName] = null;
          }
        });
      }
    },
    beforeCreate() {
    },
    created() {
      this.provinceFieldName = this.selectAreaData[0].field;
      this.cityFieldName = this.selectAreaData[1].field;
      this.countyFieldName = this.selectAreaData[2].field;

      if (this.selectAreaData[0].inputKey) {
        dealInputKey(this.selectAreaData[0].inputKey, (inputFieldKey, outData) => {
          this.domainObject[this.selectAreaData[0].field] = outData[inputFieldKey];
        });
      }

      if (this.selectAreaData[0].required === 'true') {
        this.provinceFieldRule.push({ required: true, trigger: 'change', message: '不能为空' });
      }

      if (this.selectAreaData[1].inputKey) {
        dealInputKey(this.selectAreaData[1].inputKey, (inputFieldKey, outData) => {
          this.domainObject[this.selectAreaData[1].field] = outData[inputFieldKey];
        });
      }

      if (this.selectAreaData[1].required === 'true') {
        this.cityFieldRule.push({ required: true, trigger: 'change', message: '不能为空' });
      }

      if (this.selectAreaData[2].inputKey) {
        dealInputKey(this.selectAreaData[2].inputKey, (inputFieldKey, outData) => {
          this.domainObject[this.selectAreaData[2].field] = outData[inputFieldKey];
        });
      }

      if (this.selectAreaData[2].required === 'true') {
        this.countyFieldRule.push({ required: true, trigger: 'change', message: '不能为空' });
      }

//      console.log('provinceFieldName', this.provinceFieldName, 'cityFieldName', this.cityFieldName, 'countyFieldName', this.countyFieldName);
      DataSourceService.province.getData('', (dataSource) => {
        this.province = dataSource;
        if (this.domainObject[this.provinceFieldName]) {
          this.provinceChange(this.domainObject[this.provinceFieldName]);
        }
      });

      const event = new Event('loadEleDone');
      document.dispatchEvent(event);
      document.dispatchEvent(event);
      document.dispatchEvent(event);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
