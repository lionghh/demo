require(['jquery', 'ipu', 'common'], function ($, ipu, common) {
  $(function () {

    // 登录
    $(".form-btn-submit").click(function (e) {
      e.preventDefault(); // 阻止表单跳转

      $(".form-msg").hide();
      var valueOk = true;  // 输入是否ok

      $(".form-input").each(function () {
        var value = $(this).val();
        var inputName = $(this).attr("name")
        var validValue = $.trim(value) != "" || ($(this).hasClass('form-input-pass') && value != ''); // 此处只检查非空

        if (validValue) {
          if (inputName == 'account') {
            // 检查账号格式
          } else if (inputName == 'pass') {
            // 检查账号格式// 检查账号格式
          }
        }

        if (!validValue) {
          $(this).focus();
          valueOk = false;
          return false;
        }
      });

      if (valueOk) {
        ipu.showIndicator();  // 模拟服务端请求
        setTimeout(function () {
          ipu.hideIndicator();

          // 失败代码
          // $(".form-msg").text("Your profile doesn't exist.").show();

          // 成功代码
          location.href = "index.html";
        }, 1000);
      }
    });

  });
});