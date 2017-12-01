<template>
  <div class="form-page">
    <div class="page-header clearfix">
      <h2 class="page-title fl">
        {{ editable ? '上报运单' : '上报详情'}}
      </h2>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="运单号" class="is-required" prop="waybillNo">
            <el-input v-show="editable" v-model="form.waybillNo" :disabled="true" ></el-input>
            <p v-show="!editable">{{ form.waybillNo }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来源订单" class="is-required" prop="logisticsNo">
            <el-input v-model="form.logisticsNo" :disabled="this.inputDisabled" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.logisticsNo }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车牌号" class="is-required" prop="truckLicenseNo">
            <el-input v-model="form.truckLicenseNo" :disabled="true" v-show="editable"></el-input>
            <el-button type="primary" @click="vehicleInfoReport('form')" v-show="editable">车辆信息上传</el-button>
            <p v-show="!editable">{{ form.truckLicenseNo }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="承运人" class="is-required" prop="carrierOrgName">
            <el-input v-model="form.carrierOrgName" v-show="editable"></el-input>
            <el-button type="primary" @click="enterpriseInfoReport('form')" v-show="editable">企业信息上传</el-button>
            <p v-show="!editable">{{ form.carrierOrgName }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务类型" class="is-required" prop="reportBusinessTypeCode">
            <el-select v-model="form.reportBusinessTypeCode" placeholder="请选择业务类型" v-show="editable">
              <el-option
                v-for="item in reportBusinessTypeOptions"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
            <p v-show="!editable">{{ form.reportBusinessTypeText }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="货物类型" class="is-required" prop="reportCargoTypeClassificationCode">
            <el-select v-model="form.reportCargoTypeClassificationCode" placeholder="请选择货物类型" v-show="editable">
              <el-option
                v-for="item in reportCargoTypeClassificationOptions"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
            <p v-show="!editable">{{ form.reportCargoTypeClassificationText }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="牌照类型" class="is-required" prop="licensePlateTypeCode">
            <el-select v-model="form.licensePlateTypeCode" placeholder="请选择牌照类型" v-show="editable">
              <el-option
                v-for="item in licensePlateTypeOptions"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
            <p v-show="!editable">{{ form.licensePlateTypeText }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车型" class="is-required" prop="reportVehicleClassificationCode">
            <el-select v-model="form.reportVehicleClassificationCode" placeholder="请选择车型" v-show="editable">
              <el-option
                v-for="item in reportVehicleClassificationOptions"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
            <p v-show="!editable">{{ form.reportVehicleClassificationText }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆载重" class="is-required" prop="regTonnage">
            <el-input v-model="form.regTonnage" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.regTonnage }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="司机姓名" class="is-required" prop="driverFullName">
            <el-input v-model="form.driverFullName" :disabled="true" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.driverFullName }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="货物名称" class="is-required" prop="goodsName">
            <el-input v-model="form.goodsName" :disabled="true" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.goodsName }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="货物毛重" class="is-required" prop="reportGoodsItemGrossWeight">
            <el-input v-model="form.reportGoodsItemGrossWeight" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.reportGoodsItemGrossWeight }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发货时间" class="is-required" prop="loadingTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.loadingTime" style="width: 100%;" v-show="editable"></el-date-picker>
            <p v-show="!editable">{{ form.loadingTime }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收货时间" class="is-required" prop="unloadingTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.unloadingTime" style="width: 100%;" v-show="editable"></el-date-picker>
            <p v-show="!editable">{{ form.unloadingTime }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="装货地" class="is-required" prop="loadingProvinceCode">
             <el-form-item prop="loadingProvinceCode">
               <el-select class="region-select" v-model="form.loadingProvinceCode" placeholder="请选择省" @change="loadingProvinceChange" v-show="editable">
                 <el-option
                   v-for="item in loadingProvinceOptions"
                   :key="item.id"
                   :label="item.value"
                   :value="item.id"
                   name="province">
                 </el-option>
               </el-select>
               <p v-show="!editable">{{ form.loadingProvinceText }}</p>
             </el-form-item>
             <el-form-item prop="loadingCityCode">
               <el-select class="region-select" v-model="form.loadingCityCode" placeholder="请选择市" @change="loadingCityChange" v-show="editable">
                 <el-option
                   v-for="item in loadingCityOptions"
                   :key="item.id"
                   :label="item.value"
                   :value="item.id"
                   name="city">
                 </el-option>
               </el-select>
               <p v-show="!editable">{{ form.loadingCityText }}</p>
             </el-form-item>
             <el-form-item prop="loadingCountyCode">
               <el-select class="region-select" v-model="form.loadingCountyCode" placeholder="请选择区" v-show="editable">
                 <el-option
                   v-for="item in loadingCountyOptions"
                   :key="item.id"
                   :label="item.value"
                   :value="item.id"
                   name="county">
                 </el-option>
               </el-select>
               <p v-show="!editable">{{ form.loadingCountyText }}</p>
             </el-form-item>
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="卸货地" class="is-required" prop="unloadingProvinceCode">
              <el-form-item prop="unloadingProvinceCode">
                <el-select class="region-select" v-model="form.unloadingProvinceCode" placeholder="请选择省" @change="unloadingProvinceChange" v-show="editable">
                  <el-option
                    v-for="item in unloadingProvinceOptions"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                    name="province">
                  </el-option>
                </el-select>
                <p v-show="!editable">{{ form.unloadingProvinceText }}</p>
              </el-form-item>
              <el-form-item prop="unloadingCityCode">
                <el-select class="region-select" v-model="form.unloadingCityCode" placeholder="请选择市" @change="unloadingCityChange" v-show="editable">
                  <el-option
                    v-for="item in unloadingCityOptions"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                    name="city">
                  </el-option>
                </el-select>
                <p v-show="!editable">{{ form.unloadingCityText }}</p>
              </el-form-item>
              <el-form-item prop="unloadingCountyCode">
                <el-select class="region-select" v-model="form.unloadingCountyCode" placeholder="请选择区" v-show="editable">
                  <el-option
                    v-for="item in unloadingCountyOptions"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                    name="county">
                  </el-option>
                </el-select>
                <p v-show="!editable">{{ form.unloadingCountyText }}</p>
              </el-form-item>
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="货币总金额" class="is-required" prop="reportTotalMonetaryAmount">
            <el-input v-model="form.reportTotalMonetaryAmount" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.reportTotalMonetaryAmount }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="道路运输证号" class="is-required" prop="transportLicenseNo">
            <el-input v-model="form.transportLicenseNo" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.transportLicenseNo }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="托运日期" class="is-required" prop="reportConsignmentTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.reportConsignmentTime" style="width: 100%;" v-show="editable"></el-date-picker>
            <p v-show="!editable">{{ form.reportConsignmentTime }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车辆所有人">
            <el-input v-model="form.reportTruckOwner" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.reportTruckOwner }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发货人">
            <el-input v-model="form.reportActualLoadingUserFullName" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.reportActualLoadingUserFullName }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="个人证件号">
            <el-input v-model="form.reportActualLoadingUserCertifyNo" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.reportActualLoadingUserCertifyNo }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收货人">
            <el-input v-model="form.reportActualUnloadingUserFullName" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.reportActualUnloadingUserFullName }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="挂车牌号">
            <el-input v-model="form.trailerTruckLicenseNo" :disabled="true" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.trailerTruckLicenseNo }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="货物体积">
            <el-input v-model="form.loadingGoodsVolume" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.loadingGoodsVolume }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="货物总件数">
            <el-input v-model="form.totalNumberOfPackages" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.totalNumberOfPackages }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="司机手机号">
            <el-input v-model="form.driverPhone" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.driverPhone }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="信用代码">
            <el-input v-model="form.reportUnifiedSocialCreditIdentifier" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.reportUnifiedSocialCreditIdentifier }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="司机驾驶证号">
            <el-input v-model="form.driverLicenseNo" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.driverLicenseNo }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="装货详细地址">
            <el-input v-model="form.loadingAddr" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.loadingAddr }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="卸货详细地址">
            <el-input v-model="form.unloadingAddr" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.unloadingAddr }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上报备注" prop="desc">
            <el-input type="textarea" v-model="form.reportNotes" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.reportNotes }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="自由文本" prop="desc">
            <el-input type="textarea" v-model="form.remark" v-show="editable"></el-input>
            <p v-show="!editable">{{ form.remark }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-button @click="validateAndSubmit('form')" size="large" v-show="editable">校验上报</el-button>
            <el-button type="primary" @click="submitForm('form')" size="large" v-show="editable">直接上报</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>

  import { city, county, province } from '../../api/DataSourceService';
  import { getParamsFromURL, dateFormat } from '../../api/Utils';
  import { get, waybillReport, validateTruckLicenseNo } from '../../api/waybillService';

  export default {
    data() {
      const validateRegTonnage = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入车辆载重'));
          } else if (!new RegExp('[0-9]{1,9}(\\.[0-9]{0,2})?').test(value)) {
            callback(new Error('请输入符合规定的车辆载重'));
          } else {
            callback();
          }
        },
        validateReportGoodsItemGrossWeight = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入货物毛重'));
          } else if (!new RegExp('[0-9]{1,14}(\\.[0-9]{0,3})?').test(value)) {
            callback(new Error('请输入符合规定的货物毛重'));
          } else {
            callback();
          }
        },
        validateReportTotalMonetaryAmount = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入货币总金额'));
          } else if (!new RegExp('[0-9]{1,18}(\\.[0-9]{0,3})?').test(value)) {
            callback(new Error('请输入符合规定的货币总金额'));
          } else {
            callback();
          }
        },
        validateTotalNumberOfPackages = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入货物总件数'));
          } else if (!new RegExp('[0-9]{1,8}').test(value)) {
            callback(new Error('请输入符合规定的货物总件数'));
          } else {
            callback();
          }
        },
        validateLoadingGoodsVolume = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入货物体积'));
          } else if (!new RegExp('[0-9]{1,9}(\\.[0-9]{0,4})?').test(value)) {
            callback(new Error('请输入符合规定的货物体积'));
          } else {
            callback();
          }
        };
      return {
        editable: false,
        inputDisabled: true,
        form: {
          waybillNo: '',
          logisticsNo: '',
          truckLicenseNo: '',
          carrierOrgName: '',
          reportBusinessTypeCode: '',
          reportCargoTypeClassificationCode: '',
          licensePlateTypeCode: '',
          reportVehicleClassificationCode: '',
          regTonnage: '',
          driverFullName: '',
          goodsName: '',
          reportGoodsItemGrossWeight: '',
          loadingTime: '',
          unloadingTime: '',
          loadingProvinceCode: '',
          loadingCityCode: '',
          loadingCountyCode: '',
          unloadingProvinceCode: '',
          unloadingCityCode: '',
          unloadingCountyCode: '',
          reportTotalMonetaryAmount: '',
          transportLicenseNo: '',
          reportConsignmentTime: '',
          reportTruckOwner: '',
          reportActualLoadingUserFullName: '',
          reportActualLoadingUserCertifyNo: '',
          reportActualUnloadingUserFullName: '',
          trailerTruckLicenseNo: '',
          loadingGoodsVolume: '',
          totalNumberOfPackages: '',
          driverPhone: '',
          reportUnifiedSocialCreditIdentifier: '',
          driverLicenseNo: '',
          loadingAddr: '',
          unloadingAddr: '',
          reportNotes: '',
          remark: ''
        },
        loadingProvinceOptions: [],
        loadingCityOptions: [],
        loadingCountyOptions: [],
        unloadingProvinceOptions: [],
        unloadingCityOptions: [],
        unloadingCountyOptions: [],
        rules: {
          waybillNo: [
            { required: true, message: '请输入运单号', trigger: 'blur' },
            { max: 20, message: '长度不能大于20字符', trigger: 'blur' }
          ],
          logisticsNo: [
            { required: true, message: '请输入来源订单', trigger: 'blur' },
            { max: 35, message: '长度不能大于35字符', trigger: 'blur' }
          ],
          truckLicenseNo: [
            { required: true, message: '请输入车牌号', trigger: 'blur' },
            { max: 20, message: '长度不能大于20字符', trigger: 'blur' }
          ],
          carrierOrgName: [
            { required: true, message: '请输入承运人', trigger: 'blur' },
            { max: 512, message: '长度不能大于512字符', trigger: 'blur' }
          ],
          reportBusinessTypeCode: [
            { required: true, message: '请选择业务类型', trigger: 'change' }
          ],
          reportCargoTypeClassificationCode: [
            { required: true, message: '请选择货物类型', trigger: 'change' }
          ],
          licensePlateTypeCode: [
            { required: true, message: '请选择牌照类型', trigger: 'change' }
          ],
          reportVehicleClassificationCode: [
            { required: true, message: '请选择车型', trigger: 'change' }
          ],
          regTonnage: [
            { validator: validateRegTonnage, trigger: 'blur' }
          ],
          driverFullName: [
            { required: true, message: '请输入司机名称', trigger: 'blur' },
            { max: 20, message: '长度不能大于20字符', trigger: 'blur' }
          ],
          goodsName: [
            { required: true, message: '请输入货物名称', trigger: 'blur' },
            { max: 100, message: '长度不能大于100字符', trigger: 'blur' }
          ],
          reportGoodsItemGrossWeight: [
            { validator: validateReportGoodsItemGrossWeight, trigger: 'blur' }
          ],
          loadingTime: [
            { type: 'date', required: true, message: '请选择发货时间', trigger: 'change' }
          ],
          unloadingTime: [
            { type: 'date', required: true, message: '请选择收货时间', trigger: 'change' }
          ],
          loadingProvinceCode: [
            { required: true, message: '请选择省', trigger: 'change', type: 'string' }
          ],
          loadingCityCode: [
            { required: true, message: '请选择市', trigger: 'change', type: 'string' }
          ],
          loadingCountyCode: [
            { required: true, message: '请选择区', trigger: 'change', type: 'string' }
          ],
          unloadingProvinceCode: [
            { required: true, message: '请选择省', trigger: 'change', type: 'string' }
          ],
          unloadingCityCode: [
            { required: true, message: '请选择市', trigger: 'change', type: 'string' }
          ],
          unloadingCountyCode: [
            { required: true, message: '请选择区', trigger: 'change', type: 'string' }
          ],
          reportTotalMonetaryAmount: [
            { validator: validateReportTotalMonetaryAmount, trigger: 'blur' }
          ],
          transportLicenseNo: [
            { required: true, message: '请输入车辆的许可证号', trigger: 'blur' },
            { max: 15, message: '长度不能大于15字符', trigger: 'blur' }
          ],
          reportConsignmentTime: [
            { type: 'date', required: true, message: '请选择托运日期', trigger: 'change' }
          ],
          reportTruckOwner: [
            { max: 100, message: '长度不能大于100字符', trigger: 'blur' }
          ],
          reportActualLoadingUserFullName: [
            { max: 100, message: '长度不能大于100字符', trigger: 'blur' }
          ],
          reportActualLoadingUserCertifyNo: [
            { max: 35, message: '长度不能大于35字符', trigger: 'blur' }
          ],
          reportActualUnloadingUserFullName: [
            { max: 100, message: '长度不能大于100字符', trigger: 'blur' }
          ],
          trailerTruckLicenseNo: [
            { max: 20, message: '长度不能大于20字符', trigger: 'blur' }
          ],
          loadingGoodsVolume: [
            { validator: validateLoadingGoodsVolume, trigger: 'blur' }
          ],
          totalNumberOfPackages: [
            { validator: validateTotalNumberOfPackages, trigger: 'blur' }
          ],
          driverPhone: [
            { max: 18, message: '长度不能大于18字符', trigger: 'blur' }
          ],
          reportUnifiedSocialCreditIdentifier: [
            { max: 18, message: '长度不能大于18字符', trigger: 'blur' }
          ],
          driverLicenseNo: [
            { max: 18, message: '长度不能大于18字符', trigger: 'blur' }
          ],
          loadingAddr: [
            { max: 256, message: '长度不能大于256字符', trigger: 'blur' }
          ],
          unloadingAddr: [
            { max: 256, message: '长度不能大于256字符', trigger: 'blur' }
          ],
          reportNotes: [
            { max: 256, message: '长度不能大于256字符', trigger: 'blur' }
          ],
          remark: [
            { max: 200, message: '长度不能大于200字符', trigger: 'blur' }
          ]
        },
        reportBusinessTypeOptions: [
          {
            id: '1002996',
            value: '干线运输'
          },
          {
            id: '1003997',
            value: '城市配送'
          },
          {
            id: '1003998',
            value: '农村配送'
          },
          {
            id: '1002998',
            value: '集装性运输'
          },
          {
            id: '1003999',
            value: '其他'
          }
        ],
        reportCargoTypeClassificationOptions: [
          {
            id: '90',
            value: '电子产品'
          },
          {
            id: '92',
            value: '商品汽车'
          },
          {
            id: '93',
            value: '冷藏货物'
          },
          {
            id: '94',
            value: '大宗货物'
          },
          {
            id: '95',
            value: '快速消费品'
          },
          {
            id: '96',
            value: '农产品'
          },
          {
            id: '999',
            value: '其他'
          }
        ],
        licensePlateTypeOptions: [
          {
            id: '01',
            value: '大型汽车(黄底黑字)'
          },
          {
            id: '02',
            value: '小型汽车(蓝底白字)'
          },
          {
            id: '99',
            value: '其他'
          }
        ],
        reportVehicleClassificationOptions: [
          {
            id: 'H01',
            value: '普通货车'
          },
          {
            id: 'H02',
            value: '厢式货车'
          },
          {
            id: 'H04',
            value: '罐式货车'
          },
          {
            id: 'Q00',
            value: '仓栅式货车'
          },
          {
            id: 'G01',
            value: '封闭货车'
          },
          {
            id: 'G03',
            value: '平板货车'
          },
          {
            id: 'G05',
            value: '集装箱车'
          },
          {
            id: 'H09',
            value: '自卸货车'
          },
          {
            id: 'H03',
            value: '特殊结构货车'
          },
          {
            id: 'H05',
            value: '普通挂车'
          },
          {
            id: 'H06',
            value: '罐式挂车'
          },
          {
            id: 'H07',
            value: '集装箱挂车'
          },
          {
            id: 'H08',
            value: '厢式挂车'
          },
          {
            id: 'Z00',
            value: '仓栅式挂车'
          },
          {
            id: 'G02',
            value: '平板挂车'
          },
          {
            id: 'G07',
            value: '自卸挂车'
          },
          {
            id: 'G04',
            value: '专项作业挂车'
          },
          {
            id: 'G06',
            value: '牵引车'
          },
          {
            id: 'G09',
            value: '专项作业车'
          },
          {
            id: 'X91',
            value: '车辆运输车'
          },
          {
            id: 'X92',
            value: '车辆运输车（单排）'
          }
        ]
      };
    },
    mounted() {
      console.log('mounted: ', this.editable);
    },
    methods: {
      getText(options, id) {
        let label = '';
        options.forEach((item) => {
          if (item.id === id) {
            label = item.value;
          }
        });
        return label;
      },
      loadingProvinceChange(item) {
        city.getData({ keyword: item }, (dataSource) => {
          console.log(dataSource);
          this.loadingCityOptions = dataSource;
        });
      },
      loadingCityChange(item) {
        county.getData({ keyword: item }, (dataSource) => {
          console.log(dataSource);
          this.loadingCountyOptions = dataSource;
        });
      },
      unloadingProvinceChange(item) {
        city.getData({ keyword: item }, (dataSource) => {
          console.log(dataSource);
          this.unloadingCityOptions = dataSource;
        });
      },
      unloadingCityChange(item) {
        county.getData({ keyword: item }, (dataSource) => {
          console.log(dataSource);
          this.unloadingCountyOptions = dataSource;
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            waybillReport(this.form, (success, error) => {
              if (success) {
                this.$message({
                  type: 'success',
                  message: '上报成功',
                  duration: 1000
                });
                this.btnDisabled = false;
//                this.isEdit = true;
                this.editable = false;
                this.form.reportBusinessTypeText = this.getText(this.reportBusinessTypeOptions, this.form.reportBusinessTypeCode);
                this.form.reportCargoTypeClassificationText = this.getText(this.reportCargoTypeClassificationOptions, this.form.reportCargoTypeClassificationCode);
                this.form.licensePlateTypeText = this.getText(this.licensePlateTypeOptions, this.form.licensePlateTypeCode);
                this.form.reportVehicleClassificationText = this.getText(this.reportVehicleClassificationOptions, this.form.reportVehicleClassificationCode);
                this.form.loadingProvinceText = this.getText(this.loadingProvinceOptions, this.form.loadingProvinceCode);
                this.form.loadingCityText = this.getText(this.loadingCityOptions, this.form.loadingCityCode);
                this.form.loadingCountyText = this.getText(this.loadingCountyOptions, this.form.loadingCountyCode);
                this.form.unloadingProvinceText = this.getText(this.unloadingProvinceOptions, this.form.unloadingProvinceCode);
                this.form.unloadingCityText = this.getText(this.unloadingCityOptions, this.form.unloadingCityCode);
                this.form.unloadingCountyText = this.getText(this.unloadingCountyOptions, this.form.unloadingCountyCode);
              }
              if (error || success.code !== 200) {
                this.$message({
                  type: 'error',
                  message: error.content,
                  duration: 5000
                });
                self.btnDisabled = false;
                return false;
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      validateAndSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            validateTruckLicenseNo({ 'truckLicenseNo': this.form.truckLicenseNo }, (validateSuccess, validateError) => {
              if (validateSuccess) {
                if (validateSuccess.content.isExist) {
                  console.log(this.form.truckLicenseNo);
                } else {
                  this.$confirm('车辆信息未在国家平台录入, 是否继续上报?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    waybillReport(this.form, (success, error) => {
                      if (success) {
                        this.$message({
                          type: 'success',
                          message: '上报成功',
                          duration: 1000
                        });
                        this.btnDisabled = false;
//                        this.isEdit = true;
                        this.editable = false;
                        this.form.reportBusinessTypeText = this.getText(this.reportBusinessTypeOptions, this.form.reportBusinessTypeCode);
                        this.form.reportCargoTypeClassificationText = this.getText(this.reportCargoTypeClassificationOptions, this.form.reportCargoTypeClassificationCode);
                        this.form.licensePlateTypeText = this.getText(this.licensePlateTypeOptions, this.form.licensePlateTypeCode);
                        this.form.reportVehicleClassificationText = this.getText(this.reportVehicleClassificationOptions, this.form.reportVehicleClassificationCode);
                        this.form.loadingProvinceText = this.getText(this.loadingProvinceOptions, this.form.loadingProvinceCode);
                        this.form.loadingCityText = this.getText(this.loadingCityOptions, this.form.loadingCityCode);
                        this.form.loadingCountyText = this.getText(this.loadingCountyOptions, this.form.loadingCountyCode);
                        this.form.unloadingProvinceText = this.getText(this.unloadingProvinceOptions, this.form.unloadingProvinceCode);
                        this.form.unloadingCityText = this.getText(this.unloadingCityOptions, this.form.unloadingCityCode);
                        this.form.unloadingCountyText = this.getText(this.unloadingCountyOptions, this.form.unloadingCountyCode);
                      }
                      if (error || success.code !== 200) {
                        this.$message({
                          type: 'error',
                          message: error.content,
                          duration: 5000
                        });
                        self.btnDisabled = false;
                        return false;
                      }
                    });
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消上报'
                    });
                  });
                }
              }
              if (validateError || validateSuccess.code !== 200) {
                this.$message({
                  type: 'error',
                  message: validateError.content,
                  duration: 5000
                });
                self.btnDisabled = false;
                return false;
              }
            });
          }
        });
      },
      vehicleInfoReport(formName) {
        console.log(formName);
        this.$message({
          type: 'success',
          message: '功能开发中',
          duration: 1000
        });
      },
      enterpriseInfoReport(formName) {
        console.log(formName);
        this.$message({
          type: 'success',
          message: '功能开发中',
          duration: 1000
        });
      }
    },
    created() {
      const urlParams = getParamsFromURL(window.location.search);
      this.editable = urlParams.editable;
      console.log(this.editable);
      province.getData('', (dataSource) => {
        this.loadingProvinceOptions = dataSource;
      });
      province.getData('', (dataSource) => {
        this.unloadingProvinceOptions = dataSource;
      });
      if (urlParams.code) {
        this.code = urlParams.code;
        const params = {
          code: urlParams.code
        };
        get(params, (success) => {
          const content = success.content;
          Object.keys(content).forEach((key) => {
            let val = content[key];
            if (key === 'loadingTime' || key === 'unloadingTime' || key === 'reportConsignmentTime') {
              val = dateFormat(new Date(val), 'day');
            }
            this.$set(this.form, key, val);
          });

          this.inputDisabled = this.form.logisticsNo !== '';

          this.form.reportBusinessTypeText = this.getText(this.reportBusinessTypeOptions, this.form.reportBusinessTypeCode);
          this.form.reportCargoTypeClassificationText = this.getText(this.reportCargoTypeClassificationOptions, this.form.reportCargoTypeClassificationCode);
          this.form.licensePlateTypeText = this.getText(this.licensePlateTypeOptions, this.form.licensePlateTypeCode);
          this.form.reportVehicleClassificationText = this.getText(this.reportVehicleClassificationOptions, this.form.reportVehicleClassificationCode);


          this.form.loadingProvinceText = this.getText(this.loadingProvinceOptions, this.form.loadingProvinceCode);
          // 根据省code 加载市数据
          city.getData({ keyword: this.form.loadingProvinceCode }, (dataSource) => {
            console.log(dataSource);
            this.loadingCityOptions = dataSource;
          });
          this.form.loadingCityText = this.getText(this.loadingCityOptions, this.form.loadingCityCode);

          // 根据市code 加载区数据
          county.getData({ keyword: this.form.loadingCityCode }, (dataSource) => {
            console.log(dataSource);
            this.loadingCountyOptions = dataSource;
          });
          this.form.loadingCountyText = this.getText(this.loadingCountyOptions, this.form.loadingCountyCode);

          this.form.unloadingProvinceText = this.getText(this.unloadingProvinceOptions, this.form.unloadingProvinceCode);
          // 根据省code 加载市数据
          city.getData({ keyword: this.form.unloadingProvinceCode }, (dataSource) => {
            console.log(dataSource);
            this.unloadingCityOptions = dataSource;
          });
          this.form.unloadingCityText = this.getText(this.unloadingCityOptions, this.form.unloadingCityCode);

          // 根据市code 加载区数据
          county.getData({ keyword: this.form.unloadingCityCode }, (dataSource) => {
            console.log(dataSource);
            this.unloadingCountyOptions = dataSource;
          });
          this.form.unloadingCountyText = this.getText(this.unloadingCountyOptions, this.form.unloadingCountyCode);
        });
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/sass/base.scss";
  .el-form-item__label {
    font-size: 13px;
  }
  .el-input {
    width: 172px !important;
  }
  .el-textarea {
    width: 90% !important;
  }
  .region-select {
    .el-input {
      width: 100% !important;
    }
  }
</style>
