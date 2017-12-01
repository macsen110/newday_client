<template>
  <div class="info-list-tpl" v-bind:style="styleObject">
    <ele-geo-lines :geoLines="geoLines"></ele-geo-lines>
    <!--S:info-tab-->
    <div class="info-tab info-tab-open">
      <i id="openTabBtn" class="it-fold glyphicon-menu-left hide" @click="handleInfoTab" title="展开版块"></i>
      <i id="closeTabBtn" class="it-fold glyphicon-menu-right block" @click="handleInfoTab" title="折叠版块"></i>
      <div class="cont">
        <h1>物流大数据云图 <span class="time fr" style="font-size: 12px" v-if="startDate && endDate">{{startDate}}~{{endDate}}</span></h1>
        <ul class="info-title tc mar_t--15">
          <li class="mes dis_inb">
            <dl>
              <dt>货量</dt>
              <dd>
                <p v-if="summary.weight">{{summary.weight}}吨</p>
                <p v-if="summary.volume">{{summary.volume}}方</p>
                <p v-if="summary.num">{{summary.num}}件</p>
              </dd>
            </dl>
          </li>
          <li class="mes dis_inb">
            <dl>
              <dt>车次</dt>
              <dd><p v-if="summary.times">{{summary.times}}车</p></dd>
            </dl>
          </li>
          <li class="mes dis_inb">
            <dl>
              <dt>营收</dt>
              <dd><p v-if="summary.totalFreight">{{summary.totalFreight}}元</p></dd>
            </dl>
          </li>
        </ul>
        <dl class="info-list mar_t--15">
          <dt class="info-list-tpl">
            <div class="pull-right" id="tl-unit">
              <span class="unit-ton active" @click="handleUnit('ton')">吨</span>
              <span class="unit-cube" @click="handleUnit('cube')">方</span>
              <span class="unit-item" @click="handleUnit('item')">件</span>
            </div>
            运输线路 TOP 5
          </dt>
          <dd v-for="(line, index) in lineTop5">
            <span :class="['label label-' +  line.labelCss]" style="margin-right: 5px;">{{ index + 1 }}</span>
            {{ line.loadingProvince }} {{ line.loadingCity }} —— {{ line.unloadingProvince }} {{ line.unloadingCity }}
            <span class="fr">{{ line.value }} {{ line.unit }}</span>
          </dd>
        </dl>
        <div class="line-bar-list mar_t--15">
          <h2 class="mar_b--15">运输货品 TOP 5</h2>
          <div style="width: 420px;height: 120px; margin-top: -30px;">
            <ele-bar :xAxisData="goodsTop5.xAxisData" :seriesData="goodsTop5.seriesData"></ele-bar>
          </div>
        </div>
        <div class="scroll-list mar_t--15">
          <h2 class="mar_b--15">收发货直播</h2>
          <div id="scroll">
            <div class="scroll-list-tpl">
              <table class="table">
                <tbody>
                  <tr v-for="v in transportLive">
                    <td>{{ v.truckNo }}</td>
                    <td class="overflow">{{ v.driverName }}</td>
                    <td class="overflow">{{ v.goodsName }}</td>
                    <td v-if="v.goodsWeight">{{ v.goodsWeight }}吨</td><td v-else></td>
                    <td v-if="v.goodsVolume">{{ v.goodsVolume }}方</td><td v-else></td>
                    <td v-if="v.goodsNum">{{ v.goodsNum }}件</td><td v-else></td>
                    <td>{{ v.transportType }}</td>
                    <td>{{ v.transportTime }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!--<footer class="footer">-->
          <!--<i class="fr glyphicon glyphicon-zoom-in curhand icon-open" style="top: 6px; margin-left: 10px;"></i>-->
        <!--</footer>-->
      </div>
    </div>
    <!--E:info-tab-->
    <span class="company-name">{{companyName}}</span>
    <span class="copyright"><a href="http://www.rltx.com/" class="fr" target="_blank">Powered by 融链天下</a></span>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable arrow-body-style,max-len,prefer-arrow-callback */

  import eleGeoLines from '../components/ele-charts/eleGeoLines.vue';
  import eleBar from '../components/ele-charts/eleBar.vue';

  /* eslint-disable no-unused-vars */
  import { screenSummary, screenLineSummary, screenGoodsSummary, screenTransportLive } from '../../api/ReportService';
  import { dateFormat } from '../../api/Utils';
  import { geoCoordMap } from '../../api/EChartUtil';
  import * as classUtil from '../../api/classUtil';

  export default {
    name: 'screen',
    components: {
      'ele-geo-lines': eleGeoLines,
      'ele-bar': eleBar
    },
    data() {
      return {
        styleObject: {
          width: null,
          height: null
        },
        companyName: null,
        summary: {
          weight: null,
          volume: null,
          num: null,
          times: null,
          totalFreight: null
        },
        goodsTop5: {
          xAxisData: null,
          seriesData: null
        },
        lineTop5: [],
        transportLive: [],
        geoLines: null,
        type: 'ton',
        startDate: null,
        endDate: null,
        myMar: null
      };
    },
    methods: {
      setMapSize() {
        this.styleObject = {
          width: `${document.documentElement.clientWidth}px`,
          height: `${document.documentElement.clientHeight}px`
        };
      },
      renderScreenSummary(params) {
        screenSummary(params, (success) => {
          const content = success.content;
          this.companyName = content.companyName;
          this.summary.weight = this.tenThousandFormat(content.weight);
          this.summary.volume = this.tenThousandFormat(content.volume);
          this.summary.num = this.tenThousandFormat(content.num);
          this.summary.times = content.times;
          this.summary.totalFreight = this.tenThousandFormat(content.totalFreight);
        });
      },
      renderScreenLineSummary(params) {
        screenLineSummary(params, (success) => {
          const list = success.content || [],
            ton = [],
            cube = [],
            item = [],
            css = ['danger', 'warning', 'success', 'info', 'default'],
            coordMap = geoCoordMap(),
            geoLines = [];
          let lineList = [];
          list.forEach((line) => {
            if (coordMap[line.loadingCity] && coordMap[line.unloadingCity]) {
              const w = this.tenThousandFormat(line.weight),
                v = this.tenThousandFormat(line.volume),
                n = this.tenThousandFormat(line.num),
                corrds = [];
              ton.push({ loadingCity: line.loadingCity, loadingProvince: line.loadingProvince, unloadingCity: line.unloadingCity, unloadingProvince: line.unloadingProvince, value: w, unit: '吨' });
              cube.push({ loadingCity: line.loadingCity, loadingProvince: line.loadingProvince, unloadingCity: line.unloadingCity, unloadingProvince: line.unloadingProvince, value: v, unit: '方' });
              item.push({ loadingCity: line.loadingCity, loadingProvince: line.loadingProvince, unloadingCity: line.unloadingCity, unloadingProvince: line.unloadingProvince, value: n, unit: '件' });
              corrds.push(coordMap[line.loadingCity]);
              corrds.push(coordMap[line.unloadingCity]);
              geoLines.push({ fromName: line.loadingCity, toName: line.unloadingCity, coords: corrds, weight: w, volume: v, num: n });
            }
          });
          if (this.type === 'ton') {
            ton.sort((a, b) => {
              return b.value - a.value;
            });
            lineList = ton.slice(0, 5);
          } else if (this.type === 'cube') {
            cube.sort((a, b) => {
              return b.value - a.value;
            });
            lineList = cube.slice(0, 5);
          } else if (this.type === 'item') {
            item.sort((a, b) => {
              return b.value - a.value;
            });
            lineList = item.slice(0, 5);
          }
          lineList.forEach((v, i) => {
            v.labelCss = css[i];
          });
          this.lineTop5 = lineList;
          this.geoLines = geoLines;
        });
      },
      renderScreenGoodsSummary(params) {
        screenGoodsSummary(params, (success) => {
          const list = success.content || [],
            xAxisData = [],
            seriesData = [];
          let ton = [],
            cube = [],
            item = [];
          list.forEach((good) => {
            ton.push({ name: good.goodsName, value: good.weight });
            cube.push({ name: good.goodsName, value: good.volume });
            item.push({ name: good.goodsName, value: good.num });
          });
          if (this.type === 'ton') {
            ton.sort((a, b) => {
              return b.value - a.value;
            });
            ton = ton.slice(0, 5);
            ton.forEach((v) => {
              xAxisData.push(v.name);
              seriesData.push(v.value);
            });
          } else if (this.type === 'cube') {
            cube.sort((a, b) => {
              return b.value - a.value;
            });
            cube = cube.slice(0, 5);
            cube.forEach((v) => {
              xAxisData.push(v.name);
              seriesData.push(v.value);
            });
          } else if (this.type === 'item') {
            item.sort((a, b) => {
              return b.value - a.value;
            });
            item = item.slice(0, 5);
            item.forEach((v) => {
              xAxisData.push(v.name);
              seriesData.push(v.value);
            });
          }
          this.goodsTop5.xAxisData = xAxisData;
          this.goodsTop5.seriesData = seriesData;
        });
      },
      renderScreenTransportLive() {
        const params = {
          page: 1,
          size: 50
        };
        screenTransportLive(params, (success) => {
          const content = success.content;
          content.forEach((v) => {
            v.transportTime = dateFormat(v.transportTime, 'justTime');
          });
          this.transportLive = content;
          this.$nextTick(() => {
            const len = content.length;
            if (this.myMar) {
              clearInterval(this.myMar);
            }
            this.myMar = setInterval(() => {
              const $scroll = document.querySelector('#scroll');
              $scroll.scrollTop += 1;
              if ($scroll.scrollTop === (len - 4) * 21) {
                $scroll.scrollTop = 0;
              }
            }, 50);
          });
        });
      },
      setPage() {
        const bodyHeight = document.documentElement.clientHeight,
          contHeight = 42 + 122 + 185 + 137 + 147,
          mar = (bodyHeight - contHeight) > 0 ? (bodyHeight - contHeight) / 4 : 0;
        document.querySelectorAll('.mar_t--15').forEach((v) => {
          v.style.marginTop = `${mar}px`;
        });
      },
      handleInfoTab() {
        const openBtn = document.querySelector('#openTabBtn'),
          closeBtn = document.querySelector('#closeTabBtn'),
          infoTab = document.querySelector('.info-tab');
        classUtil.toggleClass(openBtn, 'block');
        classUtil.toggleClass(openBtn, 'hide');
        classUtil.toggleClass(closeBtn, 'block');
        classUtil.toggleClass(closeBtn, 'hide');
        classUtil.toggleClass(infoTab, 'info-tab-open');
        classUtil.toggleClass(infoTab, 'info-tab-close');
      },
      handleUnit(unit) {
        const that = this,
          params = {
            from_settleDate: that.startDate,
            to_settleDate: that.endDate
          };
        that.type = unit;
        document.querySelectorAll('#tl-unit span').forEach((v) => {
          classUtil.removeClass(v, 'active');
        });
        classUtil.addClass(document.querySelector(`.unit-${unit}`), 'active');
        that.renderScreenGoodsSummary(params);
        that.renderScreenLineSummary(params);
      },
      tenThousandFormat(value) {
        if (!value) {
          return value;
        }
        let result = '';
        if (value > 10000) {
          result = `${Number(value / 10000).toFixed(2)}万`;
        } else {
          result = Number(value).toFixed(2);
        }
        return result;
      }
    },
    mounted() {
      const that = this;
      that.setPage();
      window.onresize = function () {
        that.setMapSize();
        that.setPage();
      };
    },
    created() {
      const that = this,
        innerInterval = setInterval(() => {
          that.renderScreenTransportLive();
        }, 2 * 60 * 1000),
        today = new Date();
      let params = {};

      that.endDate = dateFormat(today, 'day');
      today.setFullYear(today.getFullYear() - 1);
      that.startDate = dateFormat(today, 'day');
      that.setMapSize();
      params = {
        from_settleDate: that.startDate,
        to_settleDate: that.endDate
      };
      that.renderScreenSummary(params);
      that.renderScreenGoodsSummary(params);
      that.renderScreenLineSummary(params);
      that.renderScreenTransportLive(params);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  body, div, p, h1, h2, h3, h4, h5, h6, hr, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td {margin:0; padding:0; -webkit-box-sizing: content-box; -moz-box-sizing: content-box; box-sizing: content-box;}
  div,h1,h2,ul,li,dl,dt,dd {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
  }
  body, button, input, select, textarea {font:normal 12px/1  microsoft yahei, "\5b8b\4f53", Tahoma, Helvetica, Arial, sans-serif; line-height:22px }
  textarea {resize:none; overflow:hidden; word-break:break-all; word-wrap:break-word }
  table {border-collapse:collapse; border-spacing:0;}
  address, caption, cite, code, dfn, em, strong, th, var {font-style:normal; font-weight:normal;}
  h1 {font-size:18px }
  h2 {font-size:16px }
  h3 {font-size:14px }
  h4, h5, h6 {font-size:100% }
  a {text-decoration:none; outline: none; color:#666;}
  a:hover {text-decoration:underline }
  input, button, textarea {outline:none }
  fieldset, img {border:0 }
  ul, ol {list-style:none }
  .fl {float:left; display:inline;}
  .fr {float:right; display:inline;}
  .cl {clear:both }
  .pr {position: relative; z-index: 10 }
  .pa {position: absolute; z-index: 20 }
  .pf {position: fixed; z-index: 9}
  .hide {display:none !important;}
  .block {display:block !important;}
  .tc {text-align:center;}
  .invisible {visibility: hidden;}
  .visible {visibility: visible;}
  .text-split {display: inline-block; zoom:1; *display:inline; white-space: nowrap; word-wrap: normal; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; -webkit-text-overflow: ellipsis; text-overflow: ellipsis;}
  .curhand { cursor: pointer;}
  .clearfix:after{display:block;content:"\0020";height:0;overflow:hidden}
  .clearfix:after{clear:both}
  .clearfix{*zoom:1}
  .transparent { opacity: 0; filter:Alpha(opacity=0); }
  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder { color: #666; }
  :-moz-placeholder { color: #666; }
  ::-moz-placeholder { color: #666; }
  /*--form elements--*/
  .txtbox { width: 140px; height: 22px; padding: 0 5px; line-height: 22px; color: #464646; border:solid 1px #dadada; -webkit-transition:all .2s ease-in-out; transition:all .2s ease-in-out; }
  .txtbox:focus { background-color: #fffbf6; border-color:#f48400; }
  select.txtbox { width: 152px; height: 24px; }
  .fmfrom .txtbox, .fmto .txtbox,.fmdate .txtbox { background-image: url('../img/ico-txtbox.png'); background-repeat: no-repeat; background-position: right -1px; }
  .fmfrom .txtbox, .fmto .txtbox { background-position: right -26px; }
  [class^="btn"] { display: inline-block; vertical-align: middle; width: auto; height: 26px; line-height: 26px; padding: 0 20px; border-radius: 3px; border: solid 1px #f48400; cursor: pointer; }
  .btn-primary,.btn-default:hover { background-color: #f48400; color: #fff; }
  .btn-primary:hover { background-color: #f90; }
  .btn-default { background-color: transparent; color: #f48400; }
  .color--111{ color: #111;}
  /*--migration--*/
  .logout { position: absolute; z-index: 9; right: 10px; top: 10px; color: #fff; opacity: .5; }
  .logout:hover { opacity: 1; }
  .ashd { margin-bottom: 10px; padding-bottom: 6px; border-bottom: solid 1px #333; }
  .search-section { position: absolute; z-index: 9; width: 252px; right: 10px; bottom: 60px; padding: 20px; background-color: rgba(0,0,0,.9); color: #999; border-radius: 10px; opacity: .9; -webkit-transition:all .2s ease-in-out; transition:all .2s ease-in-out; }
  .search-section:hover { opacity: 1; }
  .asbd { padding: 10px 0; }
  .search-section .txtbox { background-color: #eee; border-color: #eee; border-radius: 3px; }
  .search-section .txtbox:focus { background-color: #fff; border-color: #fff; }
  .as-list { padding-left: 100px; margin-bottom: 10px; }
  .as-list .fm-tit { float: left; width: 90px; margin-left: -100px; text-align: justify; }
  .as-list .fm-tit .txtbox { width: 92px; }
  .asft { text-align: center; }
  .asft input { margin: 0 5px; }
  .mar_t--10{margin-top: 10px}
  .mar_t--15{margin-top: 15px}
  .mar_b--15{margin-bottom: 15px}
  .dis_inb{
    display: inline-block;
  }
  /*info-tab*/
  .info-tab{
    height: 100%;
    width: 460px;
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.7);
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
    color: #fff;
  }

  .it-fold{
    position: absolute;
    left: -16px;
    top: 50%;
    margin-top: -44px;
    width: 16px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    background-color: #333;
    color: #fff;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    cursor: pointer;
  }

  .it-fold:hover{
    background-color: #fc0;
  }

  .it-open{
    display: none;
  }

  /*--for small screen--*/
  @media only screen and (max-width: 1200px){
    .info-tab{
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    .it-close{
      display: none;
    }
    .it-open{
      display: block;
    }
  }
  .info-tab-open {
    -webkit-transform: translateX(0);
    transform: translateX(0)
  }
  .info-tab-close {
    -webkit-transform: translateX(100%);
    transform: translateX(100%)
  }

  .info-tab .cont{
    padding: 20px;
  }
  .info-tab .cont>h1 {
    font-size: 34px;
    padding-bottom: 5px;
  }
  .info-tab .cont>h1 .fr{
    color: #6b6b6b;
    display: inline-block;
    margin-top: 20px;
  }
  .info-tab .info-title, .info-tab .info-list{
    border-radius: 5px;
  }
  .info-tab .cont .info-title {
    background: #fff;
    padding: 5px 0;
  }
  .info-tab .cont .info-list > dt {
    font-size: 24px;
    color: #c4c4c4;
    border-bottom: 1px dotted #eee;
    font-weight: normal;
  }

  .info-list-tpl > div > span {
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 30px;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
  }

  .unit-ton {
    border: solid 1px #fc0;
    color: #fc0;
  }

  .unit-ton.active {
    background-color: #fc0;
    color: #fff;
  }

  .unit-cube {
    border: solid 1px #337ab7;
    color: #337ab7;
  }

  .unit-cube.active {
    background-color: #337ab7;
    color: #fff;
  }

  .unit-item {
    border: solid 1px #d9534f;
    color: #d9534f;
  }

  .unit-item.active {
    background-color: #d9534f;
    color: #fff;
  }

  .info-tab .cont .info-list > dd {
    font-size: 14px;
    color: #fff;
  }
  .info-tab .cont .info-list > dd .fr{
    color: #fc0;
  }

  .info-tab .cont .info-list > .blue .fr{
    color: #337ab7;
  }

  .info-tab .cont .scroll-list > h2 {
    font-size: 24px;
    color: #c4c4c4;
    padding-bottom: 5px;
    border-bottom: 1px dotted #eee;
  }
  .info-tab .cont .line-bar-list > h2 {
    font-size: 24px;
    color: #c4c4c4;
    padding-bottom: 5px;
    border-bottom: 1px dotted #eee;
  }
  .info-tab .cont .mes{
    width: 28%;
    vertical-align: top;
    border-left: 1px #fff dashed;
    padding: 0 8px;
  }

  .info-tab .cont .mes dl{
    height: 100%;
  }

  .info-tab .cont .mes:first-child{
    border-left: none;
  }
  .info-tab .cont dt{
    border-bottom: 1px solid #eeeeee;
    font-size: 18px;
    color: #888;
  }
  .info-tab .cont dd{
    padding: 5px 0;
    font-size: 16px;
    color: #f88430;
  }

  .info-tab .cont .info-title dd{
    padding-top: 15px;
  }

  .info-tab .cont .info-title .totalWeight{
    padding-top: 5px;
  }

  .info-tab .info-list{
    min-height: 90px;
  }
  .info-tab #scroll{
    max-height: 100px;
    overflow: hidden;
  }
  /*footer*/
  .footer {
    position: absolute;
    bottom: 5px;
    width: 420px;
    font-size: 16px;
    color: #6b6b6b;
  }

  .company-name,.copyright {
    position: absolute;
    left: 20px;
    font-size: 16px;
    color: #6b6b6b;
  }

  .company-name {
    top: 20px;
    font-size: 24px;
    color: #eee;
  }

  .copyright {
    bottom: 20px;
  }

  .scroll-list .table>tbody>tr>td {
    padding: 4px 0px;
    vertical-align: top;
    border-top: none;
    text-align: center;
  }
  .scroll-list-tpl.table {
    width: 100%;
  }
  td.overflow{
    width: 62px;
    max-width: 62px;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  :-webkit-full-screen body,:-webkit-full-screen #main {
    width: 100%;
    height: 100%;
  }
  ::-webkit-scrollbar
  {
    width: 0px;
  }

  .label {
    display: inline;
    padding: .2em .6em .3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25em;
  }
  .pull-right {float: right!important;}
  dd, dt {line-height: 1.42857143;}
  .label-danger {
    background-color: #d9534f;
  }
  .label-warning {
    background-color: #f0ad4e;
  }
  .label-success {
    background-color: #5cb85c;
  }
  .label-info {
    background-color: #5bc0de;
  }
  .label-default {
    background-color: #777;
  }
  /*--it fold--*/
  .it-fold {
    position: absolute;
    left: -16px;
    top: 50%;
    margin-top: -44px;
    width: 16px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    background-color: #333;
    color: #fff;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    cursor: pointer;
  }

  .it-fold:hover {
    background-color: #fc0;
  }

  .glyphicon-menu-left::before, .glyphicon-menu-right::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 6px;
    height: 6px;
  }

  .glyphicon-menu-left::before {
    margin-top: -3px;
    margin-left: -2px;
    border-top: solid 2px #fff;
    border-left: solid 2px #fff;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .glyphicon-menu-right::before {
    margin-top: -3px;
    margin-left: -6px;
    border-top: solid 2px #fff;
    border-right: solid 2px #fff;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
  }
</style>

