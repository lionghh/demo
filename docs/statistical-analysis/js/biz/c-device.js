require(['jquery', 'echarts', 'tool'], function ($, echarts, tool) {
    $(function () {
        var categories = tool.category;
        var mock = tool.mock;

        // 新增用户
        var addUser = [mock.getMockArray(10, 20), mock.getMockArray(10, 20), mock.getMockArray(10, 150), mock.getMockArray(10, 600), mock.getMockArray(10, 1500)];
        // 启动用户
        var startApp = [mock.getMockArray(10, 100), mock.getMockArray(10, 100), mock.getMockArray(10, 750), mock.getMockArray(10, 300), mock.getMockArray(10, 4500)];


        var category = [
            'iphone 7Plus', '小米6', 'iphone 6s', 'oppo R11', '锤子 T1', '三星', 'meizu 6', '红米', '360手机', '华为 meta-9'
        ];

        // 数据显示时是否应该进行排序，大数值放前面

        // 用户明细
        var option  = {
            title:[{
                text:'设备型号TOP10',
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
                data: addUser[0]
            },{
                name: '启动次数',
                type: 'bar',
                data: startApp[0]
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
