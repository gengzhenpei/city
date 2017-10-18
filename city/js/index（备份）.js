$(function() {
    var changeVal1 = '';
    var changeVal2 = '';
    var product_name1 = '';
    var product_name2 = '';
    // 钢铁，纸，家电切换
    $('#product_list').on('click', 'li', function() {
        var index = $(this).index();
        $(this).addClass('li_active').siblings().removeClass('li_active');
        $('.product_main').eq(index).show().siblings().hide();
    });
    $('#product_city').change(function() {
        changeVal1 = $(this).val();
    })
    $('#product_city2').change(function() {
        changeVal2 = $(this).val();
    })
    $('#product_ming').change(function() {
        product_name1 = $(this).val();
    })
    $('#product_ming2').change(function() {
        product_name2 = $(this).val();
    })
    $('#search').click(function() {
        var obj = {};
        obj.localCity = changeVal1;
        obj.species = product_name1;
        obj.caizhi = $('#input_type').val();
        obj.steelMill = $('#input_text').val();
        var formData = JSON.stringify(obj);
        window.location.href = 'steel.html?formData=' + formData;
    })
    $('#search2').click(function() {
        var obj = {};
        obj.localCity = changeVal2;
        obj.species = product_name2;
        obj.size = $('#input_type2').val();
        obj.disassembleFactory = $('#input_text2').val();
        var formData = JSON.stringify(obj);
        window.location.href = 'steel.html?formData=' + formData;
    });
    //废铁曲线图
    $(function() {
        var data = '';
        var arr = [];
        var productList = [];
        var avg = [];
        //首页废铁Ajax
        function scrap() {
            $.ajax({
                url: 'http://47.93.102.34:8088/cmscm/webshop/showShouYeGT?type=1',
                type: 'post',
                async: true,
                dataType: 'json',
                success: function(res) {
                    data = res[0].content;
                 	cb(data)
                }
            })
        }
        scrap();
        
       function cb(data){
       	data.map(function(item) {
		    arr.push(item.monthTime)
		    item.speciesList.map(function(subItem) {
		    	var obj = {};
		    	obj.name = subItem.speciesName;	  
		        avg.push(subItem.avg);
		        obj.data = avg
		        productList.push(obj)
		    });
		});
       	 $('#scrap').highcharts({
            chart: {
                type: 'spline'
            },
            title: {
                text: '废钢铁指数',
                align: 'left',
                style: {
                    fontSize: '17px'
                },
                y: 6
            },
            xAxis: {
                type: 'datetime',
                categories: arr,
            },
            yAxis: {
                title: {
                    text: null
                }
            },

            plotOptions: {
                spline: {
                    lineWidth: 2,
                    states: {
                        hover: {
                            lineWidth: 3
                        }
                    },
                    marker: {
                        enabled: false
                    },
                    // pointInterval: 10 * 24 * 3600 * 1000, // one hour
                    // pointStart: Date.UTC(2017, 0, 0, 0, 0, 0)
                }
            },
            credits: { enabled: false },
            legend: { //方框所在的位置(不知道怎么表达)  
                layout: 'vertical',
                // align: 'right',
                verticalAlign: 'top',
                x: 190,
                y: -14,
                borderWidth: 0
            },
            series: productList,
            // pointInterval: 31 * 24 * 3600 * 1000, // one hour
            // pointStart: Date.UTC(2017, 0, 0, 0, 0, 0),
            navigation: {
                menuItemStyle: {
                    fontSize: '10px'
                }
            }
        });
       }
    });
    //废纸曲线图
    $(function() {
        $('#paper').highcharts({
            chart: {
                type: 'spline'
            },
            title: {
                text: '废纸指数',
                align: 'left',
                style: {
                    fontSize: '17px'
                },
                y: 6
            },
            xAxis: {
                type: 'datetime',

                title: {
                    text: null
                },
                labels: {
                    overflow: 'justify'
                },
                dateTimeLabelFormats: {
                    day: '%e日/%b',
                },
            },
            yAxis: {
                title: {
                    text: null
                }
            },

            plotOptions: {
                spline: {
                    lineWidth: 2,
                    states: {
                        hover: {
                            lineWidth: 3
                        }
                    },
                    marker: {
                        enabled: false
                    },
                    pointInterval: 10 * 24 * 3600 * 1000, // one hour
                    pointStart: Date.UTC(2017, 0, 0, 0, 0, 0)
                }
            },
            credits: { enabled: false },
            legend: { //方框所在的位置(不知道怎么表达)  
                layout: 'vertical',
                // align: 'right',
                verticalAlign: 'top',
                x: 190,
                y: -14,
                borderWidth: 0
            },
            series: [{
                name: '<b style="color:#333333;font-weight:100;font-size:15px">纸</b>',

                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, ],
            navigation: {
                menuItemStyle: {
                    fontSize: '10px'
                }
            }
        });
    });
    // 首页家电ajax
    function household(){
        var list = '';
        $.ajax({
            url:'http://47.93.102.34:8088/cmscm/webshop/showShouYeJD',
            type:'post',
            async:true,
            dataType:'json',
            success:function(res){
                 var data = res[0].content;
                 var dataArr=[];
                 $(data).each(function(){
                    speciesList=this.speciesList
                    $(speciesList).each(function(){
                        dataArr.push(this)
                    })
                 })
                $swiper_slide=$('<div class="swiper-slide swiper-pad1"></div>')
                $flex_panel=$('<div class="flex_panel ff1"></div>')
                $(dataArr).each(function(index){

                    $flex_item=$('<div class="flex_item"></div>')
                    $flex_item_title=$('<p class="flex_jiadian">'+this.species+'</p>')                                                        
                    $flex_item.append($flex_item_title)
                    
                    $(this.sizeList).each(function(index){
                        if(index<2){
                            $flex_item_content=$('<p class="flex_type">'
                               +'<span class="flex_chicun">'
                                   +this.size
                               +'</span>'
                               +'<span class="flex_num">' 
                                   +this.price
                               +'</span>'
                            +'</p>');
                        }else{
                            $flex_item_content=$('<p style="display:none" class="flex_type">'
                               +'<span class="flex_chicun">'
                                   +this.size
                               +'</span>'
                               +'<span class="flex_num">' 
                                   +this.price
                               +'</span>'
                            +'</p>');
                        }
                        
                        $flex_item.append($flex_item_content)
                    })

                    if($flex_panel.children().length<2){
                        $flex_panel.append($flex_item)
                    }else{
                        $flex_panel=$('<div class="flex_panel ff2"></div>')
                        $flex_panel.append($flex_item)
                    }
                    $swiper_slide.append($flex_panel)
                    if($swiper_slide.children().length<=2){
                        
                    }else{
                        $swiper_slide=$('<div class="swiper-slide swiper-pad2"></div>')
                        $swiper_slide.append($flex_panel)
                       
                        
                    }
                    $("#swiper_jiadian").append($swiper_slide)
                 })

            }
        })
    }
    household();
    // 
    //精选推荐
    function recommend() {
        var list = '';
        $.ajax({
            url: 'http://47.93.102.34:8088/cmscm/rank/showStatBySpeciesGT',
            type: 'post',
            async: true,
            dataType: 'json',
            success: function(res) {
                $('#product_type').html('')
                var data = res[0].content;
                for (var i = 0; i < data.length; i++) {
                    list += '<div class="main_product" style="padding-top:13px;">' +
                        '<span>' +
                        '<img src="images/good.png" alt="">' +
                        '</span>' +
                        '<span class="main_pro_name">' +
                        data[i].speciesName +
                        '</span>' +
                        '<span class="main_pro_type">钢材</span>' +
                        '<span class="main_pro_num">' +
                        data[i].price +
                        '</span>' +
                        '</div>'
                }
                $('#product_type').html(list)
            }
        })
    }
    recommend()
        //成交单数
    function yesterdayAjax() {
        var list = '';
        $.ajax({
            url: 'http://47.93.102.34:8088/cmscm/rank/showIndexRightStat',
            type: 'post',
            async: true,
            dataType: 'json',
            success: function(res) {
                var data = res[0].content;
                $('#yesterdayDan').text(data.yesterdayDan);
                $('#totalPaper').text(data.totalPaper);
                $('#totalSteel').text(data.totalSteel);
            }
        })
    }
    yesterdayAjax();
    //首页banner
    var mySwiper = new Swiper('.swiper-container1', {
        autoplay: 5000,
        speed: 300,
        loop: true,
        paginationClickable: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
    })
    var mySwiper = new Swiper('#swiper-container2', {
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    });
    /*帮助中心 sidebar*/
    $("#firstpane p.menu_head").click(function() {
        if ($(this).css("backgroundImage").indexOf("up_ico.png") != -1) {
            $(this).css({ backgroundImage: "url(images/down_ico.png)" }).next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
        } else {
            $(this).css({ backgroundImage: "url(images/up_ico.png)" }).next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
        }
    });
});