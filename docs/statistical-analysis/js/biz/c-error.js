require(['jquery', 'echarts', 'tool'], function ($, echarts, tool) {
    $(function () {
        var categories = tool.category;
        var mock = tool.mock;
        var chart, categories;
        var datas = mock.getMockData();

        //
        var optBar1 = {
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
                data : categories.time
            }],
            yAxis : [{
                type : 'value'
            }],
            series : [{
                name:'错误数',
                type:'bar',
                data: datas.today,
                barMaxWidth:20
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

        chart = echarts.init(document.getElementById('bar1'));
        tool.charts.push(chart);
        chart.setOption(optBar1);
        
        function sltTimeType(type) {
            optBar1.series[0].data = datas[type];
            optBar1.xAxis[0].data = categories[type];
            chart.setOption(optBar1);
        }

        // 初始化时间段选择器
        tool.timeSltSingle(".time-block div", {
            change: function (obj) {
                console.log(obj);
                if (obj.diy) { // 自选时间段

                } else {
                    sltTimeType(obj.label);
                }
            }
        });
    });
});
