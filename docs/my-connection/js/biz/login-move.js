require(['jquery', 'ipu', 'common'], function ($, ipu, common) {
  $(function () {
    
    $(".form-input").on("focus", function (e) {
      $(".page-content").addClass("login-input-focus");
    });

    $(document).on('focusin', function () {
      //软键盘弹出的事件处理
    });

    $(document).on('focusout', function () {
      //软键盘收起的事件处理
      $(".page-content").removeClass("login-input-focus");
    });
  });
});