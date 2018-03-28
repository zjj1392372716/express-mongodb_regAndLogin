$(function () {
  $('#login1').on('click', function () {
    location.href = '/login';
  })
  $("#register1").click(function () {
    var username = $("#username").val();
    var password = $("#password").val();
    var password1 = $("#password1").val();
    if (password !== password1) {
      $("#password").css("border", "1px solid red");
      $("#password1").css("border", "1px solid red");
    } else if (password === password1) {
      var data = { "username": username, "password": password };
      $.ajax({
        url: '/register',
        type: 'post',
        data: data,
        success: function (data) {
          console.log(data)
          // if(status == 'success'){ 
          //   location.href = 'login';
          // }
        },
        error: function () {
          // location.href = 'register';
          console.log('err');
        }
      });
    }
  });
})