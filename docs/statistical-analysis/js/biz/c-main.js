require(['jquery', 'echarts', 'beijing', 'tool'], function ($, echarts, beijing, tool) {
    $(function () {

        var weekStr = tool.category.lastWeek[0] + "~" + tool.category.lastWeek[6];

        // 用户概况
        var chart;
        var optBar1 = {
            title: {
                text: weekStr,
                textStyle: {
                    fontSize: 12,
                    color: '#999'
                },
                top: 30,
                left: 'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['累计用户', '新增用户', '启动次数'],
                selectedMode: 'single',
                selected: {
                    '累计用户': true,
                    '新增用户': false,
                    '启动次数': false
                },
                top:5
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {type: ['line', 'bar']}
                }
            },
            xAxis: [{
                type: 'category',
                data: tool.category.lastWeekNoYear,
                boundaryGap: false
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '启动次数',
                type: 'line',
                data: [12, 15, 19, 30, 34, 57, 72],
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                barMaxWidth: 20
            }, {
                name: '新增用户',
                type: 'line',
                data: [5, 12, 14, 25, 36, 10, 41],
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                barMaxWidth: 20
            }, {
                name: '累计用户',
                type: 'line',
                data: [233, 258, 318, 343, 350, 362, 370],
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                barMaxWidth: 20
            }]
        };
        chart = echarts.init(document.getElementById('bar1'))
        tool.charts.push(chart);
        chart.setOption(optBar1);

        var cities = [  '东城区', '西城区','朝阳区','丰台区','石景山区',
            '海淀区','门头沟区','房山区','通州区','顺义区',
            '昌平区','大兴区','怀柔区','平谷区','密云区', '延庆区'];
        // 获取模拟数据
        var users = tool.mock.getMockArray(cities.length, 1000);
        var starts = tool.mock.getMockArray(cities.length, 1500);

        // 获取总数，获取前5
        var i, citesLen= cities.length, userTotal = 0, startTotal = 0, userData=[], startData = [];

        for(i=0; i<citesLen; i++){ // 城区加随机数生成数据
            userData.push({name:cities[i], value:users[i]});
            userTotal = userTotal + users[i];
            startData.push({name:cities[i], value:starts[i]});
            startTotal = startTotal + starts[i];
        }
        var userDataTop = tool.sortArray(userData);
        userDataTop = userDataTop.slice(0, 5);

        var startDataTop = tool.sortArray(startData);
        startDataTop = startDataTop.slice(0, 5);

        // 地域概况
        var optMap1 = {
            title: [{
                text: 'TOP5',
                right: 30,
                top: 10,
                textStyle: {
                    fontSize: 12,
                    color: '#666'
                }
            }, {
                text: '北京市',
                left: 'center',
                top: 5,
                textStyle: {
                    fontSize: 12,
                    color: '#333'
                }
            }],
            tooltip: {                        // 鼠标悬浮时，提示
                trigger: 'item',
                formatter: function (item) {
                    var total = item.seriesName == '用户数' ? userTotal : startTotal;
                    return item.name + '<br>' + item.seriesName + "：" + item.value + "<br>占比：" + tool.formatPercent(item.value/total);
                }
            },
            legend: {                        // 数据列
                orient: 'vertical',
                left: 10,
                top: 10,
                data: ['用户数', '启动数'],
                selectedMode: 'single',
                selected: {
                    '用户数': true,
                    '启动数': false
                }
            },
            visualMap: {                    //
                min: 0,
                max: tool.formatMaxValue(userDataTop[0].value),
                left: 10,
                top: 'bottom',
                text: ['高', '低'],           // 文本，默认为数值文本
                calculable: true,
                seriesIndex: [0, 1]
            },
            yAxis: {
                type: 'category',
                data: [],
                show: false,
                position: 'right',
                inverse: true
            },
            xAxis: {
                type: 'value',
                position: 'top',
                show: false
            },
            grid: [{
                right: 10,
                top: 35,
                width: 0,
                height: 90,
                borderWidth: 0
            }],
            series: [
                {
                    name: '用户数',
                    type: 'map',
                    mapType: '北京',
                    roam: false,
                    data: userData
                }, {
                    name: '启动数',
                    type: 'map',
                    mapType: '北京',
                    roam: false,
                    data: startData
                }, {
                    name: '用户数',
                    type: 'bar',
                    data: userDataTop,
                    label: {
                        normal: {
                                show: true,
                                position: 'left',
                                formatter: function (item) {
                                    return item.data.name + ' ' + item.data.value;
                                }
                            }
                    },
                    itemStyle:{
                        normal:{
                            opacity:1
                        }
                    },
                    barWidth:8,
                    xAxisIndex: 0,
                    yAxisIndex: 0
                }, {
                    name: '启动数',
                    type: 'bar',
                    data: startDataTop,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'left',
                                formatter: function (item) {
                                    return item.data.name + ' ' + item.data.value;
                                }
                            }
                        }
                    },
                    barWidth:8,
                    xAxisIndex: 0,
                    yAxisIndex: 0
                }
            ]
        };
        chart = echarts.init(document.getElementById('map1'));
        tool.charts.push(chart);
        chart.setOption(optMap1);
        chart.on('legendselectchanged', function (obj) { // 监听数据切换，修改最大值
            var maxValue = obj.name == '用户数' ? userDataTop[0].value : startDataTop[0].value;
            var opt = {visualMap:{}};
            opt.visualMap.max = tool.formatMaxValue(maxValue);
            this.setOption(opt);
        });

        // 错误概况，错误率是错误与启动次数的占比
        var optError = {
            title: {
                text: weekStr,
                left: 'center',
                top: 30,
                textStyle: {
                    fontSize: 12,
                    color: '#999'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['错误数', '错误率'],
                left: 'center',
                top: 5
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {type: ['line', 'bar']}
                },
                top: 0,
                right: 0
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: tool.category.lastWeekNoYear
            },
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    position: 'right',
                    min: 0,
                    max: 100,
                    axisLabel: {
                        formatter: '{value} %'
                    },
                    splitLine: {
                        show: false
                    },
                    show: true
                }
            ],
            series: [
                {
                    name: '错误数',
                    type: 'line',
                    data: [411, 511, 215, 173, 124, 513, 610],
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    }
                },
                {
                    name: '错误率',
                    type: 'line',
                    data: [1, 2, 12, 15, 13, 12, 10],
                    yAxisIndex: 1,
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: '{c}%'
                        }
                    }
                }
            ]
        };
        chart = echarts.init(document.getElementById('errorTb'));
        tool.charts.push(chart);
        chart.setOption(optError);

        // 设备概况
        var optDevice = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                selectedMode: false,
                data: ['iphone', '小米', '魅族', '华为', 'vivio', '联想', 'oppo', '锤子', '三星', '其它']
            },
            series: [
                {
                    name: '访问设备',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        {value: 335, name: 'iphone'},
                        {value: 310, name: '小米'},
                        {value: 234, name: '魅族'},
                        {value: 135, name: '华为'},
                        {value: 1548, name: 'vivio'},
                        {value: 548, name: '联想'},
                        {value: 581, name: 'oppo'},
                        {value: 582, name: '锤子'},
                        {value: 645, name: '三星'},
                        {value: 231, name: '其它'}
                    ],
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b}: {c} ({d}%)'
                        }
                    }
                }
            ]
        };
        chart = echarts.init(document.getElementById('deviceTb'));
        tool.charts.push(chart);
        chart.setOption(optDevice);

        // 页面访问前10
        var optPage = {
            title: {
                text: '页面访问量TOP10',
                left: 'center',
                top: 10,
                textStyle: {
                    fontSize: 12,
                    color: '#333'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            yAxis: [{
                type: 'category',
                data: ['首页', '提单', '接单', '回单', '登录', '注册', '查询', '详情', '设置', '个人'],
                inverse: true
            }],
            xAxis: [{
                type: 'value',
                position: 'top'
            }],
            series: [
                {
                    name: '页面访问',
                    type: 'bar',
                    data: [
                        {value: 280, name: '首页'},
                        {value: 210, name: '提单'},
                        {value: 120, name: '接单'},
                        {value: 90, name: '回单'},
                        {value: 60, name: '登录'},
                        {value: 40, name: '注册'},
                        {value: 40, name: '查询'},
                        {value: 30, name: '详情'},
                        {value: 20, name: '设置'},
                        {value: 10, name: '个人'}
                    ],
                    label: {
                        normal: {
                            show: true,
                            position: 'right'
                        }
                    }
                }
            ]
        };
        chart = echarts.init(document.getElementById('pageTb'));
        tool.charts.push(chart);
        chart.setOption(optPage);

        // 接口调用前10
        var optInterface = {
            title: {
                text: '接口调用量TOP10',
                left: 'center',
                top: 10,
                textStyle: {
                    fontSize: 12,
                    color: '#333'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            yAxis: [{
                type: 'category',
                data: ['首页', '提单', '接单', '回单', '登录', '注册', '查询', '详情', '设置', '个人'],
                inverse: true
            }],
            xAxis: [{
                    type: 'value',
                    position: 'top'
                }
            ],
            series: [
                {
                    name: '累计',
                    type: 'bar',
                    data: [
                        {value: 260, name: '首页'},
                        {value: 230, name: '提单'},
                        {value: 120, name: '接单'},
                        {value: 90, name: '回单'},
                        {value: 60, name: '登录'},
                        {value: 40, name: '注册'},
                        {value: 40, name: '查询'},
                        {value: 30, name: '详情'},
                        {value: 20, name: '设置'},
                        {value: 10, name: '个人'}
                    ],
                    label: {
                        normal: {
                            show: true,
                            position: 'right'
                        }
                    }
                }
            ]
        };
        chart = echarts.init(document.getElementById('interfaceTb'));
        tool.charts.push(chart);
        chart.setOption(optInterface);

        // 插件使用前10
        var optPlug = {
            title: {
                text: '插件调用量TOP10',
                left: 'center',
                top: 10,
                textStyle: {
                    fontSize: 12,
                    color: '#333'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            yAxis: [{
                type: 'category',
                data: ['首页', '提单', '接单', '回单', '登录', '注册', '查询', '详情', '设置', '个人'],
                inverse: true
            }],
            xAxis: [
                {
                    type: 'value',
                    position: 'top'
                }
            ],
            series: [
                {
                    type: 'bar',
                    data: [
                        {value: 260, name: '首页'},
                        {value: 230, name: '提单'},
                        {value: 120, name: '接单'},
                        {value: 90, name: '回单'},
                        {value: 60, name: '登录'},
                        {value: 40, name: '注册'},
                        {value: 40, name: '查询'},
                        {value: 30, name: '详情'},
                        {value: 20, name: '设置'},
                        {value: 10, name: '个人'}
                    ],
                    label: {
                        normal: {
                            show: true,
                            position: 'right'
                        }
                    }
                }
            ]
        };
        chart = echarts.init(document.getElementById('plugTb'));
        tool.charts.push(chart);
        chart.setOption(optPlug);

        // 链接跳转
        $(".block-head a").click(function () {
            var url = $(this).data("link");
            var name = $(this).data("name");

            if(url && name){
                window.parent.openMenu(name, url);
            }else{
                tool.modal.alert('功能暂未实现，后续版本将添加该功能');
            }
            return false;
        });
    });
});
