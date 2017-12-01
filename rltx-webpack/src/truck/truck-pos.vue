<template>
  <div>
    <baidu-map class="popup-map" @ready="mapReady" :zoom="15" :map-click="false">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>
      <bm-marker v-for="(truck, id) in truckMarkers" :key="id" @click="truckClick(truck)" :position="truck.point" :rotation="truck.rotation" :dragging="false" :icon="truckIcon">
        <bm-info-window></bm-info-window>
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
/* eslint-disable comma-dangle */
/* eslint-disable vars-on-top */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable import/no-unresolved */

import * as utils from '../../api/Utils';
import * as TruckService from '../../api/TruckService';
import * as LbsService from '../../api/LbsService';

export default {
  name: "truck-pos",
  components: {},
  data() {
    return {
      truckIcon: {
        url: '../static/gps/img/car.png',
        size: {
          width: 36,
          height: 16
        }
      },
      truckMarkers: {},
      truckBoundry: [],
    }
  },
  methods: {
    mapReady({
        BMap,
      map
      }) {
      this.map = map;
      if (this.truckBoundry.length > 0) {
        map.setViewport(this.truckBoundry);
      }
    },
    truckClick(truck) {
      this.$refs[truck.handle][0].openInfoWindow();
    }
  },
  created() {
    const params = utils.getParamsFromURL(window.location.search);
    //console.log(JSON.stringify(params));
    this.truckLicenseNo = params.truckLicenseNo;
    LbsService.getPosition({
      truckLicenseNo: this.truckLicenseNo
    }, (result, error) => {
      if (result) {
        this.truckMarkers = {};
        this.truckBoundry = [];
        result.content.forEach((a) => {
          this.truckBoundry.push({
            lng: a.lng,
            lat: a.lat
          });
          this.truckMarkers[a.handle] = {
            handle: a.handle,
            rotation: a.direction,
            point: {
              lng: a.lng,
              lat: a.lat
            },
            status: a.status,
            type: a.type
          };
        });

        console.log(JSON.stringify(this.truckMarkers));
      }
    });
  }
}
</script>

<style lang="scss">
.popup-map {
  width: 100%;
  height: 500px;
}
</style>

