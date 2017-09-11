require(['jquery', 'echarts', 'tool'], function ($, echarts, tool) {
    $(function () {
        var mock = tool.mock;

        var category = [
            '0-3秒', '3-10秒', '10-30秒', '30-60秒', '1-3分钟', '3-10分钟', '10-30分钟', '30分钟以上'
        ];
        var len = category.length, total = 0;
        // 使用时长
        var datas = [
            mock.getMockArray(len, 20), mock.getMockArray(len, 20), mock.getMockArray(len, 150),
            mock.getMockArray(len, 600), mock.getMockArray(len, 1500)
        ];

        // 用户明细
        var option  = {
            title:[{
                text:'使用时长',
                left:'center',
                textStyle: {
                    fontSize: 13,
                    color: '#666'
                }
            }],
            tooltip : {
                trigger: 'axis'
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
                name: '总次数',
                type: 'bar',
                data: [],
                barMaxWidth: 10,
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: function (obj) {
                            return obj.value + "("+tool.formatPercent(obj.value / total)+")"
                        }
                    }
                }
            }]
        };

        chart = echarts.init(document.getElementById('chart'));
        tool.charts.push(chart);
        chart.setOption(option);

        // 初始化时间段选择器
        tool.timeSltSingle(".time-block div", {
            change: function (obj) {
                if (obj.diy) { // 自选时间段
                    var data = mock.getMockArray(len, 200);
                    total = tool.countArray(data);
                    option.series[0].data = data;
                    chart.setOption(option);
                } else {
                    sltIndex(this.sltIndex);
                }
            }
        });

        function sltIndex(index) {
            var data = datas[index];
            total = tool.countArray(data);
            option.series[0].data = data;
            chart.setOption(option);
        }
    });
});
