/**
 * baseUrl的优先级:require.config>data-main>html文件路径
 * 如果模块包含如下的字符,不按照baseUrl+paths的方式来寻找模块,而是采用全路径(URL)的方式:
 * 1.如果以".js"结尾
 * 2.如果以"/"开头
 * 3.如果以"http:"或者"https:"开头
 */
require.config({
    baseUrl:'biz/js',
    paths:{
        'iScroll': '../../dep/js/iscroll/iscroll',
        'Hammer': '../../dep/js/hammer/hammer',
        'jquery': '../../dep/js/jquery/jquery-2.2.4',
        'FastClick': '../../dep/js/fastclick/fastclick',
        'ipu': '../../../dist/js/ipu',

        'highlight': 'lib/highlight/highlight.min',
        'common': 'common/common'
    },
    //缓存
    urlArgs: "timestamp="
});
