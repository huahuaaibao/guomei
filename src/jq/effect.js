!function ($) {
    // 获取顶部悬浮的html标签
    const $stick = $('.stick');

    // 顶部悬浮的效果
    $(window).on("scroll", function () {
        let $a = $(window).scrollTop();
        if ($a >= 650) {
            $stick.show();
        } else {
            $stick.hide()
        }
    })


}(jQuery)
