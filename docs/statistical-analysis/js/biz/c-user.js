require(['jquery', 'echarts', 'tool'], function ($, echarts, tool) {
    $(function () {
        var mock = tool.mock;
        var category = tool.category;

        // [新增用户、启动次数、活跃用户、每次使用时长、每人使用时长、升级用户、升级次数]
        var datas = [mock.getMockData(300), mock.getMockData(500), mock.getMockData(300), mock.getMockData(180),
            mock.getMockData(10000), mock.getMockData(200), mock.getMockData(240)];


        var formatFun = function (item) {
            return tool.formatTimeByNum(item.value);
        };

        function getSerious(data, needFormat) {
            var formatter = needFormat ? formatFun : null;
            return {
                today:  {
                    name: '今日',
                    type: 'line',
                    data: data.today,
                    barMaxWidth:10,
                    label: {
                        normal: {
                            show: true,
                            formatter : formatter
                        }
                    }
                },
                yesterday:  {
                    name: '昨日',
                    type: 'line',
                    data: data.yesterday,
                    label: {
                        normal: {
                            show: true,
                            formatter : formatter
                        }
                    },
                    barMaxWidth: 10
                },
                yesterdayBefore:  {
                    name: '前日',
                    type: 'line',
                    data: data.yesterdayBefore,
                    label: {
                        normal: {
                            show: true,
                            formatter : formatter
                        }
                    },
                    barMaxWidth: 10
                },
                lastWeek:  {
                    name: '最近7天',
                    type: 'line',
                    data: data.lastWeek,
                    label: {
                        normal: {
                            show: true,
                            formatter : formatter
                        }
                    },
                    barMaxWidth: 10
                },
                lastMonth:  {
                    name: '最近30天',
                    type: 'line',
                    data: data.lastMonth,
                    label: {
                        normal: {
                            show: true,
                            formatter : formatter
                        }
                    },
                    barMaxWidth: 10
                },
                last3Month:  {
                    name: '最近90天',
                    type: 'line',
                    data: data.last3Month,
                    label: {
                        normal: {
                            show: true,
                            formatter : formatter
                        }
                    },
                    barMaxWidth: 10
                }
            }
        }

        var names = ["newUser", "startCount", "activeUser", "useTime", "personTime", "updateUser", "updateCount"];
        var categorySerious = {}, name, needFormat;
        var showTime = false; // 坐标是否时间轴显示

        for(var i=0, j=names.length; i<j; i++){
            name = names[i];
            needFormat = names[i] == "useTime" || names[i] == "personTime";
            categorySerious[name] = getSerious(datas[i], needFormat);
        }

        var sltSerious = categorySerious.newUser; // 默认显示新用户信息

        // 用户明细
        var opt  = {
            tooltip : {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {type: ['line', 'bar']}
                }
            },
            xAxis : [{
                type : 'category',
                data : category.time,
                boundaryGap: false           // 不是从0开始显示
            }],
            yAxis:[{
                type:'value',
                axisLabel: {
                    formatter:function(value){
                        return showTime ?  tool.formatTimeByNum(value) : value;
                    }
                }
            }],
            dataZoom: [
                {
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'empty',
                    start:0,
                    endValue:30
                }
            ]
        };

        chart = echarts.init(document.getElementById('userDetail'));
        tool.charts.push(chart);

        // 数据切换时间段
        function sletIndex(index) {
            if(index == 0){
                opt.xAxis[0].data = category.today;
                opt.series = [sltSerious.today, sltSerious.yesterday];
            }else if(index == 1){
                opt.xAxis[0].data = category.yesterday;
                opt.series = [sltSerious.yesterday, sltSerious.yesterdayBefore];
            }else if(index == 2){
                opt.xAxis[0].data = category.lastWeek;
                opt.series = [sltSerious.lastWeek];
            }else if(index ==3){
                opt.xAxis[0].data = category.lastMonth;
                opt.series = [sltSerious.lastMonth];
            }else{
                opt.xAxis[0].data = category.last3Month;
                opt.series = [sltSerious.last3Month];
            }

            chart.setOption(opt, true);
        }

        // 默认选中新增用户列
        $(".am-table tr").each(function () {
            $(">td:eq(1), >th:eq(1)", this).addClass("am-text-primary");
        });

        // 点击列表切换数据
        $(".am-table td, .am-table th").click(function () {
            var index = $(this).index();
            var type = $(".am-table th:eq("+index+")").data("type");

            if(type){   // type非空，不是时间段
                sltSerious = categorySerious[type];
                $(".am-table tr").each(function () {
                    $(">td:eq("+index+"), >th:eq("+index+")", this).addClass("am-text-primary")
                        .siblings(".am-text-primary").removeClass("am-text-primary");
                });

                showTime = type == "useTime" || type == "personTime";
                timeSlt.slt(0);
            }
        });

        // 初始化时间段选择器
        var timeSlt = tool.timeSlt(".sys-select", {change: function (obj) {
            if(obj.diy){ // 自选时间段
                chart.showLoading()
                var beginDate = obj.beginDate, endDate = obj.endDate;
                var queryResult = tool.mock.getMockDataDays(beginDate, endDate);

                opt.xAxis[0].data = queryResult.category;
                opt.series = {
                    type: 'line',
                    data: queryResult.data,
                    label: {
                        normal: {
                            show: true,
                            formatter : showTime ? formatFun : null
                        }
                    },
                    barMaxWidth: 10
                };
                //get data
                // 如果查询的是某一天，按天的24小时展示
                // 查询的是其它时间段，按天展示
                window.setTimeout(function () {
                    chart.setOption(opt, true);
                    chart.hideLoading();
                }, 2000);
            }else{
                sletIndex(this.sltIndex); // 当前选中索引
            }
        }});
    });
});
