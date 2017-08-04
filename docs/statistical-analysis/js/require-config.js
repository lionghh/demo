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
        'jquery':'jquery',
        'echarts':'echarts',
        'AMUI' : '../../ui/amazeui/js/amazeui'
    },
    //缓存
    urlArgs: "timestamp="+new Date().getTime()
});
