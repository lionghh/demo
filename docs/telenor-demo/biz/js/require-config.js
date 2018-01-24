require.config({
	baseUrl:'../',
    paths:{
        'jquery':'dep/js/jquery/jquery-2.2.4',
    	'iScroll':'dep/js/iscroll/iscroll',
        'Hammer':'dep/js/hammer/hammer',
        'FastClick': 'dep/js/fastclick/fastclick',
        'ipu' : 'dep/ipu/js/ipu',
        'common': 'biz/js/common'
    },

     urlArgs: "urlArgs="  // 可添加参数时间字符串，来避免缓存
});
