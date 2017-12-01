/**
* elePopMap.vue
* created by alex on 17/10/09
*/
<template>
  <div class="block">
    <el-button @click="dialogOpen" type="primary">
      {{buttonTitle||"地图展示"}}
    </el-button>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" size="large">
      <div class="fix-table-wrap">
        <baidu-map class="pop-map" @ready="mapReady">
          <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
          <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>
          <bm-marker :show="showMarker" v-for="marker in markers" :key="marker.id" :rotation="marker.rotation" :position="marker.position" :icon="marker.icon" :dragging="marker.dragging"></bm-marker>
          <bm-polyline :show="showPolyline" v-for="line in polylines" :key="line.id" :stoke-color="line.stroke.color" :stroke-opacity="line.stroke.opacity" :stroke-weight="line.stroke.weight"></bm-polyline>
        </baidu-map>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unused-vars */
  // import * as DataSourceService from '../../../api/DataSourceService';
  import {
    getParam
  } from '../../../api/Utils';

  export default {
    name: 'elePopMap',
    props: {
      configData: Object,
      editable: {
        type: Boolean,
        'default': true
      },
      buttonTitle: '打开',
      dialogTitle: '地图展示',
      dialogVisible: false,
      showMarker: false,
      showPolyline: false,
      domainObject: Object,
      fieldSettings: []
    },
    data() {
      return {
        markers: [],
        polylines: [],
        defaultIcon: null,
        param: {

        }
      };
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
      },
      init() {

      },
      refresh() {
        // this.getData();
        // this.map.
        console.log('refresh');
        const boundry = [];
        this.markers.forEach((a) => {
          boundry.push({
            lng: a.position.lng,
            lat: a.position.lat
          });
        });

        if (boundry.length > 0) {
          this.map.setViewport(boundry);
        }
      },
      getData() {
        // DataSourceService[this.configData.datasource].getListData(this.param, (success) => {
        //   if (success) {
        //     this.markers = [];
        //     this.polylines = [];
        //     success.autoData.forEach((val) => {
        //       const item = {};
        //       this.fieldSettings.forEach((field) => {
        //         item[field.targetName] = val[field.sourceName];
        //       });
        //       item.icon = this.defaultIcon;
        //       this.markers.push(item);
        //     });
        //   }
        // });
      },
      dialogOpen() {
        this.dialogVisible = true;
        this.$emit('popOpen', {
          ctrl: this,
          markers: this.markers
        });
      },
      mapReady({
        BMap,
        map
      }) {
        this.BMap = BMap;
        this.map = map;
      }
    },
    mounted() {
      const form = this.form();
      if (form) {
        form.$emit('eleMounted', this);
      }
    },
    created() {
      const form = this.form();
      if (form) {
        form.$emit('eleCreated', this);
      }
      console.log('ele-pop-map created');

      // this.$emit('inited', { ctrl: this, markers: this.markers });
      this.refresh();
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/sass/rl-table.scss";
  .el-dialog__body {
    .fix-table-wrap {
      padding: 10px;
      min-height: 300px;
      box-sizing: border-box;
      .rl-fix-table {
        margin: 0;
      }
      .pagination {
        padding-left: 0;
      }
      .pop-map {
        margin: 0;
        position: absolute; // width:100%;
        // min-height:200px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
    .text-r {
      text-align: right;
    }
  }
</style>
