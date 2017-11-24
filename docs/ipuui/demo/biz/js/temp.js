require(["ipu", "jquery"], function (ipu, $) {
    $(function () {
        $("input").click(function () {
            ipu.toast('click:'+$(this).attr("class"));
        });
        $("input").focus(function () {
            ipu.toast('focus:'+$(this).attr("class"));
        });
    });
});
