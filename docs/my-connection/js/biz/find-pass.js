require(['jquery', 'ipu', 'common'], function ($, ipu, common) {
  $(function () {

    // 切换密码找回方式
    $(".form-row-link a").click(function () {
      $(".pages-findPass").toggleClass("pages-findPass-byemail");
    });

    // 获取短信验证码
    $(".btn-obtain").click(function () {
      // 检查手机号格式是否正确，正确才执行下面代码

      var _this = $(this);
      if (!_this.hasClass("obtin-disable")) {
        _this.addClass("obtin-disable");

        ipu.showIndicator();

        setTimeout(function () {
          ipu.hideIndicator();
          ipu.toast('obtain verification code success!');
          setTime();  // 开始倒计时
          $(".form-input", _this.parents(".form-row-input")).prop("disabled", false).focus(); // 验证密码框可用
        }, 1000)


        var time = 60;

        // 发送短信倒计时处理
        function setTime() {
          if (time > 0) {
            _this.text(time + "/S");
            window.setTimeout(setTime, 1000)
          } else {
            _this.removeClass("obtin-disable").text("Obtain");
          }
          time--;
        }
      }
    });

    // 手机号找回密码
    $(".page-form-byphone .form-btn-submit").click(function (e) {
      e.preventDefault(); // 阻止表单跳转
      var parent = $(".page-form-byphone");
      $(".form-msg", parent).hide();

      var valueOk = true;
      $(".form-input", parent).each(function () {       // 检查用户名格式，检查密码格式
        var value = $(this).val();
        var validValue = $.trim(value) != "" || ($(this).hasClass('form-input-pass') && value != '');

        if (!validValue) {
          $(this).focus();
          valueOk = false;
          $(".form-msg", parent).text("incorrect verification code.").show()
          return false;
        }
      });

      if (valueOk) {
        ipu.showIndicator();
        setTimeout(function () {
          ipu.hideIndicator();
          location.href = 'pass-reset.html';
        }, 2000);
      }
    });

    // 邮箱找回密码
    $(".page-form-byemail .form-btn-submit").click(function (e) {
      e.preventDefault(); // 阻止表单跳转
      var parent = $(".page-form-byemail");
      $(".form-msg", parent).hide();

      var valueOk = true;
      $(".form-input", parent).each(function () {       // 检查用户名格式，检查密码格式
        var value = $(this).val();
        var validValue = $.trim(value) != "" || ($(this).hasClass('form-input-pass') && value != '');

        if (!validValue) {
          $(this).focus();
          valueOk = false;
          $(".form-msg", parent).text("incorrect verification code.").show()
          return false;
        }
      });

      if (valueOk) {
        ipu.showIndicator();
        setTimeout(function () {
          ipu.hideIndicator();
          ipu.openModal(".result-dialog");
        }, 2000);
      }
    });

    // 关闭弹出框
    $(".dialog-btn-close").click(function () {
      ipu.closeModal(".result-dialog");
      location.href = 'login.html';
    });
  });
});