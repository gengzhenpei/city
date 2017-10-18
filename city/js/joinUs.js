(function (window, $) {
    /**
     * 页面上来加载列表
     */
    loadingList();

    /*职位详情*/
    $("#main_join").on('click', '.more', function () {
        if ($(this).text() == "详情") {
            $(this).text("收起");
            $(this).parent().siblings(".zhiwei").css({
                "fontSize": "18px",
                "color": "#c7181e"
            });
            $(this).parent().parent().next().slideDown(300);
        } else if ($(this).text() == "收起") {
            $(this).text("详情");
            $(this).parent().siblings(".zhiwei").css({
                "fontSize": "15px",
                "color": "#000"
            });
            $(this).parent().parent().next().slideUp(300);
        }
    });

    /**
     * 搜索职位
     */
    $("#job_search").on("click", function () {
        var jobTxt = $("#job_txt").val();//职位名称
        if (!jobTxt) {
            alert("请输入职位名称");
            return false;
        }
        loadingList();
    });

    /**
     * 批量删除招聘信息
     * @zhiweiID 职位ID
     */
    $(".del_info").on('click', function () {
        var zhiWeiArr = $('.zhiwei > input[type=checkbox]:checked');
        if (zhiWeiArr.length == 0) {
            alert("请选择要删除的职位");
            return false;
        }
        var zhiWeiIdArr = [];
        zhiWeiArr.each(function (i, e) {
            zhiWeiIdArr.push($(e).attr("zhiweiid"));
        });
        var zhiWeiIdStr = zhiWeiIdArr.join(",");
        $.ajax({
            type: "post",
            url: "xxxx",
            data: {"zhiWeiId": zhiWeiIdStr},
            dataType: "json",
            success: function (res) {
                if (res[0].ret == 0) {
                    alert(res[0].message);
                    location.href = location.href;
                } else {
                    alert(res[0].message);
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    });

    /**
     * 列表页加载更多
     */
    var pageIndex = 1;
    $(".load_more_join").on("click",function () {
        pageIndex++;
        var workAllNum = 0;
        $.ajax({
            type: 'POST',
            url: 'xxxx',
            success: function(res){
                workAllNum=parseInt(res.data.total);
//            console.log(workAllNum);
//            if(res.code == 200){
//                alert(res.msg);
//            }
            },
            error:function(e){
                console.log(e);
            }
        });
        var yeshu = Math.ceil(workAllNum/10);//页数
        if(pageIndex >= yeshu){
            alert("无更多数据");
            return false;
        }
        loadingList(pageIndex);
    });

})(window, $);
/**
 * 根据指定条件加载列表页
 * @pageIndex 当前页码
 * @pageNumber 每页显示条数
 * @jobArea 职位地区
 * @jobName 职位名称
 */
function loadingList(pageIndex) {
    if (pageIndex == "" || pageIndex == null || pageIndex == undefined) {
        pageIndex = 1;
    }
    var pageNumber = 10;
    var jobArea = $("#query_area > option:selected").val();//职位地区
    var jobName = $("#job_txt").val();//职位名称
    $.ajax({
        type: "post",
        url: "demo.json",
        data: {
            "pageIndex": pageIndex,
            "pageSize": pageNumber,
            "jobArea": jobArea,
            "jobName": jobName
        },
        dataType: "json",
        success: function (res) {
            if (res[0].ret == 0) {
                var list = res[0].content;
                for (var i = 0; i < list.length; i++) {
                    var str = "<div class='box_menu'>";
                    str += "<div class='menu_head'>";
                    str += "<div class='zhiwei fl'>";
                    str += "<input type='checkbox' zhiweiid=" + list.id + ">" + list.zhiwei;
                    str += "</div>";
                    str += "<div class='bumen fl'>" + list.bumen + "</div>";
                    str += "<div class='didian fl'>" + list.didian + "</div>";
                    str += "<div class='renshu fl'>" + list.renshu + "</div>";
                    str += "<div class='shijian fl'>" + list.shijian + "</div>";
                    str += "<div class='edit fl'>";
                    str += "<button class='more'>详情</button>";
                    if (list.zhaopin == "招聘结束") {
                        str += "<button class='static over'>招聘结束</button>";
                    } else {
                        str += "<button class='static'>招聘中</button>";
                    }
                    str += "</div>";
                    str += "<div class='clearfix'></div>";
                    str += "</div>";
                    str += "<div class='menu_body'>";
                    str += "<div class='zhiwei_more fl'>";
                    str += "<h3>职位描述：</h3>";
                    str += "<p>" + list.zhiweimiaoshu + "</p>";
                    str += "</div>";
                    str += "<div class='zhiwei_more fl'>";
                    str += "<h3>职位要求：</h3>";
                    str += "<p>" + list.zhiweiyaoqiu + "</p>";
                    str += "</div> ";
                    str += "<div class='clearfix'></div>";
                    str += "</div> ";
                    str += "</div> ";
                    $(".box_menu_all").append(str);
                }
            } else {
                alert(res[0].message);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}
