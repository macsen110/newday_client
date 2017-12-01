<template>
  <div class="echarts-geo-lines" style="width: 100%; height:100%"></div>
</template>

<script type="text/ecmascript-6">

  /* eslint-disable no-unused-vars */
  /* eslint-disable object-shorthand */
  import * as echarts from 'echarts';

  require('echarts/map/js/china');

  export default {
    name: 'eleGeoLines',
    props: {
      geoLines: null,
      backgroundColor: null,
      chartOption: null,
      series: null
    },
    data() {
      return {
        geoLinesChart: Object
      };
    },
    methods: {
      draw() {
        const option = {
          backgroundColor: this.backgroundColor || '#1b1b1b',
          tooltip: this.tooltip || {
            trigger: 'item',
            formatter: function (params) {
              let label = '';
              if (params.componentSubType === 'lines') {
                const data = params.data;
                label += data.fromName;
                label += ' > ';
                label += data.toName;
                if (data.weight || data.volume || data.num) {
                  label += '</br>货量:';
                  if (data.weight) {
                    label += `</br>${data.weight}吨`;
                  }
                  if (data.volume) {
                    label += `</br>${data.volume}方`;
                  }
                  if (data.num) {
                    label += `</br>${data.num}件`;
                  }
                }
              } else {
                label = params.name;
              }
              return label;
            }
          },
          geo: {
            name: '全国',
            map: 'china',
            left: '1%',
            top: '3%',
            bottom: '3%',
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#f2f2f2'
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  color: '#f2f2f2'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(100,149,237,1)',
                borderWidth: 0.5,
                areaColor: '#1b1b1b'
              },
              emphasis: {
                borderColor: 'rgba(100,149,237,1)',
                borderWidth: 0.5,
                areaColor: '#1b1b1b'
              }
            },
            regions: [
              { name: '北京' },
              { name: '天津' },
              { name: '上海' },
              { name: '重庆' },
              { name: '河北' },
              { name: '河南' },
              { name: '云南' },
              { name: '辽宁' },
              { name: '黑龙江' },
              { name: '湖南' },
              { name: '安徽' },
              { name: '山东' },
              { name: '新疆' },
              { name: '江苏' },
              { name: '浙江' },
              { name: '江西' },
              { name: '湖北' },
              { name: '广西' },
              { name: '甘肃' },
              { name: '山西' },
              { name: '内蒙古' },
              { name: '陕西' },
              { name: '吉林' },
              { name: '福建' },
              { name: '贵州' },
              { name: '广东' },
              { name: '青海' },
              { name: '西藏' },
              { name: '四川' },
              { name: '宁夏' },
              { name: '海南' },
              { name: '台湾' },
              { name: '香港' },
              { name: '澳门' }
            ]
          },
          series: this.series || [
            {
              type: 'lines',
              symbol: ['circle', 'arrow'],
              symbolSize: 6,
              zlevel: 1,
              effect: {
                show: true,
                symbolSize: 2,
                period: 10,
                color: '#fff'
              },
              lineStyle: {
                normal: {
                  color: 'aqua',
                  width: 1,
                  curveness: 0.2,
                  shadowColor: 'rgba(255, 255, 255, 0.1)',
                  shadowBlur: 0.1
                },
                emphasis: {
                  color: 'aqua',
                  width: 3,
                  curveness: 0.2,
                  shadowColor: 'rgba(255, 255, 255, 0.1)',
                  shadowBlur: 0.5
                }
              },
              data: this.geoLines || []
            }
          ]
        };
        this.geoLinesChart.setOption(option);
      }
    },
    mounted() {
      this.$nextTick(() => {
        const dom = document.querySelector('.echarts-geo-lines');
        this.geoLinesChart = echarts.init(dom);
      });
    },
    watch: {
      geoLines: function () {
        this.draw();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
