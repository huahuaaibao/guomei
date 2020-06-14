!function ($) {
    // const $ul = $('.info ul').not('.info ul:nth-child(1)')
    function addli(sid, num) {
        $.ajax({
            url: 'http://localhost/guomei/dist/php/alldata.php',
            dataType: 'json'
        }).done(function (data) {
            $.each(data, function (index, value) {
                if (value.sid == sid) {
                    //在克隆的时候要注意，要只选择隐藏的那一个克隆，不可以只写ul，否则会在克隆时将所有ul克隆一遍，添加数据就会成倍数增加，另外在选择器中，是可以添加css选择器方法选择的
                    // console.log($('.info ul:nth-child(1)'));
                    let $clonebox = $('.info ul:nth-child(1)').clone(true, true);
                    $clonebox.find('.info_2 img').attr('src', value.url);
                    $clonebox.find('.info_2 img').attr('sid', value.sid);
                    $clonebox.find('.info_3 a').html(value.title);
                    $clonebox.find('.info_5 span').html(value.price);
                    $clonebox.find('.info_6 input').val(num);
                    $clonebox.find('.info_7 strong').html((num * value.price).toFixed(2));
                    $clonebox.css('visibility', 'visible')
                    $('.info').append($clonebox);

                }


            })
        })
        // console.log($('.info ul'));
    }

    // 遍历cookie，获取sid和num，然后传值给渲染数据的函数
    if ($.cookie('cookienum') && $.cookie('cookiesid')) {
        let num = $.cookie('cookienum').split(',');
        let sid = $.cookie('cookiesid').split(',');
        // console.log(sid);
        $.each(sid, function (index, value) {
            // console.log(value);
            addli(value, num[index])
        });
    }

    // 渲染成功后开始小方法

    // 计算总价，后面全选、删除时都会用到，所以封装起来,要注意，并不是封装好之后就可以调用有效果，需要在委托事件中调用，因为ul是渲染出来的，直接找是找不到的
    function total() {
        // 先定义两个数据，一个已选商品，一个单价总计
        let $sum = 0;
        let $totalprice = 0;
        // 遍历ul，然后找到需要的元素，把值给总价
        $('.info ul').not('.info ul:nth-child(1)').each(function (index, ele) {
            if ($(ele).find('.info_1 input').prop('checked')) {
                $sum += parseInt($(ele).find('.info_6 input').val());
                $totalprice += parseFloat($(ele).find('.info_7 strong').html())
            }
            $('.balance_ul2 .selected').html($sum);
            $('.balance_ul2 .total').html($totalprice.toFixed(2));
            // console.log($('.info ul').not('.info ul:nth-child(1)'));
        })
    }

    // 全选,使用事件委托，将ul的事件委托给外层的盒子
    // 首先将全选框的事件写好，让ul的复选框状态跟随全选框的状态，所以用到了prop的第二个参数
    $('.all').on('change', function () {
        $('.info_1 input').prop('checked', $(this).prop('checked'))
        $('.all').prop('checked', $(this).prop('checked'));
        total()
        // 在这里的this是指被点击的全选复选框，所以需要加$（.all)的状态切换
    })

    // 然后将ul复选框的事件委托给外层的父元素
    let $checked = $('.info ul').find(':checkbox')

    // console.log($checked);
    $('.info').on('change', $checked, function () {

        let a = $('.info ul').not('.info ul:nth-child(1)').find(':checkbox')

        let b = 0
        $.each(a, function (index, value) {
            if ($(value).prop('checked')) {
                b++;
            }
        })
        if (b === $('.info ul').length - 1) {
            $('.all').prop('checked', true)
        } else {
            $('.all').prop('checked', false)
        }
        total()


    })

    // 在点击加减按钮时，需要重新计算单价，重新渲染单价，为了方便，将计算过程封装起来，在点击加减按钮时，向函数中传入当前按钮对象
    function unitprice(obj) {
        let $num = parseInt(obj.parents('.info_6').find('input').val())
        // console.log($num);

        let $oneprice = parseFloat(obj.parents('.info_6').siblings('.info_5').find('span').html())
        let a = ($num * $oneprice).toFixed(2)
        obj.parents('.info_6').siblings('.info_7').find('strong').html(a)
        // return ($num * $oneprice).toFixed(2)
    }

    // 减号按钮
    $('.info_6 button:nth-child(1)').on('click', function () {
        // console.log($('.info_6 button:nth-child(1)'));

        let $n = parseInt($(this).parents('.info_6').find('input').val())
        $n--;
        // 这里要注意，必须要把n--放在input框赋值的前面，否则就会出现input框从当前值开始减一的问题，而不是从当前值减一开始
        if ($n < 1) {
            $n = 1
        }
        $(this).parents('.info_6').find('input').val($n);
        unitprice($(this))
        total()
    })
    // 加号按钮
    $('.info_6 .but').on('click', function () {
        let $n = parseInt($(this).parents('.info_6').find('input').val())
        $n++;
        $(this).parents('.info_6').find('input').val($n);
        unitprice($(this))
        total()
    })
    // input输入框
    $('.info_6 input').on('input', function () {
        let $reg = /^[0-9]+$/g;
        let $value = $(this).val()
        if (!$reg.test($value)) {
            $(this).val(1)
            alert('请输入数字')
        }
        total()
        unitprice($(this))
    })


    // 判断cookie是否存在，存在就加上，不存在就定义数组为空
    let arrsid = [];
    let arrnum = [];
    function cookiearr() {
        if ($.cookie('cookienum') && $.cookie('cookiesid')) {
            arrsid = $.cookie('cookiesid').split(',')
            arrnum = $.cookie('cookienum').split(',')
        } else {
            arrnum = []
            arrsid = []
        }
    }

    // 将改变后的sid和num重新存入cookie
    function setcookie(obj) {
        cookiearr();
        let $sid = obj.parents('ul').find('img').attr('sid');
        arrnum[$.inArray($sid, arrsid)] = obj.parents('ul').find('.info_6 input').val();
        adcookie.add('cookienum', arrnum, 10)
    }

    // 删除cookie
    function rmcookie(sid, arrsid) {
        let $index = -1;
        $.each(arrsid, function (index, value) {
            if (sid === value) {
                $index = index;
            }
        })
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);

        $.cookie('cookiesid', arrsid, { expires: 10, path: '/' })
        $.cookie('cookienum', arrnum, { expires: 10, path: '/' })
    }

    // 删除单个商品点击事件

    $('.info_8 a').on('click', function () {
        cookiearr();
        console.log(1);

        if (window.confirm('你确定删除吗？')) {
            $(this).parents('ul').remove();
            rmcookie($(this).parents('ul').find('img').attr('sid'), arrsid);
            total();
        }
    })

    // 删除选中商品点击事件
    $('.balance_ul1 a').on('click', function () {

        // console.log($('.balance_ul1 a'));
        cookiearr()
        if (window.confirm('确定全部删除吗？')) {
            $('.info ul').each(function () {
                if ($(this).find(':checkbox').is(':checked')) {
                    $(this).remove()
                    rmcookie($(this).find('img').attr('sid'), arrsid)
                }
            });
            total();
        }
    })

}(jQuery)