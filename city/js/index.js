//钢铁 纸 家电品名改变从后台获取规格数据
$('#product_ming2').change(function() {
	var va = $(this).val();
	if(va == '') {
		home.selSearch();
	} else {
		$.ajax({
			type: "post",
			url: "http://47.93.102.34:8088/cmscm/webshop/showSizeAp",
			async: false,
			data: {
				"species": va
			},
			success: function(ags) {
				var Data = ags[0].content;
				$('.gui').html("");
				//$('.gui').append('<option value="">请选择</option>');
				for(var i = 0; i < Data.length; i++) {
					$('.gui').append('<option value="' + Data[i] + '">' + Data[i] + '</option>');
				}
			}
		});
	}
})

var home = {
	changeVal1: "",
	changeVal2: "",
	product_name1: "",
	product_name2: "",
	/*钢铁 纸 家电条件搜索*/
	selSearch: function() {
		$.ajax({
			type: "post",
			url: "http://47.93.102.34:8088/cmscm/webshop/showSizeAp",
			async: true,
			data: {
				"species": ''
			},
			success: function(ags) {
				var Data = ags[0].content;
				$('.gui').html("");
				$('.gui').append('<option value="">请选择</option>');
				//				for(var i = 0; i < Data.length; i++) {
				//					$('.gui').append('<option value="' + Data[i] + '">' + Data[i] + '</option>');
				//				}
			}
		});
	},

	//废铁曲线图
	scrapHighChart: function() {
		var dataArr = []; //y轴数据 所有钢铁类的平均值
		var timeArr = []; //x轴数据 时间
		var splist = [];
		//数字转化为两位小数
		function fomatFloat(src, pos) {
			return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
		}
		//首页废铁Ajax
		function scrap() {
			$.ajax({
				url: 'http://47.93.102.34:8088/cmscm/webshop/showShouYeGT?type=1',
				type: 'post',
				async: false,
				dataType: 'json',
				success: function(res) {
					$("body").removeClass("hao-loading");
					data = res[0].content;
					var arr = [];
					$(data).each(function() {
						timeArr.push(this.monthTime.slice(6));
						var speciesList = this.speciesList;
						splist.push(speciesList);
						var gangTieAvg = 0;
						var len = speciesList.length;
						if(len == 0) {
							gangTieAvg = 0;
						} else {
							$.each(speciesList, function(index, value) {
								var a = value.avg;
								a = parseInt(a, 10);
								gangTieAvg += a;
							});
							gangTieAvg = gangTieAvg / len;
						}
						gangTieAvg = fomatFloat(gangTieAvg, 2);
						arr.unshift(gangTieAvg);

					});
					//提取城市矿山指数下数据
//					var count = arr[0];
//					arr.forEach(function(item, index) {
//						if(index > 0) {
//							if(item.length > 0) {
//								item.forEach(function(item2) {
//									count.forEach(function(countItem, index2) {
//										if(item2.speciesId === countItem.speciesId) {
//											count[index2].avg = countItem.avg + item2.avg;
//										}
//									});
//									if(count.filter(function(countItem) {
//											return countItem.speciesId === item2.speciesId
//										}).length === 0) {
//										count.push(item2);
//									}
//								});
//							}
//						}
//
//					});
					$swiper_slide = $('<div class="swiper-slide swiper-pad"><div>' +
						'<p class="main_title">天津地区 废钢铁</p>' +
						'</div></div>');
					$main_pic_list = $('<div class="main_pic_list pad-top-36"></div>');

					$(splist[0]).each(function() {
						//						this.avg = this.avg.toFixed(2);
						$main_list_flex = $('' +
							'<div class="main_list_flex">' +
							'<p class="main_list_money">' +
							'<span class="main_list_red">' + this.avg.toFixed(2) + '</span>' +
							'<span>元</span>' +
							'</p>'
							// +'<p class="main_list_num">'
							// +'<span>'
							// +'<img src="images/sanjiaoxing.png" alt="">'//三角形图标
							// +'</span>'
							// +'<span class="main_list_color">40</span>'
							// +'</p>'
							+
							'<p class="main_list_text">' + this.speciesName + '</p>' +
							'</div>'
						);

						if($main_pic_list.children().length < 2) {
							$main_pic_list.append($main_list_flex);
						} else {
							$main_pic_list = $('<div class="main_pic_list"></div>');
							$main_pic_list.append($main_list_flex);
						}
						$swiper_slide.append($main_pic_list);
						if($swiper_slide.children(".main_pic_list").length <= 3) {} else {
							$swiper_slide = $('<div class="swiper-slide swiper-pad"><div>' +
								'<p class="main_title">天津地区 废家电</p>' +
								'</div></div>');
							$swiper_slide.append($main_pic_list)

						}
						$("#swiper_feitie").empty().append($swiper_slide);
					});

					var mySwiper2 = new Swiper('#swiper-container2', {
						// 如果需要前进后退按钮
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev'
					});
					highchartFn(timeArr, arr)
				}

			})
		}
		scrap();

		function highchartFn(timeArr, dataArr) {
			$('#scrap').highcharts({
				axisLabel: {
					interval: 0
				},
				chart: {
					// type: 'spline'
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
					labels: {
						format: '{value: %m / %d }',
						align: 'center',
						rotation: 0
					}
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
				credits: {
					enabled: false
				},
				legend: { //方框所在的位置(不知道怎么表达)  
					layout: 'vertical',
					// align: 'right',
					verticalAlign: 'top',
					x: 190,
					y: -14,
					borderWidth: 0
				},
				series: [{
					name: '<b style="color:#333333;font-weight:100;font-size:15px">钢材</b>',

					data: dataArr,
					pointStart: Date.UTC(2017, (timeArr[timeArr.length - 1] - 1), 1),
					pointInterval: 30 * 24 * 3600 * 1000
				}, ],
				navigation: {
					menuItemStyle: {
						fontSize: '10px'
					}
				}
			});
		}
	},
	//废纸曲线图
	paperHighChart: function() {

		$('#paper').highcharts({
			chart: {
				// type: 'spline'
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
				labels: {
					format: '{value: %m / %d }',
					align: 'center',
					rotation: 0
				}
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
					}
				}
			},
			credits: {
				enabled: false
			},
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

				data: [0.9, 0.6, 3.5, 8.4, 13.5, 17.0],
				pointStart: Date.UTC(2017, 2, 1),
				pointInterval: 30 * 24 * 3600 * 1000
			}, ],
			navigation: {
				menuItemStyle: {
					fontSize: '10px'
				}
			}
		});
	},
	//废家电
	applianceHighChart: function() {
		var dataArr = [];
		var xAxisLable = [];

		function appliance() {
			$.ajax({
				url: 'http://47.93.102.34:8088/cmscm/webshop/showShouYeJD',
				type: 'post',
				async: true,
				dataType: 'json',
				success: function(res) {
					var result = res[0].content;
					var resultArr = [];
					var price = 0;

					$.each(result[0].speciesList, function(index, value) {
						xAxisLable.push(value.species);
						$.each(value.sizeList, function(i, v) {

							price += v.price;
						});
						dataArr.push(price / value.sizeList.length);
					})

					if(dataArr.length == 0) {
						dataArr = [0, 0];
						xAxisLable = [0, 0];
					}

					applianceHighchartFn(xAxisLable, dataArr)
				}

			})
		}
		appliance();

		function applianceHighchartFn(xAxisLable, dataArr) {
			$('#appliance').highcharts({
				chart: {
					type: 'column'
				},
				title: {
					text: '废家电指数',
					align: 'left',
					style: {
						fontSize: '17px'
					},
					y: 6
				},
				xAxis: {
					type: 'categories',
					categories: xAxisLable
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
						}
						// pointInterval: 10 * 24 * 3600 * 1000, // one hour
						// pointStart: Date.UTC(2017, 0, 0, 0, 0, 0)
					}
				},
				credits: {
					enabled: false
				},
				legend: { //方框所在的位置(不知道怎么表达)  
					layout: 'vertical',
					// align: 'right',
					verticalAlign: 'top',
					x: 190,
					y: -14,
					borderWidth: 0
				},
				series: [{
					name: '<b style="color:#333333;font-weight:100;font-size:15px">家电</b>',

					data: dataArr
				}, ],
				navigation: {
					menuItemStyle: {
						fontSize: '10px'
					}
				}
			});
		}
	},
	//精选推荐
	recommend: function() {
		var list = '';
		$.ajax({
			url: 'http://47.93.102.34:8088/cmscm/rank/showStatBySpeciesGT',
			type: 'post',
			async: false,
			dataType: 'json',
			success: function(res) {
				var data = res[0].content;
				if(data.length != 0) {
					for(var i = 0; i < data.length; i++) {
						list += '<div class="main_product">' +
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
					$('#product_type').empty().html(list)
				} else {
					$('#product_type').html('<img class="nodata_img" src="images/nodata.jpg"/>')
				}

			}
		})
	},
	//成交单数
	yesterdayAjax: function() {
		var list = '';
		$.ajax({
			url: 'http://47.93.102.34:8088/cmscm/rank/showIndexRightStat',
			timeout: 1000, //超时时间设置，单位毫秒
			type: 'post',
			async: true,
			dataType: 'json',
			complete: function(XMLHttpRequest, status) {　
				if(status == 'timeout') {　
					var nodate_pic = '<img class="nodata_img" style="height: 64%" src="images/nodata.jpg"/>';　　　　
					$('.main_pic_result').append(nodate_pic);
				}　　
			},
			success: function(res) {
				$("body").removeClass("hao-loading");
				var data = res[0].content;

				$zr_li1 = $('<div class="main_result_box main_result_box1 p-10 zr_li1">' +
					'<p class="main_result_people">' +
					'昨日成交' +
					'</p>' +
					'<p class="main_result_parent">' +
					'<span class="main_result_num" id="yesterdayDan">' + data.yesterdayDan + '</span>' +
					'<span class="main_result_dan">单</span>' +
					'</p>' +
					'</div>');
				$('.main_pic_result').append($zr_li1);
				$main_result_flex = $('<div class="main_result_box p-10 main_result_flex Bord1 zr_li2">' +
					'<div class="main_result_panel Bord">' +
					'<p class="main_result_people">' +
					'<span class="main_result_type">' +
					'钢铁' +
					'</span>' +
					'<span class="main_result_zuo">' +
					'昨日成交' +
					'</span>' +
					'</p>' +
					'<p class="main_result_parent">' +
					'<span class="main_result_num1" id="totalSteel">' + data.totalSteel + '</span>' +
					'<span class="main_result_dan">吨</span>' +
					'</p>' +
					'<div class="Bord3"></div>' +
					' </div>' +
					'<div class="main_result_panel">' +
					'<p class="main_result_people">' +
					'<span class="main_result_type">' +
					'纸' +
					'</span>' +
					'<span class="main_result_zuo">' +
					'昨日成交' +
					'</span>' +
					'</p>' +
					'<p class="main_result_parent">' +
					'<span class="main_result_num1" id="totalPaper">' + data.totalPaper + '</span>' +
					' <span class="main_result_dan">吨</span>' +
					'</p>' +
					'</div>' +
					'<div class="Bord2"></div>' +
					'</div>')
				$('.main_pic_result').append($main_result_flex);
				// $('#yesterdayDan').text(data.yesterdayDan);
				// $('#totalPaper').text(data.totalPaper);
				// $('#totalSteel').text(data.totalSteel);
			}
		})
	},
	// 首页家电ajax
	household: function() {
		var list = '';
		var $swiper_slide;
		$.ajax({
			url: 'http://47.93.102.34:8088/cmscm/webshop/showShouYeJD',
			type: 'post',
			async: true,
			dataType: 'json',
			success: function(res) {
				$("body").removeClass("hao-loading");
				var data = res[0].content;
				var dataArr = [];
				dataArr = data[0].speciesList;
				if(dataArr.length == 0) {
					$('#swiper-container4').empty().append('<img class="nodata_img" src="images/nodata.jpg"/>');
					return;
				} else {

					$swiper_slide = $('<div class="swiper-slide swiper-pad"><div>' +
						'<p class="main_title">天津地区 废家电</p>' +
						'</div></div>')
					$flex_panel = $('<div class="flex_panel"></div>');
					$(dataArr).each(function(index) {

						$flex_item = $('<div class="flex_item" data-state="false"></div>');
						$flex_item_title = $('<p class="flex_jiadian">' + this.species + '</p>');

						$divBtn = $("<div class='tip_btn' style='background: #D8D8D8;width: 15px;height: 15px;border-radius: 50%;float: right;color: #fff;font-size: 12px;line-height: 15px;text-align: center;margin-top: 15px;cursor: pointer;'> > </div>");
						if(index == 0) {
							$divBtn1 = $("<div style='display: none;width:210px;height: 200px;border: 1px solid #D8D8D8;position: absolute;top:15px;left:100%;background: #fff;z-index: 5000;'>");

						} else if(index == 1) {
							$divBtn1 = $("<div style='display: none;width:210px;height: 200px;border: 1px solid #D8D8D8;position: absolute;top:15px;right:15px;background: #fff;z-index: 5000;'>");

						} else if(index == 2) {
							$divBtn1 = $("<div style='display: none;width:210px;height: 200px;border: 1px solid #D8D8D8;position: absolute;top:-65px;left:100%;background: #fff;z-index: 5000;'>");

						} else if(index == 3) {
							$divBtn1 = $("<div style='display: none;width:210px;height: 200px;border: 1px solid #D8D8D8;position: absolute;top:-65px;right:15px;background: #fff;z-index: 5000;'>");
						} else if(index == 4) {
							$divBtn1 = $("<div style='display: none;width:210px;height: 200px;border: 1px solid #D8D8D8;position: absolute;top:15px;left:100%;background: #fff;z-index: 5000;'>");
						} else {

						}
						$divBtn1_title = $("<div style='width: 100%;height:auto;padding: 5px;border-bottom: 1px dashed #D8D8D8;font-size: 15px;color: #000;text-align: left;line-height: 30px;' class='divBtn1_title'></div>");
						$divBtn1_con = $("<div style='width: 100%;height: 80%;padding: 10px;' class='divBtn1_con'></div>")
						//添加div
						$divBtn1.append($divBtn1_title)
						$divBtn1.append($divBtn1_con)

						$flex_item.append($divBtn);

						$flex_item.append($divBtn1);
						$flex_item.append($flex_item_title);
						//					console.log('$flex_item', $flex_item)
						$divBtn1_title.html('<p class="flex_jiadian">' + this.species + '</p>');
						//点击小按钮事件

						//添加div中数据
						$(this.sizeList).each(function(index) {
							$str1 = $('<p class="flex_type">' +
								'<span class="flex_chicun">' +
								this.size +
								'</span>' +
								'<span class="flex_num">' +
								this.price +
								'元/台</span>' +
								'</p>');
							$divBtn1_con.append($str1);
							if(index < 2) {
								$flex_item_content = $('<p class="flex_type">' +
									'<span class="flex_chicun">' +
									this.size +
									'</span>' +
									'<span class="flex_num">' +
									this.price +
									'元/台</span>' +
									'</p>');

								$flex_item.append($flex_item_content)

							}

						});

						if($flex_panel.children().length < 2) {
							$flex_panel.append($flex_item)
						} else {
							$flex_panel = $('<div class="flex_panel"></div>');
							$flex_panel.append($flex_item)
						}
						$swiper_slide.append($flex_panel);
						if($swiper_slide.children(".flex_panel").length <= 2) {} else {
							$swiper_slide = $('<div class="swiper-slide swiper-pad"><div>' +
								'<p class="main_title">天津地区 废家电</p>' +
								'</div></div>');
							$swiper_slide.append($flex_panel)

						}
						$("#swiper_jiadian").append($swiper_slide)

					})
					$('.tip_btn').each(function() {
						$(this).click(function() {
							$('.tip_btn').next().hide();
							if($(this).parent().attr("data-state") == "false") {
								$(this).next().show();
								$(this).parent().attr("data-state", "true")
							} else {
								$(this).next().hide();
								$(this).parent().attr("data-state", "false")
							}
						});
					})
					var mySwiper4 = new Swiper('#swiper-container4', {
						// 如果需要前进后退按钮
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev'
					});
				}
			}
		})
	}

};

$(function() {
	home.selSearch(); //钢铁 纸 家电条件搜索
	home.scrapHighChart(); //调用废钢铁曲线图
	home.paperHighChart(); //调用废纸曲线图
	home.applianceHighChart(); //调用废家电柱形图
	home.recommend(); //调用精选推荐
	home.yesterdayAjax(); //调用成交单数
	home.household(); // 首页家电ajax
	// 钢铁，纸，家电切换
	$('#product_list').on('click', 'li', function() {
		var index = $(this).index();
		$(this).addClass('li_active').siblings().removeClass('li_active');
		$('.product_main').eq(index).show().siblings().hide();
	});
	$('#product_city').change(function() {
		home.changeVal1 = $(this).val();
	});
	//	$('#product_city2').change(function() {
	//		home.changeVal2 = $(this).val();
	//	});
	$('#product_ming').change(function() {
		home.product_name1 = $(this).val();
	});
	$('#product_ming2').change(function() {
		home.product_name2 = $(this).val();
	});
	$('#search').click(function() {
		var obj = {};
		obj.localCity = home.changeVal1;
		obj.species = home.product_name1;
		obj.caizhi = $('#input_type').val();
		obj.steelMill = $('#input_text').val();
		obj.sign = 1;
		var formData = JSON.stringify(obj);
		console.log(formData);
		// window.location.href = 'steel.html?formData=' + encodeURIComponent(formData);
		window.location.href = 'steel.html?localCity=' + obj.localCity + '&species=' + obj.species + '&caizhi=' + obj.caizhi + '&steelMill=' + obj.steelMill + '&sign=' + obj.sign;
	});
	//钢铁点击按钮搜索
	$('#search2').click(function() {
		var obj = {};
		obj.localCity = $('#product_city2').val();
		obj.species = home.product_name2;
		obj.size = $('#input_type2').val();
		obj.disassembleFactory = $('#input_text2').val();
		obj.sign = 2;
		var formData = JSON.stringify(obj);
		window.location.href = 'steel.html?localCity=' + obj.localCity + '&species=' + obj.species + '&size=' + obj.size + '&disassembleFactory=' + obj.disassembleFactory + '&sign=' + obj.sign;
	});
	/*帮助中心 sidebar*/
	$("#firstpane p.menu_head").click(function() {
		if($(this).css("backgroundImage").indexOf("up_ico.png") != -1) {
			$(this).css({
				backgroundImage: "url(images/down_ico.png)"
			}).next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
		} else {
			$(this).css({
				backgroundImage: "url(images/up_ico.png)"
			}).next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
		}
	});
	//首页banner
	var mySwiper1 = new Swiper('.swiper-container1', {
		autoplay: 3000,
		speed: 300,
		loop: true,
		paginationClickable: true,
		// 如果需要分页器
		pagination: '.swiper-pagination',
	})

	var mySwiper3 = new Swiper('#swiper-container3', {
		// 如果需要前进后退按钮
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev'
	});

});