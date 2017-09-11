require(['jquery', 'echarts', 'tool'], function ($, echarts, tool) {
    $(function () {
        var mock = tool.mock;


        var legends = ['用户数', '启动数', '新用户数'];
        var versions = ['2.1', '2.0', '1.9', '1.2', '1.1', '1.0'];
        var len = versions.length;
        var userData = [], startData = [], newUserData = [];
        var userTotal = 0, startTotal=0, newUserTotal=0;

        function getData() {
            userData = [], startData = [], newUserData = [];
            userTotal = 0, startTotal =0, newUserTotal = 0;

            var users = mock.getMockArray(len, 1000);
            var starts = mock.getMockArray(len, 300);
            var newUsers = mock.getMockArray(len, 100);

            for (var i = 0; i < len; i++) {
                userTotal = userTotal + users[i];
                userData.push({name: versions[i], value: users[i]});

                startTotal = startTotal + starts[i];
                startData.push({name: versions[i], value: starts[i]});

                newUserTotal = newUserTotal = newUsers[i];
                newUserData.push({name: versions[i], value: newUsers[i]});
            }

            optUser.series.data = userData;
            chartUser.setOption(optUser);

            optStart.series.data = startData;
            chartStart.setOption(optStart);

            optNewUser.series.data = newUserData;
            chartNewUser.setOption(optNewUser);
        }


        // 用户概况，添加详情链接
        var optUser = {
            title: {
                text: legends[0],
                textStyle: {
                    fontSize: 12,
                    color: '#999'
                },
                top: 30,
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
            },
            series: {
                type: 'pie',
                radius: '50%',
                center: ['50%', '60%'],
                data: userData,
                label: {
                    normal: {
                        show: true
                    }
                }
            }
        };

        var chartUser = echarts.init(document.getElementById('user'));
        tool.charts.push(chartUser);
        chartUser.setOption(optUser);

        // 用户概况，添加详情链接
        var optStart = {
            title: {
                text: legends[1],
                textStyle: {
                    fontSize: 12,
                    color: '#999'
                },
                top: 30,
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
            },
            series: {
                type: 'pie',
                radius: '50%',
                center: ['50%', '60%'],
                data: startData,
                label: {
                    normal: {
                        show: true
                    }
                }
            }
        };

        var chartStart = echarts.init(document.getElementById('start'));
        tool.charts.push(chartStart);
        chartStart.setOption(optStart);

        // 新用户数
        var optNewUser = {
            title: {
                text: legends[2],
                textStyle: {
                    fontSize: 12,
                    color: '#999'
                },
                top: 30,
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
            },
            series: {
                type: 'pie',
                radius: '50%',
                center: ['50%', '60%'],
                data: newUserData,
                label: {
                    normal: {
                        show: true
                    }
                }

            }
        };

        var chartNewUser = echarts.init(document.getElementById('newUser'));
        tool.charts.push(chartNewUser);
        chartNewUser.setOption(optNewUser);

        // 初始化时间段选择器
        var timeSlt = tool.timeSltSingle(".time-block div", {
            change: function (obj) {
                if (obj.diy) { // 自选时间段
                    //
                    //get data
                    // 如果查询的是某一天，按天的24小时展示
                    // 查询的是其它时间段，按天展示

                } else {
                    //sletIndex(this.sltIndex); // 当前选中索引
                }
                // 更新数据
                window.setTimeout(function () {
                    getData();
                }, 2000);
            }
        });
    });
});
