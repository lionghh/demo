require(["jquery", "dragsort"], function ($) {
    $(function () {

        $(".container ul").dragsort({
            dragSelector: "li",                 // 需要监听拖动的元素
            dragBetween: true,                 // 只在父元素内拖动
            itemSelector: "li", // li需要在些选择器条件下才可拖动
            dragEnd: saveOrder,                   // 拖动结束回调函数，如果函数返回false，则取消拖动结果
            dragSelectorExclude: ".fav-cancel",// 选择删除图标时，不需要拖动
            //scrollContainer: ".fav-top-apps",       // 因为内容可能出现滚动，设置滚动的元素
            placeHolderTemplate: "<li class='drag-palceholder'></li>" // 拖动时替换显示模板
        });

        // 拖拽回调函数
        function saveOrder(newIndex, oldIndex) {

        }
    });
});
