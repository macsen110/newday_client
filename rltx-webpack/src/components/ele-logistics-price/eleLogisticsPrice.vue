/**
* eleNumber.vue
* Created by dsky on 17/10/19.
*/
<template>
  <div class="section">
    <h2 class="tmp-title">
        运价信息
    </h2>
    <ul class="price-info el-row">
      <li class="el-col-6">客户运价：{{ showModel.clientFreightRate }}{{ showModel.clientFreightRateUnitName }}</li>
      <li class="el-col-6">司机参考运价：{{ showModel.driverReferencePrice }}{{ showModel.driverReferencePriceUnitName }}</li>
      <li class="el-col-6">货物单价：{{ showModel.goodsPrice }}{{ showModel.goodsPriceUnitName }}</li>
      <li class="el-col-6">合理货差系数：{{ showModel.goodsLoss }}{{ showModel.goodsLossUnitName }}</li>
    </ul>
    <div class="priceColumn">
      <h3 class="price-tit">可用运价列表：</h3>
      <div class="price-opr" v-show="editable">
        <el-button type="primary" @click="handleAdd">添加运价</el-button>
      </div>
      <el-table :data="tableModel" style="width: 100%" border>
        <el-table-column label="操作/状态" width="200" align="center">
          <template scope="scope">
            <el-button @click="handleCancel(scope.$index)" v-show="!tableModel[scope.$index].isText && editable">取消</el-button>
            <el-button type="primary" @click="handleSave(scope.$index)" v-show="!tableModel[scope.$index].isText && editable">保存</el-button>
            <el-button class="el-button--line" @click="handleSelect(scope.$index)" v-show="tableModel[scope.$index].isText && editable" :disabled="tableModel[scope.$index].isSelect">
              {{ tableModel[scope.$index].isSelect ? '选中' : '选用' }}
            </el-button>
            <el-button @click="handleEdit(scope.$index)" v-show="false">编辑</el-button>
            <el-button @click="handleDelete(scope.$index)" v-show="tableModel[scope.$index].isText && editable" :disabled="tableModel[scope.$index].isSelect">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="clientFreightRate" label="客户运价" align="center">
          <template scope="scope">
            <div class="block" v-show="!tableModel[scope.$index].isText">
              <el-input v-model="tableModel[scope.$index].clientFreightRate"></el-input>
              <el-select v-model="tableModel[scope.$index].clientFreightRateUnitCode" @change="handleSelectCarrierPrice(scope.row)">
                <el-option v-for="item in option1" :key="item.id" :label="item.value" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <span v-show="tableModel[scope.$index].isText">{{ scope.row.clientFreightRate }}{{ scope.row.clientFreightRateUnitName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="driverReferencePrice" label="司机参考运价" align="center">
          <template scope="scope">
            <div class="block" v-show="!tableModel[scope.$index].isText">
              <el-input v-model="tableModel[scope.$index].driverReferencePrice"></el-input>
              <el-select v-model="scope.row.driverReferencePriceUnitCode" @change="handleSelectDriverPrice(scope.row)">
                <el-option v-for="item in driverPriceOptions" :key="item.id" :label="item.value" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <span v-show="tableModel[scope.$index].isText">{{ scope.row.driverReferencePrice }}{{ scope.row.driverReferencePriceUnitName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsPrice" label="货物单价" align="center">
          <template scope="scope">
            <div class="block" v-show="!tableModel[scope.$index].isText">
              <el-input v-model="tableModel[scope.$index].goodsPrice"></el-input>
              <el-select v-model="tableModel[scope.$index].goodsPriceUnitCode" @change="handleSelectGoodsPrice(scope.row)">
                <el-option v-for="item in option3" :key="item.id" :label="item.value" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <span v-show="tableModel[scope.$index].isText">{{ scope.row.goodsPrice }}{{ scope.row.goodsPriceUnitName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsLoss" label="合理货差系数" align="center">
          <template scope="scope">
            <div class="block" v-show="!tableModel[scope.$index].isText">
              <el-input v-model="tableModel[scope.$index].goodsLoss"></el-input>
              <el-select v-model="tableModel[scope.$index].goodsLossUnitCode" @change="handleSelectGoodsLoss(scope.row)">
                <el-option v-for="item in option2" :key="item.id" :label="item.value" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <span v-show="tableModel[scope.$index].isText">{{ scope.row.goodsLoss }}{{ scope.row.goodsLossUnitName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="description" label="运价备注" align="center">
          <template scope="scope">
            <div class="block" v-show="!tableModel[scope.$index].isText">
              <el-input type="textarea" v-model="tableModel[scope.$index].description"></el-input>
            </div>
            <span v-show="tableModel[scope.$index].isText">{{ scope.row.description }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="updateTime" label="添加时间" align="center">
          <template scope="scope">
            <span v-show="tableModel[scope.$index].isText">{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import { dealInputKey } from '../../../api/Utils';
import { add, deleted, edit, list } from '../../../api/rateService';
import { rateBindLogistic, rateSelect, deleteLogisticRateRelation } from '../../../api/LogisticsService';
import * as DataSourceService from '../../../api/DataSourceService';

export default {
  name: 'eleLogisticsPrice',
  props: {
    priceData: Object,
    codeUnitType: String,
//    editable: {
//      type: Boolean,
//      'default': true
//    },
    domainObject: Object,
    rules: Array,
    code: '',
    ratesCodeList: null,
    ratesCode: ''
  },
  data() {
    return {
      editable: true,
      rateArray: [],
      tableModel: [],
      showModel: {
        clientFreightRate: '',
        clientFreightRateUnitCode: '',
        driverReferencePrice: '',
        driverReferencePriceUnitCode: '',
        goodsPrice: '',
        goodsPriceUnitCode: '',
        goodsLoss: '',
        goodsLossUnitCode: ''
      },
      priceModel: {
        clientFreightPrice: '',
        clientFreightPriceUnitCode: '',
        driverReferPrice: '',
        driverReferPriceUnitCode: '',
        goodsPrice: '',
        goodsPriceUnitCode: '',
        goodsLoss: '',
        goodsLossUnitCode: ''
      },
      baseModel: {
        clientFreightRate: '',
        clientFreightRateUnitCode: '',
        driverReferencePrice: '',
        driverReferencePriceUnitCode: '',
        goodsPrice: '',
        goodsPriceUnitCode: '',
        goodsLoss: '',
        goodsLossUnitCode: '',
        description: '',
        updateTime: '',
        isText: false,
        isSelect: false
      },
      driverPriceOptions: [],
      option1: [],
      option2: [],
      option3: [],
      selectRate: '',
      initBitmap: 0
    };
  },
  computed: {
  },
  methods: {
    init() {},
    handleSelectCarrierPrice(row) {
      console.log('select carrier price', row, 'options', this.option1);
      const option = this.option1.find(item => item.id === row.clientFreightRateUnitCode);
      row.clientFreightRateUnitName = option.value;
    },
    handleSelectDriverPrice(row) {
      console.log('select driver price', row, 'options', this.driverPriceOptions);
      const option = this.driverPriceOptions.find(item => item.id === row.driverReferencePriceUnitCode);
      row.driverReferencePriceUnitName = option.value;
    },
    handleSelectGoodsPrice(row) {
      console.log('select goods price', row, 'options', this.option3);
      const option = this.option3.find(item => item.id === row.goodsPriceUnitCode);
      row.goodsPriceUnitName = option.value;
    },
    initDone(bit) {
      /* eslint-disable no-bitwise */
      this.initBitmap = this.initBitmap | bit;
      console.log('initBitmap', this.initBitmap);
      if (this.initBitmap === 0x1f) {
        this.tableModel.forEach((row) => {
          this.handleSelectGoodsLoss(row);
          this.handleSelectGoodsPrice(row);
          this.handleSelectDriverPrice(row);
          this.handleSelectCarrierPrice(row);
          if (row.isSelect) {
            Object.keys(row).forEach((key) => {
//              this.showModel[key] = row[key];
              this.$set(this.showModel, key, row[key]);
            });
          }
        });
      }
    },
    handleSelectGoodsLoss(row) {
      console.log('select goods loss', row, 'options', this.option2);
      const option = this.option2.find(item => item.id === row.goodsLossUnitCode);
      row.goodsLossUnitName = option.value;
      if (row.goodsLossUnitCode === 'percent') {
        row.goodsLossMethod = 'goods.loss.ration';
      } else {
        row.goodsLossMethod = 'goods.loss';
      }
    },
    validateAll() {
      for (let i = 0; i < this.tableModel.length; i += 1) {
        if (!this.validate(this.tableModel[i])) {
          return false;
        }
      }
      return true;
    },
    validate(row) {
      let option = this.option1.find(item => item.id === row.clientFreightRateUnitCode);
      if (!option || option.data.codeUnitType !== this.codeUnitType) {
        this.showError('客户运价单位与计量标准不一致！');
        return false;
      }
      option = this.driverPriceOptions.find(item => item.id === row.driverReferencePriceUnitCode);
      if (!option || option.data.codeUnitType !== this.codeUnitType) {
        this.showError('司机运价单位与计量标准不一致！');
        return false;
      }
      option = this.option3.find(item => item.id === row.goodsPriceUnitCode);
      if (!option || option.data.codeUnitType !== this.codeUnitType) {
        this.showError('货物单价单位与计量标准不一致！');
        return false;
      }
      option = this.option2.find(item => item.id === row.goodsLossUnitCode);
      if ((!option || option.data.codeUnitType !== this.codeUnitType) && option.id !== 'percent') {
        this.showError('货差单位与计量标准不一致！');
        return false;
      }
      return true;
    },
    showError(text) {
      this.$message({
        type: 'error',
        showClose: true,
        message: text,
        duration: 5000
      });
      return false;
    },
    changeToText(index) {
      this.tableModel[index].isText = true;
      this.tableModel.splice(index, 1, this.tableModel[index]);
    },
    handleCancel(index) {
      if (this.rateArray[index]) {
        this.changeToText(index);
      } else {
        this.tableModel.splice(index, 1);
      }
    },
    handleSave(index) {
      if (this.validate(this.tableModel[index])) {
        if (this.rateArray[index]) {
          edit(this.rateArray[index], this.tableModel[index], (success, error) => {
            if (error || success.code !== 200) {
              this.showError(error.content);
            }
            if (success) {
              this.changeToText(index);
              const model = this.tableModel[index];
              if (this.rateArray[index] === this.selectRate) {
                Object.keys(model).forEach((key) => {
                  this.showModel[key] = model[key];
                });
              }
            }
          });
        } else {
          add(this.tableModel[index], (success, error) => {
            if (error || success.code !== 200) {
              this.showError(error.content);
            }
            if (success) {
              const rateCode = success.content.code;
              if (this.code) {
                const params = {
                  code: this.code,
                  ratesCode: rateCode
                };
                rateBindLogistic(params, (res, error2) => {
                  if (error2 || res.code !== 200) {
                    this.showError(error2.content);
                  }
                  if (res) {
                    this.rateArray[index] = rateCode;
                    this.tableModel[index].updateTime = res.content.updateTime;
                    this.changeToText(index);
                  }
                });
              } else {
                this.rateArray[index] = success.content.code;
                this.tableModel[index].updateTime = success.content.updateTime;
                this.changeToText(index);
              }
            }
          });
        }
      }
    },
    selectCb(index) {
      this.tableModel.forEach((val) => {
        val.isSelect = false;
      });
      const model = this.tableModel[index];
      model.isSelect = true;
      this.selectRate = this.rateArray[index];
      Object.keys(model).forEach((key) => {
        this.showModel[key] = model[key];
      });
      this.$emit('change', model);
    },
    handleSelect(index) {
      if (this.code) {
        if (this.validate(this.tableModel[index])) {
          const model = this.tableModel[index],
            params = {
              code: this.code,
              ratesCode: this.rateArray[index],
              clientFreightPrice: model.clientFreightRate,
              clientFreightPriceUnitCode: model.clientFreightRateUnitCode,
              goodsPrice: model.goodsPrice,
              goodsPriceUnitCode: model.goodsPriceUnitCode,
              goodsLoss: model.goodsLoss,
              goodsLossMethod: model.goodsLossMethod,
              goodsLossUnitCode: model.goodsLossUnitCode,
              driverReferPrice: model.driverReferencePrice,
              driverReferPriceUnitCode: model.driverReferencePriceUnitCode
            };
          rateSelect(params, (success, error) => {
            if (error || success.code !== 200) {
              this.showError(error.content);
            }
            if (success) {
              this.selectCb(index);
            }
          });
        }
      } else {
        this.selectCb(index);
      }
    },
    handleEdit(index) {
      this.tableModel[index].isText = false;
      this.tableModel.splice(index, 1, this.tableModel[index]);
    },
    handleDelete(index) {
      const code = this.rateArray[index],
        params = {
          code
        };
      deleted(params, (success, error) => {
        if (error || success.code !== 200) {
          this.showError(error.content);
        }
        if (success) {
          const rateCode = success.content.code;
          if (this.code) {
            const paramsObj = {
              code: this.code,
              ratesCode: rateCode
            };
            deleteLogisticRateRelation(paramsObj, (res, error2) => {
              if (error2 || res.code !== 200) {
                this.showError(error2.content);
              }
              if (res) {
                if (this.tableModel[index].isSelect) {
                  this.selectRate = null;
                  this.showModel = {};
                }
                this.rateArray.splice(index, 1);
                this.tableModel.splice(index, 1);
              }
            });
          }
        }
      });
    },
    handleAdd() {
      const baseTpl = {};
      Object.keys(this.baseModel).forEach((key) => {
        baseTpl[key] = this.baseModel[key];
      });
      this.tableModel.push(baseTpl);
    },
    getRateData() {
      if (this.code) {
        const params = {
          logisticsCode: this.code,
          page: 1,
          size: 100
        };
        list(params, (success, error) => {
          if (error || success.code !== 200) {
            this.showError(error.content);
          }
          if (success) {
            success.content.forEach((val) => {
              const baseTpl = {};
              Object.keys(this.baseModel).forEach((key) => {
                baseTpl[key] = val[key] || this.baseModel[key];
              });
              this.rateArray.push(val.code);
              baseTpl.isText = true;
              if (val.code === this.ratesCode) {
                baseTpl.isSelect = true;
                this.selectRate = val.code;
              }
              this.tableModel.push(baseTpl);
              this.initDone(0x10);
            });
          }
        });
      }
    },
    loadData(dataSource, type, cb) {
      DataSourceService.getAll(dataSource.split(','), { codeUnitType: type }, (success, error) => {
        if (error) {
          console.error('load', dataSource, ' failed', error);
        } else {
          cb(success);
        }
      });
    }
  },
  watch: {
    ratesCodeList() {
      // this.rateArray = this.ratesCodeList;
      this.getRateData();
    },
    codeUnitType(val) {
      this.loadData('carrierPrice', val, (options) => { this.option1 = options; });
      this.loadData('driverPrice', val, (options) => { this.driverPriceOptions = options; });
      this.loadData('goodsPrice', val, (options) => { this.option3 = options; });
      this.loadData('goodsLossRation,goodsLoss', val, (options) => { this.option2 = options; });
    }
  },
  created() {
    this.loadData('carrierPrice', this.unitCodeType, (options) => {
      this.option1 = options;
      this.initDone(0x1);
    });
    this.loadData('driverPrice', this.unitCodeType, (options) => {
      this.driverPriceOptions = options;
      this.initDone(0x2);
    });
    this.loadData('goodsPrice', this.unitCodeType, (options) => {
      this.option3 = options;
      this.initDone(0x4);
    });
    this.loadData('goodsLossRation,goodsLoss', this.unitCodeType, (options) => {
      this.option2 = options;
      this.initDone(0x8);
    });
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.price-info {
  margin: 20px;
  font-size: 13px;
  background-color: #fffbe8;
  border: solid 1px #eae5ce;
}
.priceColumn {
  margin: 20px;
  padding: 20px;
  border: solid 1px #ddd;
  .price-tit {
    font-weight: 700;
    margin-bottom: 10px;
  }
  .price-opr {
    margin-bottom: 10px;
  }
  .el-table .cell {
    padding-left: 5px;
    padding-right: 5px;
    .el-input {
      width: 100px;
    }
    .el-select {
      width: 80px;
      .el-input {
        width: 80px;
      }
    }
  }
}
</style>
