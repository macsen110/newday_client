<template>
  <div class="truck-gps-page">
    <header class="header clearfix">
      <!-- gps-form -->
      <div class="gps-search fl">
        <el-form label-width="100px" :inline="true">
          <el-form-item>
            车牌号：{{truckLicenseNo}}
          </el-form-item>
          <!-- <el-form-item>
                  <ele-pop-map @popOpen="popMapInited"></ele-pop-map>
                </el-form-item> -->
          <el-form-item label="回放时间：">
            <!-- <el-row>
                    <el-col :span="24"> -->
            <el-date-picker v-model="dateRange" type="datetimerange" placeholder="选择起止时间"></el-date-picker>
            <!-- </el-col>
                  </el-row> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query" :disabled="btnDisabled">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="lushuPlayback">
              {{lushuIsPlay? "暂停回放": "开始回放" }}
            </el-button>
            <el-button @click="lushuReset">回到起点</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- gps-setting -->
      <div class="gps-setting fr">
        回放速度：
        <el-button @click="setSpeed(0.5)" :type="syncCurrentSpeed(0.5)"> 0.5倍</el-button>
        <el-button type="primary" @click="setSpeed(1)" :type="syncCurrentSpeed(1)">1倍</el-button>
        <el-button @click="setSpeed(1.5)" :type="syncCurrentSpeed(1.5)">1.5倍</el-button>
        <el-button @click="setSpeed(2)" :type="syncCurrentSpeed(2)">2倍</el-button>
        <el-button @click="setSpeed(50)" :type="syncCurrentSpeed(50)">50倍</el-button>
        <el-button @click="setSpeed(100)" :type="syncCurrentSpeed(100)">100倍</el-button>
        <el-button type="primary" @click="changeShowTrajectory">轨迹明细</el-button>
        <el-button type="primary" @click="changeShowTrackChart">速度明细</el-button>
      </div>
    </header>
  
    <div class="trajectory" v-show="showTrajectory">
      <el-table :data="tracePath" height="250" border highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column property="recordTime" label="时间"></el-table-column>
        <el-table-column property="lng" label="经度"></el-table-column>
        <el-table-column property="lat" label="维度"></el-table-column>
        <el-table-column property="speed" label="速度（公里/小时）"></el-table-column>
        <el-table-column property="direction" label="角度"></el-table-column>
        <el-table-column property="directionDec" label="方向"></el-table-column>
        <el-table-column label="位置">
          <template scope="scope">
              <el-button @click.native.prevent="getPointPos(scope.$index, scope.row)" type="text" size="small">
                {{scope.row.posstr}}
              </el-button>
</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="trackChart" v-if="showTrackChart">

      <ve-line :data="chartData" :height="chartset.height" :width="chartset.width"></ve-line>
    </div>

    <div class="map" v-show="true" :class="{'withTable':showTrajectory, 'withChart':showTrackChart}" >
      <baidu-map class="baidu-map" :center="center" @ready="mapReady" :zoom="15" :map-click="false" :scroll-wheel-zoom="true">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>
        <bml-lushu @stop="lushuStop" :auto-view="true" :path="wayPointPath" :icon="truckIcon" :play="lushuIsPlay" :z-index="10" :rotation="true" :speed="playbackSpeed" :content="infoWindowContent" @step="lushuStep">
        </bml-lushu>
        <bm-polyline :path="wayPointPath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="wayPointWidth">
        </bm-polyline>
        <bm-marker v-for="(wayPoint, index) in gpsWayPoint" :position="wayPoint.point" :key="wayPoint.id" :dragging="false" :icon="wayPoint.icon"
        @mouseover="wayPointMouseOver(wayPoint, index)" @mouseout="wayPointMouseOut(wayPoint, index)"
        @infowindowopen="wayPointWindowOpen(wayPoint, index)"
        @infowindowclose="wayPointWindowClose(wayPoint, index)">
          <bm-info-window :show="wayPoint.show">
            <div v-if="wayPoint.stopTime">
              <p>停留时间：{{wayPoint.stayTime}} 分钟</p>
              <p>开始时间：{{wayPoint.recordTime}}</p>
              <p>停止时间：{{wayPoint.stopTime}}</p>
              <p>位置：{{wayPoint.pos_str}}</p>
            </div>
            <div v-else="wayPoint.stopTime">
              <p>采集时间：{{wayPoint.recordTime}}</p>
              <p>位置：{{wayPoint.pos_str}}</p>
              <p>速度：{{wayPoint.speed}}</p>
            </div>
          </bm-info-window>
        </bm-marker>
      </baidu-map>
    </div>
  </div>
</template>

<script>
  /* eslint-disable comma-dangle */
  /* eslint-disable vars-on-top */
  /* eslint-disable arrow-body-style */
  /* eslint-disable no-unused-vars */
  /* eslint-disable spaced-comment */
  /* eslint-disable import/no-unresolved */
  /* eslint-disable one-var */
  /* eslint-disable no-mixed-operators */
  import {
    BmlLushu
  } from 'vue-baidu-map';
  
  import * as utils from '../../api/Utils';
  import * as TruckService from '../../api/TruckService';
  import * as LbsService from '../../api/LbsService';
  import elePopMap from '../components/ele-pop-map/elePopMap.vue';
  import LbsLib from '../LbsLib';
  
  export default {
    name: 'truck-gps',
    components: {
      BmlLushu,
      'ele-pop-map': elePopMap
    },
    data() {
      return {
        chartset: {
          width: '100%',
          height: '220px'
        },
        btnDisabled: false,
        truckLicenseNo: '',
        currentDistance: 0,
        lushuPlayCounter: 0,
        prevPoint: null,
        dateRange: [new Date(Date.now() + 1000 - (5 * 24 * 3600 * 1000)), new Date()],
        showTrajectory: false,
        showTrackChart: false,
        showDataMap: false,
        playbackSpeed: 100,
        wayPointPath: [],
        tracePath: [],
        gpsWayPoint: [],
        chartData: {
          columns: ['时间', '速度'],
          rows: []
        },
        wayPointWidth: 2,
        infoWindowContent: '',
        center: {},
        truckIcon: {
          url: '/static/gps/img/car.png',
          size: {
            width: 36,
            height: 16
          },
          opts: {
            anchor: {
              width: 18,
              height: 8
            }
          }
        },
        wayPointIcon: {
          url: '/static/gps/img/blue_dot.png',
          size: {
            width: 12,
            height: 12,
          },
          opts: {
            width: 6,
            height: 6,
          },
        },
        startIcon: {
          url: '/static/gps/img/map_start.png',
          size: {
            width: 32,
            height: 32,
          },
          opts: {
            width: 16,
            height: 16,
          },
        },
        endIcon: {
          url: '/static/gps/img/map_finish.png',
          size: {
            width: 32,
            height: 32,
          },
          opts: {
            width: 16,
            height: 16,
          },
        },
        lushuIsPlay: false,
        lushuSpeed: 100,
      };
    },
    methods: {
      mapReady({
        BMap,
        map
      }) {
        this.map = map;
        this.getHistoryLocation();
      },
      lushuPlayback() {
        this.lushuIsPlay = !this.lushuIsPlay;
        if (this.lushuIsPlay) {
          this.prevPoint = null;
        }
      },
      lushuStop() {
        this.lushuIsPlay = false;
        //      console.log('lushu stop');
        this.$message({
          type: 'success',
          message: '回放完成',
          duration: 1000
        });
      },
      lushuReset() {
        this.lushuIsPlay = false;
        this.currentDistance = 0;
        this.lushuPlayCounter = 0;
        this.prevPoint = null;
        if (this.gpsWayPoint) {
          this.wayPointPath = LbsLib.transformPoints(this.gpsWayPoint.map(a => a.point));
          console.log('this.wayPointPath', this.wayPointPath);
          if (this.wayPointPath.length > 0) {
            if (this.map) {
              this.map.setViewport(this.wayPointPath);
            }
            this.map.setViewport(this.wayPointPath);
          }
        } else {
          this.$message.error('this.gpsWayPoint is not defined,msg by sls.');
        }
      },
      lushuStep({
        index,
        point,
        rotation
      }) {
        // console.log('lushuStep:', point);
        const record = this.tracePath[index];
        //      console.log('lushuStep', index, point, record);
        let distance = 0.0;
        if (this.prevPoint) {
          distance = (LbsLib.distance(this.prevPoint.lat, this.prevPoint.lng, point.lat, point.lng) / 1000);
          this.currentDistance += Math.abs(distance);
          //        console.log('currentDistance', index, this.currentDistance, Math.abs(distance));
          distance = this.currentDistance.toFixed(2);
        }
        this.prevPoint = point;
        this.lushuPlayCounter += 1;
        if (this.lushuPlayCounter === this.tracePath.length) {
          this.currentDistance = 0;
          this.lushuPlayCounter = 0;
          this.prevPoint = null;
          //        console.log('play end');
        }
        //      this.infoWindowContent = `${JSON.stringify({ index, point, rotation })}`;
        this.infoWindowContent = `<div>
                    <div><span>当前里程：${distance} km</span></div>
                    <div><span>当前速度：${record.speed ? record.speed : 0} km/小时</span></div>
                    <div><span>当前时间：${record.recordTime}</span></div>
                    </div>`;
      },
      setSpeed(val) {
        this.playbackSpeed = 100 * val;
        if (this.lushuIsPlay) {
          this.lushuIsPlay = false;
          this.$nextTick(() => {
            this.lushuIsPlay = true;
          });
        }
      },
      syncCurrentSpeed(val) {
        return this.playbackSpeed === val * 100 ? 'primary' : 'default';
      },
      changeShowTrajectory() {
        this.showTrajectory = !this.showTrajectory;
      },
      changeShowTrackChart() {
        this.showTrackChart = !this.showTrackChart;
      },
      query() {
        if (this.dateRange && this.dateRange.length) {
          const begin = Date.parse(this.dateRange[0]),
            end = Date.parse(this.dateRange[1]),
            diff = end - begin;
          if (diff > 0 && diff < (5 * 24 * 3600 * 1000)) {
            this.getHistoryLocation();
            return;
          }
        }
        this.$message({
          type: 'error',
          message: '只能查询5天内的轨迹数据',
          duration: 5000
        });
      },
      getHistoryLocation() {
        this.btnDisabled = true;
        LbsService.getHistoryLocation(this.truckLicenseNo, {
          beginTime: this.dateRange[0],
          endTime: this.dateRange[1],
        }, (success, error) => {
          this.btnDisabled = false;
          console.log('getHistoryLocation', success);
          if (success && success.content && success.content.length > 0) {
            const count = success.content.length;
            this.tracePath = success.content.map((a, index) => {
              return {
                createTime: a.createTime,
                direction: a.direction,
                handle: a.handle,
                lat: a.lat,
                lng: a.lng,
                ownerOrgCode: a.ownerOrgCode,
                recordTime: a.recordTime,
                source: a.source,
                speed: a.speed,
                type: a.type,
                directionDec: LbsLib.getDirection(a.direction),
                isLast: index === count - 1,
                posstr: '查看位置'
              };
            });
  
            this.trackPath = success.content;
            success.content.forEach((a) => {
              this.chartData.rows.push({
                '时间': a.recordTime,
                '速度': a.speed
              });
            });
            this.gpsWayPoint = success.content.map((a, index) => {
              let theIcon = index === 0 ? this.startIcon : this.wayPointIcon;
              let stayTime = 0;
              if (index + 1 === count) {
                theIcon = this.endIcon;
              } else if (a.stopTime) {
                theIcon = null;
                stayTime = (Date.parse(a.stopTime) - Date.parse(a.recordTime)) / (1000 * 60);
              }
              return {
                id: index,
                show: false,
                point: {
                  lng: a.lng,
                  lat: a.lat,
                },
                rotation: a.direction,
                handle: a.handle,
                createTime: a.createTime,
                recordTime: a.recordTime,
                stopTime: a.stopTime,
                stayTime: Math.floor(stayTime),
                source: a.source,
                speed: a.speed,
                type: a.type,
                icon: theIcon,
                pos_str: ''
              };
            });
          } else {
            this.gpsWayPoint = [];
          }
          this.wayPointPath = LbsLib.transformPoints(this.gpsWayPoint.map(a => a.point));
          console.log('this.wayPointPath', this.wayPointPath);
          if (this.wayPointPath && this.wayPointPath.length) {
            this.prevPoint = this.wayPointPath[0];
          }
          if (this.wayPointPath.length > 0) {
            this.map.setViewport(this.wayPointPath);
          }
        });
      },
      wayPointMouseOver(wayPoint, index) {
        //      console.log('marker mouse over', wayPoint);
        wayPoint.show = true;
        if (!wayPoint.pos_str || !wayPoint.pos_str.length) {
          LbsService.getAddress({
            type: 1,
            lng: wayPoint.point.lng,
            lat: wayPoint.point.lat
          }, (success, error) => {
            if (success) {
              wayPoint.pos_str = success.content.address || '获取地址';
            }
          });
        }
      },
      wayPointMouseOut(wayPoint, index) {
        //      console.log('marker mouse out', wayPoint);
        wayPoint.show = false;
      },
      wayPointWindowOpen(wayPoint, index) {
        wayPoint.show = true;
      },
      wayPointWindowClose(wayPoint, index) {
        wayPoint.show = false;
      },
      getPointPos(index, item) {
        LbsService.getAddress({
          type: 0,
          lng: item.point.lng,
          lat: item.point.lat
        }, (success, error) => {
          if (success) {
            item.posstr = success.content.address || '获取地址';
          }
        });
      },
      popMapInited({
        ctrl,
        markers
      }) {
        LbsService.getPosition({
          truckLicenseNo: this.truckLicenseNo
        }, (result, error) => {
          if (result) {
            markers.length = 0;
            result.content.forEach((a) => {
              markers.push({
                handle: a.handle,
                rotation: a.direction,
                position: {
                  lng: a.lng,
                  lat: a.lat
                },
                status: a.status,
                type: a.type,
                icon: this.truckIcon
              });
            });
            ctrl.refresh();
          }
        });
      }
    },
    created() {
      const params = utils.getParamsFromURL(window.location.search);
      this.truckLicenseNo = params.truckLicenseNo;
  
      this.center = {
        lng: 121.494337,
        lat: 31.22753
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import './truck-gps.scss';
  .baidu-map {
    width: 100%;
    height: 100%;
  }
  
  .trajectory {
    height: 250px;
    z-index: 100;
    position: relative;
  }
  
  .trackChart {
    height: 200px;
    z-index: 100;
    position: relative;
    background-color: white;
  }
  
  .map.withTable {
    top: 290px;
  }
  
  .map.withChart {
    top: 240px;
  }
  
  .map.withTable.withChart {
    top: 490px!important;
  }
  
  .el-date-editor--datetimerange input {
    width: 320px;
  }
  
  .today.start-date,
  .today.end-date {
    color: black!important;
  }
</style>
