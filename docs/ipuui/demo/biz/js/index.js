require(["ipu", "jquery", "iScroll", 'common'], function (ipu, $, iScroll, common) {
    $(function () {
        var pageNavKey = "pageNavIndex";

        var lastIndex = common.local.getItem(pageNavKey);
        if(lastIndex !== false){
            lastIndex = parseInt(lastIndex);
            $($(".ipu-navbar .ipu-navbar-item ")[lastIndex]).addClass("ipu-current").siblings(".ipu-current").removeClass("ipu-current");
        }

        var navBar = ipu.navBar(".ipu-navbar", {
            animate: true,
            callBack: function (index) {
                common.local.setItem(pageNavKey, index);
            }
        });

        new iScroll("scrollDemo"); // 第二页设置可以拖动
    });

});
