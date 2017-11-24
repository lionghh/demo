require(["ipu", "jquery"], function (ipu, $) {
    $(function () {
        $(".page-1").click(function () {
            ipu.page.open("page-1.html");
            return false;
        });

        $(".page-2").click(function () {
            ipu.page.open("page-2.html");
            return false;
        });

        $(".page-back").click(function () {
            ipu.page.back({data: 'page2的数据'});
        });

        $(".page-back-home").click(function () {
            ipu.page.backHome({data: 'page2的数据'});
        });
    });
});
