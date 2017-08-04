require(['jquery'], function ($) {
    $(function () {
        // 弄一个全局配置
        var appConfig = {
            openRepeat: true,           //  全局是否可重复打开相同页面
            maxPageSize: 20             //  允许打开的最大页面数量 达到最大数量时，进行提示
        };

        $(function () {
            var enterTimeout;

            // 鼠标移入菜单
            $(".menu-item").mouseenter(function () {
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
            });

            // 左边菜单，鼠标移出,也要添加延时
            $(".menu-item").mouseleave(function () {
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
            });

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


            var isMaxPage = false;
            // 检查菜单对应页面是否已被打开
            function isPageOpen(menu){
                var pageNo = $(menu).data('pageNo');
                // 先来一个判断流程
                return $(".navs-head ul li[data-page-no='"+pageNo+"']").size() != 0;
            }

            function addPage(menu) {
                // 进行数量上限判断
                if(appConfig.maxPageSize && $(".navs-head ul li").size() >= appConfig.maxPageSize) {
                    // 提示消息
                    alert('不能打开超过'+appConfig.maxPageSize+'个子页面'); //最大页面数了 todo:调用消息组件
                    return false;
                }

                var link = $(menu).data('link');
                var text = $(menu).text();
                var pageNo = $(menu).data('pageNo');

                var newPage = '<div class="navs-page"><iframe src="' + link + '"></iframe></div>';
                $(newPage).appendTo(".navs-pages");

                var newTab =  $(".navs-head ul li:first").clone();
                newTab.attr("data-page-no", pageNo);
                $(".navs-title", newTab).text(text);

                newTab.appendTo(".navs-head ul");
                changeTab(newTab);
                return true;
            }

            function changeTab(onTab){
                $(".navs-head ul li.on, .navs-pages .navs-page.on").removeClass("on");
                onTab.addClass("on");

                $(".navs-pages .navs-page:eq(" + onTab.index() + ")").addClass("on");
                checkNavSize();
            }

            // 导航打开关页面，是否要检查是否重复打开页面，可以添加一个属性来标记,限制打开页面的数量
            $(".side-menu .menu-item ul a").click(function () {
                var needChange = true;
                var openRepeat = $(this).data('openRepeat');

                if(appConfig.openRepeat && openRepeat === true){  // 允许重复打开
                    needChange = addPage(this);
                }else { // 不允许重复打开，则要先判断页面是否已经打开
                    if (!isPageOpen(this)){
                        needChange = addPage(this);
                    }
                }

                if(needChange) {
                    var pageNo = $(this).data('pageNo');
                    var onTab = $(".navs-head ul li[data-page-no='"+pageNo+"']:last");
                    changeTab(onTab); // 判断是否需要changetab
                }

                return false;
            });

            // tab太多的时候，变成平均分配宽度展示，但tab数量较少时，变幻成固定宽度展示
            var navLength, firstTab, tabItemWidth, maxTabSize;

            firstTab = $(".navs-head ul li:first");
            tabItemWidth = firstTab.outerWidth(true);

            // 判断tab的宽度是否变化，重新计算可展示的最大显示tab数量
            function countNavSize() {
                var newLength = $(".navs-head ul").width();

                if (newLength != navLength) {
                    navLength = newLength;
                    maxTabSize = Math.floor(navLength / tabItemWidth);
                    checkNavSize();
                }
            }

            // tab的宽度是固定的，当宽度超出内容时，使用长tab,cell的布局
            function checkNavSize() {
                // 根据宽度来计算，判断是否可以恢复
                if ($(".navs-head ul li").size() > maxTabSize) {
                    $(".navs-head").addClass('tableDisplay');
                } else {
                    $(".navs-head").removeClass('tableDisplay');
                }
            }

            // 监听页面变化并进行第一次计算
            $(window).resize(countNavSize);
            countNavSize(); // 初始化计算

            // tab页面关闭
            $(".navs-head").on("click", "ul li .am-close", function () {
                var tab = $(this).parents("li");
                var index = $(".navs-head ul li").index(tab);

                $(".navs-pages .navs-page:eq(" + index + ")").remove();
                if (tab.hasClass("on")) {
                    var next = tab.next();
                    if (next.size() == 0) {
                        next = tab.prev();
                    }
                    changeTab(next);
                }

                tab.remove();
                return false;
            });

            // tab切换
            $(".navs-head").on("click", "ul li:not(on)", function () {
                changeTab($(this));
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
                    // console.log(currentX + '---' + clientX + '--' + resize + '--'+paddingX);
                    $(".page-overview").show(); // 显示遮掩层
                }
            });

            // 移动的时候，鼠标位置与分隔线有位移，尺寸计算有问题
            $("body").mousemove(function (e) {
                if (resize) {
                    var width = currentX + e.originalEvent.clientX - clientX;
                    // console.log('mouve' + e.originalEvent.clientX + '--' + width + '--' + resize);
                    left.width(width);
                    right.css("left", width+paddingX);
                }
            });

            // 鼠标松开释放
            $("body").mouseup(function (e) {
                if (resize) {
                    ctrlBar.removeClass("resize");
                    resize = false;
                    //console.log('up' + e + '--' + resize);
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
                    $("body").removeClass(oldValue).addClass(themeValue);
                    $(this).addClass("slt").siblings(".slt").removeClass("slt");
                    // 还要通知所有的子页面，看是否需要通知子页面，不通知也可以
                    // 子页面正在加载中的时候，可能收不到父容器的函数
                    var childWindows = window.frames;
                    for(var i=0, j= childWindows.length; i<j; i++){
                        childWindows[i].switchTheme && childWindows[i].switchTheme(themeValue, oldValue);
                    }

                    oldValue = themeValue;
                }
            });
        });
    });
});
