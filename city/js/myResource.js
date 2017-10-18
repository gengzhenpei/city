$(function () {
    //一开始加载列表
    loadList()
    //详情dialog 关闭按钮
    $('.btn-close > button').on('click', function () {
        $('.resource_more_dialog').hide();
    })

});
/**
 *删除资源单
 */
function delResource(resourceId) {
    console.log(resourceId);
    var M= {};
    if (M.dialog3) {
        return M.dialog3.show();
    }
    M.dialog3 = jqueryAlert({
        'style': 'pc',
        'width': '410',
        'height': "175",
        'content': '<div class="ico_alert fl"><img src="images/alert-!.png"></div>' +
        '<div class="content_alert fl">' +
        '<div class="title_alert">删除资源单？</div>' +
        '</div>' +
        '<div class="clearfix"></div>',
        'modal': true,
        'buttons': {
            '确定': function () {
                $.ajax({
                    type: "post",
                    url: "xxxx.json",
                    dataType: "json",
                    data:{
                        "resourceId":resourceId
                    },
                    success:function (res) {
                        if(res[0].ret == 0){
                            alert(res[0].message);
                            location.href=location.href;
                            M.dialog3.close();
                        }
                    },
                    error:function (e) {
                        console.log(e);
                    }
                });
            },
            '取消': function () {
                M.dialog3.close();
            }
        }
    });
    var buttonsLength = $('.alert-btn-p').length;
    if (buttonsLength == 1) {
        $('.alert-btn-p').css({
            "color": "#6e6e6e",
            "border": "solid 1px #ddd",
            "background": "#eee"
        })
        $('.alert-btn-box').css({
            "paddingLeft": "120px"
        })
    }
}
/**
 *显示资源单
 */
function showPage(resourceId) {
    $.ajax({
        type: "post",
        url: "test.json",
        dataType: "json",
        data:{
            "resourceId":resourceId
        },
        success:function (res) {
            if(res[0].ret == 0){
                var data = res[0].content[0];
                console.log(data);
                $("#resourceName").html(data.companyName);
                $("#companyName").html(data.companyName);
                $("#localCity").html(data.localCity);
                $("#todayPrice").html(data.todayPrice);
                $("#produceDes").html(data.produceDes);
                $("#topCategoryId").html(data.topCategoryId);
                $("#categoryFactory").html(data.mainKind+"-"+data.mainManufacturer);
                $('.resource_more_dialog').show();
            }
        },
        error:function (e) {
            console.log(e);
        }
    });

}
/**
 * 一开始加载资源列表
 */
function loadList() {
    $.ajax({
        type: "post",
        url: "test.json",
        dataType: "json",
        success:function (res) {
            // console.log(res);
            if(res[0].ret == 0){
                var dataGroup = res[0].content;
                // console.log(dataGroup);
                for(var i=0; i<dataGroup.length; i++){
                    var str = "<tr>" +
                        "<td>"+dataGroup[i].resourceName+"</td>" +
                        "<td>"+dataGroup[i].updataTime+"</td>" +
                        "<td>" +
                            "<a class='more_resource' href='javascript:void(0);' onclick='showPage(\""+dataGroup[i].resourceId+"\")'>查看</a> " +
                            "<a class='delete_resource' href='javascript:void(0);' onclick='delResource(\""+dataGroup[i].resourceId+"\")'>删除</a> " +
                        "</td>"
                        "</tr>";
                    $(".table_resource > tbody").append(str);
                }
            }
        },
        error:function (e) {
            console.log(e);
        }
    });
}