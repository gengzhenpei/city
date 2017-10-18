var spot={
    allNum:0,
    dataObj:{
        type:2,
        // tradeName:"",
        // size:"",
        numPerPage:20,
        currentPage:1
    },
    //品种
    getSize:function(){
        $.ajax({
            url:"http://47.93.102.34:8088/cmscm/webshop/showSizeAp",
            type:"post",
            dataType:"json",
            data:{
                species:$("#species").val()
            },
            success:function(data){
                $("#size").html("")
                $("#size").append($("<option value=''>全部</option>"))
                $(data[0].content).each(function(){
                     $ops=$("<option value='"+this+"'>"+this+"</option>")
                     $("#size").append($ops)
                })
               
            },
            fail:function(err){
                console.log(err)
            }
        })
    },
    getSpot:function (dataObj){
        $('.list-title-box').show()
        var self=this;
        console.log(dataObj)
        $.ajax({
            url:"http://47.93.102.34:8088/cmscm/webshop/showXianHuo",
            type:"post",
            dataType:"json",
            timeout:10000,
            data:dataObj,
            success:function(data){
                console.log(data[0])
                if(data[0].ret==0){
                    $('.list-title-box').hide()
                    self.allNum=data[0].count;
                    $ul=$("<ul class='showList_content spot_f2'></ul>")
                    $(data[0].content).each(function(){

                        $showList=$('<li class="showList ">'
                            +'<span class="species"><button class="showList_toggle" data-state=true>+</button>'+$(this)[0].species+'</span>'
                            +'<span class="size">'+$(this)[0].size+'</span>'
                            +'<span class="area">天津</span>'
                            +'<span class="supplyNum">'+$(this)[0].supplyNum+'</span>'
                            +'<span class="supplier">'+$(this)[0].supplier+'</span>'
                            +'<span class="supplyTime">'+$(this)[0].supplyTime+'</span>'
                            +'<span class="option_sel"><button>下单</button></span>'
                            +'<p class="showList_son">'
                            +'<span class="species">'+'拾起卖自营'+'</span>'
                            +'<span class="size">'+'四毛普板40*2200L'+'</span>'
                            +'<span class="area">'+'&nbsp;'+'</span>'
                            +'<span class="supplyNum">'+'武安中货库'+'</span>'
                            +'<span class="supplier">'+'39.384'+'</span>'
                            +'<span class="supplyTime">'+'&nbsp;'+'</span>'
                            +'<span class="option_com"><button>下单</button></span>'
                            +'</p></li>');
                        $ul.append($showList)
                    })
                    $("#showList_content").html($ul)
                    allNum=data[0].count;
                }
                self.page(self.allNum)

                $(".showList_toggle").click(function(){
                    $flag=$(this).attr('data-state')
                    if($flag=="true"){
                        $(this).attr('data-state',"false");
                        $(this).text("-").parents(".showList").css("background","#fff4eb").find(".showList_son").fadeIn()
                     }else{
                        $(this).attr('data-state',"true");
                        $(this).text("+").parents(".showList").css("background","#fff").find(".showList_son").hide()
                     }
                    })
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
            $(".spot_btnList .prePage").prop("disabled",true)
        }else{
            $(".spot_btnList .prePage").prop("disabled",false)
        }
        //上一页按钮功能
        $(".spot_btnList .prePage").click(function(){
            self.dataObj.currentPage--;
            self.getSpot(self.dataObj)
        })
        if(self.dataObj.currentPage==allPage){
            $(".spot_btnList .nextPage").prop("disabled",true)
        }else{
            $(".resource_btnList .nextPage").prop("disabled",false)
        }
        //下一页按钮功能
        $(".spot_btnList .nextPage").click(function(){
            self.dataObj.currentPage++;
            self.getSpot(self.dataObj)
        })
        //具体数字页按钮功能
        $(".spot_btnList .num_button").each(function(index){
            $(this).click(function(){
                self.dataObj.currentPage=index+1;
                self.getSpot(self.dataObj)
            })
        })
        //跳到输入页码功能
        $(".spot_btnList .goNumPage").click(function(){
            if($(".numPageInp").val()>=1&&$(".numPageInp").val()<=allPage){
                self.dataObj.currentPage=$(".numPageInp").val()
            }else{
                self.dataObj.currentPage=self.dataObj.currentPage;
            }
            console.log(self.dataObj.currentPage)
            self.getSpot(self.dataObj)
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
        $(".spot_btnList").html($btnList_content)
    }
}
$(function(){
    // $flag=true;
    spot.getSize()    //得到品种
    $("#species").change(spot.getSize)
    spot.getSpot(spot.dataObj)   //废家电数据
    
    $("#search").click(function(){
        spot.dataObj.tradeName=$("#species").val(),
        spot.dataObj.size=$("#size").val(),    
        spot.getSpot(spot.dataObj)
    })
})