require(["ipu", "jquery", "iScroll", 'common'], function (ipu, $, iScroll, common) {
    $(function () {
        var navBar1 = ipu.navBar(".ipu-navbar", {
            animate: false,
            callBack: function (index) {
                ipu.toast('切换到'+index);
            }
        });

        new iScroll("scrollDemo"); // 第一页设置滚动
    });
});
