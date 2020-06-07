!function ($) {
    const $tabli = $(".tab li")
    const $neirong = $(".neirong")
    const $tab = $(".tab")
    const $one = $(".one")
    const $baner = $(".baner")

    //设置鼠标移入动画
    $tabli.on('mouseover', function () {
        $(this).addClass('active').siblings('.tab li').removeClass('active');

        //if语句判断滚轮是否超过内容板块的高度，再设置内容板块的高度
        if ($(window).scrollTop() > $baner.offset().top) {
            $neirong.css({
                top: $(window).scrollTop() - $baner.offset().top
            })
        } else {
            $neirong.css({
                top: 0
            })
        }

        //选择鼠标移入后的索引，然后找到相应索引的‘one’，给他添加类名，其他的tab：li去除类名
        $one.eq($(this).index()).show().siblings('.one').hide();

        $neirong.show()

        //结束大括号
    })



    // tab鼠标移除后的操作
    $tabli.on('mouseout', function () {
        $neirong.hide()
        $tabli.removeClass('active')
    })

    //设置鼠标移入内容板块后内容板块的显示隐藏
    $neirong.on('mouseover', function () {
        $neirong.show();
    })

    $neirong.on('mouseout', function () {
        $neirong.hide();
    })


}(jQuery)