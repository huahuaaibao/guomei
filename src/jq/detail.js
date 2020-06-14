!function ($) {
    // 渲染小图列表
    const $spic = $('.fdj_ximg img')
    const $bpic = $('.fdj_box img')
    const $title = $('.fdj_title h1')
    const $price = $('.price')

    // 获取点击后地址栏中？后的sid
    let $sid = location.search.substring(1).split('=')[1];


    // 获取传递sid，然后渲染页面中的小小图
    // 如果不存在sid，那么默认sid=1
    if (!$sid) {
        $sid = 2;
    }

    // 将协议的sid传给后端
    $.ajax({
        url: 'http://localhost/guomei/dist/php/getsid.php',
        data: {
            sid: $sid
        },
        dataType: 'json'
    }).done(function (d) {
        // console.log(d);
        $spic.attr('src', d.url);
        $spic.attr('sid', d.sid);//给图片添加唯一的sid
        $bpic.attr('src', d.url);
        $title.html(d.title);
        $price.html(d.price);
        $('#pincnt').html(d.sailnumber);
        let picarr = d.piclisturl.split(',');
        let $strhtml = '';
        $.each(picarr, function (index, value) {
            $strhtml += '<li><img src="' + value + '"/></li>';
        });
        $('.fdj_xul ul').html($strhtml);
    });

    // 开始放大镜效果
    const $sf = $('.fdj_zoom');
    const $sbox = $('.fdj_ximg');
    const $bbox = $('.fdj_box');

    // 定义一个比例,然后设定大图的宽高
    let $bili = ($bpic.width() / $bbox.width());//比例要大于一
    $sf.width($sbox.width() / $bili);
    $sf.height($sbox.height() / $bili);
    let $bili1 = $bpic.width() / $spic.width()

    // 设置鼠标悬浮事件
    $sbox.hover(function () {
        $bbox.show();
        $sf.show();

        $(this).on('mousemove', function (ev) {
            // 设定固定的left和top值
            let $left = ev.pageX - $sbox.offset().left - 100;
            let $top = ev.pageY - $sbox.offset().top - 100;
            // 设定鼠标左边和上边的最大最小值
            if ($left < 0) {
                $left = 0;
            } else if ($left >= $sbox.width() - $sf.width()) {
                $left = $sbox.width() - $sf.width()
            }
            if ($top < 0) {
                $top = 0;
            } else if ($top >= $sbox.height() - $sf.height()) {
                $top = $sbox.height() - $sf.height()
            }

            // 定好之后将值赋给放大镜和大图
            $sf.css({
                top: $top,
                left: $left,
            });
            $bpic.css({
                top: -$top * $bili1,
                left: -$left * $bili1
            })


            // mousemove结束大括号
        });

    }, function () {
        $bbox.hide();
        $sf.hide();
    })

    // 开始小图列表的左右箭头点击事件和小图点击事件。因为小图是渲染的，所以需要事件委托
    const $leftli = $('.fdj_btnl');
    const $rightli = $('.fdj_btnr');
    const $picul = $('.fdj_picul ul');

    $picul.on('mouseover', 'li', function () {
        // 获取被点击的li元素的src属性
        let $imgurl = $(this).find('img').attr('src');
        $spic.attr('src', $imgurl);
        $bpic.attr('src', $imgurl);
        $(this).addClass('border').siblings('li').removeClass('border');
    })
    $picul.on('mouseout', 'li', function () {
        $(this).removeClass('border')
    })

    // 先定义一个初始值
    let $num = 1;
    $rightli.on('click', function () {
        // ul的子元素的li需要在这里获取，因为是渲染到的，在外部是获取不到的
        let $zspicli = $picul.children('li');
        // console.log($zspicli);
        if ($zspicli.size() > $num) {
            $num++;
            // console.log($num);
            $leftli.show();
            if (Math.ceil($zspicli.size() / 5) == $num) {
                // console.log($num);
                $rightli.hide();
            }
            $picul.animate({
                left: -($num - 1) * 5 * 65
            })
        }
    })
    $leftli.on('click', function () {
        // ul的子元素的li需要在这里获取，因为是渲染到的，在外部是获取不到的
        let $zspicli = $picul.children('li');
        if ($num > 1) {
            $num--;
            $rightli.show();
            // console.log($num);
            if ($num <= 1) {
                // console.log($num);
                $leftli.hide();
            }
            $picul.animate({
                left: -($num - 1) * 5 * 65
            })
        }
    })

    // 开始加入购物车

    // 先定义两个数组用来存储商品的sid和加入购物车的数量
    let arrsid = [];
    let arrnum = [];

    // 然后要根据sid储值来判断是否是第一次加入购物车
    // 如果第一次，那么需要在购物车页面添加一个商品数据和数量，如果第二次，那就只需要在原来基础上添加数量

    // /先封装一个是否存在的cookie函数
    function ifcookie() {
        if ($.cookie('cookienum') && $.cookie('cookiesid')) {
            arrnum = $.cookie('cookienum').split(',')
            arrsid = $.cookie('cookiesid').split(',')
        } else {
            arrnum = []
            arrsid = []
        }
    }

    // 给按钮一个点击事件，将cookie值放入
    $('.join').on('click', function () {
        // 获取cookie的sid值之前，要先获取图片的sid值
        // let $sum = $(this).parents('.fdj_r').siblings('.fdj_l').find('.fdj_ximg img').attr('sid')
        // console.log($(this).parents('.fdj_r').siblings('.fdj_l').find('.fdj_ximg img').attr('sid'));

        let $sid = location.search.substring(1).split('=')[1];
        console.log($sid);
        // 取得sid之后，将sid传给cookie
        ifcookie();
        console.log($('.fdj_cat input'));

        // isarray用来判断元素是否存在于数组中，如果不存在则返回-1
        // 如果数组中存在sid，说明不是第一次点击，那么就转化数组，将input值与sid对应的num值相加
        if ($.inArray($sid, arrsid) != -1) {
            let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('.fdj_cat input').val())
            console.log($num);
            arrnum[$.inArray($sid, arrsid)] = $num
            $.cookie('cookienum', arrnum, { expries: 10, path: '/' })

        } else {
            arrsid.push($sid);
            arrnum.push($('.fdj_cat input').val())
            $.cookie('cookienum', arrnum, { expries: 10, path: '/' })
            $.cookie('cookiesid', arrsid, { expries: 10, path: '/' })
        }
        alert('加入成功')
    })






}(jQuery)