/**
 * 一开始加载全部列表页
 */
(function (window,$) {
    ajaxAddGroupName();//页面加载组信息
    getMyFollowerListByCondition();//列表页信息
    myfollow_new();//新增分组
    myfollow_cancelfollow();//取消多个关注
})(window,$);


/**
 * 新增分组
 */
function myfollow_new(){
    var M = {};
    $(document).delegate('.myfollow_new','click',function(){
        if(M.dialog3){
            return M.dialog3.show();
        }
        M.dialog3 = jqueryAlert({
            'style'   : 'pc',
            'width':'410',
            'height' : "175",
            'content' : '<div class="title_alert2">新增分组</div>'+
            '<div class="myfollow_pop_new">'+
            '<div class="text">分组名称</div>'+
            '<div>'+
            '<input class="newfollowname" type="text" placeholder="">'+
            '<div id="errorTxt"></div> '+
            '</div>'+
            '</div>'+
            '<div class="clearfix"></div>',
            'modal'   : true,
            'buttons' :{
                '确定' : function(){
                    var newfollowname=$(".newfollowname").val();
                    var $error = $("#errorTxt");
                    $error.html("");
                    if (newfollowname == "") {
                        $error.html("*请填写分组名！");
                        return;
                    }
                    newfollowname = newfollowname.trim()
                    $(".selectdiv select option").each(function(){ //遍历全部option
                        var txt = $(this).text().trim(); //获取option的内容
                        if (newfollowname == txt) {
                            $error.html("*当前分组已存在！");
                            return;
                        }
                    });
                    if($error.html() != "") {
                        return;
                    }

                    $.ajax({
                        type: "post",
                        url: "http://47.93.102.34:8088/cmscm/webresource/webResourceGroupNew",//http://47.93.102.34:8088/cmscm/webresource/webResourceGroupNew
                        data: {"groupName": newfollowname},
                        dataType:"json",
                        success: function (res) {
                            console.log(res);
                            if(res[0].ret == 0) {//成功
                                var data = res[0].content;
                                var groupName = data.groupName;
                                if(groupName != "" && groupName.length > 8) {
                                    groupName = groupName.substring(0,8)+'..';
                                }
                                $(".list_content_follow").append("<div class='list_cb fl' onclick='getMyFollowerListByCondition(\""+data.groupid+"\",1,this)'><span>"+groupName+"</span><span>(0)</span></div>")
                                $(".selectdiv select").append("<option value=\""+data.groupid+"\">"+groupName+"</option>");
                                $(".newfollowname").val("");
                                M.dialog3.close();
                            }else {//失败
                                $error.html(res[0].message);
                            }
                        }
                    });
                    // $(".list_content_follow:last").append(' <div class="list_cb ">'+newfollowname+'</div>');
                    // M.dialog3.close();
                },
                '取消' : function () {
                    M.dialog3.close();
                }
            }
        });

        //dialog弹出样式
        var buttonsLength = $('.alert-btn-p').length;
        if(buttonsLength == 1){
            $('.alert-btn-p').css({
                "color":"#6e6e6e",
                "border":"solid 1px #ddd",
                "background":"#eee"
            })
            $('.alert-btn-box').css({
                "paddingLeft":"120px"
            })
        }

    });
};


/**
 * 页面一开始加载当前组
 */
function ajaxAddGroupName() {
    var GroupName = [];
    $.ajax({
        type: "post",
        url: "http://47.93.102.34:8088/cmscm/webresource/webResourceGroup",
        dataType: "json",
        success:function (res) {
            // console.log(res);
            var allNum = parseInt(res[0].count);
            var defaultGroup = res[0].defaultGroup;
            var defaultGroupId = defaultGroup.groupId
            $("#allGroup > span").html(allNum);
            // var defaultNum = parseInt(res[0].defaultGroup.countGroup);
            // $("#defaultGroup > span").html(defaultNum);
            $(".list_content_follow").append("<div class='list_cb fl' onclick='getMyFollowerListByCondition(\""+defaultGroup.groupId+"\",1,this)'><span>"+defaultGroup.groupName+"</span><span>("+defaultGroup.countGroup+")</span></div>")
            $(".selectdiv select").append("<option value=\""+defaultGroup.groupId+"\">"+defaultGroup.groupName+"</option>");
            if(res[0].ret == 0){
                var nameGroupEles = res[0].content;
                $.each(nameGroupEles,function (i,e) {
                    var obj = {};
                    obj.groupId = e.groupId;
                    obj.groupName = e.groupName;
                    GroupName.push(obj);
                    $(".list_content_follow").append("<div class='list_cb fl' onclick='getMyFollowerListByCondition(\""+e.groupId+"\",1,this)'><span>"+e.groupName+"</span><span>("+e.countGroup+")</span></div>")
                    $(".selectdiv select").append("<option value=\""+e.groupId+"\">"+e.groupName+"</option>");
                });
            }else {
                alert(res[0].message);
            }
        },
        error:function (e) {
            console.log(e);
        }
    });
}

/**
 * 通过指定条件获取我的关注列表
 *
 * @param groupId   组ID
 * @param pageIndex 页码
 * @param this1     当前对象
 */
function getMyFollowerListByCondition(groupId, pageIndex, this1) {
    if(this1 != null && this1 != "" && this1 != undefined) {
        $('.list_content_follow .list_cb').removeClass("list_colorborder");
        $(this1).addClass("list_colorborder");
    }
    $(".ultabletd ul").each(function () {
        $(this).remove();
    });
    $("#select-all").attr("checked",false);
    //组ID
    // if(groupId === "" || groupId == null) {
    //     // groupId = $("#hidGroupId").val();
    //     groupId == ""
    // }else {
    //     $("#hidGroupId").val(groupId);
    // }

    if(groupId === "" || groupId == null) {
        groupId = $("#hidGroupId").val();
    }else {
        $("#hidGroupId").val(groupId);
    }

    //页码
    if (pageIndex == '' || pageIndex == null || pageIndex == undefined) {
        if(pageIndex < 1) {
            pageIndex = 1;
        }
    }
    $.ajax({
        type: "post",
        url:  "http://47.93.102.34:8088/cmscm/webresource/resourceGroupShow",
        data: {"groupId":groupId,"currentPage":pageIndex,"numPerPage":20},
        dataType: "json",
        success: function (res) {
            console.log(res);
            if(res[0].ret == 0){
                // console.log(res);
                var followerCount = res[0].count;
                var followerList = res[0].content;
                var groupList = res[0].groupList;
                if(followerList != null && followerList.length > 0) {
                    for (var i = 0; i < followerList.length; i++) {
                        var ulElemengt = "<ul style='overflow: hidden'>";
                        var realName = ""; //上传者
                        if (followerList[i].uploader == null || followerList[i].uploader == "" || followerList[i].uploader == undefined) {
                            realName = "待完善信息";
                        } else {
                            realName = followerList[i].uploader;
                        }
                        var companyName = ""; //公司名
                        if (followerList[i].companyName == null || followerList[i].companyName == "" || followerList[i].companyName == undefined) {
                            companyName = "待完善信息";
                        } else {
                            companyName = followerList[i].companyName;
                        }
                        var resourceId = followerList[i].resourceid;
                        if(resourceId == null) {
                            resourceId = "";
                        }
                        var resourceName = followerList[i].resourceName;
                        if(resourceName == null || resourceName == "" || resourceName == undefined) {
                            oriFileName = "";
                        }
                        ulElemengt += "<li class='liwidth input-zt'><input type='checkbox' attentionId=\'"+followerList[i].attentionId+"' resourceId=\'"+followerList[i].resourceid+"' groupId=\'"+followerList[i].groupId+"'></li>"+
                                      "<li class='liwidth'>"+followerList[i].uploader+"</li>"+
                                      "<li class='liwidth'>"+followerList[i].companyName+"</li>"+
                                      "<li class='liwidth resourceName'>"+followerList[i].resourceName+"</li>"+
                                      "<li class='liwidth'>";
                        (followerList[i].todayPrice) ? ulElemengt += followerList[i].todayPrice : ulElemengt += "未知";
                        // if (followerList[i].todayPrice == "上调10") {
                        //     ulElemengt += "上调10";
                        // } else if (followerList[i].todayPrice == "上调20") {
                        //     ulElemengt += "上调20";
                        // } else if (followerList[i].todayPrice == "上调50") {
                        //     ulElemengt += "上调50";
                        // } else if (followerList[i].todayPrice == "下调10") {
                        //     ulElemengt += "下调10";
                        // } else if (followerList[i].todayPrice == "下调20") {
                        //     ulElemengt += "下调20";
                        // } else if (followerList[i].todayPrice == "下调50") {
                        //     ulElemengt += "下调50";
                        // } else if (followerList[i].todayPrice == "平盘") {
                        //     ulElemengt += "平盘";
                        // }else {
                        //     ulElemengt += "未知";
                        // }
                        // if(followerList[i].todayPrice){
                        //     ulElemengt += followerList[i].todayPrice;
                        // }else {
                        //     ulElemengt += "未知";
                        // }
                        ulElemengt += "</li>";
                        ulElemengt += "<li class='liwidth sel'><div class='selectdiv'> "
                        ulElemengt += "<select onchange='singleChangeGroup(this)'>";
                            for (var j = 0; j < groupList.length; j++) {
                                if(followerList[i].groupId == groupList[j].groupid){
                                    ulElemengt += "<option value='"+groupList[j].groupid+"' selected>"+groupList[j].groupName+"</option>";
                                }else {
                                    ulElemengt += "<option value='"+groupList[j].groupid+"'>"+groupList[j].groupName+"</option>";
                                }
                            }
                        ulElemengt += "</select>";
                        ulElemengt += "</div>";
                        ulElemengt += "</li>";
                        ulElemengt += "<li class='liwidth'><a href='javascript:void(0);' onclick='cancelSingleFollower(this)'>删除</a></li>";
                        ulElemengt += "<div class='clearfix'></div>"//
                        ulElemengt += "</ul>";
                        $(".ultabletd").append(ulElemengt);
                    }
                    if(pageIndex == "" || pageIndex == null || pageIndex == undefined){
                        pageIndex = 1;
                    }
                    getPageHtml(pageIndex,followerCount,"divPage");
                    $("#divPage").show();
                }
            }else {
                var tbodystr = "<div style='text-align: center; color: #ff0000'>暂无相关数据</div>";
                $(".ultabletd").append(tbodystr);
            }
        },
        error:function (e) {
            console.log(e);
        }
    });
}


/**
 * 取消关注多个
 */
function myfollow_cancelfollow(){
    var MM = {};
    $(document).delegate('.myfollow_cancelfollow','click',function(){
        var input_zt_num = $(".input-zt > input[type=checkbox]:checked").length;
        if(input_zt_num<=0){
            alert("请选择要取消关注的资源单");
            return
        }
        if(MM.dialog3){
            return MM.dialog3.show();
        }
        MM.dialog3 = jqueryAlert({
            'style'   : 'pc',
            'width':'410',
            'height' : "175",
            'content' : '<div class="ico_alert fl"><img src="images/alert-!.png"></div>' +
            '<div class="content_alert fl">' +
            '<div class="title_alert">确定要取消关注吗？</div>' +
            '</div>' +
            '<div class="clearfix"></div>',
            'modal'   : true,
            'buttons' :{
                '确定' : function(){
                    MM.dialog3.close();
                    var arr = [];
                    $(".input-zt > input[type=checkbox]:checked").each(function (i,e) {
                        arr.push($(e).attr("attentionid"));
                    });
                    var resourceIdString = arr.join(",");
                    $.ajax({
                        type: "post",
                        url: "http://47.93.102.34:8088/cmscm/webresource/unfollow",
                        data: {"attentionId":resourceIdString},
                        dataType: "json",
                        success: function (res) {
                            if(res[0].ret == 0){
                                alert(res[0].message);
                                location.href=location.href;
                            }else {
                                alert(res[0].message);
                            }
                        },
                        error:function (e) {
                            console.log(e);
                        }
                    });
                },
                '取消' : function () {
                    MM.dialog3.close();
                }
            }
        });

        //dialog样式
        var buttonsLength = $('.alert-btn-p').length;
        if(buttonsLength == 1){
            $('.alert-btn-p').css({
                "color":"#6e6e6e",
                "border":"solid 1px #ddd",
                "background":"#eee"
            })
            $('.alert-btn-box').css({
                "paddingLeft":"120px"
            })
        }
    });
};



/**
 * 取消关注单个
 */
function cancelSingleFollower(that) {
    var M = {};
    if(M.dialog3){
        return M.dialog3.show();
    }
    M.dialog3 = jqueryAlert({
        'style'   : 'pc',
        'width':'410',
        'height' : "175",
        'content' : '<div class="ico_alert fl"><img src="images/alert-!.png"></div>' +
        '<div class="content_alert fl">' +
        '<div class="title_alert">确定删除吗？</div>' +
        '<div class="error_txt"></div>' +
        '</div>' +
        '<div class="clearfix"></div>',
        'modal'   : true,
        'buttons' :{
            '确定' : function(){
                var $this = $(that);
                var attentionId = $this.parent().siblings(".input-zt").children("input").attr("attentionid");
                $.ajax({
                    type: "post",
                    url:  "http://47.93.102.34:8088/cmscm/webresource/unfollow",
                    data: {"attentionId":attentionId},
                    dataType: "json",
                    success: function (res) {
                        console.log(res);
                        if(res[0].ret == 0){
                            location.href = location.href;
                        }else {
                            $(".error_txt").text(res[0].message);
                        }
                    },
                    error:function (e) {
                        console.log(e);
                    }
                });
            },
            '取消' : function () {
                M.dialog3.close();
            }
        }
    });

    //dialog样式
    var buttonsLength = $('.alert-btn-p').length;
    if(buttonsLength == 1){
        $('.alert-btn-p').css({
            "color":"#6e6e6e",
            "border":"solid 1px #ddd",
            "background":"#eee"
        })
        $('.alert-btn-box').css({
            "paddingLeft":"120px"
        })
    }
}


/**
 * 移动分组多个
 * @param resourceid   资源单ID
 * @param groupid      目标组ID
 * @param groupName    目标组名称
 */

$("#batchChangeGroup").on("click",function () {
    var targetGroupId = $("#groupNameAllSelect").val();//目标组ID
    var targetGroupName = $("#groupNameAllSelect > option:selected").text();//目标组名称
    if(targetGroupId == "") {
        return;
    }
    var arr = [];
    $(".input-zt > input[type=checkbox]:checked").each(function (i,e) {
        arr.push({
            "groupid":targetGroupId,
            "resourceid":$(e).attr("resourceid"),
            "groupName":targetGroupName
        });
    });
    var data = JSON.stringify(arr);
    console.log(data);
    if (arr.length == 0) {
        alert("请选择要移动的资源单");
        return
    }
    $.ajax({
        type: "post",
        url: "http://47.93.102.34:8088/cmscm/webresource/updateGroup",
        data: {"updateGroupList":data},
        dataType: "json",
        success: function (res) {
            console.log(res);
            if(res[0].ret == 0){
                alert(res[0].message);
                location.href=location.href;
            }else {
                alert(res[0].message);
            }
        },
        error:function (e) {
            console.log(e);
        }
    });

});


/**
 * 移动分组单个
 * @param groupid    目标组ID
 * @param resourceid 资源ID
 */
function singleChangeGroup(that) {
    var targetGroupId = $(that).children("option:selected").val(); //目标组ID
    var targetGroupName = $(that).children("option:selected").text(); //目标组名称
    // console.log(targetGroupId);
    // console.log(targetGroupName);
    var resourceId = $(that).parent().parent().siblings(".input-zt").children("input").attr("resourceid");//当前资源ID
    var updateGroupList = [];
    var obj = {
        "resourceid":resourceId,
        "groupid":targetGroupId,
        "groupName":targetGroupName
    };
    updateGroupList.push(obj);
    var data = JSON.stringify(updateGroupList);
    $.ajax({
        type: "post",
        url:  "http://47.93.102.34:8088/cmscm/webresource/updateGroup",
        data: {updateGroupList:data},
        dataType: "json",
        success: function (res) {
            console.log(res);
            if(res[0].ret == 0){
                location.href = location.href;
            }
        },
        error:function (e) {
            console.log(e);
        }
    });
}


/**
 * 获取页码
 *
 * @param pIndex  当前页码
 * @param tCount  数据总量
 * @param pageId  页码div ID
 */
function getPageHtml(pIndex, tCount, pageId) {
    var pageIndex = 1;
    if (pIndex != "") {
        pageIndex = parseInt(pIndex);
    }
    var totalCount = parseInt(tCount);
    var pageCount = 0;//总页数
    var pageSize = 20;//每页大小
    var nextPageIndex = 0;//下一页
    var prePageIndex = 0;//上一页
    var startPageIndex = 0;//起始页页码数
    var endPageIndex = 0;//结束页页码数
    var pageIndexstr = "";//页码显示区数据
    var showCount = 7;//页面显示的页数
    var halfShowCount = parseInt(showCount/2);//页面显示页数的一半

    if (pageIndex < 1) { pageIndex = 1; }
    //计算总页数
    if (pageSize != 0){
        pageCount = parseInt(totalCount / pageSize);
        pageCount = (totalCount % pageSize) != 0 ? pageCount + 1 : pageCount;//如果总页数%每页显示的数量不等于0，总页数加1，否则就等于总页数
        pageCount = pageCount == 0 ? 1 : pageCount;//如果总页数等于0就显示为第一页
    }
    nextPageIndex = pageIndex + 1;
    prePageIndex = pageIndex - 1;
    //确定结束页
    endPageIndex = pageIndex <= halfShowCount ? showCount : pageIndex + halfShowCount;
    if (pageCount < endPageIndex) { endPageIndex = pageCount; }
    //确定起始页
    startPageIndex = (pageIndex + halfShowCount) > pageCount ? endPageIndex - showCount + 1 : pageIndex - halfShowCount;
    if (startPageIndex < 1) { startPageIndex = 1; }

    //上一页
    pageIndexstr += pageIndex > 1 ? "<a href=\"javascript:void(0)\" class=\"up\" onclick=\"getMyFollowerListByCondition('',"+ prePageIndex +",'')\">上一页 <b></b></a>" : "<a href=\"javascript:void(0)\" class=\"up up_nocurrent\">上一页 <b></b></a>";

    //遍历所有显示的页，添加样式
    for (i = startPageIndex; i <= endPageIndex; i++){
        pageIndexstr += pageIndex == i ? "<a href=\"javascript:void(0)\" style=\"cursor:default\" class=\"current\">" + i + "</a>" : "<a href=\"javascript:void(0)\" onclick=\"getMyFollowerListByCondition('',"+ i +",'')\" >" + i + "</a>";
    }

    //下一页
    pageIndexstr += pageIndex != pageCount ? "<a href=\"javascript:void(0)\" class=\"down\" onclick=\"getMyFollowerListByCondition('',"+ nextPageIndex +",'')\">下一页<b></b></a>" : "<a href=\"javascript:void(0)\" class=\"down down_nocurrent\">下一页<b></b></a>";
    //总页数
    pageIndexstr += "<span class=\"pkg_pagevalue\">共<span class=\"total\">" + pageCount + "</span>页</span>";
    //输入页
    pageIndexstr += "<span class=\"pkg_pagevalue\">到<input type=\"text\" id=\"pageIndexText\" onchange=\"onChangePageIndex()\" class=\"pkg_page_num\">页</span><a href=\"javascript:void(0)\" id=\"okpageIndex\" class=\"pkg_page_submit\" onclick=\"goToPageIndex()\">确定</a>";
    $("#" + pageId).html(pageIndexstr);
}


/**
 * 查询指定页码的数据
 */
function goToPageIndex() {
    var pageValue = $('#pageIndexText').val();

    if (pageValue == "") {
        return;
    }

    if (isNaN(pageValue)) {
        return;
    }

    var pageCount = $('#divPage .total').html();//总页数
    pageCount = parseInt(pageCount);
    pageValue = parseInt(pageValue);
    if(pageValue < 1) {
        pageValue = 1;
    }else if(pageValue > pageCount) {
        pageValue = pageCount;
    }

    getMyFollowerListByCondition(null, pageValue, null);
}


/**
 * 改变输入的页码数
 */
function onChangePageIndex() {
    var pageValue = $('#pageIndexText').val();

    if (pageValue == "") {
        return;
    }

    if (isNaN(pageValue)) {
        $('#pageIndexText').val('');
        return;
    }

    var pageCount = $('#divPage .total').html();//总页数
    pageCount = parseInt(pageCount);
    if(pageValue < 1) {
        pageValue = 1;
    }else if(pageValue > pageCount) {
        pageValue = pageCount;
    }

    $('#pageIndexText').val(pageValue);
}

/***********************************************************/


//全选
$("#select-all").click(function(){
    // if(this.checked){
    //     $("input[type='checkbox']").prop("checked", true);
    // }else{
    //     $("input[type='checkbox']").prop("checked", false);
    // }
    this.checked ? $("input[type='checkbox']").prop("checked", true) : $("input[type='checkbox']").prop("checked", false);
});

$(document).on('click', '.list_cb', function() {//最上面的选择全部（1）默认分组为原色
    //$(".list_cb").eq($(this).index()).addClass("list_colorborder").siblings().removeClass("list_colorborder");
    $(this).each(function(){
        $(this).siblings().removeClass("list_colorborder");
        $(this).addClass("list_colorborder");
    });
});

$("#select-all").on("click", function () {
    $('.liwidth > input[type="checkbox"]').prop('checked', $(this).prop('checked'));
});