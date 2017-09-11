// 生成模拟数据
define(['category'], function (category) {

    // 生成长度为length的，最大值为maxValue的随机数组
    function getMockArray(length, maxValue){
        var array = [];
        for(var i=0; i<length; i++){
            array.push(getMockNum(maxValue));
        }
        return array;
    }

    // 返回最大值为maxValue的随机数
    function getMockNum(maxValue) {
        maxValue = maxValue || 1000;
        return Math.round(Math.random()*maxValue)
    }

    // 根据category.js的日期分类生成对应随机数
    function getMockData(maxValue){
        var mockData = {};
        var dayMaxValue = Math.round(maxValue/24);
        mockData.today = getMockArray(24, dayMaxValue);     // 今日24小时段数据
        mockData.yesterday = getMockArray(24, dayMaxValue); // 昨日24小时段数据
        mockData.yesterdayBefore = getMockArray(24, dayMaxValue);   // 前日24小时段数据
        var mockArray = getMockArray(90, maxValue);        // 最近90天
        mockData.lastWeek = mockArray.slice(-7); // 最后7天
        mockData.lastMonth = mockArray.slice(-30); // 最后30天
        mockData.last3Month = mockArray;           // 最近90天
        return mockData;
    }

    // 为自定义查询返回模拟数据
    function getMockDataDays(beginDate, endDate) {
        if(beginDate == endDate){ // 返回24小制数据
            return {
                category : category.time,
                data : getMockArray(category.time.length, 1000)
            }
        }else{ // 计算相关的天数
            beginDate = getDataByStr(beginDate);
            endDate = getDataByStr(endDate); // 需要返回两个数据，一个日期数组，和一个数据结果
            var size = (endDate.getTime() - beginDate.getTime()) / (24 * 60 * 60 * 1000);
            return {
                category : category.getDayCategory(size, beginDate),
                data : getMockArray(size, 1000)
            }
        }
    }

    // 将2017-08-09转换为日期对象
    function getDataByStr(data) {
        var strArray = data.split("-");
        return new Date(strArray[0], strArray[1], strArray[2]);
    }


    var obj = {
        'getMockData' : getMockData,
        'getMockArray' : getMockArray,
        getMockDataDays : getMockDataDays
    };
    return obj;
});
