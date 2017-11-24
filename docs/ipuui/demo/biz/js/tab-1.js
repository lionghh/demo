require(["ipu", "jquery"], function (ipu, $) {
    $(function () {
        var tab = ipu.tab(".ipu-tab", {});
        $(".style-toggle").click(function () {
            $(".ipu-tab-title").toggleClass("ipu-tab-title-link ipu-tab-title-button");
        });

        // 进入下一项
        $(".next").click(function () {
           tab.show(3);
        });

        // 子项4进入上一项
        $(".prev").click(function () {
            tab.show(2);
        });
    });
});
