(function ($) {
    const $xiangzuo = $(".xiangzuo");
    const $xiangyou = $(".xiangyou");
    const $uldiv = $(".ul");
    const $ul1 = $(".ul1");
    const $ul2 = $(".ul2");
    const $div = $(".rob .left");


    // 设置鼠标移入移出左侧盒子时中的显示隐藏
    $div.on('mouseover', function () {
        $xiangyou.show()
        $xiangzuo.show()
    })
    $div.on('mouseout', function () {
        $xiangyou.hide()
        $xiangzuo.hide()
    })

    // 设置鼠标点击左右箭头时，装ul的div的left值改变
    $xiangzuo.on('click', function () {
        if ($uldiv.css("left") == '0px') {
            $uldiv.css({
                left: -950,
            })
        } else {
            $uldiv.css({
                left: 0,
            })
        }
    })
    $xiangyou.on('click', function () {
        if ($uldiv.css("left") == '0px') {
            $uldiv.css({
                left: -950,
            })
        } else {
            $uldiv.css({
                left: 0,
            })
        }
    })

    // 设置鼠标在箭头上悬浮时，改变箭头的背景颜色
    $xiangzuo.on('mouseover', function () {
        $xiangzuo.css({
            backgroundColor: "#999999",
        })
    })
    $xiangzuo.on('mouseout', function () {
        $xiangzuo.css({
            backgroundColor: "#E6E6E6"
        })
    })
    $xiangyou.on('mouseover', function () {
        $xiangyou.css({
            backgroundColor: "#999999",
        })
    })
    $xiangyou.on('mouseout', function () {
        $xiangyou.css({
            backgroundColor: "#E6E6E6"
        })
    })


}(jQuery))