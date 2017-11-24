require(["jquery", "lc"], function ($, LC) {

    $(function () {

        var lc = LC.init($(".draw-container")[0], {
            defaultStrokeWidth: 2, // 画笔粗细
            primaryColor:'#000',    // 画笔颜色
            backgroundColor: 'transparent', // 画布背景色，透明
        });

        // 获取图片
        $(".btn-confirm").click(function () {
            $(".auto img").attr("src", lc.canvasForExport().toDataURL()); // 不推荐使用的方法，可能在此库以后的版本中被移除
            var imgWidth = $(".draw-container").width();
            var imgHeight = $(".draw-container").height();

            $(".fix img").attr("src", lc.getImage({
                rect:{x:0 ,y:0, height:imgHeight, width:imgWidth},
                scale:2   // 为保证图片在不同尺寸手机下不失真，图片的尺寸保存为显示尺寸的2倍
            }).toDataURL());
        });

        // 清除签名
        $(".btn-clear").click(function () {
            lc.clear();
        });
    });

});
