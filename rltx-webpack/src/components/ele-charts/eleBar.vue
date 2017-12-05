<template>
  <div class="echarts-bar" style="width: 100%; height:100%"></div>
</template>

<script type="text/ecmascript-6">

  /* eslint-disable no-unused-vars */
  /* eslint-disable object-shorthand */
  import * as echarts from 'echarts';

  export default {
    name: 'eleBar',
    props: {
      xAxisData: null,
      seriesData: null
    },
    data() {
      return {
        barChart: Object
      };
    },
    methods: {
      draw() {
        const option = {
          grid: {
            borderWidth: 0,
            left: '0%',
            right: '0%',
            bottom: '0%'
          },
          xAxis: [
            {
              show: false,
              type: 'category',
              data: this.xAxisData || []
            }
          ],
          yAxis: [
            {
              type: 'value',
              show: false
            }
          ],
          series: [
            {
              type: 'bar',
              data: this.seriesData || [],
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  distance: 10,
                  formatter: function (params) {
                    return `${params.name}\n${params.value}`;
                  }
                }
              },
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  color: function (params) {
                    const colorList = [
                      '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                      '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                      '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                    ];
                    return colorList[params.dataIndex];
                  }
                }
              }
            }
          ]
        };
        this.barChart.setOption(option);
      }
    },
    mounted() {
      this.$nextTick(() => {
        const dom = document.querySelector('.echarts-bar');
        this.barChart = echarts.init(dom);
      });
    },
    watch: {
      xAxisData: function () {
        this.draw();
      },
      seriesData: function () {
        this.draw();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
