require(["jquery", "ipu"], function ($, ipu) {
    $(function () {
        // 监听后退事件
        ipu.page.onBack(function (data) {
            ipu.toast('接收数据'+data);
        });

        // 后退处理
        $(".ipu-fn-left:first").click(function () {
            ipu.page.back();
            return false;
        });

        $(".ipu-fn-right:first").click(function () {
            var url = $(this).attr("href");
            ipu.page.open(url, {callBack:function () {
                ipu.toast('打开了新页面');
            }});
            return false;
        });

        // 回到textPage页面，因为有多个textPage,会选择回到第一个textPage
        $(".backPageName").click(function () {
            ipu.page.back({pageName:"textPage"});
            return false;
        });

        // 回到第三个页面
        $(".backPage3").click(function () {
            ipu.page.back({backIndex:2});
            return false;
        });
    });
});
