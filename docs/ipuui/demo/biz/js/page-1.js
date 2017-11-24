require(["ipu", "jquery"], function (ipu, $) {
    $(function () {

        $(".page-2").click(function () {
            ipu.page.open('page-2.html',{callBack:function () {
                ipu.toast('主页打开了新页面');
            }});
            return false;
        });

        ipu.page.onBack(function (data) {
            ipu.toast('page-1接收参数：'+data);
        });


        $(".page-back").click(function () {
           ipu.page.back({data: 'page1的数据'});
        });

        $(".page-back-home").click(function () {
            ipu.page.backHome({data: 'page1的数据'});
        });

        // 使用pageName回退，多个页面pageName相同时，回退第一个pageName
        $(".page-back-with-name").click(function () {
            ipu.page.back({pageName:'pageWithName'});
        });
    });

});
