require(['jquery', 'ipu', 'iScroll', 'common'], function ($, ipu, iScroll, common) {
    $(function () {
        // 底部导航切换
        ipu.navBar(".ipu-navbar", {animate: true});  // 底部导航切换

        // index page
        var myRefresh = ipu.refresh("#page-index", {
            topLoadFun: function () { // 刷新
                setTimeout(function () {
                    myRefresh.endTopLoading(); //最后调用
                }, 1000);
            }
        });

        // bill page
        new iScroll("bill-content"); // 设置可拖动
        // sub page
        new iScroll("sub-content"); // 设置可拖动

        //
        $("a").click(function () {
            var linkText = $.trim($(this).text());
            if (linkText == 'Show bill') {
                window.location.href = "bill-detail.html";
            } else if (linkText == 'Show Subscription') {
                window.location.href = "sub-info.html";
            }
        });
    });
});