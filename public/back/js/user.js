$(function () {
    function rander() {
        var currentPage = 1;
        var pageSize = 5;
        console.log(currentPage);
        
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
            }
        })
    }
})