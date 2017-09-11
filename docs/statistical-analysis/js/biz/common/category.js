define(['jquery'], function ($) {
    // 生成24小时数组
    function getTimeCategory(){
        var time = [], start="00:00", end, ti;
        for(var i=0; i<24; i++) {
            ti = i + 1;
            if(ti == 24){
                ti = 0 ;
            }
            if(ti<10){
                prefix = "0";
            }else{
                prefix = "";
            }
            end = prefix + ti+":00";
            time.push(start+"-"+end);
            start = end;
        }
        return time;
    }

    // 按天生成数组
    function getDayCategory(dayNum, date) {
        var dates = [];
        date = date || new Date();
        var day = date.getDate();
        date.setDate(day-dayNum);

        for(var i=0; i<dayNum; i++){
            date.setDate(date.getDate()+1);
            dates.push(formatDate(date));
        }
        return dates
    }

    function formatDate(date) {
        return date.getFullYear()+'-'+(formatNum(date.getMonth()+1))+'-'+formatNum(date.getDate());
    }

    function formatNum(num) {
        if(num < 10 ){
            return "0"+num;
        }else{
            return num;
        }
    }

    var categories = {
        getDayCategory: getDayCategory
    };

    var time = getTimeCategory();
    categories.time = time;
    categories.today = time;
    categories.yesterday = time;

    var dayNum = getDayCategory(90);        // 最近90天
    categories.lastWeek = dayNum.slice(-7); // 最后7天
    categories.lastMonth = dayNum.slice(-30); // 最后7天
    categories.last3Month = dayNum;
    var lastWeekNoYear = categories.lastWeekNoYear = [];    // 7天没有年信息

    for(var i=0, j=categories.lastWeek.length; i<j; i++){
        lastWeekNoYear.push(categories.lastWeek[i].slice(5));
    }

    categories.timeSlt = [{
        text: "今天 vs 昨天", value: categories.lastWeek[6] +" vs " + categories.lastWeek[5]
    },{
        text: "昨天 vs 前天", value: categories.lastWeek[5] +" vs " + categories.lastWeek[4]
    },{
        text: "最近7天", value: categories.lastWeek[0] +" ~ " + categories.lastWeek[6]
    },{
        text: "最近30天", value: categories.lastMonth[0] +" ~ " + categories.lastMonth[29]
    },{
        text: "最近90天", value: categories.last3Month[0] +" ~ " + categories.last3Month[89]
    }];

    categories.timeSltSingle = [{
        text: "今天", value: categories.lastWeek[6], label:'today'
    },{
        text: "昨天", value: categories.lastWeek[5], label:'yesterday'
    },{
        text: "最近7天", value: categories.lastWeek[0] +" ~ " + categories.lastWeek[6], label: 'lastWeek'
    },{
        text: "最近30天", value: categories.lastMonth[0] +" ~ " + categories.lastMonth[29], label: 'lastMonth'
    },{
        text: "最近90天", value: categories.last3Month[0] +" ~ " + categories.last3Month[89], label: 'last3Month'
    }];
    return categories;
});
