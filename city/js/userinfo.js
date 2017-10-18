var userInfo = {
    //鼠标经过左侧图片 触发事件
    hoverHeadPortrait: function () {
        $('#pic_user_info').on("mouseover", function (e) {
            $('#zhezhao').show();
            e.preventDefault();
        });
    },
    //遮罩层离开之后 触发事件
    maskLayer: function () {
        $('#zhezhao').on("mouseout", function (e) {
            $('#zhezhao').hide();
            e.preventDefault();
        }).on("click", function (e) {  //点击“更换图片”事件
            $("#upload_user_info").click(); //隐藏了input:file样式后，点击头像就可以本地上传
        });
    },
    //图片 change 事件
    changeImg:function () {
        $("#upload_user_info").on("change", function () {
            var objUrl = userInfo.getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
            if (objUrl) {
                $("#pic_user_info").attr("src", objUrl); //将图片路径存入src中，显示出图片
            }
        });
    },
    //修改邮箱
    editEmail:function () {
        var M = {};
        $(document).delegate(".edit_email", 'click', function () {
            if (M.dialog3) {
                return M.dialog3.show();
            }
            M.dialog3 = jqueryAlert({
                'style': 'pc',
                'width': '410',
                'height': "175",
                'content': '<div class="ico_alert fl"><img src="images/alert-!.png"></div>' +
                '<div class="content_alert fl">' +
                '<div class="title_alert" style="text-align: left">修改邮箱</div>' +
                '<div class="input_alert"><input id="edit_email_user_info" type="text" placeholder="请输入邮箱"></div>' +
                '<div id="input_txt"></div>' +
                '</div>' +
                '<div class="clearfix"></div>',
                'modal': true,
                'buttons': {
                    '修改': function () {
                        var editEmailUserInfo = $("#edit_email_user_info").val();
                        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                        if (!myreg.test(editEmailUserInfo)) {
                            $("#input_txt").html("请输入有效的E_mail!").css("color", "#ff0000");
                            return false;
                        }
                        $("#email_user").html(editEmailUserInfo);
                        M.dialog3.close();
                    }
                }
            });
        });
    },
    //input 验证
    verificationInput:function () {
        //姓名，公司，地址
        $("#name_user,#company_user").on("blur", function () {
            if ($(this).val() == "" || $(this).val() == null || $(this).val() == undefined) {
                var placeHolderVal = $(this).prop("placeholder");
                $(this).siblings("span").html(placeHolderVal);
            } else {
                $(this).siblings("span").html("<img src='images/yanzheng.png'>");
            }
        });
        //座机
        $("#zuoji_user").on("blur", function () {
            if ($(this).val() == "" || $(this).val() == null || $(this).val() == undefined) {
                var placeHolderVal = $(this).prop("placeholder");
                $(this).siblings("span").css("color","#ff0000").html(placeHolderVal);
            } else {
                var regTel1 = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test($(this).val());//带区号的固定电话
                var regTel2 = /^(\d{7,8})(-(\d{3,}))?$/.test($(this).val());//不带区号的固定电话
                if (!regTel1 && !regTel2) {
                    $(this).siblings("span").css("color","#ff0000").html("座机号码输入有误!");
                }else {
                    $(this).siblings("span").html("<img src='images/yanzheng.png'>");
                }
            }
        });
        //企业邮箱
        $("#companyEmail_user").on("blur", function () {
            if ($(this).val() == "" || $(this).val() == null || $(this).val() == undefined) {
                var placeHolderVal = $(this).prop("placeholder");
                $(this).siblings("span").html(placeHolderVal);
            } else {
                var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if (!myreg.test($(this).val())) {
                    $(this).siblings("span").html("E_mail不合法!");
                }else {
                    $(this).siblings("span").html("<img src='images/yanzheng.png'>");
                }
            }
        });
        //公司地址
        $("#addr_user").on("blur", function () {
            if ($(this).val() == "" || $(this).val() == null || $(this).val() == undefined) {
                $(this).siblings("span").html($(this).prop("placeholder"));
            } else {
                $(this).siblings("span").html("");
            }
        });

    },
    // 点击保存按钮 上传表单
    submitUserInfo:function () {
        $('#baocun_userinfo').on("click", function () {
            var name_userVal = $("#name_user").val();
            var company_userVal = $("#company_user").val();
            var zuoji_userVal = $("#zuoji_user").val();
            var companyEmail_userVal = $("#companyEmail_user").val();
            var addr_userVal = $("#addr_user").val();
            if (name_userVal == "" || name_userVal == null || name_userVal == undefined) {
                alert("请输入姓名");
                return false;
            } else if (company_userVal == "" || company_userVal == null || company_userVal == undefined) {
                alert("请输入公司名称");
                return false;
            } else if (zuoji_userVal == "" || zuoji_userVal == null || zuoji_userVal == undefined) {
                alert("请输入办公电话");
                return false;
            } else if (companyEmail_userVal == "" || companyEmail_userVal == null || companyEmail_userVal == undefined) {
                alert("请输入企业邮箱");
                return false;
            } else if (addr_userVal == "" || addr_userVal == null || addr_userVal == undefined) {
                alert("请输入公司地址");
                return false;
            } else {
                var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if (!myreg.test(companyEmail_userVal)) {
                    alert('请输入有效的E_mail！');
                    return false;
                }
                var regTel1 = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(zuoji_userVal);//带区号的固定电话
                var regTel2 = /^(\d{7,8})(-(\d{3,}))?$/.test(zuoji_userVal);//不带区号的固定电话
                if (!regTel1 && !regTel2) {
                    alert("电话号码输入有误！");
                    return false;
                }
                // $.ajax({
                //     url:'/sdkfjl/a.do',
                //     type:'post',
                //     data:{
                //         key1:val1,
                //         key2:val2
                //     },
                //     dataType:'json',
                //     success:function (res) {
                //         console.log(res);
                //     },
                //     error:function (e) {
                //         console.log(e);
                //     }
                // })
                // console.log(name_userVal);
                // console.log(company_userVal);
                // console.log(zuoji_userVal);
                // console.log(companyEmail_userVal);
                // console.log(addr_userVal);
            }
        });
    },

    getObjectURL:function (file){
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        } else {
            return false;
        }
        return url;
    },
    dataURLtoBlob:function (dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    },
    html5Reader:function (file, callback) {
        var file = file.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var bolb = dataURLtoBlob(this.result);
            callback(bolb);
        }
    }
};
$(function () {
    userInfo.hoverHeadPortrait();//鼠标经过左侧图片 触发事件
    userInfo.maskLayer();//遮罩层离开之后 触发事件
    userInfo.changeImg();//图片 change 事件
    userInfo.editEmail();//修改邮箱
    userInfo.verificationInput();//验证Input
    userInfo.submitUserInfo();//点击保存按钮 上传表单
});


/*
 (function (window, document, $) {
 //鼠标经过左侧图片 触发事件
 $('#pic_user_info').on("mouseover",function (e) {
 $('#zhezhao').show();
 e.preventDefault();
 });
 //遮罩层离开之后 触发事件
 $('#zhezhao').on("mouseout",function (e) {
 $('#zhezhao').hide();
 e.preventDefault();
 }).on("click",function (e) {  //点击“更换图片”事件
 $("#upload_user_info").click(); //隐藏了input:file样式后，点击头像就可以本地上传
 });
 //图片 change 事件
 $("#upload_user_info").on("change", function () {
 var objUrl = userInfo.getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
 if (objUrl) {
 $("#pic_user_info").attr("src", objUrl); //将图片路径存入src中，显示出图片
 }
 });

 修改邮箱
 var M = {};
 $(document).delegate(".edit_email", 'click', function () {
 if (M.dialog3) {
 return M.dialog3.show();
 }
 M.dialog3 = jqueryAlert({
 'style': 'pc',
 'width': '410',
 'height': "175",
 'content': '<div class="ico_alert fl"><img src="images/alert-!.png"></div>' +
 '<div class="content_alert fl">' +
 '<div class="title_alert" style="text-align: left">修改邮箱</div>' +
 '<div class="input_alert"><input id="edit_email_user_info" type="text" placeholder="请输入邮箱"></div>' +
 '<div id="input_txt"></div>' +
 '</div>' +
 '<div class="clearfix"></div>',
 'modal': true,
 'buttons': {
 '修改': function () {
 var editEmailUserInfo = $("#edit_email_user_info").val();
 console.log(editEmailUserInfo);
 var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
 if (!myreg.test(editEmailUserInfo)) {
 $("#input_txt").html("请输入有效的E_mail!").css("color", "#ff0000");
 return false;
 }
 $("#email_user").html(editEmailUserInfo);
 M.dialog3.close();
 }
 }
 });
 });

 //点击保存按钮 上传表单
 $('#baocun_userinfo').on("click", function () {
 var name_userVal = $("#name_user").val();
 var company_userVal = $("#company_user").val();
 var zuoji_userVal = $("#zuoji_user").val();
 var companyEmail_userVal = $("#companyEmail_user").val();
 var addr_userVal = $("#addr_user").val();
 if (name_userVal == "" || name_userVal == null || name_userVal == undefined) {
 alert("请输入姓名");
 return false;
 } else if (company_userVal == "" || company_userVal == null || company_userVal == undefined) {
 alert("请输入公司名称");
 return false;
 } else if (zuoji_userVal == "" || zuoji_userVal == null || zuoji_userVal == undefined) {
 alert("请输入办公电话");
 return false;
 } else if (companyEmail_userVal == "" || companyEmail_userVal == null || companyEmail_userVal == undefined) {
 alert("请输入企业邮箱");
 return false;
 } else if (addr_userVal == "" || addr_userVal == null || addr_userVal == undefined) {
 alert("请输入公司地址");
 return false;
 } else {
 var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
 if (!myreg.test(companyEmail_userVal)) {
 alert('请输入有效的E_mail！');
 return false;
 }
 var regTel1 = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(zuoji_userVal);//带区号的固定电话
 var regTel2 = /^(\d{7,8})(-(\d{3,}))?$/.test(zuoji_userVal);//不带区号的固定电话
 if (!regTel1 && !regTel2) {
 alert("电话号码输入有误！");
 return false;
 }
 // $.ajax({
 //     url:'/sdkfjl/a.do',
 //     type:'post',
 //     data:{
 //         key1:val1,
 //         key2:val2
 //     },
 //     dataType:'json',
 //     success:function (res) {
 //         console.log(res);
 //     },
 //     error:function (e) {
 //         console.log(e);
 //     }
 // })
 // console.log(name_userVal);
 // console.log(company_userVal);
 // console.log(zuoji_userVal);
 // console.log(companyEmail_userVal);
 // console.log(addr_userVal);
 }
 });
 })(window, document, $)
 */