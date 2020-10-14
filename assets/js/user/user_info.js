$(function () {
    var form = layui.form
    var layer = layer.value

    form.verify({
        nickname: function () {
            if (value.length > 6) {
                return '昵称长度必须在1~6 个字符之间！'
            }
        }
    })
  initUserInfo()
  //初始化用户的基本信息
  function initUserInfo() {
      $.ajax({
          method:'GET',
          url:'/my/userinfo',
          success:function (res) {
              if (res.status !==0) {
                  return layer.msg('获取用户信息失败')
                }

                form.val('formUserInfo',res.data)
          }
      })
  }
})