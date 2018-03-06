$(function () {
    var page = 1;
    var pageSize = 5;
    var flag = true;
    var arr = [];

    function rander() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                "page": page,
                "pageSize": pageSize
            },
            success: function (info) {
                $("tbody").html(template("tmp", info));
                var totalPages = Math.ceil(info.total / info.size);
                if (flag) {
                    fllag = false;
                    $("#pagintor").bootstrapPaginator({
                        bootstrapMajorVersion: 3,
                        currentPage: page,
                        totalPages: totalPages,
                        size: "small", //设置控件的大小，mini, small, normal,large
                        onPageClicked: function (event, originalEvent, type, p) {
                            page = p;
                            rander();
                        }
                    });
                }
            }
        })
    }
    rander();

    $(".commodityAdd").on("click", function () {
        $('#commodityAdd').modal("show");
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                "page": 1,
                "pageSize": 10
            },
            success: function (info) {
                $(".dropdown-menu").html(template("tpl", info));
            }
        })
    });
    $(".dropdown-menu").on("click", "a", function () {
        $(".dropdown_text").text($(this).text())
        $("[name=brandId]").val($(this).parent().data("id"));
        $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
    })

    var $form = $("form");
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [],
        fields: {

            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的库存"
                    },
                    //正则校验
                    regexp: {
                        //不能是0开头，必须是数字
                        regexp: /^[1-9]\d*$/,
                        message: "请输入合法的库存"
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的尺码"
                    },
                    //正则校验
                    regexp: {
                        //不能是0开头，必须是数字
                        regexp: /^\d{2}-\d{2}$/,
                        message: "请输入合法的尺码,例如(32-46)"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的价格"
                    }
                }
            },
            productLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            }

        }
    })

    $("form").on("success.form.bv", function (e) {
        e.preventDefault();
        var data = $form.serialize();
        for (var i = 0; i < arr.length; i++) {
            data += "&picName1=" + arr[i].picName + "&picAddr1=" + arr[i].picAddr;
        }
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: data,
            success: function (info) {
                if (info.success) {
                    page = 1
                    rander()
                    $('#commodityAdd').modal("hide");
                    $("form").data("bootstrapValidator").resetForm(true);
                    $(".dropdown_text").text("请选择二级分类")
                    $("[name=brandId]").val("");
                    $(".img_box img ").remove();
                }
            }
        })
    })
    $("#fileupload").fileupload({
        dataType: 'json',
        done: function (e, data) {
            arr.push(data.result);
            $(".img_box").append(" <img src = '../../upload/product/" + data.result.picName + "'width = '100' height = '100' > ");
            if ($(".img_box img ").length == 3) {
                $form.data("bootstrapValidator").updateStatus("productLogo", "VALID");
            }
        }
    });

})