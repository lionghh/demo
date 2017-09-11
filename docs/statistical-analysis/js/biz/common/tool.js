// 定义一些公用工具类
// AMUI用来生成问号提示
// TimeSlt用来生成一些日期分类
// mock用来生成模拟数据
// timeSlt是日期选择器的实现
define(['jquery', 'AMUI', 'time-slt', 'category', 'modal', 'mock'], function ($, AMUI, TimeSlt, category, modal, mock) {
    var charts = [];

    // 图表组件尺寸跟随页面尺寸变化
    $(function () {
        $(window).resize(function () {
            $.each(charts, function (index, chart) {
                chart.resize();
            });
        });
    });

    // 时间转换字符时有两位数
    function formatNum(num) {
        if(num < 10 ){
            return "0"+num;
        }else{
            return num;
        }
    }

    // 将数值格式化成是分比，小数后2位
    function formatPercent(value){
        var value = Math.round(value * 10000);
        return value/100+"%";
    }

    // 生成值范围的整数最大值
    // 5xx, 6xx, 7xx,8xx, 9xx返回 600, 700, 800, 900, 1000
    // 1xx, 2xx, 3xx, 4xx, 5xx, 返回 150/200 ,250/300, ...
    function formatMaxValue(value){
        var maxValue = 1;
        var doWhile = true;

        if(value >= 100){
            while(doWhile){
                value = value/10;
                value = value - value%1;
                doWhile = value > 100;
                maxValue = maxValue * 10;
            }
        }
        var numOne = value % 10;
        var numTwo = (value - numOne)/10;

        if(numTwo > 5){
            numOne = 0;
            numTwo = numTwo + 1;
        }else if(numOne > 5){
            numOne = 0 ;
            numTwo = numTwo + 1;
        }else{
            numTwo = numTwo + 1;
            numOne = 5;
        }
        return (numTwo*10+numOne)*maxValue;
    }

    // 将整数秒转换成时间显示
    function formatTimeByNum(num) {
        var s = num % 60;
        var m = (num - s)/60 % 60;
        var h = ((num - s)/60 - m) / 60 ;
        return formatNum(h) + ':'+formatNum(m)+':'+formatNum(s);
    }

    // 数组值的值比较，用来排序，大的排在前
    function compare(a, b){
        return b.value - a.value;
    }

    // 数组排序
    function sortArray(array) {
        return array.sort(compare);
    }

    // 统计总数
    function countArray(array) {
        var count = 0;
        for(var i=0, j=array.length; i<j; i++){
            count = count + array[i];
        }
        return count;
    }

    function countArrayValue(array) {
        var count = 0;
        for(var i=0, j=array.length; i<j; i++){
            count = count + array[i].value;
        }
        return count;
    }

    // 排序并返回总数
    function sortAndCountArray(array) {
        return {
            total : countArrayValue(array),
            sort: sortArray(array)
        }
    }

    return {
        timeSlt: function (el, option) {   // 时间组件 今天 vs 昨天， 昨天 vs 前天
            return new TimeSlt(el, option);
        },
        timeSltSingle: function (el, option) { // 今天， 昨天， 最近7天，格式与上面不一样
            option = option || {};
            if(!option.data){
                option.data = category.timeSltSingle
            }
            return new TimeSlt(el, option);
        },


        category: category,                   // 简单对象
        mock: mock,
        charts: charts,                       // 需要跟随窗口变化大小的图表
        modal: modal,


        formatPercent: formatPercent,         // 工具函数
        formatMaxValue: formatMaxValue,
        formatTimeByNum: formatTimeByNum,
        sortArray: sortArray,
        countArray: countArray
    };

});