require(['jquery', 'echarts', 'tool'], function ($, echarts, tool) {
    $(function () {
        var mock = tool.mock;

        var category = ['2G', '3G', '4G', 'WIFI'];
        var len = category.length;

        // 新增用户
        var addUser = [mock.getMockArray(len, 20), mock.getMockArray(len, 20), mock.getMockArray(len, 150), mock.getMockArray(len, 600), mock.getMockArray(len, 1500)];
        // 启动用户
        var startApp = [mock.getMockArray(len, 100), mock.getMockArray(len, 100), mock.getMockArray(len, 750), mock.getMockArray(len, 300), mock.getMockArray(len, 4500)];

        // 数据显示时是否应该进行排序，大数值放前面

        // 用户明细
        var option  = {
            title:[{
                text:'联网方式',
                left:'center'
            }],
            tooltip : {
                trigger: 'axis'
            },
            legend:{
                data: ['新增用户', '启动次数'],
                left:'right'
            },
            xAxis:[{
                type:'value',
                position: 'top'
            }],
            yAxis : [{
                type : 'category',
                data : category,
                inverse: true
            }],
            series:[{
                name: '新增用户',
                type: 'bar',
                data: addUser[0],
                barMaxWidth: 16
            },{
                name: '启动次数',
                type: 'bar',
                data: startApp[0],
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
                    option.series[0].data = mock.getMockArray(10, 200);
                    option.series[1].data = mock.getMockArray(10, 1000);
                    chart.setOption(option);
                } else {
                    sltIndex(this.sltIndex);
                }
            }
        });

        function sltIndex(index) {
            option.series[0].data = addUser[index];
            option.series[1].data = startApp[index];
            chart.setOption(option);
        }
    });
});
