$(function () {
    var id = +location.search.split("=")[1];
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            "id": id
        },
        success: function (info) {
            $(".lt_content").html(template("tmp", info));
            mui(".mui-numbox").numbox();
            $(".lt_size span").on("click", function () {
                $(this).addClass("now").siblings().removeClass("now");
            });
            $(".btn_add_cart").on("click", function () {

                if (!$(".lt_size span").hasClass("now")) {
                    mui.toast('请选择尺码', {
                        duration: '1000',
                        type: 'div'
                    })
                } else {
                    var size = +$(".lt_size span.now").text();
                    var num = +$(".mui-numbox-input").val();
                    $.ajax({
                        type: "post",
                        url: "/cart/addCart",
                        data: {
                            "productId": id,
                            "num": num,
                            "size": size
                        },
                        success: function (info) {
                            if (info.error) {
                                location.href = "login.html";
                            }
                            if(info.success){
                                location.href = "cart.html";
                            }
                        }
                    })
                }
            })
        }
    });
})