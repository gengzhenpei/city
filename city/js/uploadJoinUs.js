var uploadJoinUs = {
    //招聘职位，招聘人数验证不能为空
    inputBlur: function () {
        $("#job_name,#job_number").on("blur", function () {
            if ($(this).val() == "" || $(this).val() == null || $(this).val() == undefined) {
                var placeHolderVal = $(this).prop("placeholder");
                $(this).siblings("span").html(placeHolderVal);
            } else {
                $(this).siblings("span").html("<img src='images/yanzheng.png'>");
            }
        });
    },
    //提交按钮触发事件
    submitButton: function () {
        $("#submit_upload_join_us").on("click", function () {
            var $job_name = $("#job_name").val();//招聘职位
            var $job_department = $("#job_department option:selected").val();//所属部门
            var $job_addr = $("#job_addr option:selected").val();//工作地点
            var $job_number = $("#job_name").val();//招聘人数
            var $job_need = $("#job_need").val();//职位要求
            var $job_description = $("#job_description").val();//职位描述
            if ($job_name != "" && $job_department != "" && $job_addr != "" && $job_number != "" && $job_need != "" && $job_description != "") {
                var data = {};
                data.jobName = $job_name;
                data.jobDepartment = $job_department;
                data.jobAttr = $job_addr;
                data.jobNumber = $job_number;
                data.jobNeed = $job_need;
                data.jobDescription = $job_description;
                $.ajax({
                    url: 'xxxx',
                    type: 'post',
                    dataType: 'json',
                    data: data,
                    success: function (res) {
                        // console.log(res);
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
            } else {
                alert("请填写完整后提交");
                return false;
            }
        });
    }
};
$(function () {
    uploadJoinUs.inputBlur();//招聘职位，招聘人数验证不能为空
    uploadJoinUs.submitButton();//提交按钮触发事件
});