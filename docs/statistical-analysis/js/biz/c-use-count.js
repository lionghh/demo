require(['jquery', 'echarts', 'tool'], function ($, echarts, tool) {
    $(function () {
        var mock = tool.mock;

        var category = [
            '1-2次', '3-5次', '6-9次', '10-19次', '20-49次', '50次以上'
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
                text:'使用频率',
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
                barMaxWidth: 16,
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
