$(function() {

	var preliminary = {
		dataObj: {
			type: 1,
			Ob: 1, // 钢铁的种类 ：1， 废家电种类：2， 纸种类： 7
			localCity: "",
			tradeName: "", //品名
			size: "",
			species: "",
			factory: "",
			disassembleFactory: "",
			companyName: "",
			currentPage: 1,
			numPerPage: 20,
			bbbb: true,
			allPage: 4
		},
		clickSearchButton: function() {
			//点击搜索时的数据
			$('.waste-search button').click(function() {
				$('.list-title-wrap').html("");
				var Pm = $('.ipt-brand').val();
				var Gc = $('.gc').val();
				if(preliminary.dataObj.Ob == 1) {
					$('.list-title-wrap').html("");
					$('.list-title-wrap').append('<div class="list-title-box"><img src="images/loading.gif" alt="" class="list-title-img"></div>');
					aaa(Pm, Gc);
				} else if(preliminary.dataObj.Ob == 2) {
					$('.list-title-wrap1').html("");
					$('.list-title-wrap1').append('<div class="list-title-box"><img src="images/loading.gif" alt="" class="list-title-img"></div>');
					aaa();
				} else {
					$('.list-title-wrap').html("");
					$('.list-title-wrap').append('<div class="list-title-box"><img src="images/loading.gif" alt="" class="list-title-img"></div>');
					aaa();
				}

				function aaa(pm, gc) {
					var obj;
					if(preliminary.dataObj.Ob == 2) {
						obj = {
							"type": 2,
							"localCity": $('.whole-country').val(),
							"size": $('.gui').val(),
							"specise": $('.household-electrical-appliances').val(),
							"disassembleFactory": $('.cj').val()
						}
					} else if(preliminary.dataObj.Ob == 1) {
						obj = {
							"type": 1,
							"localCity": $('.whole-country').val(),
							"tradeName": $('.Varieties').val(),
							"steelMill": $('.gc').val()
						};
					} else {
						obj = {
							"type": 7,
							"localCity": $('.whole-country').val(),
							"tradeName": $('.Varieties').val(),
							"steelMill": $('.gc').val()
						};
					}
					$.ajax({
						type: "post",
						url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
						async: true,
						data: obj,
						success: function(ags) {
							preliminary.dataObj.currentPage = 1;
							preliminary.numpag(ags);
							preliminary.btn_judge();
							preliminary.Jump_page_number();
							$('.list-title-wrap').html('');
							$('.list-title-wrap1').html('');
							$('.pageg').html(preliminary.dataObj.numPerPage);
							preliminary.dataObj.bbbb = false;
							var Content_data = ags[0].content;
							if(preliminary.dataObj.Ob == 2) {
								for(var i = 0; i < Content_data.length; i++) {
									$('.list-title-wrap1').append('<div class="resource_btnList1"><div class="waste-data1"><div>' + (i + 1) + '</div><div>' + Content_data[i].shopCode + '</div><div>' + Content_data[i].disassembleFactory + '</div><div>' + Content_data[i].city + '</div><div>' + Content_data[i].typeO + '</div><div>' + Content_data[i].specification + '</div><div>' + Content_data[i].unitPrice + '</div><div>' + Content_data[i].state + '</div><div class="choose"><div>选购</div></div></div><div>');
								}
							} else {
								for(var i = 0; i < Content_data.length; i++) {
									$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
								}
							}
							$('.hang button').eq(0).css('background', 'rgb(240,175,101)');
							
							//找货完成生成新的分页按钮 重新绑定按钮点击事件
							preliminary.nextA();
							preliminary.Jump_page_number();
						},
						error: function(err) {}
					});
				}
			})
		},
		//按钮disabled判断
		btn_judge: function() {
			if(preliminary.dataObj.currentPage == 1) {
				$(".prePage").prop("disabled", true)
			} else {
				$(".prePage").prop("disabled", false)
			}
			if(preliminary.dataObj.currentPage == preliminary.dataObj.allPage) {
				$(".nextPage").prop("disabled", true)
			} else {
				$(".nextPage").prop("disabled", false)
			}
			if(preliminary.dataObj.numPerPage == 1) {
				$(".prePage").prop("disabled", true);
				$(".nextPage").prop("disabled", true)
			}
			if(preliminary.dataObj.numPerPage == preliminary.dataObj.currentPage) {
				$(".nextPage").prop("disabled", true)
			} else {
				$(".nextPage").prop("disabled", false)
			}
		},

		//总页数判断
		numpag: function(data) {
			$('.hang').html('');
			preliminary.dataObj.numPerPage = data[0].count / 20 < 1 ? 1 : Math.ceil(data[0].count / 20);
			preliminary.productPage(preliminary.dataObj.numPerPage, 1);
		},

		//生成分页按钮
		productPage: function(allPage, currentPage) {
			if(allPage < 7) {
				for(var i = 1; i <= allPage; i++) {
					if(i == currentPage) {
						$('.hang').append($('<button class="num_button current">' + i + '</button>'))
					} else {
						$('.hang').append($('<button class="num_button">' + i + '</button>'))
					}
				}
			} else {
				if(currentPage <= 7) {
					for(var i = 1; i <= 7; i++) {
						if(i == currentPage) {
							$('.hang').append($('<button class="num_button current">' + i + '</button>'))
						} else {
							$('.hang').append($('<button class="num_button">' + i + '</button>'))
						}
					}
				} else {
					for(var i = currentPage - 6; i <= currentPage; i++) {
						if(i == currentPage) {
							$('.hang').append($('<button class="num_button current">' + i + '</button>'))
						} else {
							$('.hang').append($('<button class="num_button">' + i + '</button>'))
						}
					}
				}
				$('.hang').append($('<span>...</span>'))
			}
		},

		//初始加载页面的数据 该方法用到的地方有 1.点击导航栏 2.从首页选择条件点击搜索 不同进入方式，传参不一样
		AJAX: function() {
			$(".list-title-box").show().css({
				"text-align": "center",
				"margin": "100px 0"
			});
			if(location.search) {
				preliminary.dataObj.Ob = decodeURIComponent(location.search.slice(1).split('&')[4].split('=')[1]);
				preliminary.dataObj.localCity = decodeURIComponent(location.search.slice(1).split('&')[0].split('=')[1]);
				preliminary.dataObj.tradeName = decodeURIComponent(location.search.slice(1).split('&')[1].split('=')[1]);
				preliminary.dataObj.size = decodeURIComponent(location.search.slice(1).split('&')[2].split('=')[1]);
				preliminary.dataObj.steelMill = decodeURIComponent(location.search.slice(1).split('&')[3].split('=')[1]);
				preliminary.dataObj.disassembleFactory = decodeURIComponent(location.search.slice(1).split('&')[3].split('=')[1]);

				if(preliminary.dataObj.Ob == 1) {
					$('.waste-title li').eq(0).addClass('bottom_border_red');
					$('.list-title, .list-title-wrap').show();
					$('.list-title1, .list-title-wrap1').hide();

					$.ajax({
						type: "post",
						url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
						async: true,
						data: {
							"type": 1, //对应 1：钢铁 ， 2：家电，7：纸
							"localcity": preliminary.dataObj.localCity, //对应 城市
							"tradeName": preliminary.dataObj.tradeName, //对应品名
							"size": preliminary.dataObj.size, //对应钢铁的材质 家电的规格
							"steelMill": preliminary.dataObj.steelMill // 对应钢铁的钢厂
						},
						dataType: "json",
						success: function(data) {
							$(".list-title-box").hide();
							preliminary.dataObj.currentPage = 1;
							preliminary.dataObj.bbbb = true;
							preliminary.numpag(data); //总页数判断，并生成页数按钮
							preliminary.btn_judge();
							preliminary.Jump_page_number();
							$('.pageg').html(preliminary.dataObj.numPerPage); //共多少页
							$('.waste-search').html("");
							$('.hang button').eq(0).css('background', 'rgb(240,175,101)');
							$('.waste-search').append('<span>所在地</span><select class="whole-country"><option value="">请选择</option></select><span>品名</span><select class="Varieties"><option value="">请选择</option></select><span>材质</span><input type="text" class="cz" /><span>需求方</span><input type="text" class="gc" /><span>仓库</span><input type="text" class="ck" /><button>找货</button>');
							$('.Varieties').append('<option value="重型废钢">重型废钢</option><option value="统料废钢">统料废钢</option><option value="中型废钢">中型废钢</option><option value="薄型废钢">薄型废钢</option><option value="小型废钢">小型废钢</option>');
							$('.whole-country').append('<option value="TIANJIN">天津市</option><option value="BEIJING">北京市</option><option value="SHANGHAI">上海市</option><option value="GUANGZHOU">广州市</option><option value="SHENZHEN">深圳市</option><option value="SHIJIAZHUANG">石家庄</option>')
							$('.Varieties').val(preliminary.dataObj.tradeName ? preliminary.dataObj.tradeName : "");
							$('.whole-country').val(preliminary.dataObj.localCity ? preliminary.dataObj.localCity : "");
							$('.gc').val(preliminary.dataObj.steelMill ? preliminary.dataObj.steelMill : "");
							var Content_data = data[0].content;
							// console.log(Content_data);
							if(Content_data.length == 0) {
								return;
							};
							for(var i = 0; i < Content_data.length; i++) {
								$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
							};
							
							//绑定找货按钮点击事件
							preliminary.clickSearchButton();
						}
					})
					
				} else if(preliminary.dataObj.Ob == 2) {
					$('.waste-title li').eq(2).addClass('bottom_border_red');
					$('.list-title, .list-title-wrap').hide();
					$('.list-title1, .list-title-wrap1').show();
					$.ajax({
						type: "post",
						url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
						async: true,
						data: {
							"type": 2, //对应 1：钢铁 ， 2：家电，7：纸
							"localcity": preliminary.dataObj.localCity, //对应 城市
							"tradeName": preliminary.dataObj.tradeName, //对应品名
							"size": preliminary.dataObj.size, //对应钢铁的材质 家电的规格
							"disassembleFactory": preliminary.dataObj.disassembleFactory //对应该废家电的拆解厂
						},
						dataType: "json",
						success: function(data) {
							$(".list-title-box").hide();
							preliminary.dataObj.currentPage = 1;
							preliminary.dataObj.bbbb = true;
							preliminary.numpag(data); //总页数判断，并生成页数按钮
							preliminary.btn_judge();
							preliminary.Jump_page_number();
							$('.pageg').html(preliminary.dataObj.numPerPage); //共多少页
							$('.waste-search').html("");
							$('.hang button').eq(0).css('background', 'rgb(240,175,101)');
							$('.waste-search').append('<span>所在地</span><select class="whole-country"><option value="">请选择</option></select><span>品种</span><select class="household-electrical-appliances"><option value="">请选择</option></select><span>规格</span><select class="gui"><option value="">请选择</option></select><span>拆解企业名称</span><input type="text" class="cj" /><button>找货</button>')
							$('.household-electrical-appliances').append('<option value="废旧洗衣机">废旧洗衣机</option><option value="废旧电冰箱">废旧电冰箱</option><option value="废旧空调器">废旧空调器</option><option value="废旧计算机">废旧计算机</option><option value="废旧电冰柜">废旧电冰柜</option><option value="废旧电视机">废旧电视机</option>');
							$('.whole-country').append('<option value="TIANJIN">天津市</option><option value="BEIJING">北京市</option><option value="SHANGHAI">上海市</option><option value="GUANGZHOU">广州市</option><option value="SHENZHEN">深圳市</option><option value="SHIJIAZHUANG">石家庄</option>')
							$('.whole-country').val(preliminary.dataObj.localCity ? preliminary.dataObj.localCity : "");
							$('.household-electrical-appliances').val(preliminary.dataObj.tradeName ? preliminary.dataObj.tradeName : "")
							$('.cj').val(preliminary.dataObj.disassembleFactory ? preliminary.dataObj.disassembleFactory : "")
							$.ajax({
								type: "post",
								url: "http://47.93.102.34:8088/cmscm/webshop/showSizeAp",
								async: true,
								data: {
									"species": preliminary.dataObj.tradeName
								},
								success: function(ags) {
									var Data = ags[0].content;
									$('.gui').html("");
									$('.gui').append($('<option value="">请选择</option>'))
									for(var i = 0; i < Data.length; i++) {
										$('.gui').append('<option value="' + Data[i] + '">' + Data[i] + '</option>');
									}
									$('.gui').val(preliminary.dataObj.size)

								}
							});
							//废家电品种选择相应的型号也跟着改变
							$('.household-electrical-appliances').change(function() {
								var va = $('.household-electrical-appliances').val();
								$.ajax({
									type: "post",
									url: "http://47.93.102.34:8088/cmscm/webshop/showSizeAp",
									async: true,
									data: {
										"species": va
									},
									success: function(ags) {
										var Data = ags[0].content;
										$('.gui').html("");
										for(var i = 0; i < Data.length; i++) {
											$('.gui').append('<option value="' + Data[i] + '">' + Data[i] + '</option>');
										}
									}
								});
							});
							//循环数据渲染页面
							var Content_data = data[0].content;
							// console.log(Content_data);
							if(Content_data.length == 0) {
								return;
							};
							for(var i = 0; i < Content_data.length; i++) {
								$('.list-title-wrap1').append('<div class="resource_btnList1"><div class="waste-data1"><div>' + (i + 1) + '</div><div>' + Content_data[i].shopCode + '</div><div>' + Content_data[i].disassembleFactory + '</div><div>' + Content_data[i].city + '</div><div>' + Content_data[i].typeO + '</div><div>' + Content_data[i].specification + '</div><div>' + Content_data[i].unitPrice + '</div><div>' + Content_data[i].state + '</div><div class="choose"><div>选购</div></div></div><div>');
							};
							
							//绑定找货按钮点击事件
							preliminary.clickSearchButton();
						}
					})

				} else {
					$('.waste-title li').eq(1).addClass('bottom_border_red');
					$('.list-title, .list-title-wrap').show();
					$('.list-title1, .list-title-wrap1').hide();
					$.ajax({
						type: "post",
						url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
						async: true,
						data: {
							"type": 7, //对应 1：钢铁 ， 2：家电，7：纸
							"localcity": preliminary.dataObj.localCity, //对应 城市
							"tradeName": preliminary.dataObj.tradeName, //对应品名
							"size": preliminary.dataObj.size, //对应钢铁的材质 家电的规格
							"steelMill": preliminary.dataObj.steelMill // 对应钢铁的钢厂
						},
						dataType: "json",
						success: function(data) {
							$(".list-title-box").hide();
							preliminary.dataObj.currentPage = 1;
							preliminary.dataObj.bbbb = true;
							preliminary.numpag(data); //总页数判断，并生成页数按钮
							preliminary.btn_judge();
							preliminary.Jump_page_number();
							$('.pageg').html(preliminary.dataObj.numPerPage); //共多少页
							$('.waste-search').html("");
							$('.hang button').eq(0).css('background', 'rgb(240,175,101)');
							$('.waste-search').append('<span>所在地</span><select class="whole-country"><option value="">全国</option></select><span>品名</span><select class="Varieties"></select><span>材质</span><input type="text" class="cz" /><span>纸厂</span><input type="text" class="gc" /><span>仓库</span><input type="text" class="ck" /><button>找货</button>')
							$('.Varieties').append('<option value="重型废钢">箱板A级</option><option value="统料废钢">箱板B级</option><option value="中型废钢">箱板C级</option><option value="薄型废钢">箱板统货</option><option value="小型废钢">大花统货</option><option value="小型废钢">带皮书切页子</option><option value="小型废钢">混合白纸</option><option value="小型废钢">B级页子纸</option>');
							$('.whole-country').append('<option value="TIANJIN">天津市</option><option value="BEIJIN">北京市</option><option value="SHANGHAI">上海市</option><option value="GUANGZHOU">广州市</option><option value="SHENZHEN">深圳市</option><option value="SHIJIAZHUANG">石家庄</option>')
							$('.Varieties').val(preliminary.dataObj.tradeName ? preliminary.dataObj.tradeName : "");
							$('.whole-country').val(preliminary.dataObj.localCity ? preliminary.dataObj.localCity : "");
							$('.gc').val(preliminary.dataObj.steelMill ? preliminary.dataObj.steelMill : "");
							var Content_data = data[0].content;
							// console.log(Content_data);
							if(Content_data.length == 0) {
								return;
							};
							for(var i = 0; i < Content_data.length; i++) {
								$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
							};
							
							//绑定找货按钮点击事件
							preliminary.clickSearchButton();
						}
					})
				};

			} else {
				$('.waste-title li').eq(0).addClass('bottom_border_red');
				$('.list-title, .list-title-wrap').show();
				$('.list-title1, .list-title-wrap1').hide();
				//location.href 没有 参数
				$.ajax({
					type: "post",
					url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
					async: true,
					data: {
						"type": 1,
						"localCity": '',
						"tradeName": '',
						"size": '',
						"steelMill": '',
						"disassembleFactory": ''
					},
					dataType: "json",
					success: function(data) {
						$(".list-title-box").hide();
						preliminary.dataObj.currentPage = 1;
						preliminary.dataObj.bbbb = true;
						preliminary.numpag(data); //总页数判断，并生成页数按钮
						preliminary.btn_judge();
						preliminary.Jump_page_number();
						$('.pageg').html(preliminary.dataObj.numPerPage); //共多少页
						$('.waste-search').html("");
						$('.hang button').eq(0).css('background', 'rgb(240,175,101)');
						$('.waste-search').append('<select class="whole-country"><option value="">请选择</option></select><span>品种</span><select class="Varieties"><option value="">请选择</option></select><span>材质</span><input type="text" class="cz" /><span>钢厂</span><input type="text" class="gc" /><span>仓库</span><input type="text" class="ck" /><button>找货</button>');
						$('.Varieties').append('<option value="重型废钢">重型废钢</option><option value="统料废钢">统料废钢</option><option value="中型废钢">中型废钢</option><option value="薄型废钢">薄型废钢</option><option value="小型废钢">小型废钢</option>');
						$('.whole-country').append('<option value="TIANJIN">天津市</option><option value="BEIJING">北京市</option><option value="SHANGHAI">上海市</option><option value="GUANGZHOU">广州市</option><option value="SHENZHEN">深圳市</option><option value="SHIJIAZHUANG">石家庄</option>')
						$('.Varieties').val(preliminary.dataObj.tradeName ? preliminary.dataObj.tradeName : "");
						$('.whole-country').val(preliminary.dataObj.localCity ? preliminary.dataObj.localCity : "");
						$('.gc').val(preliminary.dataObj.steelMill ? preliminary.dataObj.steelMill : "");
						var Content_data = data[0].content;
						// console.log(Content_data);
						if(Content_data.length == 0) {
							return;
						};
						for(var i = 0; i < Content_data.length; i++) {
							$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
						};
						
						//绑定找货按钮点击事件
						preliminary.clickSearchButton();
					}
				})
			};

		},
		//废家电  废钢铁  废纸  点击时 初始化
		Clik: function() {
			//废钢铁
			$('.steel-a').click(function() {
				$(".list-title-box").show().css({
					"text-align": "center",
					"margin": "100px 0"
				});
				preliminary.dataObj.Ob = 1;
				preliminary.dataObj.currentPage = 1;
				$('.waste-title li').removeClass('bottom_border_red').eq(0).addClass('bottom_border_red');
				$('.paging ul').html("");
				$('.waste-search').html("");
				$('.list-title-wrap').html("");
				$('.hang').html('');
				$('.pageg').html(preliminary.dataObj.numPerPage);
			
//				preliminary.clickAjax(1);
				
				location.href = 'steel.html?localCity=' +''+ '&species=' + '' + '&caizhi=' + '' + '&steelMill=' + '' + '&sign=' + 1;
				preliminary.AJAX();
				
			})
			//废纸
			$('.waste-paper').click(function() {
				$(".list-title-box").show().css({
					"text-align": "center",
					"margin": "100px 0"
				});
				preliminary.dataObj.Ob = 7;
				preliminary.dataObj.currentPage = 1;
				$('.paging ul').html("");
				$('.waste-search').html("");
				$('.list-title-wrap').html("");
				$('.hang').html('');
				
				$('.waste-title li').removeClass('bottom_border_red').eq(1).addClass('bottom_border_red');
				
				$('.pageg').html(preliminary.dataObj.numPerPage);
//				preliminary.clickAjax(7);
				
				location.href = 'steel.html?localCity=' +''+ '&species=' + '' + '&caizhi=' + '' + '&steelMill=' + '' + '&sign=' + 7;
				preliminary.AJAX();
				
			})
			//废家电
			$('.Waste-home-appliance').click(function() {
				$(".list-title-box").show().css({
					"text-align": "center",
					"margin": "100px 0"
				});
				preliminary.dataObj.Ob = 2;
				preliminary.dataObj.currentPage = 1;
				$('.paging ul').html("");
				$('.waste-search').html("");
				$('.list-title-wrap').html("");
				$('.hang').html('');
				$('.waste-title li').removeClass('bottom_border_red').eq(2).addClass('bottom_border_red');
				$('.pageg').html(preliminary.dataObj.numPerPage);
//				preliminary.clickAjax(2);
				
				
				
				location.href = 'steel.html?localCity=' + '' + '&species=' + '' + '&size=' + '' + '&disassembleFactory=' + '' + '&sign=' + 2;
				preliminary.AJAX();
			})
		},
		//点击下一页  上一页
		nextA: function() {
			//下一页
			$('.paging .nextPage').click(function() {
				if(preliminary.dataObj.bbbb == true) {
					preliminary.dataObj.currentPage++;
					var postData;
					if(preliminary.dataObj.Ob == 1) {
						postData = {
							"type": preliminary.dataObj.Ob,
							"currentPage": preliminary.dataObj.currentPage,
							"localcity": preliminary.dataObj.localCity,
							"tradeName": preliminary.dataObj.tradeName,
							"size": preliminary.dataObj.size,
							"steelMill": preliminary.dataObj.steelMill
						}
					} else if(preliminary.dataObj.Ob == 2) {
						postData = {
							"type": preliminary.dataObj.Ob,
							"currentPage": preliminary.dataObj.currentPage,
							"localcity": preliminary.dataObj.localCity,
							"specise": preliminary.dataObj.tradeName,
							"size": preliminary.dataObj.size,
							"disassembleFactory": preliminary.dataObj.disassembleFactory
						}
					} else if(preliminary.dataObj.Ob == 7) {
						postData = {
							"type": preliminary.dataObj.Ob,
							"currentPage": preliminary.dataObj.currentPage,
							"localcity": preliminary.dataObj.localCity,
							"tradeName": preliminary.dataObj.tradeName,
							"steelMill": preliminary.dataObj.steelMill
						}
					}
					$(".list-title-box").show().css({
						"text-align": "center",
						"margin": "100px 0"
					});
					$.ajax({
						type: "post",
						url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
						async: true,
						data: postData,
						success: function(data) {
							$('.list-title-box').hide()
							preliminary.btn_judge();
							preliminary.Jump_page_number();
							var Content_data = data[0].content;
							if(Content_data.length == 0) {
								return
							}
							if(preliminary.dataObj.Ob == 2) {
								$('.list-title-wrap1').html("");
								for(var i = 0; i < Content_data.length; i++) {
									$('.list-title-wrap1').append('<div class="resource_btnList1"><div class="waste-data1"><div>' + (i + 1) + '</div><div>' + Content_data[i].shopCode + '</div><div>' + Content_data[i].disassembleFactory + '</div><div>' + Content_data[i].city + '</div><div>' + Content_data[i].typeO + '</div><div>' + Content_data[i].specification + '</div><div>' + Content_data[i].unitPrice + '</div><div>' + Content_data[i].state + '</div><div class="choose"><div>选购</div></div></div><div>');
								}
							} else {
								$('.list-title-wrap').html('');
								for(var i = 0; i < Content_data.length; i++) {
									$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
								}
							}

							var num = preliminary.dataObj.currentPage;
							if(num > 7) {
								num = (num % 7) - 1;
							} else {
								num = num - 1;
							}
							$('.hang button').css('background', '');
							$('.hang button').eq(num).css('background', 'rgb(240,175,101)');
						}
					});
				} else {
					$(".list-title-box").show().css({
						"text-align": "center",
						"margin": "100px 0"
					});
					preliminary.dataObj.currentPage++;
					var obj;
					if(preliminary.dataObj.Ob == 2) {
						obj = {
							"type": 2,
							"localCity": $('.whole-country').val(),
							"specise": $('.household-electrical-appliances').val(),
							"size": $('.gui').val(),
							"disassembleFactory": $('.cj').val(),
							"currentPage": preliminary.dataObj.currentPage
						}
					} else if(preliminary.dataObj.Ob == 1) {
						obj = {
							"type": 1,
							"localCity": $('.whole-country').val(),
							"tradeName": $('.Varieties').val(),
							"steelMill": $('.gc').val(),
							"currentPage": preliminary.dataObj.currentPage
						};
					} else {
						obj = {
							"type": 7,
							"localCity": $('.whole-country').val(),
							"tradeName": $('.Varieties').val(),
							"steelMill": $('.gc').val(),
							"currentPage": preliminary.dataObj.currentPage
						};
					}

					$.ajax({
						type: "post",
						url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
						async: true,
						data: obj,
						success: function(ags) {
							$('.list-title-box').hide()
							preliminary.btn_judge();
							preliminary.Jump_page_number();
							$('.list-title-wrap').html('');
							preliminary.dataObj.bbbb = false;
							var Content_data = ags[0].content;
							if(Content_data == null) {
								return
							}

							for(var i = 0; i < Content_data.length; i++) {
								$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
							}

							var num = preliminary.dataObj.currentPage;
							if(num > 7) {
								num = (num % 7) - 1;
							} else {
								num = num - 1;
							}
							$('.hang button').css('background', '');
							$('.hang button').eq(num).css('background', 'rgb(240,175,101)');
						},
						error: function(err) {}
					});

				}
			})

			//上一页
			$('.paging .prePage').click(function() {
				$(".list-title-box").show().css({
					"text-align": "center",
					"margin": "100px 0"
				});
				if(preliminary.dataObj.bbbb == true) {

					preliminary.dataObj.currentPage--;
					var postData;
					if(preliminary.dataObj.Ob == 1) {
						postData = {
							"type": preliminary.dataObj.Ob,
							"currentPage": preliminary.dataObj.currentPage,
							"localcity": preliminary.dataObj.localCity,
							"tradeName": preliminary.dataObj.tradeName,
							"size": preliminary.dataObj.size,
							"steelMill": preliminary.dataObj.steelMill
						}
					} else if(preliminary.dataObj.Ob == 2) {
						postData = {
							"type": preliminary.dataObj.Ob,
							"currentPage": preliminary.dataObj.currentPage,
							"localcity": preliminary.dataObj.localCity,
							"specise": preliminary.dataObj.tradeName,
							"size": preliminary.dataObj.size,
							"disassembleFactory": preliminary.dataObj.disassembleFactory
						}
					} else if(preliminary.dataObj.Ob == 7) {
						postData = {
							"type": preliminary.dataObj.Ob,
							"currentPage": preliminary.dataObj.currentPage,
							"localcity": preliminary.dataObj.localCity,
							"tradeName": preliminary.dataObj.tradeName,
							"size": preliminary.dataObj.size,
							"steelMill": preliminary.dataObj.steelMill
						}
					}
					$.ajax({
						type: "post",
						url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
						async: true,
						data: postData,
						success: function(data) {
							$('.list-title-box').hide()
							preliminary.btn_judge();
							preliminary.Jump_page_number();
							var Content_data = data[0].content;
							if(Content_data.length == 0) {
								return
							}
							if(preliminary.dataObj.Ob == 2) {
								$('.list-title-wrap1').html("");
								for(var i = 0; i < Content_data.length; i++) {
									$('.list-title-wrap1').append('<div class="resource_btnList1"><div class="waste-data1"><div>' + (i + 1) + '</div><div>' + Content_data[i].shopCode + '</div><div>' + Content_data[i].disassembleFactory + '</div><div>' + Content_data[i].city + '</div><div>' + Content_data[i].typeO + '</div><div>' + Content_data[i].specification + '</div><div>' + Content_data[i].unitPrice + '</div><div>' + Content_data[i].state + '</div><div class="choose"><div>选购</div></div></div><div>');
								}
							} else {
								$('.list-title-wrap').html('');
								for(var i = 0; i < Content_data.length; i++) {
									$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
								}
							}

							var num = preliminary.dataObj.currentPage;
							if(num > 7) {
								num = (num % 7) - 1;
							} else {
								num = num - 1;
							}
							$('.hang button').css('background', '');
							$('.hang button').eq(num).css('background', 'rgb(240,175,101)');

						}
					});
				} else {
					preliminary.dataObj.currentPage--;
					var obj;
					if(preliminary.dataObj.Ob == 2) {
						obj = {
							"type": 2,
							"localCity": $('.whole-country').val(),
							"specise": $('.household-electrical-appliances').val(),
							"size": $('.gui').val(),
							"disassembleFactory": $('.cj').val(),
							"currentPage": preliminary.dataObj.currentPage
						}
					} else if(preliminary.dataObj.Ob == 1) {
						obj = {
							"type": 1,
							"localCity": $('.whole-country').val(),
							"tradeName": $('.Varieties').val(),
							"steelMill": $('.gc').val(),
							"currentPage": preliminary.dataObj.currentPage
						};
					} else {
						obj = {
							"type": 7,
							"localCity": $('.whole-country').val(),
							"tradeName": $('.Varieties').val(),
							"steelMill": $('.gc').val(),
							"currentPage": preliminary.dataObj.currentPage
						};
					}

					$.ajax({
						type: "post",
						url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
						async: true,
						data: obj,
						success: function(ags) {
							$('.list-title-box').hide()
							preliminary.btn_judge();
							preliminary.Jump_page_number();
							$('.list-title-wrap').html('');
							preliminary.dataObj.bbbb = false;
							var Content_data = ags[0].content;
							if(Content_data == null) {
								return
							}
							for(var i = 0; i < Content_data.length; i++) {
								$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
							}

							var num = preliminary.dataObj.currentPage;
							if(num > 7) {
								num = (num % 7) - 1;
							} else {
								num = num - 1;
							}
							$('.hang button').css('background', '');
							$('.hang button').eq(num).css('background', 'rgb(240,175,101)');
						},
						error: function(err) {}
					});
				}
			})
		},
		//点击数字跳转页
		Jump_page_number: function() {
			$('.num_button').unbind('click').click(function() {
				preliminary.dataObj.currentPage = $(this).html();
				$('.list-title-wrap1').html('<div class="list-title-box"><img src="images/loading.gif" alt="" class="list-title-img"></div>');
				//$(".list-title-box").show().css({ "text-align": "center", "margin": "100px 0" });
				$(".list-title-box").addClass('loading_pic');
				var postData;
				if(preliminary.dataObj.Ob == 1) {
					postData = {
						"type": preliminary.dataObj.Ob,
						"currentPage": preliminary.dataObj.currentPage,
						"localcity": preliminary.dataObj.localCity,
						"tradeName": preliminary.dataObj.tradeName,
						"size": preliminary.dataObj.size,
						"steelMill": preliminary.dataObj.steelMill
					}
				} else if(preliminary.dataObj.Ob == 2) {
					postData = {
						"type": preliminary.dataObj.Ob,
						"currentPage": preliminary.dataObj.currentPage,
						"localcity": preliminary.dataObj.localCity,
						"tradeName": preliminary.dataObj.tradeName,
						"size": preliminary.dataObj.size,
						"disassembleFactory": preliminary.dataObj.disassembleFactory
					}
				} else if(preliminary.dataObj.Ob == 7) {
					postData = {
						"type": preliminary.dataObj.Ob,
						"currentPage": preliminary.dataObj.currentPage,
						"localcity": preliminary.dataObj.localCity,
						"tradeName": preliminary.dataObj.tradeName,
						"size": preliminary.dataObj.size,
						"steelMill": preliminary.dataObj.steelMill
					}
				}
				console.log('postData', postData)
				if(preliminary.dataObj.bbbb == true) {
					$.ajax({
						type: "post",
						url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
						async: true,
						data: postData,
						success: function(data) {
							$('.list-title-box').hide()
							preliminary.btn_judge();
							preliminary.Jump_page_number();
							var Content_data = data[0].content;
							if(Content_data.length == 0) {
								return
							}
							var num = preliminary.dataObj.currentPage;
							if(num > 7) {
								num = (num % 7) - 1;
							} else {
								num = num - 1;
							}
							$('.hang button').css('background', '');
							$('.hang button').eq(num).css('background', 'rgb(240,175,101)');
							if(preliminary.dataObj.Ob == 2) {
								$('.list-title-wrap1').html("");
								for(var i = 0; i < Content_data.length; i++) {
									$('.list-title-wrap1').append('<div class="resource_btnList1"><div class="waste-data1"><div>' + (i + 1) + '</div><div>' + Content_data[i].shopCode + '</div><div>' + Content_data[i].disassembleFactory + '</div><div>' + Content_data[i].city + '</div><div>' + Content_data[i].typeO + '</div><div>' + Content_data[i].specification + '</div><div>' + Content_data[i].unitPrice + '</div><div>' + Content_data[i].state + '</div><div class="choose"><div>选购</div></div></div><div>');
								}
							} else {
								$('.list-title-wrap').html('');
								for(var i = 0; i < Content_data.length; i++) {
									$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
								}
							}
						}
					});
				} else {
					var obj;
					if(preliminary.dataObj.Ob == 2) {
						obj = {
							"type": 2,
							"localCity": $('.whole-country').val(),
							"specise": $('.household-electrical-appliances').val(),
							"size": $('.gui').val(),
							"disassembleFactory": $('.cj').val(),
							"currentPage": preliminary.dataObj.currentPage
						}
					} else if(preliminary.dataObj.Ob == 1) {
						obj = {
							"type": 1,
							"localCity": $('.whole-country').val(),
							"tradeName": $('.Varieties').val(),
							"steelMill": $('.gc').val(),
							"currentPage": preliminary.dataObj.currentPage
						};
					} else {
						obj = {
							"type": 7,
							"localCity": $('.whole-country').val(),
							"tradeName": $('.Varieties').val(),
							"steelMill": $('.gc').val(),
							"currentPage": preliminary.dataObj.currentPage
						};
					}
					$.ajax({
						type: "post",
						url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
						async: true,
						data: obj,
						success: function(ags) {
							$('.list-title-box').hide()
							preliminary.btn_judge();
							preliminary.Jump_page_number();
							$('.list-title-wrap').html('');
							$('.list-title-wrap1').html('');
							preliminary.dataObj.bbbb = false;
							var Content_data = ags[0].content;
							if(Content_data == null) {
								return
							}
							if(preliminary.dataObj.Ob == 1||preliminary.dataObj.Ob == 7){
								for(var i = 0; i < Content_data.length; i++) {
									$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
								}
							}else{
								for(var i = 0; i < Content_data.length; i++) {
									$('.list-title-wrap1').append('<div class="resource_btnList1"><div class="waste-data1"><div>' + (i + 1) + '</div><div>' + Content_data[i].shopCode + '</div><div>' + Content_data[i].disassembleFactory + '</div><div>' + Content_data[i].city + '</div><div>' + Content_data[i].typeO + '</div><div>' + Content_data[i].specification + '</div><div>' + Content_data[i].unitPrice + '</div><div>' + Content_data[i].state + '</div><div class="choose"><div>选购</div></div></div><div>');
								}
							}
							
							var num = preliminary.dataObj.currentPage;
							if(num > 7) {
								num = (num % 7) - 1;
							} else {
								num = num - 1;
							}
							$('.hang button').css('background', '');
							$('.hang button').eq(num).css('background', 'rgb(240,175,101)');
						},
						error: function(err) {}
					});
				}
			})
			//点击跳转页
			$('.goNumPage').unbind('click').click(function() {
				$(".list-title-box").show().css({
					"text-align": "center",
					"margin": "100px 0"
				});
				var val = $('.numPageInp').val();
				if(val < 1) {
					val = 1;
				} else if(val > preliminary.dataObj.numPerPage) {
					val = preliminary.dataObj.numPerPage;
				}
				preliminary.dataObj.currentPage = val;
				var postData;
				if(preliminary.dataObj.Ob == 1) {
					postData = {
						"type": preliminary.dataObj.Ob,
						"currentPage": preliminary.dataObj.currentPage,
						"localCity": preliminary.dataObj.localCity,
						"tradeName": preliminary.dataObj.tradeName,
						"size": preliminary.dataObj.size,
						"steelMill": preliminary.dataObj.steelMill
					}
				} else if(preliminary.dataObj.Ob == 2) {
					postData = {
						"type": preliminary.dataObj.Ob,
						"currentPage": preliminary.dataObj.currentPage,
						"localCity": preliminary.dataObj.localCity,
						"specise": preliminary.dataObj.tradeName,
						"size": preliminary.dataObj.size,
						"disassembleFactory": preliminary.dataObj.disassembleFactory
					}
				} else if(preliminary.dataObj.Ob == 7) {
					postData = {
						"type": preliminary.dataObj.Ob,
						"currentPage": preliminary.dataObj.currentPage,
						"localcity": preliminary.dataObj.localCity,
						"tradeName": preliminary.dataObj.tradeName,
						"size": preliminary.dataObj.size,
						"steelMill": preliminary.dataObj.steelMill
					}
				}
				if(preliminary.dataObj.bbbb == true) {
					$.ajax({
						type: "post",
						url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
						async: true,
						data: postData,
						success: function(data) {
							$('.list-title-box').hide()
							preliminary.btn_judge();
							preliminary.Jump_page_number();
							var Content_data = data[0].content;
							if(Content_data.length == 0) {
								return
							}
							var num = preliminary.dataObj.currentPage;
							if(num > 7) {
								num = (num % 7) - 1;
							} else {
								num = num - 1;
							}
							$('.hang button').css('background', '');
							$('.hang button').eq(num).css('background', 'rgb(240,175,101)');
							if(preliminary.dataObj.Ob == 2) {
								$('.list-title-wrap1').html("");
								for(var i = 0; i < Content_data.length; i++) {
									$('.list-title-wrap1').append('<div class="resource_btnList1"><div class="waste-data1"><div>' + (i + 1) + '</div><div>' + Content_data[i].shopCode + '</div><div>' + Content_data[i].disassembleFactory + '</div><div>' + Content_data[i].city + '</div><div>' + Content_data[i].typeO + '</div><div>' + Content_data[i].specification + '</div><div>' + Content_data[i].unitPrice + '</div><div>' + Content_data[i].state + '</div><div class="choose"><div>选购</div></div></div><div>');
								}
							} else {
								$('.list-title-wrap').html('');
								for(var i = 0; i < Content_data.length; i++) {
									$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
								}
							}
						}
					});
				} else {
					var obj;
					if(preliminary.dataObj.Ob == 2) {
						obj = {
							"type": 2,
							"localCity": $('.whole-country').val(),
							"specise": $('.household-electrical-appliances').val(),
							"size": $('.gui').val(),
							"disassembleFactory": $('.cj').val(),
							"currentPage": preliminary.dataObj.currentPage
						}
					} else if(preliminary.dataObj.Ob == 1) {
						obj = {
							"type": 1,
							"localCity": $('.whole-country').val(),
							"tradeName": $('.Varieties').val(),
							"steelMill": $('.gc').val(),
							"currentPage": preliminary.dataObj.currentPage
						};
					} else {
						obj = {
							"type": 7,
							"localCity": $('.whole-country').val(),
							"tradeName": $('.Varieties').val(),
							"steelMill": $('.gc').val(),
							"currentPage": preliminary.dataObj.currentPage
						};
					}

					$.ajax({
						type: "post",
						url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
						async: true,
						data: obj,
						success: function(ags) {
							$('.list-title-box').hide()
							preliminary.btn_judge();
							preliminary.Jump_page_number();
							$('.list-title-wrap').html('');
							preliminary.dataObj.bbbb = false;
							var Content_data = ags[0].content;
							if(Content_data == null) {
								return
							}
							for(var i = 0; i < Content_data.length; i++) {
								$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
							}
							var num = preliminary.dataObj.currentPage;
							if(num > 7) {
								num = (num % 7) - 1;
							} else {
								num = num - 1;
							}
							$('.hang button').css('background', '');
							$('.hang button').eq(num).css('background', 'rgb(240,175,101)');
						},
						error: function(err) {}
					});
				}
			})
		},
		clickAjax: function(Ob) {
			$.ajax({
				type: "post",
				url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
				async: true,
				data: {
					"type": Ob,
					"localCity": '',
					"tradeName": '',
					"size": '',
					"steelMill": '',
					"disassembleFactory": ''
				},
				dataType: "json",
				success: function(msg) {
					$(".list-title-wrap .list-title-box").hide();
					$(".list-title-wrap1 .list-title-box").hide();
					
					preliminary.dataObj.currentPage = 1;
					preliminary.dataObj.bbbb = true;
					preliminary.numpag(msg);
					preliminary.btn_judge();
					preliminary.Jump_page_number();
					$('.pageg').html(preliminary.dataObj.numPerPage);
					$('.waste-search').html("");
					$('.hang button').eq(0).css('background', 'rgb(240,175,101)');
					if(Ob == 1) {
						$('.waste-search').append('<select class="whole-country"><option value="">全国</option></select><span>品种</span><select class="Varieties"></select><span>材质</span><input type="text" class="cz" /><span>钢厂</span><input type="text" class="gc" /><span>仓库</span><input type="text" class="ck" /><button>找货</button>');
						$('.Varieties').append('<option value="重型废钢">重型废钢</option><option value="统料废钢">统料废钢</option><option value="中型废钢">中型废钢</option><option value="薄型废钢">薄型废钢</option><option value="小型废钢">小型废钢</option>');
						$('.whole-country').append('<option value="TIANJIN">天津市</option><option value="BEIJIN">北京市</option><option value="SHANGHAI">上海市</option><option value="GUANGZHOU">广州市</option><option value="SHENZHEN">深圳市</option><option value="SHIJIAZHUANG">石家庄</option>')
					} else if(Ob == 2) {
						$('.waste-search').append('<select class="whole-country"><option value="">全国</option></select><span>品种</span><select class="household-electrical-appliances"></select><span>规格</span><select class="gui"></select><span>拆解厂</span><input type="text" class="cj" /><button>找货</button>')
						$('.household-electrical-appliances').append('<option value="废旧洗衣机">废旧洗衣机</option><option value="废旧电冰箱">废旧电冰箱</option><option value="废旧空调器">废旧空调器</option><option value="废旧计算机">废旧计算机</option><option value="电冰柜">电冰柜</option><option value="废旧电视机">废旧电视机</option>');
						$('.whole-country').append('<option value="TIANJIN">天津市</option><option value="BEIJIN">北京市</option><option value="SHANGHAI">上海市</option><option value="GUANGZHOU">广州市</option><option value="SHENZHEN">深圳市</option><option value="SHIJIAZHUANG">石家庄</option>')

						$.ajax({
							type: "post",
							url: "http://47.93.102.34:8088/cmscm/webshop/showSizeAp",
							async: true,
							data: {
								"species": '废旧洗衣机'
							},
							success: function(ags) {
								var Data = ags[0].content;
								$('.gui').html("");
								for(var i = 0; i < Data.length; i++) {
									$('.gui').append('<option value="' + Data[i] + '">' + Data[i] + '</option>');
								}
							}
						});
						$('.household-electrical-appliances').change(function() {
							var va = $('.household-electrical-appliances').val();
							$.ajax({
								type: "post",
								url: "http://47.93.102.34:8088/cmscm/webshop/showSizeAp",
								async: true,
								data: {
									"species": va
								},
								success: function(ags) {
									$('.list-title-box').hide()
									var Data = ags[0].content;
									$('.gui').html("");
									for(var i = 0; i < Data.length; i++) {
										$('.gui').append('<option value="' + Data[i] + '">' + Data[i] + '</option>');
									}
								}
							});
						})

					} else {
						$('.waste-search').append('<select class="whole-country"><option value="">全国</option></select><span>品种</span><select class="Varieties"></select><span>材质</span><input type="text" class="cz" /><span>钢厂</span><input type="text" class="gc" /><span>仓库</span><input type="text" class="ck" /><button>找货</button>')
						$('.Varieties').append('<option value="重型废钢">重型废钢</option><option value="统料废钢">统料废钢</option><option value="中型废钢">中型废钢</option><option value="薄型废钢">薄型废钢</option><option value="小型废钢">小型废钢</option>');
						$('.whole-country').append('<option value="TIANJIN">天津市</option><option value="BEIJIN">北京市</option><option value="SHANGHAI">上海市</option><option value="GUANGZHOU">广州市</option><option value="SHENZHEN">深圳市</option><option value="SHIJIAZHUANG">石家庄</option>')

					}
					var Content_data = msg[0].content;
					// console.log(Content_data);
					if(Content_data.length == 0) {
						return;
					}
					if(Ob == 2) {
						$('.list-title-wrap1').empty();
						$('.list-title').css({
							"display": "none"
						});
						$('.list-title-wrap').css({
							"display": "none"
						});
						$('.list-title1').css({
							"display": "block"
						});
						$('.list-title-wrap1').css({
							"display": "block"
						});
						for(var i = 0; i < Content_data.length; i++) {
							$('.list-title-wrap1').append('<div class="resource_btnList1"><div class="waste-data1"><div>' + (i + 1) + '</div><div>' + Content_data[i].shopCode + '</div><div>' + Content_data[i].disassembleFactory + '</div><div>' + Content_data[i].city + '</div><div>' + Content_data[i].typeO + '</div><div>' + Content_data[i].specification + '</div><div>' + Content_data[i].unitPrice + '</div><div>' + Content_data[i].state + '</div><div class="choose"><div>选购</div></div></div><div>');
						}
					} else {
						$('.list-title').css({
							"display": "block"
						});
						$('.list-title-wrap').css({
							"display": "block"
						});
						$('.list-title1').css({
							"display": "none"
						});
						$('.list-title-wrap1').css({
							"display": "none"
						});
						for(var i = 0; i < Content_data.length; i++) {
							$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
						}
					}
					//绑定找货按钮点击事件
					preliminary.clickSearchButton();
				},
				error: function(err) {
					console.log(err)
				}
			});
		}
	}

	preliminary.AJAX();
	preliminary.Clik();
	preliminary.nextA();
	preliminary.Jump_page_number();
	preliminary.clickSearchButton();
})