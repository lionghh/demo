define(['jquery', 'AMUI', 'category', 'modal'], function ($, amui, category, modal) {

    function TimeSlt(el, option) {
        this.el = $(el).addClass("sys-select");
        this.option = $.extend({}, this.defaultOption, option);
        this.buildHtml();
        this.initDateComp();
        this.handleEvent();
        this.data = this.option.data.slice(0); // 复制数组
        this.size = this.data.length; // 记录当前长度
        this.data.push({}); // 占位数据，给自定义时间使用
        this.slt(this.option.sltIndex);
    }

    TimeSlt.prototype.defaultOption = {
        sltIndex: 0,  // 默认选中数组第一项
        showType: 'value', // 默认选择结果中显示text或value
        data: category.timeSlt,  // {text:'name', vlaue:'value'}形式数组
        change: function () {

        },
        template: '<div class="sys-select-result"><span class="sys-value"></span><i class="am-icon-angle-down"></i></div>'
        + '<div class="sys-options">'
        + '<div class="sys-option sys-option-diy">自选</div>'
        + '<div class="sys-diy-content">'
        + '<div class="sys-date">'
        + '<span class="sys-date-label">开始</span>'
        + '<input type="text" value="" class="date-begin" readonly>'
        + '</div>'
        + '<div class="sys-date">'
        + '<span class="sys-date-label">到</span>'
        + '<input type="text" value="" class="date-end" readonly>'
        + '</div>'
        + '<div class="sys-buttons"><button class="am-btn">确定</button></div>'
        + '</div>'
        + '</div>'
        + '</div>',
        optionTemplate: '<div class="sys-option" data-value="$value">$text</div>'
    };

    TimeSlt.prototype.buildHtml = function () {
        var data = this.option.data;

        var sltHtml = this.option.template;
        var optionHtml = '';

        for (var i = 0, j = data.length; i < j; i++) {
            optionHtml = optionHtml + this.option.optionTemplate.replace(/\$value/, data[i].value).replace(/\$text/, data[i].text);
        }
        $(sltHtml).appendTo(this.el);
        $(optionHtml).prependTo(".sys-options", this.el);
    };

    TimeSlt.prototype.slt = function (index) {
        this.sltIndex = index;
        $(".sys-options .sys-option:eq(" + index + ")", this.el).addClass("slt").siblings(".slt").removeClass("slt");
        $(".sys-value", this.el).text(this.data[index][this.option.showType]);
        this.option.change && this.option.change.call(this, this.data[index]);
    };

    // 初始化时间组件
    TimeSlt.prototype.initDateComp = function () {
        var beginYear = null;
        var beginMonth = null;
        var beginDay = null;
        var endYear = null;
        var endMonth = null;
        var endDay = null;

        var begin = $(".date-begin", this.el).datepicker({
            format: 'yyyy-mm-dd',
            onRender: function (date, viewMode) {
                if (endYear) {
                    var viewDate = endDay;
                    switch (viewMode) {
                        case 1:
                            viewDate = endMonth;
                            break;
                        case 2:
                            viewDate = endYear;
                            break;
                    }

                    return date.valueOf() > viewDate ? 'am-disabled' : '';
                }
                return '';
            }
        }).on('changeDate.datepicker.amui', function (ev) {
            var nowTemp = ev.date;
            beginDay = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0).getTime();
            beginMonth = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), 1, 0, 0, 0, 0).getTime();
            beginYear = new Date(nowTemp.getFullYear(), 0, 1, 0, 0, 0, 0).getTime();
            $(".date-end", this.el).datepicker('update');
            $(".date-begin", this.el).datepicker('close');
        });

        var end = $(".date-end", this.el).datepicker({
            format: 'yyyy-mm-dd',
            onRender: function (date, viewMode) {
                if (beginYear) {
                    var viewDate = beginDay;
                    switch (viewMode) {
                        case 1:
                            viewDate = beginMonth;
                            break;
                        case 2:
                            viewDate = beginYear;
                            break;
                    }

                    return date.valueOf() < viewDate ? 'am-disabled' : '';
                }
                return '';
            }
        }).on('changeDate.datepicker.amui', function (ev) {
            var nowTemp = ev.date;
            endDay = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0).getTime();
            endMonth = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), 1, 0, 0, 0, 0).getTime();
            endYear = new Date(nowTemp.getFullYear(), 0, 1, 0, 0, 0, 0).getTime();
            $(".date-begin", this.el).datepicker('update');
            $(".date-end", this.el).datepicker('close');
        });
    };

    TimeSlt.prototype.handleEvent = function () {
        var _this = this;

        // 触发显示下拉选项
        $(".sys-select-result", this.el).click(function () {
            $(this).parent().toggleClass("open");
        });

        // 普通项选中选中
        $(".sys-option:not(.sys-option-diy)", this.el).each(function (index) {
            $(this).click(function () {
                if (!$(this).hasClass("slt")) {
                    _this.slt(index);
                }
                _this.el.removeClass("open");
                $(".sys-diy-content", this.el).slideUp();
            });
        });

        // 选择自选时间
        $(".sys-option.sys-option-diy", this.el).click(function () {
            $(".sys-diy-content", this.el).slideToggle();
        });

        // 确认自选时间
        $(".sys-buttons .am-btn", this.el).click(function () {
            var beginDate = $(".sys-date input:eq(0)").val();
            var endDate = $(".sys-date input:eq(1)").val();

            if (beginDate == "") {
                modal.alert('开始时间不能为空');
                return;
            }
            if (endDate == "") {
                modal.alert('结束时间不能为空');
                return;
            }

            // 更新数组最后一条记录
            _this.data[_this.size] = {
                diy: true,
                text: beginDate + " ~ " + endDate,
                value: beginDate + " ~ " + endDate,
                beginDate: beginDate,
                endDate: endDate
            };

            _this.slt(_this.size);
            _this.el.removeClass("open");
        });

        // 失去焦点，body上的click事件不是点在选择框上时，隐藏选择框选项
    };

    return TimeSlt;
});