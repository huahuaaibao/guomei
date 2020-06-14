!function ($) {
    $('.btnnuw').on('click', function () {
        $.ajax({
            type: 'post',
            url: 'http://localhost/guomei/dist/php/login.php',
            data: {
                user: $('.username').val(),
                pass: hex_sha1($('.password').val())
            }
        }).done(function (result) {
            if (result) {
                location.href = "../html/index.html";
                localStorage.setItem('username', $('.username').val());
            } else {
                $('.password').val('');
                alert('用户名或者密码错误');
            }
        });
    });

}(jQuery);