require(["ipu"], function (ipu) {
  $(function () {

        var totalPage = 3;  // 总页数
        var nowPage = 1;    // 当前显示第几页，因为默认有一些数据了，所以为1
        var listObj =  $("#refresh ul");
        var contentHtml = $("li:lt(10)", listObj).clone(); // 测试用，复制5条数据

        // 移除初始的数据，并初始nowPage=0;
        listObj.empty();
        nowPage = 0;
        var countNo = 0; // 重要计数器,以此来判断不需要

        // 初始化下拉刷新
        var myRefresh = ipu.refresh("#refresh", {
            bottomLoadFun: function () { // 加载更多
                console.log('加载更多'); // 手势上拉，内容下滚动动
                addData();
            },
            topLoadFun: function () { // 刷新
                console.log('刷新数据'); // 手势下拉，内容上滚动
                refreshData();
            }
        });

        // 搜索按钮
        $("#query-btn").click(function () {
            // 停止加载更多和刷新功能，以及当前的加载更多和刷新状态
            myRefresh.enableBottom(false);
            if(myRefresh.bottomLoading){
                myRefresh.endBottomLoading();
            }
            myRefresh.enableTop(false);
            if(myRefresh.topLoading){
                myRefresh.endTopLoading();
            }

            nowPage = 0;
            listObj.empty();
            myRefresh.enableBottom(true);
            myRefresh.refresh(); // 刷新会自动检查是否需要触发加载更多功能
        });

        // 查询数据
        function addData(refresh) {// 0搜索，1刷新，2加载更多
            $('.no-result-msg').hide();
            nowPage++;
            var localCountNo = ++countNo;  // 执行查询前，保留当前计数器，当查询返回时进行检查是否最新查询，不是则抛弃查询结果

            setTimeout(function () { // 模拟延时加载
                if(localCountNo == countNo){ // 检查是否最新查询返回数据，不是则抛弃查询结果
                    // 此处先更新togalPage等信息

                    myRefresh.enableTop(totalPage != 0); // 假设totalPage为0时表示没数据，此时停用刷新功能，也可不停用，强行刷新
                    myRefresh.enableBottom(nowPage < totalPage); // enable应该总是先于endBottom/TopLoading方法执行

                    if(totalPage ==0){
                        $('.no-result-msg').show();
                    }else{
                        if (refresh ) {                    // 顶部刷新，刷新也可能已经没有数据了，待处理
                            listObj.empty(); // 清空已有内容
                            contentHtml.clone().appendTo(listObj);
                            myRefresh.endTopLoading(); //最后调用
                        } else {  // 底部加载更多,或查询
                            contentHtml.clone().appendTo(listObj);
                            myRefresh.endBottomLoading();  //最后调用
                        }
                    }
                }
            }, 3000);
        }

        // 刷新
        function refreshData() {   // 刷新数据
            nowPage = 0; // 底部加载时，停用底部加载功能和底部加载
            myRefresh.enableBottom(false);
            if(myRefresh.bottomLoading){
                myRefresh.endBottomLoading();
            }
            addData(true);
        }
    });
});
