$(function () {
    var currentPage = 1;
    var pageSize = 5;
    var flag = true;
    function rander() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                "page": currentPage,
                "pageSize": pageSize
            },
            success: function (info) {
                $("tbody").html(template("tmp", info));
                var totalPages = Math.ceil(info.total / info.size);
                if (flag) {
                    fllag = false;
                    $("#pagintor").bootstrapPaginator({
                        bootstrapMajorVersion: 3,
                        currentPage: currentPage,
                        totalPages: totalPages,
                        size: "small", //设置控件的大小，mini, small, normal,large
                        onPageClicked: function (event, originalEvent, type, page) {
                            currentPage = page;
                            rander();
                        }
                    });
                }
            }
        })
    }
    rander();
    $(".categoryAdd").on("click", function () {
        $('#categoryAdd').modal("show");
        $(".btn_add").off().on("click", function () {
            var categoryName = $("#categoryAdd input").val();
            $.ajax({
                type: "post",
                url: "/category/addTopCategory",
                data: {
                    "categoryName": categoryName
                },
                success:function(info){
                    if (info.success){
                        $('#categoryAdd').modal("hide");
                        $("#categoryAdd input").val("");
                        rander();
                    }
                }
            })
        })
    })
    $("#categoryAdd button").on("click",function(){
        $("#categoryAdd input").val("");
    })
    $("#categoryAdd").on("click",function(){
        $("#categoryAdd input").val("");
    })
})