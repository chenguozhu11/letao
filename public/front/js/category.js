$(function () {
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        success: function (info) {
            $(".nav_left ul").html(template("nav_tmp", info));
        },
        complete: function () {
            $(".nav_left ul li>a").eq(0).addClass("now");
            $(".nav_left ul li a").on("click", function () {
                $(this).addClass("now").parent().siblings().children().removeClass("now");
                var id = $(this).data("id");
                rander(id);
            })
        }
    })

    function rander(id) {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategory",
            data: {
                "id": id || 1
            },
            success: function (info) {
                $(".content_right ul").html(template("content_tmp", info));
            }
        })
    }
    rander();

})