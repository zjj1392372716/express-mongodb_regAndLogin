$(function () {
  $('#register0').on('click', function () {
    location.href = '/register';
  })
  $('#login0').on('click', function () {
    var username = $('#username').val();
    var password = $('#password').val();
    var data = {
      username: username,
      password: password
    };
    $.ajax({
      url: '/login',
      type: 'post',
      data: data,
      success: function (res,status) {
        if(status == 'success') {
          location.href = '/home'; 
        }
      },
      error: function () {
        console.log('error')
      }
    })
  })
});