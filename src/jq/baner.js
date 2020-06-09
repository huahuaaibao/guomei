!function ($) {
    const $banxin = $(".bo")
    const $bannerul = $(".banerxiao");
    const $bannerli = $bannerul.children().children("a");
    const $dianul = $(".dian1");
    const $dianli = $(".dian1 li")
    const $left = $(".jiantou1");
    const $right = $(".jiantou2");
    let $index = 0;
    let $timer = null;


    // 克隆第一个图片放在最后的位子，以便循环播放使没有卡顿
    let $clonebox = $bannerli.first().clone(true.true);


    // 获取一个li的宽度，然后设置ul的宽度
    let $liwidth = $bannerli.eq(0).width();
    $bannerul.append($clonebox).css({
        width: $bannerul.children().length * $liwidth
    });

    // 给小圆点添加鼠标悬浮事件
    $dianli.hover(function () {
        $index = $(this).index() - 1;
        lunbo()
    })


    // 给轮播图区域添加鼠标悬浮事件
    $banxin.hover(function () {
        clearInterval($timer);
    }, function () {
        $timer = setInterval(() => {
            lunbo();
        }, 2000)
    })

    // 给箭头添加点击事件
    $left.on("click", function () {
        $index -= 2
        lunbo()
    })
    $right.on("click", function () {
        lunbo()
    })

    function lunbo() {
        $index++;
        if ($index === $dianli.length + 1) {
            $bannerul.css({
                left: 200
            });
            $index = 1;
        }

        if ($index === -1) {
            $bannerul.css({
                left: -$dianli.length * $liwidth - 200
            });
            $index = $dianli.length - 1;
        }

        if ($index === $dianli.length) {
            $dianli.eq(0).addClass('dian').siblings('.dian1 li').removeClass('dian')
        } else {
            $dianli.eq($index).addClass('dian').siblings('.dian1 li').removeClass('dian');
        }
        $bannerul.stop(true).animate({
            left: -$liwidth * $index
        });
    }
    $timer = setInterval(() => {
        lunbo();
    }, 2000)







}(jQuery)