!function ($) {
    const $r = $(".rob .r");
    const $span = $r.children('span');
    const $timer = $(".fdj .fdj_timer");
    const $span1 = $timer.children("span");
    setInterval(() => {
        //未来时间
        let weilai = new Date(2030, 0, 17, 18, 0, 0);
        //当前时间
        let day1 = Date.now();
        var time = weilai - day1;
        // 需要倒计时的时间 毫秒
        var s = time / 1000;
        // 将毫秒转换成秒
        var day = Math.floor(s / (60 * 60 * 24));
        // 将秒换算成天
        var hour = Math.floor(s % 86400 / 3600);
        // 计算剩余小时
        var min = Math.floor(s % 3600 / 60);
        // 计算分钟
        var sec = Math.floor(s % 60);
        // 获得秒
        $span.eq(0).html(hour);
        $span.eq(1).html(min);
        $span.eq(2).html(sec);
        $span1.eq(0).html(hour);
        $span1.eq(1).html(min);
        $span1.eq(2).html(sec);
    }, 1000)
}(jQuery)