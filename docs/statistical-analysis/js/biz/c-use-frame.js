require(['jquery', 'echarts', 'tool'], function ($, echarts, tool) {
    $(function () {
        var mock = tool.mock;

        var category = tool.category.time;
        var len = category.length, totalNewUser = 0, totalActiveUser = 0;

        // 模拟数据
        var datas = {
            newUser : [
                    mock.getMockArray(len, 20), mock.getMockArray(len, 20), mock.getMockArray(len, 150),
                        mock.getMockArray(len, 600), mock.getMockArray(len, 1500)
                    ],
            activeUser:[
                mock.getMockArray(len, 20), mock.getMockArray(len, 20), mock.getMockArray(len, 150),
                mock.getMockArray(len, 600), mock.getMockArray(len, 1500)
            ]
        };

        // 用户明细
        var option  = {
            title:[{
                text:'时段趋势',
                left:'center',
                textStyle: {
                    fontSize: 13,
                    color: '#666'
                }
            }],
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                left: 10,
                top: 10,
                data: ['新用户', '活跃用户'],
                selectedMode: 'single',
                selected: {
                    '新用户': true,
                    '活跃用户': false
                }
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {type: ['line', 'bar']}
                }
            },
            yAxis:[{
                type:'value'
            }],
            xAxis : [{
                type : 'category',
                data : category
            }],
            series:[{
                name: '新用户',
                type: 'bar',
                data: [],
                barMaxWidth: 16
            },{
                name: '活跃用户',
                type: 'bar',
                data: [],
                barMaxWidth: 16
            }]
        };

        chart = echarts.init(document.getElementById('chart'));
        tool.charts.push(chart);
        chart.setOption(option);

        // 初始化时间段选择器
        tool.timeSltSingle(".time-block div", {
            change: function (obj) {
                if (obj.diy) { // 自选时间段

                    var newUserData = mock.getMockArray(len, 200);
                    totalNewUser = tool.countArray(newUserData);
                    option.series[0].data = newUserData;

                    var activeUserData = mock.getMockArray(len, 2000);
                    totalActiveUser = tool.countArray(activeUserData);
                    option.series[1].data = activeUserData;
                    chart.setOption(option);
                } else {
                    sltIndex(this.sltIndex);
                }
            }
        });

        function sltIndex(index) {
            var newUserData = datas.newUser[index];
            totalNewUser = tool.countArray(newUserData);
            option.series[0].data = newUserData;

            var activeUserData = datas.activeUser[index];
            totalActiveUser = tool.countArray(activeUserData);
            option.series[1].data = activeUserData;
            chart.setOption(option);
        }
    });
});
