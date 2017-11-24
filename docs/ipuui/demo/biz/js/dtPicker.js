require(['ipu', 'jquery'], function (ipu, $) {


    // 默认type为 datetime
    var dataPicker1 = ipu.dtPicker({});

    // 设置最小值和最大值及初始值
    var dataPicker2 = ipu.dtPicker({
        beginDate: '2005-08-08',
        endDate: new Date(2035, 07, 08),
        value: '2022-04-12',
        type: 'date'
    });
    // 设置最大值
    var dataPicker3 = ipu.dtPicker({
        endDate: '22:00',
        type: 'time'
    });
    // 设置起始值
    var dataPicker4 = ipu.dtPicker({
        beginDate:'2017-09',
        value: "2017-04",
        type: 'month'
    });
    // 不设置起始和结束值
    var dataPicker5 = ipu.dtPicker({
        type: 'hour'
    });

    $("#testDate1").click(function () {
        var self = $(this);
        dataPicker1.show(function (data, index) {
            if(index == 1) {
                self.val(dataPicker1.getSelected().text);
                $(".result-value").val(JSON.stringify((data)));
            }
        });
    });

    $("#testDate2").click(function () {
        var self = $(this);
        dataPicker2.show(function (data, index) {
            if(index == 1) {
                self.val(dataPicker2.getSelected().text);
                $(".result-value").val(JSON.stringify((data)));
                $(".result-value").val(JSON.stringify((data)));
            }
        });
    });

    $("#testDate3").click(function () {
        var self = $(this);
        dataPicker3.show(function (data, index) {
            if(index == 1) {
                self.val(dataPicker3.getSelected().text);
                $(".result-value").val(JSON.stringify((data)));
            }
        });
    });
    $("#testDate4").click(function () {
        var self = $(this);
        dataPicker4.show(function (data, index) {
            if(index == 1) {
                self.val(dataPicker4.getSelected().text);
                $(".result-value").val(JSON.stringify((data)));
            }
        });
    });
    $("#testDate5").click(function () {
        var self = $(this);
        dataPicker5.show(function (data, index) {
            if(index == 1){
                self.val(dataPicker5.getSelected().text);
                $(".result-value").val(JSON.stringify((data)));
            }
        });
    });

    // 选择日期范围
    var type = "date";
    var dataPickerBegin = ipu.dtPicker({ type: type, hasClear: true});
    var dataPickerEnd = ipu.dtPicker({ type: type, hasClear: true});

    $("#testDateBegin").click(function () {
        var self = $(this);
        dataPickerBegin.show(function (sltDate, index) {
            if(index == 1){
                var slt = dataPickerBegin.getSelected();
                self.val(slt.text);
                dataPickerEnd.setBeginDate(slt.text);
            }else{
                self.val(""); // 清除按钮
                dataPickerEnd.setBeginDate();
            }
        });
    });

    $("#testDateEnd").click(function () {
        var self = $(this);
        dataPickerEnd.show(function (sltDate, index) {
            if(index == 1){
                var sltDate = dataPickerEnd.getSelected();
                self.val(sltDate.text);
                dataPickerBegin.setEndDate(sltDate.text);
            }else if(index == 2){
                self.val(""); // 清除按钮
                dataPickerBegin.setEndDate();
            }
        });
    });
});
