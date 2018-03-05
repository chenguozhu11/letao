$(function () {

    var currentPage = 1;
    var pageSize = 5;
    var flag = true;

    function rander() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                $("table>tbody").html(template("tmp", info));
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
    $("tbody").on("click",".btn",function(){
        var isDelete=$(this).parent().data("isD");
        var id=$(this).parent().data("id");
       
        
    })
})