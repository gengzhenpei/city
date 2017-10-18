(function (window, $) {
    $("#login").on("click", function () {
        var userName = $(".input1 > input").val();
        var passWord = $(".input2 > input").val();
        $.ajax({
            url: 'http://192.168.0.234:8080/mofang/login/check',
            type: 'post',
            dataType: 'json',
            data:{
                "userName":userName,
                "password":passWord
            },
            success: function (res) {
                // console.log(res);
                if(res[0].ret == 0){
                    if ($("#next_login").prop("checked")) {
                        $.cookie("username", userName, {expires: 7});//存储一个带7天期限的cookie
                        $.cookie("password", passWord, {expires: 7});
                        $.cookie("userId", res[0].content, {expires: 7});
                    }
                    else {
                        $.cookie("username", "", {expires: -1});
                        $.cookie("password", "", {expires: -1});
                        $.cookie("userId", res[0].content, {expires: -1});
                    }
                    location.href="/web/join_us.html";//乙方后期自己改成要跳转的 资源页
                }else {
                    alert(res[0].message);
                }
                // location.href = "http://www.baidu.com";
            },
            error: function (e) {
                console.log(e);
                // location.href = location.href;
            }
        });
    });
})(window, $);