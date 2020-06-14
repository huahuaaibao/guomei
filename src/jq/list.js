!function ($) {
    // 定义懒加载所需的数据
    let array_default = [];
    let array = [];
    let prev = null;
    let next = null;

    // 默认渲染第一页
    // 获取页面中的列表元素
    const $ul = $('.listul ul');

    // 用JQ ajax来实现前后端数据交互
    $.ajax({
        url: 'http://localhost/guomei/src/php/listdata.php',
        dataType: 'json',
    }).done(function (data) {
        // 先定义一个空字符串
        let $strhtml = '';

        // 遍历data数据，然后将字符串放入页面
        $.each(data, function (index, value) {
            $strhtml += `
            <li>
            <a href="detail.html?sid=${value.sid}" target="_blank">
                <div>
                    <img class="lazy" data-original="${value.url}" width="210" height="210" alt="#">
                </div>
                <h3>${value.sid}${value.title}</h3>
                <h4>联想YOGA S740超轻薄本</h4>
                <span class="price">${value.price}</span>
            </a>
        </li>
            `;
        });
        $ul.html($strhtml);

        // 开始懒加载
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        })
        // 获取排序前的li数组和排序中的数组
        array_default = [];
        array = [];
        prev = null;
        next = null;
        // 函数编写，不需要过度解读，会套用即可
        $($ul.children('li')).each(function (index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    })

    // 开始分页
    // 首先要知道用户当前请求的是第几页的数据，然后将当前的页码传给后端（get和page）
    $('.page').pagination({
        pageCount: 6,
        jump: true,
        coping: true,
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function (api) {
            // console.log(api.getCurrent()); //获取当前点击的页码
            $.ajax({
                url: 'http://localhost/guomei/src/php/listdata.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function (data) {
                let $strhtml = '';
                $.each(data, function (index, value) {
                    $strhtml += `
                    <li>
                    <a href="detail.html?sid=${value.sid}">
                        <div>
                            <img src="${value.url}" alt="#">
                        </div>
                        <h3>${value.sid}${value.title}</h3>
                        <h4>联想YOGA S740超轻薄本</h4>
                        <span class="price">${value.price}</span>
                    </a>
                </li>
                    `;
                })

                $ul.html($strhtml);

                //重新赋值
                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                prev = null;
                next = null;
                //将页面的li元素加载到两个数组中
                $($ul.children('li')).each(function (index, element) {
                    array[index] = $(this); //排序的
                    array_default[index] = $(this); //重置的
                });


            });
        }
    })

    //开始排序
    // 默认排序（重置）
    $('.paixu li').eq(0).on('click', function () {
        $.each(array_default, function (index, value) {
            $ul.append(value);
        })
        return;
    });
    // 升序排序
    $('.paixu li').eq(1).on('click', function () {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {

                prev = parseFloat(array[j].find('.price').html().toString());
                next = parseFloat(array[j + 1].find('.price').html().toString());

                if (next < prev) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        $.each(array, function (index, value) {
            // console.log(value); //n.fn.init [li, context: li]
            $ul.append(value);
        });
    });

    // 价格降序
    $('.paixu li').eq(2).on('click', function () {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {

                prev = parseFloat(array[j].find('.price').html().toString());
                // alert(prev = parseFloat(array[j].find('.price').html().toString()))

                next = parseFloat(array[j + 1].find('.price').html().toString());

                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //清空原来的列表，将排序后的数据添加上去。
        //empty() : 删除匹配的元素集合中所有的子节点。
        // $($ul).empty();//清空原来的列表
        $.each(array, function (index, value) {
            $ul.append(value);
        })

    });






}(jQuery)