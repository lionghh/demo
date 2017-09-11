require(['jquery', 'echarts', 'tool', 'beijing'], function ($, echarts, tool, beijing) {
    $(function () {
        var mock = tool.mock;
        var cities = [  '东城区', '西城区','朝阳区','丰台区','石景山区',
            '海淀区','门头沟区','房山区','通州区','顺义区',
            '昌平区','大兴区','怀柔区','平谷区','密云区', '延庆区'];
        var citesLen = cities.length, userData = [], startData = [], newUserData = [];
        var sltData, total, userTotal = 0, startTotal = 0, newUserTotal = 0;
        var legends = ['用户数', '启动数', '新增数'];
        var sltLegend = legends[0];

        function setSltDataAndTotal() {
            if(sltLegend == legends[0]){
                sltData = userData;
                total = newUserTotal;
            }else if(sltLegend == legends[1]) {
                sltData = startData;
                total = startTotal;
            }else{
                sltData = newUserData;
                total = newUserTotal;
            }
        }

        function getData(maxValue) {
            // 获取模拟数据
            var users = mock.getMockArray(cities.length, 1000);
            var starts = mock.getMockArray(cities.length, 500);
            var newUsers = mock.getMockArray(cities.length, 100);
            userData = [], startData = [], newUserData = [];
            userTotal = 0, startTotal = 0, newUserTotal = 0;

            for(var i=0; i<citesLen; i++){ // 城区加随机数生成数据
                userData.push({name:cities[i], value:users[i]});
                userTotal = userTotal + users[i];

                startData.push({name:cities[i], value:starts[i]});
                startTotal = startTotal + starts[i];

                newUserData.push({name:cities[i], value:newUsers[i]});
                newUserTotal = startTotal + newUsers[i];
            }

            // 组装数据并排序
            userData = tool.sortArray(userData);
            startData = tool.sortArray(startData);
            newUserData = tool.sortArray(newUserData);

            setSltDataAndTotal();

            var localOpt = {
                series: [{data: userData}, {data: startData}, {data: newUserData}],
                visualMap : {
                    max: tool.formatMaxValue(sltData[0].value)
                }
            };

            chart.setOption(localOpt);
        }
        
        var opt = {
            title : [{
                text: '北京市',
                left:'center',
                top:10
            }],
            tooltip: {                        // 鼠标悬浮时，提示
                trigger: 'item',
                formatter:function (item) {
                    return item.name +'<br>'+item.seriesName+"："+item.value+"<br>占比："+tool.formatPercent(item.value/total);
                }
            },
            legend: {                        // 数据列
                orient: 'vertical',
                right: 10,
                top:10,
                data: legends,
                selectedMode: 'single',
                selected: {
                    '用户数': true,
                    '启动数': false,
                    '新增数': false
                }
            },
            visualMap: {                    //
                min: 0,
                left: 10,
                top: 'bottom',
                text: ['高','低'],           // 文本，默认为数值文本
                calculable: true
            },
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
                    name: '新增数',
                    type: 'map',
                    mapType: '北京',
                    roam: false,
                    data: newUserData
                }
            ]
        };
        chart = echarts.init(document.getElementById('map1'));
        chart.setOption(opt);
        tool.charts.push(chart);

        // 切换数据类型时，切换最大值
        chart.on('legendselectchanged', function (obj) { // 监听数据切换，修改最大值
            var maxValue ;
            sltLegend = obj.name;
            if(obj.name == legends[0]){
                maxValue = userData[0].value;
                total = userTotal
            }else if(obj.name == legends[1]){
                maxValue = startData[0].value;
                total = startTotal
            }else{
                maxValue = newUserData[0].value;
                total = newUserTotal
            }
            var opt = {visualMap:{max:tool.formatMaxValue(maxValue)}};
            chart.setOption(opt);
        });

        // 初始化时间段选择器
        var timeSlt = tool.timeSltSingle(".time-block div", {change: function (obj) {
            getData(1000);
        }});
    });
});
