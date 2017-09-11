require(['jquery'], function ($) {
    $(function () {
        var enterTimeout;

        // 鼠标移入菜单
      /*  $(".menu-item").mouseenter(function () {
            // 可能要加延时，因为有可能只是鼠标滑过此区域，加延时以免出现抖动
            if (!$(this).hasClass("on")) {  // 若是菜单已是展开状态则不处理
                if (enterTimeout) {
                    window.clearTimeout(enterTimeout);
                }

                var that = this;
                enterTimeout = setTimeout(function () {
                    $(that).addClass("expand");
                    $("ul", that).stop(true).slideDown();
                    enterTimeout = null;
                }, 150);
            }else{
                $(this).addClass("expand");
            }
        });*/

        // 左边菜单，鼠标移出,也要添加延时
       /* $(".menu-item").mouseleave(function () {
            if (!$(this).hasClass("on")) {
                var that = this;
                window.clearTimeout(enterTimeout);
                enterTimeout = null;
                $("ul", this).delay(100).slideUp(function () {
                    $(that).removeClass("expand");
                });
            }else{
                $(this).removeClass("expand");
            }
        });*/

        // 点击显示相关菜单
        $(".side-menu .menu-item .menu-head").click(function () {
            // 首先移除所有其它有slt，进行收起
            var thisObj = $(this).parent();

            if (thisObj.hasClass("on")) {  // 则移除class,收起菜单
                $("ul", thisObj).stop(true).slideUp(function () {
                    thisObj.removeClass("on");
                });
            } else {
                var otherSlt = $(".side-menu .menu-item.on");
                if (otherSlt.size() != 0) { // 找到其它已经存在的slt，收起对应菜单，移除对就class
                    $("ul", otherSlt).stop(true).slideUp(function () {
                        $(otherSlt).removeClass("on");
                    });
                }
                thisObj.addClass('on');
                $("ul", thisObj).slideDown();
            }
        });
        
        // 打开子窗口页面
        function openMenu(name, url) {
            $(".navs-head li:first .navs-title").text(name);
            //console.log($(".navs-pages .navs-page:first iframe").size());
            $(".navs-pages .navs-page:first iframe").attr("src", url);
        }

        window.openMenu = openMenu; // 暴露给全避变量，方便给子页面调用

        // 导航链接打开页面
        $(".side-menu .menu-item ul a").click(function () {
            var name = $.trim($(this).text());
            var url = $(this).data("link");
            openMenu(name, url);
            return false;
        });

        // 左边菜单自由调整宽度
        /*
         * 鼠标移上去事件，则出现调整效果
         * body上增加移动事件，和鼠标放开事件
         * 鼠标移动至，子iframe上时，没有相关事件回传，需要在上面 放一个遮掩的空白
         * */
        var currentX = 0;
        var clientX = 0;
        var currentOuterX = 0;
        var paddingX = 0;

        var left = $(".middle-left");
        var right = $(".middle-right");
        var ctrlBar = $(".right-bar");
        var resize = false;

        ctrlBar.mousedown(function (e) {
            if(!$('body').hasClass("hide-left")){  // 要判断左边是否为非隐藏状态
                ctrlBar.addClass('resize');
                clientX = e.originalEvent.clientX;
                currentX = left.width();
                currentOuterX = left.outerWidth(true);
                paddingX = currentOuterX - currentX;
                resize = true;
                $(".page-overview").show(); // 显示遮掩层
            }
        });

        // 移动的时候，鼠标位置与分隔线有位移，尺寸计算有问题
        $("body").mousemove(function (e) {
            if (resize) {
                var width = currentX + e.originalEvent.clientX - clientX;
                left.width(width);
                right.css("left", width+paddingX);
            }
        });

        // 鼠标松开释放
        $("body").mouseup(function (e) {
            if (resize) {
                ctrlBar.removeClass("resize");
                resize = false;
                $(".page-overview").hide();  // 移除iframe的遮掩层
            }
        });

        // 是否显示左边导航
        $(".siderbar-switch").click(function () {
            $("body").toggleClass('hide-left');
        }).mousedown(function () {
            return false;
        });

        // 全页面，应该放在tab导航上，会更好，主要是退出时，只能在这里使用
        $(".navs-head").dblclick(function (e) {
            $("body").toggleClass("show-middle-only");
        });

        // 新增切换皮肤部分，子页面不好切换
        var oldValue = $(".theme-switch a.slt").data("theme");
        $(".theme-switch a").click(function () {
            var themeValue = $(this).data("theme");
            console.log(themeValue);
            if(oldValue != themeValue){
                $("html").removeClass(oldValue).addClass(themeValue);
                $(this).addClass("slt").siblings(".slt").removeClass("slt");
                // 还要通知所有的子页面，看是否需要通知子页面，不通知也可以
                // 子页面正在加载中的时候，可能收不到父容器的函数
                var childWindows = window.frames, jquery, doc;
                for(var i=0, j= childWindows.length; i<j; i++){
                    jquery = childWindows[i].$;
                    doc = childWindows[i].document;
                    jquery("html", doc).addClass(themeValue).removeClass(oldValue);
                }
                oldValue = themeValue;
            }
        });
    });
});
