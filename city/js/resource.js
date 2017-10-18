var resource={
 	allNum:0,
    userId:"327b4305c23342939b0659fa10ac3eab",
    dataObj:{
        attentionFlag:0,    
        type:1,
        species:"",
        factory:"",
        companyName:"",
        currentPage:1,
        userId:"327b4305c23342939b0659fa10ac3eab",
        numPerPage:20
    },
    //获得主营品种
	getSpecies:function(type){
        $.ajax({
            url:"http://47.93.102.34:8088/cmscm/webshop/showSpecies",
            type:"post",
            dataType:"json",
            data:{
                typeResource:type
            },
            success:function(data){
                $("#species").html("");
                $("#species").append($('<option value="">全部</option>'))
                $(data[0].content).each(function(index){
                     $ops=$("<option value='"+data[0].content[index]+"'>"+data[0].content[index]+"</option>")
                      $("#species").append($ops)
                })    
            },
            fail:function(err){
                console.log(err)
            }
        })
    },
    //获得钢铁和纸数据
    getGTSource:function(dataObj){
        $('.list-title-box').show()
    	var self=this;
    	
        dataObj.attentionFlag=0;
        //console.log(dataObj)
        $.ajax({
            url:"http://47.93.102.34:8088/cmscm/webshop/showResource",
            type:"post",
            dataType:"json",
            data:dataObj,
            success:function(data){
                // console.log(data)
                 if(data[0].ret==0){ 
                    $('.list-title-box').hide()
                 	self.allNum=data[0].count;
                    $ul=$("<ul class='showList_content spot_f1'></ul>")
                    $(data[0].content).each(function(index){
                        var followStr="";
                        console.log()
                        if($(this)[0].isAttention ==0){
                            followStr='<br /><button data-resourceId="'+$(this)[0].resourceId+'" class="follow">'+'关注'+'</button>'
                        }else if($(this)[0].isAttention ==1){
                            followStr='<br /><button data-attentionId="'+$(this)[0].attentionId+'" class="cancelFollow">'+'取消关注'+'</button>'
                        }

                        if(index==0){
                            $showList=$('<li class="showList showList_1">'
                            +'<span class="checkwrap"><input type="checkbox"></span>'
                            +'<span class="company">'+$(this)[0].companyName+'</span>'
                            +'<span class="uploader">'+$(this)[0].uploader+''
                                +followStr
                            +'</span>'
                            +'<span class="species">'+$(this)[0].speciesList+'</span>'
                            +'<span class="factory">'+$(this)[0].factoryList+'</span>'
                            +'<span class="resourceDes">'+$(this)[0].resourceDes+''  
                            +'</span>'
                            +'<span class="uploadTime">'+$(this)[0].uploadTime+'</span>'
                            +'<span class="todayPrice">'+$(this)[0].todayPrice+'</span>'
                            +'<p class="notice">此条消息为本人提供</p>'
                        +'</li>');
                        }else{
                            $showList=$('<li class="showList">'
                            +'<span class="checkwrap"><input type="checkbox"></span>'
                            +'<span class="company">'+$(this)[0].companyName+'</span>'
                            +'<span class="uploader">'+$(this)[0].uploader+''
                                +followStr
                            +'</span>'
                            +'<span class="species">'+$(this)[0].speciesList+'</span>'
                            +'<span class="factory">'+$(this)[0].factoryList+'</span>'
                            +'<span class="resourceDes">'+$(this)[0].resourceDes+''  
                            +'</span>'
                            +'<span class="uploadTime">'+$(this)[0].uploadTime+'</span>'
                            +'<span class="todayPrice">'+$(this)[0].todayPrice+'</span>'
                        +'</li>');
                        }
                        
                        $ul.append($showList)
                        
                    })

                    $("#showList_content").html($ul)  
                    $(".follow").click(function(){
                      //  $resourceId=$(this).attr("data-resourceId");
                        // console.log($resourceId)
                       // self.getGroup(resource.userId,$resourceId)
                        
                    })
                    $(".showList:not(:first)").mouseover(function(){
                        $(this).css("background","#fff0e5").siblings(".showList:not(:first)").css("background","#fff")

                    })
                }
                self.page(self.allNum)
            },
            fail:function(err){
                console.log(err)
            }
        })
        dataObj.attentionFlag=1;
        // console.log(dataObj)
        $.ajax({
            url:"http://47.93.102.34:8088/cmscm/webshop/showResource",
            type:"post",
            dataType:"json",
            data:dataObj,
            success:function(data){
               // console.log(data)
               $('.myFollows').html('我关注的('+data[0].count+')');
            },
            fail:function(err){
                console.log(err)
            }
        })
    },
    //获得废家电
    getJDSource:function(dataObj){
        $('.list-title-box').show()
    	var self=this;
        dataObj.attentionFlag=0;
        // console.log(dataObj)
        $.ajax({
            url:"http://47.93.102.34:8088/cmscm/webshop/showResource",
            type:"post",
            dataType:"json",
            data:dataObj,
            success:function(data){
                // console.log(data[0])
                if(data[0].ret==0){
                    $('.list-title-box').hide()
                	self.allNum=data[0].count;
                    $ul=$("<ul class='showList_content spot_f1'></ul>")
                    $(data[0].content).each(function(index){
                        var followStr="";
                        if($(this)[0].isAttention ==0){
                            followStr='<br /><button data-resourceId="'+$(this)[0].resourceId+'" class="follow">'+'关注'+'</button>'
                        }else if($(this)[0].isAttention ==1){
                            followStr='<br /><button class="follow" data-attentionId="'+$(this)[0].attentionId+'">'+'取消关注'+'</button>'

                        }
                        
                        if(index==0){
                            $showList=$('<li class="showList showList_1">'
                            +'<span class="checkwrap"><input type="checkbox"></span>'
                            +'<span class="company">'+$(this)[0].companyName+'</span>'
                            +'<span class="uploader">'+$(this)[0].uploader+''
                                +followStr
                            +'</span>'
                            +'<span class="species">'+$(this)[0].speciesList+'</span>'
                            +'<span class="factory">'+$(this)[0].factoryList+'</span>'
                            +'<span class="resourceDes">'+$(this)[0].resourceDes+''  
                            +'</span>'
                            +'<span class="uploadTime">'+$(this)[0].uploadTime+'</span>'
                            +'<span class="todayPrice">'+$(this)[0].todayPrice+'</span>'
                            +'<p class="notice">此条消息为本人提供</p>'
                        +'</li>');
                        }else{
                            $showList=$('<li class="showList">'
                            +'<span class="checkwrap"><input type="checkbox"></span>'
                            +'<span class="company">'+$(this)[0].companyName+'</span>'
                            +'<span class="uploader">'+$(this)[0].uploader+''
                                +followStr
                            +'</span>'
                            +'<span class="species">'+$(this)[0].speciesList+'</span>'
                            +'<span class="factory">'+$(this)[0].factoryList+'</span>'
                            +'<span class="resourceDes">'+$(this)[0].resourceDes+''  
                            +'</span>'
                            +'<span class="uploadTime">'+$(this)[0].uploadTime+'</span>'
                            +'<span class="todayPrice">'+$(this)[0].todayPrice+'</span>'
                        +'</li>');
                        }
                        
                        $ul.append($showList)
                        
                    })

                    $("#showList_content").html($ul)

                }
                $(".showList:not(:first)").mouseover(function(){
                        $(this).css("background","#fff0e5").siblings(".showList:not(:first)").css("background","#fff")

                    })
                self.page(self.allNum)
               
            },
            fail:function(err){
                console.log(err)
            }
        })
        dataObj.attentionFlag=1;
        // console.log(dataObj)
        $.ajax({
            url:"http://47.93.102.34:8088/cmscm/webshop/showResource",
            type:"post",
            dataType:"json",
            data:dataObj,
            success:function(data){
                // console.log(data[0])
                console.log(data)
                $('.myFollows').html('我关注的('+data[0].count+')');
            },
            fail:function(err){
                console.log(err)
            }
        })
    },
    getFollowSource:function(dataObj){
        $('.list-title-box').show()
        var self=this;
        console.log(dataObj)
        $.ajax({
            url:"http://47.93.102.34:8088/cmscm/webshop/showResource",
            type:"post",
            dataType:"json",
            data:dataObj,
            success:function(data){
                console.log(data[0])
                if(data[0].ret==0){
                    $('.list-title-box').hide()
                    self.allNum=data[0].count;
                    $ul=$("<ul class='showList_content spot_f1'></ul>")
                    $(data[0].content).each(function(index){
                        var followStr="";
                        if(data.attentionId==""){
                            followStr='<br /><button data-resourceId="'+$(this)[0].resourceId+'" class="follow">'+'关注'+'</button>'
                        }else{
                            followStr='<br /><button data-attentionId="'+$(this)[0].attentionId+'" class="cancelFollow">'+'取消关注'+'</button>'
                        }
                        
                        if(index==0){
                            $showList=$('<li class="showList showList_1">'
                            +'<span class="checkwrap"><input type="checkbox"></span>'
                            +'<span class="company">'+$(this)[0].companyName+'</span>'
                            +'<span class="uploader">'+$(this)[0].uploader+''
                                +followStr
                            +'</span>'
                            +'<span class="species">'+$(this)[0].speciesList+'</span>'
                            +'<span class="factory">'+$(this)[0].factoryList+'</span>'
                            +'<span class="resourceDes">'+$(this)[0].resourceDes+''  
                            +'</span>'
                            +'<span class="uploadTime">'+$(this)[0].uploadTime+'</span>'
                            +'<span class="todayPrice">'+$(this)[0].todayPrice+'</span>'
                            +'<p class="notice">此条消息为本人提供</p>'
                        +'</li>');
                        }else{
                            $showList=$('<li class="showList">'
                            +'<span class="checkwrap"><input type="checkbox"></span>'
                            +'<span class="company">'+$(this)[0].companyName+'</span>'
                            +'<span class="uploader">'+$(this)[0].uploader+''
                                +followStr
                            +'</span>'
                            +'<span class="species">'+$(this)[0].speciesList+'</span>'
                            +'<span class="factory">'+$(this)[0].factoryList+'</span>'
                            +'<span class="resourceDes">'+$(this)[0].resourceDes+''  
                            +'</span>'
                            +'<span class="uploadTime">'+$(this)[0].uploadTime+'</span>'
                            +'<span class="todayPrice">'+$(this)[0].todayPrice+'</span>'
                        +'</li>');
                        }
                        
                        $ul.append($showList)
                        
                    })

                    $("#showList_content").html($ul)

                }
                $(".showList:not(:first)").mouseover(function(){
                        $(this).css("background","#fff0e5").siblings(".showList:not(:first)").css("background","#fff")

                    })
                self.page(self.allNum)
               
            },
            fail:function(err){
                console.log(err)
            }
        })
    },
	page:function(count){
		var self=this;
		var currentPage=self.dataObj.currentPage;
		var numPerPage=self.dataObj.numPerPage;
		var allPage=self.allNum/numPerPage>0?Math.ceil(self.allNum/numPerPage):1;
		self.productPage(allPage,currentPage)
		if(self.dataObj.currentPage==1){
			$(".resource_btnList .prePage").prop("disabled",true)
		}else{
			$(".resource_btnList .prePage").prop("disabled",false)
		}
		//上一页按钮功能
		$(".resource_btnList .prePage").click(function(){
			self.dataObj.currentPage--;
			if(self.dataObj.type==1){
				self.getGTSource(self.dataObj)
			}else if(self.dataObj.type==2){
				self.getJDSource(self.dataObj)
			}else if(self.dataObj.type==7){
				self.getGTSource(self.dataObj)
			}
			self.changeBtnBg(self.dataObj.currentPage)
		})
		if(self.dataObj.currentPage==allPage){
			$(".resource_btnList .nextPage").prop("disabled",true)
		}else{
			$(".resource_btnList .nextPage").prop("disabled",false)
		}
		//下一页按钮功能
		$(".resource_btnList .nextPage").click(function(){
			self.dataObj.currentPage++;
			if(self.dataObj.type==1){
				self.getGTSource(self.dataObj)
			}else if(self.dataObj.type==2){
				self.getJDSource(self.dataObj)
			}else if(self.dataObj.type==7){
				self.getGTSource(self.dataObj)
			}
			self.changeBtnBg(self.dataObj.currentPage)
		})
		//具体数字页按钮功能
		$(".resource_btnList .num_button").each(function(index){
			$(this).click(function(){
				self.dataObj.currentPage=index+1;
				console.log(self.dataObj.currentPage)
				if(self.dataObj.type==1){
					self.getGTSource(self.dataObj)
				}else if(self.dataObj.type==2){
					self.getJDSource(self.dataObj)
				}else if(self.dataObj.type==7){
					self.getGTSource(self.dataObj)
				}
				// self.changeBtnBg(self.dataObj.currentPage)
				console.log($(this)[0])
			})
		})
		//跳到输入页码功能
		$(".resource_btnList .goNumPage").click(function(){
			if($(".numPageInp").val()>=1&&$(".numPageInp").val()<=allPage){
				self.dataObj.currentPage=$(".numPageInp").val()
			}else{
				self.dataObj.currentPage=self.dataObj.currentPage;
			}
			console.log(self.dataObj.currentPage)
			if(self.dataObj.type==1){
				self.getGTSource(self.dataObj)
			}else if(self.dataObj.type==2){
				self.getJDSource(self.dataObj)
			}else if(self.dataObj.type==7){
				self.getGTSource(self.dataObj)
			}
		})
	},
	productPage:function(allPage,currentPage){
		$btnList_content=$('<div class="btnList_content"></div>')
		$btnList_content.append($('<button class="prePage">上一页</button>'))
		if(allPage<7){
			for(var i=1;i<=allPage;i++){
				if(i==currentPage){
					$btnList_content.append($('<button class="num_button current">'+i+'</button>'))
				}else{
					$btnList_content.append($('<button class="num_button">'+i+'</button>'))
				}
			}
		}else{
			if(currentPage<=7){
				for(var i=1;i<=7;i++){
					if(i==currentPage){
						$btnList_content.append($('<button class="num_button current">'+i+'</button>'))
					}else{
						$btnList_content.append($('<button class="num_button">'+i+'</button>'))
					}
				}
			}else{
				for(var i=currentPage-6;i<=currentPage;i++){
					if(i==currentPage){
						$btnList_content.append($('<button class="num_button current">'+i+'</button>'))
					}else{
						$btnList_content.append($('<button class="num_button">'+i+'</button>'))
					}
				}
			}
			
			 if(allPage!=currentPage){
                $btnList_content.append($('<span>...</span>'))
            }
		}
		$btnList_content.append($('<button class="nextPage">下一页</button>'))
		$btnList_content.append($('<span class="allNum">共'+allPage+'页</span>'))
		$btnList_content.append($('<label>到</label><input class="numPageInp" type="text"><label>页</label>'
        								+'<input type="button" class="goNumPage" value="确定">'))
		$(".resource_btnList").html($btnList_content)
	},
    //得到用户分组
    getGroup:function(userId,resourceId){
        var self=this;
        $.ajax({
            url:"http://47.93.102.34:8088/cmscm/webresource/webResourceGroup",
            type:"post",
            dataType:"json",
            data:{
                userId:userId
            },
            success:function(data){
                console.log(data)
                $opStr="";
                $opStr+="<option value='"+data[0].defaultGroup.groupId+"'>"+data[0].defaultGroup.groupName+"</option>";
                $(data[0].content).each(function(){
                    $opStr+="<option value='"+$(this)[0].groupId+"'>"+$(this)[0].groupName+"</option>";
                })
                var M = {};
                if(M.dialog3){
                    return M.dialog3.show();
                }
                M.dialog3 = jqueryAlert({
                    'style'   : 'pc',
                    'width':'410',
                    'height' : "175",
                    'background' : '#fff',
                    'content' : '<div class="ico_alert fl"><img src="images/alert-!.png"></div>' +
                    '<div class="content_alert fl">' +
                    '<div class="title_alert">请选择分组？</div>' +
                    '<select class="group" style="width:200px">'+$opStr+'</select>'+
                    '<div class="error_txt"></div>' +
                    '</div>' +
                    '<div class="clearfix"></div>',
                    'modal'   : true,
                    'buttons' :{
                        '确定' : function(){
                            console.log($(".group").val())
                             console.log($(".group").find("option:selected").text())
                            self.saveAttention(resourceId,$(".group").val(),$(".group").find("option:selected").text(),resource.userId)
                            M.dialog3.close();
                        },
                        '取消' : function () {
                            M.dialog3.close();
                        }
                    }
                });
                
        
            },
            fail:function(err){
                console.log(err)
            }
        })
    },
    //单个关注
    saveAttention:function(resourceId,groupId,groupName,userId){
        $.ajax({
            url:"http://47.93.102.34:8088/cmscm/webresource/saveAttention",
            type:"post",
            dataType:"json",
            data:{
                resourceId:resourceId,
                groupId:groupId,
                groupName:groupName,
                userId:userId
            },
            success:function(data){
                console.log(data)
                if(data[0].ret == 0){
                    location.href=location.href;
                }
                // $("#species").html("")
                // $("#species").append($('<option value="">全部</option>'))
                // $(data[0].content).each(function(index){
                //      $ops=$("<option value='"+data[0].content[index]+"'>"+data[0].content[index]+"</option>")
                //       $("#species").append($ops)
                // })   

            },
            fail:function(err){
                console.log(err)
            }
        })
    },
    //取消关注
    unfollow:function(attentionId,userId){
        $.ajax({
            url:"http://47.93.102.34:8088/cmscm/webresource/unfollow",
            type:"post",
            dataType:"json",
            data:{
                attentionId:attentionId,
                userId:userId
            },
            success:function(data){
                console.log(data)
                  
            },
            fail:function(err){
                console.log(err)
            }
        })
    },
	ppp:function(){alert(1)}
}

$(function(){

        resource.getGTSource(resource.dataObj)
        resource.getSpecies(resource.dataObj.type)   //调用获取主营品种,页面初次加载获取的是废钢铁的主营品种
        
        //废钢铁、废纸、废家电切换
        $(".resource_tab .tab1").each(function(index){
            
            $(this).click(function(){
                $(".resource_tab .tab1").removeClass("active")
                $(this).addClass("active")
                resource.dataObj.species=""
	            resource.dataObj.factory=""
	            resource.dataObj.companyName=""
	            resource.dataObj.currentPage=1
                if(index==2){
                    resource.dataObj.type=2;
                    // $(".resource_showList.f2").show()
                    // $(".resource_showList.f1").hide()
                    resource.getJDSource(resource.dataObj)
                    resource.getSpecies(2)
                }else if(index==1){
                    resource.dataObj.type=7;
                    resource.getGTSource(resource.dataObj)
                    resource.getSpecies(3)
                    // $(".resource_showList.f2").hide()
                    // $(".resource_showList.f1").show()
                }else if(index==0){
                    resource.dataObj.type=1;
                    resource.getGTSource(resource.dataObj)
                    resource.getSpecies(1)
                    // $(".resource_showList.f2").hide()
                    // $(".resource_showList.f1").show()
                }
            })
            
        })

        $(".showList:not(:first)").mouseover(function(){
			$(this).css("background","#fff0e5").siblings(".showList:not(:first)").css("background","#fff")

		})
        //搜索功能
        $("#search").click(function(){
            resource.dataObj.species=$("#species").val()
            resource.dataObj.factory=$("#factory").val()
            resource.dataObj.companyName=$("#company").val()
            if(resource.dataObj.type==1){
            	resource.dataObj.type=1
                resource.getGTSource(resource.dataObj)
            }else if(resource.dataObj.type==2){
            	resource.dataObj.type=2
                resource.getJDSource(resource.dataObj)
            }else if(resource.dataObj.type==7){
            	resource.dataObj.type=7
                resource.getGTSource(resource.dataObj)
            }
        })
       
        //全选
        $(".showList_nav input[type=checkbox]").click(function(){
            if($(this).is(":checked")){
                $(".showList_content.spot_f1 input[type=checkbox]").prop("checked",true)
            }else{
                $(".showList_content.spot_f1 input[type=checkbox]").prop("checked",false)
            }
            
        })
        $('.follow_all').click(function(){
            var M = {};
                if(M.dialog3){
                    return M.dialog3.show();
                }
                M.dialog3 = jqueryAlert({
                    'style'   : 'pc',
                    'width':'410',
                    'height' : "175",
                    'background' : '#fff',
                    'content' : '<div class="ico_alert fl"><img src="images/alert-!.png"></div>' +
                    '<div class="content_alert fl">' +
                    '<div class="title_alert">确定批量关注?</div>' +
                    '<div class="title_alert">批量关注后，可关注所有勾选项</div>' +
                    '<div class="error_txt"></div>' +
                    '</div>' +
                    '<div class="clearfix"></div>',
                    'modal'   : true,
                    'buttons' :{
                        '确定' : function(){
                            resource.unfollow()
                            M.dialog3.close();
                        },
                        '取消' : function () {
                            M.dialog3.close();
                        }
                    }
                });
        })
       
        $('.myFollows').click(function(){
            $(this).css({'background':'#ee7700','color':'#fff','border':'1px solid #ee7700'})
                    .prev().css({'color':'#000','background':'#f7f7f7','border':'1px solid #e6e6e6'})
            if(resource.dataObj.type==1){
                resource.dataObj.attentionFlag=1;
                resource.getFollowSource(resource.dataObj)
            }else if(resource.dataObj.type==7){
                resource.dataObj.attentionFlag=1;
                resource.getFollowSource(resource.dataObj)
            }else if(resource.dataObj.type==2){
                resource.dataObj.attentionFlag=1;
                resource.getFollowSource(resource.dataObj)
            }
                
        }).prev().click(function(){
            $(this).css({'background':'#ee7700','color':'#fff','border':'1px solid #ee7700'})
                    .next().css({'color':'#000','background':'#f7f7f7','border':'1px solid #e6e6e6'})
            if(resource.dataObj.type==1){
                resource.dataObj.attentionFlag=0;
                resource.getGTSource(resource.dataObj)
            }else if(resource.dataObj.type==7){
                resource.dataObj.attentionFlag=0;
                resource.getGTSource(resource.dataObj)
            }else if(resource.dataObj.type==2){
                resource.dataObj.attentionFlag=0;
                resource.getJDSource(resource.dataObj)
            }
        });

      


	$(document).on("click", ".cancelFollow", function() {
		var attentionId=$(this).attr("data-attentionId");//"aedfb2213a434f13baeefbb2e12a4eac";
		alert(attentionId);
		var userId="327b4305c23342939b0659fa10ac3eab";
		var obj=$(this);
		$.ajax({
            url:"http://47.93.102.34:8088/cmscm/webresource/unfollow",
            type:"post",
            dataType:"json",
            data:{
                attentionId:attentionId,
                userId:userId
            },
            success:function(data){
                if(data[0].ret=="0"){
					obj.text("关注").removeClass("cancelFollow").addClass("follow");
					alert(data[0].message);
				}else{
				  alert(data[0].message);
				}
                  
            }
        })
	});

		$(document).on("click", ".follow", function() {
			
		var resourceId=$(this).attr("data-resourceId");//"6fe4543d57264c3e84faadde0724a6c13";
		var userId="327b4305c23342939b0659fa10ac3eab";
		var obj=$(this);
        $.ajax({
            url:"http://47.93.102.34:8088/cmscm/webresource/webResourceGroup",
            type:"post",
            dataType:"json",
            data:{
                userId:userId
            },
            success:function(data){
                console.log(data)
                $opStr="";
                $opStr+="<option value='"+data[0].defaultGroup.groupId+"'>"+data[0].defaultGroup.groupName+"</option>";
                $(data[0].content).each(function(){
                    $opStr+="<option value='"+$(this)[0].groupId+"'>"+$(this)[0].groupName+"</option>";
                })
                var M = {};
                if(M.dialog3){
                    return M.dialog3.show();
                }
                M.dialog3 = jqueryAlert({
                    'style'   : 'pc',
                    'width':'410',
                    'height' : "175",
                    'background' : '#fff',
                    'content' : '<div class="ico_alert fl"><img src="images/alert-!.png"></div>' +
                    '<div class="content_alert fl">' +
                    '<div class="title_alert">请选择分组？</div>' +
                    '<select class="group" style="width:200px">'+$opStr+'</select>'+
                    '<div class="error_txt"></div>' +
                    '</div>' +
                    '<div class="clearfix"></div>',
                    'modal'   : true,
                    'buttons' :{
                        '确定' : function(){
                            console.log($(".group").val())
                             console.log($(".group").find("option:selected").text())
							var groupId=$(".group").val();
							var groupName=$(".group").find("option:selected").text();
						
                           $.ajax({
								url:"http://47.93.102.34:8088/cmscm/webresource/saveAttention",
								type:"post",
								dataType:"json",
								data:{
									resourceId:resourceId,
									groupId:groupId,
									groupName:groupName,
									userId:userId
								},
								success:function(data){
									if(data[0].ret == 0){
										obj.text("取消关注").removeClass("follow").addClass("cancelFollow");
										alert(data[0].message);
									}else{
										alert(data[0].message);
									}


								}
							})
                            M.dialog3.close();
                        },
                        '取消' : function () {
                            M.dialog3.close();
                        }
                    }
                });
                
        
            },
            fail:function(err){
                console.log(err)
            }
        })

			

	});




	})

