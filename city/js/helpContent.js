$(function () {
    /*帮助中心 sidebar*/
    $("#firstpane p.menu_head").click(function(){
        if($(this).css("backgroundImage").indexOf("up_ico.png") != -1){
            $(this).css({backgroundImage:"url(images/down_ico.png)"}).next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
        }else {
            $(this).css({backgroundImage:"url(images/up_ico.png)"}).next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
        }
    });
});
