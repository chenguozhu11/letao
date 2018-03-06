$(function () {
    var currentPage = 1;
    var pageSize = 5;
    var flag = true;

    function rander() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
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
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                "page": 1,
                "pageSize": 10
            },
            success: function (info) {
                $(".dropdown-menu").html(template("tpl", info));
            }
        })
        $(".btn_add").off().on("click", function () {

        })
    })
    $("#form").on("success.form.bv", function (e) {
        e.preventDefault();
        var data = $("form").serialize();
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: data,
            success: function (info) {
                if (info.success) {
                    $("form").data("bootstrapValidator").resetForm(true);
                    page = 1;
                    rander();
                    $('#categoryAdd').modal("hide");
                    $(".dropdown_text").text("请选择一级分类");
                    $(".img_box img").attr("src", "../images/none.png");
                }
            }
        })

    })
    $(".dropdown-menu").on("click", "a", function () {
        $(".dropdown_text").text($(this).text());
        $("input[name=categoryId]").val($(this).parent().data("id"));
        $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID");

    })
    $("#categoryAdd .btn_back").on("click", function () {
        $("input[name=categoryId]").val("");
        $(".dropdown_text").text("请选择一级分类");
    })


    $("#fileupload").fileupload({
        dataType: 'json',
        done: function (e, data) {
            var pic = data.result.picAddr;
            $(".img_box img").attr("src", pic);
            $("[name='brandLogo']").val(pic);

            $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });

    $("form").bootstrapValidator({
        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入品牌的名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传品牌的图片'
                    }
                }
            }
        },
        excluded: []
    });
})