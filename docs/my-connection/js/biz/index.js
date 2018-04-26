require(['jquery', 'ipu', 'echarts', 'iScroll'], function ($, ipu, echarts, iScroll) {
  $(function () {
    // 底部导航切换，配置切换有动画
    var navBar = ipu.navBar(".ipu-navbar", {animate: true});

    // 问题3，设计的富文本格式
    // label太长了，显示可能会超出范围 //富文本里面不可以换行，不能限制
    // 饼图点击高亮问题, // slient:true
    // 问题2，仪表图，取消不了label内容 // 暂时设置lable为空，用title处理
    // 问题1，外饼图，label超出范围 // 不是label的问题，是高度设计不够问题

    // home-scroll
    var homeScroll = new iScroll($(".home-scroll")[0]);

    if($(".home-devices>ul>li").size() > 1) { // 设备数大于4个，才处理滚动
      $(".arror-flag").show();
      var hammerCarousel = ipu.hammerCarousel(".ipu-hammer-carousel");
    }

    $(".arror-left").click(function () {
      hammerCarousel.prev();
    });

    $(".arror-right").click(function () {
      hammerCarousel.next();
    });

    var baseSize = $(document.documentElement).css("font-size");
    baseSize = parseFloat(baseSize.replace("px", ""))/100;  // 基础字体大小，已经除以100

    function getComputeSize(size) {
      return baseSize * size;
    }

    // type 定义 0-电脑 1-手机 2-智能镜 3-手表 4-项圈
    var deviceType = ["laptop", "mobile", "mirror", "watch", "neck"]
    var center = ['50%', '50%'];
    var data = [{
      value: 35,
      name: "Dolly's smart Mirror one",
      type: 2
    }, {
      value: 29,
      name: "Jensen's watch",
      type: 3
    }, {
      value: 36,
      name: "Laura's laptop",
      type: 0
    }];

    // chart图表
    var myChart1 = echarts.init($(".chart-data")[0]);
    var dataTotal = 21.37;  // 总流量
    var dataRemained = 9.12; // 剩余流量
    var dataUsed = dataTotal - dataRemained;
    var percent = dataUsed/dataTotal;

    var chartOption = {
      title:[{
        text: 'Remained',
        left: 'center',
        top: '51%',
        textStyle: {
          fontSize: getComputeSize(10),
          fontFamily: 'SFUIDisplay-Regular',
          color: '#BBBBBB'
        }
      }, {
          text: dataRemained + 'GB',
          left: 'center',
          top: '60%',
          textStyle: {
            fontSize: getComputeSize(13),
            fontFamily: 'SFUIDisplay-Regular',
            color: '#000036'
          }
      }],
      color: ['#EABF14', '#F5871F', "#A9CE2B"], // 设置颜色
      series: [{
        name: '',
        type: 'pie',
        radius: ['51.2%', '61.6%'],
        avoidLabelOverlap: false,
        selectedMode: false,
        startAngle: 270,
        hoverAnimation: false,
        legendHoverLink: false,
        clockwise: false, // 数据是否顺时针展示，false为逆时针
        center: center,
        label: {
          show: true,
          position: 'outside',
          normal:{
            formatter: function (params) {
              var imgType = deviceType[params.data.type];
              return '{'+imgType+'|}{d|'+params.percent+'%} \n {b|'+params.name + '}';
            },
            rich: {
              b: {
                color: '#B2BAC1',
                fontFamily: 'SFUIDisplay-Regular',
                fontSize: getComputeSize(10),
              },
              d: {
                color: '#B2BAC1',
                fontFamily: 'SFUIDisplay-Regular',
                padding: [0, 0, 0, getComputeSize(5)],
                fontSize: getComputeSize(11),
                fontWeight: 'bold'
              },
              laptop:{
                width: getComputeSize(18),
                height: getComputeSize(15),
                backgroundColor: {
                  image: 'img/index/icon-laptop-sm.png'
                }
              },
              mobile:{
                width: getComputeSize(14),
                height: getComputeSize(20),
                backgroundColor: {
                  image: 'img/index/icon-mobile-sm.png'
                }
              },
              mirror:{
                width: getComputeSize(23),
                height: getComputeSize(9),
                backgroundColor: {
                  image: 'img/index/icon-mirror-sm.png'
                }
              },
              watch:{
                width: getComputeSize(18),
                height: getComputeSize(18),
                backgroundColor: {
                  image: 'img/index/icon-watch-sm.png'
                }
              },
              neck:{
                width: getComputeSize(21),
                height: getComputeSize(21),
                backgroundColor: {
                  image: 'img/index/icon-neck-sm.png'
                }
              }
            }
          }
        },
        labelLine: {
          length: getComputeSize(12),
          length2: 0
        },
        data: data,
        silent: true  // 点击不高亮
      },{
        name: '',
        type: 'pie',
        radius: ['44.8%', '51.2%'],
        avoidLabelOverlap: false,
        startAngle: 270,
        hoverAnimation: false,
        legendHoverLink: false,
        clockwise: false, // 数据是否顺时针展示，false为逆时针
        center: center,
        itemStyle: {
          opacity: 0.5
        },
        label: {
          normal: {
            show: false
          }
        },
        data: data,
        silent: true
      },{
        name: '',
        type: 'gauge',
        radius: '38.4%', // 仪表图半径
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: dataTotal,
        axisLabel:{show: false},
        splitLine: {show: false},
        axisTick: {show: false},
        axisLine:{
          lineStyle:{
            width: getComputeSize(12),
            color: [[percent, '#818E9E'],  [1, '#A9CE2B']]
          }
        },
        pointer: {length: '50%', width: getComputeSize(3)},
        detail: {show: false},
        data: [{value: dataUsed, name: ''}]
      }]
    };

    myChart1.setOption(chartOption, true);

    $(".btn-logout").click(function () {
      location.href = 'login.html';
    });
  });
});