$(function () {
    function getSearch() {
        var arr = JSON.parse(localStorage.getItem("lt_search_history")) || [];
        return arr;
    }

    function rander() {
        arr = getSearch();
        $(".lt_history").html(template("tmp", {"list": arr}));
    }
    var arr = getSearch();
    rander();

    $(".lt_search button").on("click", function () {
        arr = getSearch();
        var value = $(this).siblings().val();
        var index = arr.indexOf(value);
        if (index != -1) {
            arr.splice(index, 1);
        }
        if (arr.length >= 10) {
            arr.pop();
        }
        arr.unshift(value);
        localStorage.setItem("lt_search_history", JSON.stringify(arr));
        location.href ="searchList.html?key="+value;
        rander();
        $(this).siblings().val("");
    });


    $(".lt_history").on("click", ".btn_empty", function () {
        mui.confirm("你是否要清空所有的历史记录", "温馨提示", ["否", "是"], function (e) {
            if (e.index == 1) {
                localStorage.removeItem("lt_search_history");
                rander();
            }
        })
    })
    $(".lt_history").on("click",".btn_delete",function(){
        var i=$(this).parent().data("index")
        arr = getSearch();
        arr.splice(i,1)
        localStorage.setItem("lt_search_history", JSON.stringify(arr));
        rander();
    })

})