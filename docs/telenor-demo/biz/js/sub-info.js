require(['jquery', 'ipu', 'iScroll', 'common'], function ($, ipu, iScroll, common) {
    $(function () {
        new iScroll("sub-info-content"); //设置可拖动

        $(".button-default").click(function () {
            window.location.href = "sub-detail.html";
        });
    });
});