require(['jquery', 'ipu'], function ($, ipu) {
  $(function () {

    // 判断是否pageform
    $(".page-form:not([manual])").each(function () {
      var _this = this;

      // 输入时，底边框加深
      $(".form-input", _this).focus(function () {
        var _this = this;
        $(_this).parents(".form-row-input").addClass("form-row-input-focus");
      });

      // div失去焦点，要用focusout方法
      $(".form-row-input", _this).focusout(function () { // android点清除时，先触发foucusout，没法触发click
        var clear = $(".form-input", this).data('input-asset');
        if(clear){
          var input = $(".form-input", this).removeData('input-asset').focus();
        }else{
          $(this).removeClass("form-row-input-focus");
        }
      });

      // 密码明示显示开关
      $(".input-eye-close", _this).on('touchstart', function () {
        var wrap = $(this).parents(".form-row-input").toggleClass("form-row-input-see");
        var input = $(".form-input", wrap).attr("type", wrap.hasClass("form-row-input-see") ? "text" : "password");
        input.data('input-asset', "1");
      });

      // clear input
      $(".input-clear", _this).on("touchstart", function () {
        var input = $(".form-input", $(this).parents(".form-row-input")).val("");
        input.data('input-asset', "1");
      });
    });

    // placeholder的处理
    $(".form-input:not([manual]), .form-input-parent input:not([manual])").focus(function () { // 得到焦点时移除placeholder
      var _this = $(this);
      var _phaceholder = _this.data("placeholder");

      if (!_phaceholder) {
        _phaceholder = _this.attr("placeholder");
        _this.data("placeholder", _phaceholder)
      }

      _this.attr("placeholder", "");
    }).blur(function () { // 失去焦点时设置placeHolder的值
      var _this = $(this);
      var _phaceholder = _this.data("placeholder") || "";
      _this.attr("placeholder", _phaceholder)
    });

    // android
    if (ipu.device.android) {
      $("body:not([manual])").height($("body").height());  // andorid页面顶出来会导致页面resize，设置此值让body不受影响


      // 待优化，100px滚动高度滚动转换
      $(".form-input:not([manual]), .form-input-parent input:not([manual])").focus(function (event) { // 输入框聚焦时自动滚动
        //this.scrollIntoView(true);  // 滚动问题，会跳动
        if($(event.target).attr("type")=="button")return;
        $(window).scrollTop($(event.target).offset().top-100);
        event.preventDefault();
      });
    }

  });
});