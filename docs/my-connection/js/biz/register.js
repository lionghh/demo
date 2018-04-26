require(['jquery', 'ipu', 'common'], function ($, ipu, common) {
  $(function () {

    $(".form-btn-submit").click(function (e) {
      e.preventDefault(); // 阻止表单跳转

      $(".form-msg").hide();
      var valueOk = true;  // 输入是否ok

      $(".form-input").each(function () {
        var value = $(this).val();
        var validValue = $.trim(value) != "" || ($(this).hasClass('form-input-pass') && value != '');

        if (!validValue) {   // 需添加检查字体格式代码
          $(this).focus();
          valueOk = false;
          $(".form-msg").text("The password is not as same as the first time.").show();  // 若有错误显示错误消息
          return false;
        }
      });

      if(valueOk) {
        var model = $(".result-dialog")[0];
        ipu.openModal(model);
        setTimeout(function () {
          location.href = "login.html";
        }, 2000);
      }
    });
  });
});