
<template>
    <!--<el-dialog title="地图展示" :visible.sync="dialogVisible" size="large" @open="dialogOpen" @close="dialogClose">-->
      <div class="fix-table-wrap">
        <baidu-map class="pop-map" @ready="mapReady" :zoom="15" :center="center" :scroll-wheel-zoom="true">
          <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
          <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>
          <bm-marker :show="showMarker" v-for="marker in markers" :key="marker.id"  :position="marker.position" :icon="marker.icon" :dragging="marker.dragging"></bm-marker>
          <!-- <bm-polyline :show="showPolyline" v-for="line in polylines" :key="line.id" :stoke-color="line.stroke.color" :stroke-opacity="line.stroke.opacity" :stroke-weight="line.stroke.weight"></bm-polyline> -->
        </baidu-map>
      </div>
    <!--</el-dialog>-->
</template>

<script type="text/ecmascript-6">
// import Vue from 'vue';
import { get as getWaybill } from '../../../api/waybillService';
import { getPosition } from '../../../api/LbsService';
import LbsLib from '../../LbsLib';

// Vue.use(BaiduMap, {
//  ak: '0splGL787be69VgsOZX2t3vMvw016i0F'
// });

export default {
  name: 'eleWaybillPopMap',
  props: {
    id: String,
    action: String,
    isDialog: Boolean,
    // code: {
    //   type: String,
    //   'default': ''
    // },
    defaultIcon: {
      type: Object,
      'default': null
    }
    // ,
    // dialogVisible: {
    //   type: Boolean,
    //   'default': false
    // }
  },
  data() {
    return {
      center: {
        lng: 121.494337,
        lat: 31.22753
      },
      dialogVisible: false,
      showMarker: false,
      showPolyline: false,
      code: '',
      markers: []
    };
  },
  methods: {
    mapReady({ map }) {
      this.map = map;
      this.refresh();
    },
    refresh() {
      const boundry = [];
      this.getData();
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
    execute() {
      this.$emit('close');
    },
    dialogOpen() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
    },
    getData() {
      if (this.id) {
        getWaybill({ code: this.id }, (success) => {
          if (success) {
          // console.log(JSON.stringify(success));
          // const truckNo = success.content.truckLicenseNo;
            getPosition({
              truckLicenseNo: success.content.truckLicenseNo
            }, (result) => {
              if (result) {
                this.markers.length = 0;
                result.content.forEach((a) => {
                  this.markers.push({
                    handle: a.handle,
                    rotation: a.direction,
                    position: LbsLib.transformPoint({ lng: a.lng, lat: a.lat }),
                    status: a.status,
                    type: a.type,
                    icon: this.truckIcon
                  });
                  this.center = this.markers[this.markers.length - 1].position;
                });
              }
            });
          }
        });
      }
    },

    showDialog(code) {
      this.id = code;
      this.refresh();
      this.dialogOpen();
    }
  },
  created() {
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
