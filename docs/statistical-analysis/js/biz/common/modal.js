define(['jquery'], function ($) {
    var alertHtml = '<div class="am-modal am-modal-alert" tabindex="-1">'
        +'<div class="am-modal-dialog">'
        +'<div class="am-modal-hd"></div>'
        +'<div class="am-modal-bd"></div>'
        +'<div class="am-modal-footer">'
        +'<span class="am-modal-btn" data-am-modal-confirm>确定</span>'
        +'</div>'
        +'</div>'
        +'</div>';

    var confirmHtml = '<div class="am-modal am-modal-confirm" tabindex="-1">'
        +'<div class="am-modal-dialog">'
        +'<div class="am-modal-hd"></div>'
        +'<div class="am-modal-bd"></div>'
        +'<div class="am-modal-footer">'
        +'<span class="am-modal-btn" data-am-modal-cancel>取消</span>'
        +'<span class="am-modal-btn" data-am-modal-confirm>确定</span>'
        +'</div>'
        +'</div>'
        +'</div>';
    var alerJobj;
    var confirmJobj;

    $(function () {
        alerJobj = $(alertHtml).appendTo("body");
        confirmJobj = $(confirmHtml).appendTo("body");
    });

    // 提示消息
    function alert(msg, option) {
        $(".am-modal-bd", alerJobj).html(msg);
        alerJobj.modal(option);
    }

    // 消息确认
    function confirm(msg, option) {
        $(".am-modal-bd", confirmJobj).html(msg);
        option = option || {};
        option.closeViaDimmer = false;
        confirmJobj.modal(option);
    }

    return {
        alert: alert,
        confirm: confirm
    }
});