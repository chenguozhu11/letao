$(function () {
    var value = +location.search.split("=")[1];
    $(".lt_search input").val(value);
    var page = 1;
    var pageSize = 4;

    function rander(FUNC) {
        var obj = {};
        obj.proName = value;
        obj.page = page;
        obj.pageSize = pageSize;
        if ($(".lt_sereen li[data-type]").hasClass("now")) {
            var key = $(".lt_sereen li[class='now']").data("type");
            var priceNum = +$(".lt_sereen li[class='now'] span").hasClass("fa-angle-down") ? 2 : 1
            obj[key] = priceNum;
        } else {

        }
        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: obj,
            success: function (info) {
                FUNC(info);
            }
        })
    }
    $(".lt_search button").on("tap", function () {
        value = $(this).siblings().val().trim();
        $(".lt_sereen li[data-type]").removeClass("now");
        $(".lt_sereen li").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
        if (value != "") {
            mui('#refreshContainer').pullRefresh().pulldownLoading();
            var arr = JSON.parse(localStorage.getItem("lt_search_history")) || [];
            var index = arr.indexOf(value);
            if (index != -1) {
                arr.splice(index, 1);
            }
            if (arr.length >= 10) {
                arr.pop();
            }
            arr.unshift(value);
            localStorage.setItem("lt_search_history", JSON.stringify(arr));
        } else {
            mui.toast('关键字不能为空！', {
                duration: '1000',
                type: 'div'
            })
        }
    });
    $(".lt_sereen li[data-type]").on("tap", function () {
        if ($(this).hasClass("now")) {
            $(this).find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        } else {
            $(this).addClass("now").siblings().removeClass("now");
            $(".lt_sereen li").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        mui('#refreshContainer').pullRefresh().pulldownLoading();
    });

    mui.init({
        pullRefresh: {
            container: "#refreshContainer",
            down: {
                auto: true,
                callback: function () {
                    // if ($(".lt_sereen li[data-type]").hasClass("now")) {
                    //     $(".lt_sereen li[data-type]").removeClass("now");
                    //     $(".lt_sereen li").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
                    // }
                    page = 1;
                    rander(function (info) {
                        setTimeout(function () {
                            $(".lt_product").html(template("tmp", {
                                "list": info.data
                            }));
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        }, 1000);
                    });
                    mui('#refreshContainer').pullRefresh().refresh(true);
                }
            },
            up: {
                callback: function () {
                    page++;
                    rander(function (info) {
                        if (info.data.length <= 0) {
                            mui('#refreshContainer').pullRefresh().disablePullupToRefresh();
                        } else {
                            setTimeout(function () {
                                $(".lt_product").append(template("tmp", {
                                    "list": info.data
                                }));
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                            }, 500);
                        }
                    })
                }
            }
        }
    });

})