// 公共业务类
define(['jquery', 'highlight'], function($, highlight){
    $(function () {
        highlight.initHighlighting();
    });


    var local = {
        getItem:  function (key){
            return (localStorage && localStorage.getItem(key));
        },
        setItem: function(key, value){
            return (localStorage && localStorage.setItem(key, value));
        },
        clearItem: function (key) {
            return (localStorage && localStorage.removeItem(key));
        }
    };

    return {
        local: local
    }

});
