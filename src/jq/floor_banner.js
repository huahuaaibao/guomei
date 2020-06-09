!function ($) {
    // // 获取楼梯顶部列表元素，然后写鼠标悬浮效果
    const $fl_tab = $('.floor_tab');
    const $fl_one = $fl_tab.eq(0);
    // const $fl_tow = $fl_tab.eq(1);
    // const $fl_three = $fl_tab.eq(2);
    // const $fl_four = $fl_tab.eq(3);
    // const $fl_five = $fl_tab.eq(4);
    // const $fl_six = $fl_tab.eq(5);
    // const $fl_seven = $fl_tab.eq(6);
    const $fl_a = $fl_one.children().children("a");
    // const $fl_b = $fl_tow.children().children("a");
    // const $fl_c = $fl_three.children().children("a");
    // const $fl_d = $fl_four.children().children("a");
    // const $fl_e = $fl_five.children().children("a");
    // const $fl_f = $fl_six.children().children("a");
    // const $fl_g = $fl_seven.children().children("a");

    // // 不可以用以下的方法调用，因为this指向window
    // // $fl_a.on('mouseover', function () {
    // //     console.log($(this));

    // //     hover($fl_a)
    // // })
    // // function hover(q) {
    // //     console.log($(this));

    // //     $(this).addClass('cur1');
    // //     q.not(this).removeClass('cur1')
    // // }

    function hover(q) {
        q.on('mouseover', function () {
            $(this).addClass('cur1');
            q.not(this).removeClass('cur1')
        })
    }
    hover($fl_a)
    // hover($fl_b)
    // hover($fl_c)
    // hover($fl_d)
    // hover($fl_e)
    // hover($fl_f)
    // hover($fl_g)


    // 中间轮播图效果
    const $mc_banner = $('.mc_c');//最外圈盒子
    // 轮播图的两张图
    const $ul = $('.slider');
    const $ulli = $ul.children('li');
    // 轮播图的点
    const $ol = $('.mc_c .nav');
    const $olli = $ol.children('li');
    // 轮播图上的箭头
    const $page = $('.page');
    const $page_l = $page.children('.up');
    const $page_r = $page.children('.down');
    // 轮播图上的小ul
    const $brand = $('.brand');
    const $brand_ul = $brand.children('ul');
    let $index = 0;
    let $timer = null;

    // 轮播图的图标点击事件
    $olli.on('mouseover', function () {
        $index = $(this).index();
        lunbo();
    })

    // 左右箭头事件
    $page_l.on('click', function () {
        $index--
        lunbo();
    }
    )
    $page_r.on('click', function () {
        lunbo()
    })
    // 轮播图鼠标悬浮事件
    $mc_banner.hover(function () {
        clearInterval($timer)
    }, function () {
        $timer = setInterval(() => {
            lunbo()
        }, 2000)
    })

    // 轮播图动画效果
    function lunbo() {
        $index++;
        console.log($index);

        if ($index < 1) {
            $index = $ulli.length - 1
        }


        if ($index > $ulli.length - 1) {
            $index = 0
        }


        $olli.eq($index - 1).addClass('cur');
        $olli.not($olli.eq($index - 1)).removeClass('cur');
        $ulli.eq($index - 1).css({
            opacity: 1
        });
        $ulli.not($ulli.eq($index - 1)).css({
            opacity: 0
        })
        $brand_ul.eq($index - 1).show()
        $brand_ul.not($brand_ul.eq($index - 1)).hide()
    }

    $timer = setInterval(() => {
        lunbo();
    }, 2000);


}(jQuery)

