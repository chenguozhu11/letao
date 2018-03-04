$(function(){
    
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        success:function(info){
            if(!info.success){
                location.href="pages/login.html"
            }
        }
    })
    $(".unfold").on("click",function(){
        $(".classes").slideToggle();
    });
    $(".icon_menu").on("click",function(){
        $(".aside").toggleClass("now");
        $(".main").toggleClass("now");
        $(".topbar").toggleClass("now");
    });
    
    $(".icon_back").on("click",function(){
        $('#breakModal').modal("show");
    });
    $(".btn_logout").on("click",function(){
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            success:function(info){
                if(info.success){
                    location.href="pages/login.html";
                }
                
            }
        })
    })
})