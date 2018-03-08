$(function () {
    var value = +location.search.split("=")[1];
    $(".lt_search input").val(value);

    function rander() {
        $(".lt_product").html('<div class="lt_box"></div>')
        var obj = {};
        obj.proName = value;
        obj.page = 1;
        obj.pageSize = 50;
        if ($(".lt_sereen li[data-type]").hasClass("now")) {
            var key = $(".lt_sereen li[class='now']").data("type");
            var priceNum = +$(".lt_sereen li[class='now'] span").hasClass("fa-angle-down") ? 2 : 1
            obj[key]=priceNum;
        }
        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: obj,
            success: function (info) {
                setTimeout(function () {
                $(".lt_product").html(template("tmp", {
                    "list": info.data
                }));
                }, 1000)
            }
        })
    }
    rander();
    $(".lt_search button").on("click", function () {
        value = $(this).siblings().val().trim();
        $(".lt_sereen li[data-type]").removeClass("now")
        if (value != "") {
            rander();
        } else {
            mui.toast('关键字不能为空！', {
                duration: '1000',
                type: 'div'
            })
        }
    });
    $(".lt_sereen li[data-type]").on("click", function () {
        if ($(this).hasClass("now")){
            $(this).find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }else{
            $(this).addClass("now").siblings().removeClass("now");
            $(".lt_sereen li").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        rander();
    })
})