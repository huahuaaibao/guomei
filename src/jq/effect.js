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


    // 阶梯效果
    const $jieti = $('.jieti');
    const $jietili = $('.jieti li');
    const $floor = $('.floor')

    $jietili.not($jieti.children('.sanjiao')).on('click', function () {
        $(window).off('scroll');
        $(this).children('i').addClass('sanjiao').siblings('i').removeClass('sanjiao');
        let $floortop = $jietili.eq($(this).index()).offset().top;
        $('html,body').animate({
            scrollTop: $floortop
        }, function () {
            $(window).on('scroll', function () {
                scroll();
            });
        });
    });
    function scroll() {
        let $top = $(window).scrollTop();
        $top >= 1200 ? $jieti.show() : $jieti.hide();


        $(window).on('scroll', function () {
            let $top = $(window).scrollTop();
            $top >= 1200 ? $jieti.show() : $jieti.hide();
            $floor.each(function (index, element) {
                $floortop = $(this).offset().top + $(element).height() / 2;
                if ($floortop > $top) {
                    $jietili.children('i').removeClass('.sanjiao')
                    $jietili.children('i').addClass('.sanjiao');
                    return false;
                }
            });

        });

    }
    scroll();


}(jQuery)
