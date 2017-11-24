require(["ipu", "jquery"], function (ipu, $) {
    $(function () {
        var tab = ipu.tab(".ipu-tab", {});
        var tabTest = ipu.tab(".ipu-tab-test");
        $(".style-toggle").click(function () {
            $(".ipu-tab-title").toggleClass("ipu-tab-title-link ipu-tab-title-button");
        });
    });
});
