require(['jquery', 'ipu', 'common'], function ($, ipu, common) {
  $(function () {

    $(".form-btn-submit").click(function (e) {
      e.preventDefault(); // 阻止表单跳转

      $(".form-msg").hide();
      var valueOk = true;

      $(".form-input").each(function () {   // 检查输入内容格式
        var value = $(this).val();
        var validValue = $.trim(value) != "" || ($(this).hasClass('form-input-pass') && value != '');
        if (!validValue) {
          $(this).focus();
          valueOk = false;
          $(".form-msg").text("The password is not as same as the first time.").show();
          return false;
        }
      });

      if (valueOk) {
        ipu.showIndicator();  // 模拟服务端请求
        setTimeout(function () {
          ipu.hideIndicator();

          // 成功代码
          ipu.toast("password reset success!");
          setTimeout(function () {
            location.href = "login.html";
          }, 2000);

          // 失败代码
          // $(".form-msg").text("errer info").show();
        }, 1000);
      }
    });
  });
});