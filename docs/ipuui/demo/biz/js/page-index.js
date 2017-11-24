require(["ipu", "jquery"], function (ipu, $) {
    $(function () {
        // 单页面对html结构有一定要求
        // page的api参数中 target应该是window(默认为window.parent)

        // get方式打开页面
        $(".page-1").click(function () {
            ipu.page.open("page-1.html",{target : window});
            return false;
        });

        $(".page-2").click(function () {
            ipu.page.open("page-2.html",{target : window});
            return false;
        });

        $(".page-with-name").click(function () {
            ipu.page.open("http://127.0.0.1:3000/demo/index.html",{target : window, pageName: 'pageWithName'});
            return false;
        });

        // post打开页面
        $(".page-post").click(function () {
            ipu.page.post("http://aiipu.com/m", {target : window});
            return false;
        });

        // 回到首页
        $(".page-back-home-index").click(function () {
            ipu.page.backHome();
            return false;
        });

        // 接收其它页面返回时传送来的数据
        ipu.page.onBack(function (data) {
           ipu.toast('回传数据：'+data);
        });
    });
});
