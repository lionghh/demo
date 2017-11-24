require(["ipu", "jquery"], function (ipu, $) {
    $(function () {
        $(".page-back").click(function () {
            ipu.page.back({data: 'page2的数据'});
        });

        $(".page-back-home").click(function () {
            ipu.page.backHome({data: 'page2的数据'});
        });

        $(".page-1").click(function () {
            ipu.page.open('page-1.html');
        });

        // 使用pageName回退，多个页面pageName相同时，回退第一个pageName
        $(".page-back-with-name").click(function () {
           ipu.page.back({pageName:'pageWithName'});
        });
    });
});
