/**
 * baseUrl的优先级:require.config>data-main>html文件路径
 * 如果模块包含如下的字符,不按照baseUrl+paths的方式来寻找模块,而是采用全路径(URL)的方式:
 * 1.如果以".js"结尾
 * 2.如果以"/"开头
 * 3.如果以"http:"或者"https:"开头
 */
require.config({
    baseUrl:'js/lib',
    paths:{
        'jquery':'jquery', // 路径同名称的，可以不配置
        'echarts':'echarts',
        'AMUI' : '../../ui/amazeui/js/amazeui',

        'china':'map/china',
        'beijing':'map/beijing', // 地图，可到http://echarts.baidu.com/download-map.html下载各省份地图

        'tool':    '../biz/common/tool',
        'category': '../biz/common/category', // 时间类目
        'mock': '../biz/common/mock',          // 模拟数据
        'modal': '../biz/common/modal',        // 消息组件
        'time-slt':'../biz/common/time-slt'     // 选择时间组件

    }
    //缓存
    //,urlArgs: "timestamp="+new Date().getTime()
});
