$(function () {
    $("#categorylist").css("display", "none");
    $.ajax({
        url: 'http://47.93.102.34:8088/cmscm/webresource/getCompanyName',
        type: 'post',
        dataType: 'json',
        success: function (res) {
            $("#gongsimingcheng").val(res[0].content.companyName)
        },
        error: function (e) {
            console.log(e);
        }
    });

    $('#submit_upload_data_v2').on('click', function () {
        var resourceName = $('#ziyuandanmingcheng').val(); //资源单名称
        var localCity = $('#selCityOption > option:selected').val(); //地区
        var companyName = $('#gongsimingcheng').val(); //公司名称
        var produceDes = $('#txtRemark').val(); //产品描述
        var todayPrice = $('#selAdjustPriceOption option:selected').val();
        var tbusinessScopeList = [];
        $("#categorylist .nobottom").each(function () {
            var $this = $(this);
            var topCategoryId = $this.attr("topCategoryId");
            var categoryValue = $(this).find("input[name='category']").val();
            if (categoryValue == "") {
                alert("请选择主营品种");
                return false;
            }
            var factoryValue = $(this).find("input[name='factory']").val();
            if (factoryValue == "") {
                alert("请选择主营厂商");
                return false;
            }
            tbusinessScopeList.push({
                topCategoryId: topCategoryId,
                mainKind: categoryValue,
                mainManufacturer: factoryValue
            });
        });

        if (resourceName == "" || resourceName == null || resourceName == undefined) {
            alert("请输入资源单名称");
            return false
        } else if (companyName == "" || companyName == null || companyName == undefined) {
            alert("公司名称不能为空");
            return false;
        } else if (produceDes == "" || produceDes == null || produceDes == undefined) {
            alert("产品描述不能为空");
            return false;
        } else if (tbusinessScopeList.length == 0) {
            alert("请选择分类");
            return false;
        } else {
            var data = {};
            data.resourceName = resourceName;
            data.localCity = localCity;
            data.companyName = companyName;
            data.produceDes = produceDes;
            data.todayPrice = todayPrice;
            data.tbusinessScopeList = JSON.stringify(tbusinessScopeList);
            $.ajax({
                url: 'http://47.93.102.34:8088/cmscm/webresource/webResourceRelease',//http://192.168.1.234:8080/cmscm/webresource/webResourceRelease
                type: 'post',
                data: data,
                dataType: 'json',
                success: function (res) {
                    if (res[0].ret == 0) {
                        alert(res[0].message);
                        window.location.reload();
                    } else {
                        alert(res[0].message);
                    }
                },
                error: function (e) {
                    alert(e);
                }
            });
        }
    });

    $("input[name='topCategory']").on("click", function () {
        var $this = $(this);
        var i = $("input[name='topCategory']:checked").length;
        // if (i >= 6) {
        //     $this.attr("checked", false);
        //     alert("最多只能选择5项");
        //     return;
        // }
        if (i == 0) {
            $("#categorylist").css("display", "none");
        }
        var topCategoryId = $this.attr("value");
        if ($this.is(":checked")) {
            $("#categorylist").css("display", "");
            var html = createCategorylistHtml($this, topCategoryId, "", "");
            $("#categoryTable").append(html);
        } else {
            $("#topCategory" + topCategoryId).remove();
            $("#categoryArr" + topCategoryId).remove();
            $("#factoryArr" + topCategoryId).remove();
        }
    });
    $("#categorylist").on("focus", "input[name='factory']", function () {
        var $this = $(this);
        var topCategoryId = $this.attr("topCategoryId");
        $(".selectTr").hide();
        $("#factoryArr" + topCategoryId).show();
    });

    $("#categorylist").on("focus", "input[name='category']", function () {
        var $this = $(this);
        var topCategoryId = $this.attr("topCategoryId");
        $(".selectTr").hide();
        $("#categoryArr" + topCategoryId).show();
    });

    $("#categorylist").on("click", "ul li", function () {
        var text = $(this).text();
        $ui = $(this).parent().first();
        var topCategoryId = $ui.attr("topCategoryId");
        var type = $ui.attr("type");
        var $input = $("input[name='" + type + "'][topCategoryId='" + topCategoryId + "']");
        var value = $input.val();
        var values = value.split(",");
        var vals = [];
        for (var i = 0; i < values.length; i++) {
            var val = values[i];
            if (text == val) {
                continue;
            }
            if (val != "") {
                vals.push(val);
            }
        }
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
        }
        else {
            vals.push(text);
            $(this).addClass("on");
        }
        $input.val(vals.join(","));
    });
    // var UploadUtils={
    //     fileResultData:null,
    //     initUpload:function(btn){
    //         new AjaxUpload(btn,{
    //             action:'xxxxx.do',
    //             name: 'file',
    //             responseType:'json',
    //             onSubmit: function (file, fileType) {
    //                 if (fileType&&/^(xls|xlsx)$/.test(fileType)) {
    //                     return true;
    //                 }else{
    //                     alert(file+"文件格式不正确，只允许上传以下格式的文件：*.xls;*.xlsx");
    //                     return false;
    //                 }
    //             },
    //             onComplete: function(files, data) {
    //                 var code=data.code;
    //                 var message=data.message;
    //                 if(code=="1"){
    //                     var file=data.result;
    //                     $("#fileName").html(file.oriFileName);
    //                     $("#step1").hide();
    //                     $("#step2").show();
    //                     UploadUtils.fileResultData=file;
    //                 }else{
    //                     alert(message||"资源当上传失败");
    //                 }
    //             }
    //         });
    //     }
    // }
    //
    // UploadUtils.initUpload("firstUploadBtn");
    // UploadUtils.initUpload("resetUploadBtn");
});

function createCategorylistHtml($this, topCategoryId, selectFactory, selectCategory) {
    if (!selectFactory) {
        selectFactory = "";
    }
    if (!selectCategory) {
        selectCategory = "";
    }
    var checkSelectFactory = "," + selectFactory + ",";
    var checkselectCategory = "," + selectCategory + ",";

    var factory = $this.attr("factory");
    var category = $this.attr("category");
    var factoryArr = factory.split(",");
    var categoryArr = category.split(",");
    var topCategoryName = $this.next().text();
    var html = '<tr class="nobottom" topCategoryId="' + topCategoryId + '"  id="topCategory' + topCategoryId + '">';
    html += '<th>' + topCategoryName + '</th>';
    html += '<td><input name="category"  topCategoryId="' + topCategoryId + '" type="text" value="' + selectCategory + '"></td>';
    html += '<td><input name="factory" topCategoryId="' + topCategoryId + '" type="text" value="' + selectFactory + '"></td>';
    html += '</tr>';

    html += '<tr style="display:none" class="selectTr"  id="categoryArr' + topCategoryId + '">';
    html += '<th></th>';
    html += '<td colspan="2" style="padding:2px 8px 5px;">';
    html += '<ul topCategoryId="' + topCategoryId + '"  type="category">';
    for (var i = 0; i < categoryArr.length; i++) {
        if (checkselectCategory.indexOf("," + categoryArr[i] + ",") > -1) {
            html += '<li class="on">' + categoryArr[i] + '</li>';
        } else {
            html += '<li>' + categoryArr[i] + '</li>';
        }
    }
    html += '</ul>';
    html += '</td>';
    html += '</tr>';

    html += '<tr style="display:none" class="selectTr" id="factoryArr' + topCategoryId + '">';
    html += '<th></th>';
    html += '<td colspan="2" style="padding:2px 8px 5px;">';
    html += '<ul topCategoryId="' + topCategoryId + '" type="factory">';
    for (var i = 0; i < factoryArr.length; i++) {
        if (checkSelectFactory.indexOf("," + factoryArr[i] + ",") > -1) {
            html += '<li class="on">' + factoryArr[i] + '</li>';
        } else {
            html += '<li>' + factoryArr[i] + '</li>';
        }
    }
    html += '</ul>';
    html += '</td>';
    html += '</tr>';
    return html;
}