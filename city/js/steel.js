$(function() {
	$('.waste-title li').eq(0).css({ "color": "rgb(179,21,24)", "border-bottom": "2px solid rgb(179,21,24)" });
	var preliminary = {
		dataObj: {
			type: 1,
			species: "",
			factory: "",
			localCity: "",
			size: "",
			disassembleFactory: "",
			companyName: "",
			currentPage: 1, 
			numPerPage: 20,
			bbbb: true,
			allPage: 4,
			Ob: 1
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
		//初始加载页面的数据
		AJAX: function () {

			$(".list-title-box").show().css({ "text-align": "center", "margin": "100px 0" });
			if(location.search) {
				// var formData=decodeURIComponent(location.search.slice(1).split('&').split('=')[1]);
				// var chuData=JSON.parse(formData);
				var Ob = decodeURIComponent(location.search.slice(1).split('&')[4].split('=')[1]);;
				var localCity = decodeURIComponent(location.search.slice(1).split('&')[0].split('=')[1]);
				preliminary.dataObj.localCity = localCity;
				var species = decodeURIComponent(location.search.slice(1).split('&')[1].split('=')[1]);
				preliminary.dataObj.species = species;
				var caizhi;
				var steelMill;
				var size;
				var factory;
				if(Ob == 1) {
					preliminary.dataObj.Ob = 1;
					var caizhi = decodeURIComponent(location.search.slice(1).split('&')[2].split('=')[1]);
					var steelMill = decodeURIComponent(location.search.slice(1).split('&')[3].split('=')[1]);
				} else if(Ob == 2) {
					preliminary.dataObj.Ob = 2;
					var size = decodeURIComponent(location.search.slice(1).split('&')[2].split('=')[1]);
					var factory = decodeURIComponent(location.search.slice(1).split('&')[3].split('=')[1]);
				}

				if(Ob == 1) {
					$('.waste-title li').eq(0).css({ "color": "rgb(179,21,24)", "border-bottom": "2px solid rgb(179,21,24)" });
					$('.waste-title li').eq(1).css({ "color": "", "border-bottom": "none" });
					$('.waste-title li').eq(2).css({ "color": "", "border-bottom": "none" });
				} else if(Ob == 2) {
					$('.waste-title li').eq(0).css({ "color": "", "border-bottom": "none" });
					$('.waste-title li').eq(1).css({ "color": "", "border-bottom": "none" });
					$('.waste-title li').eq(2).css({ "color": "rgb(179,21,24)", "border-bottom": "2px solid rgb(179,21,24)" });
				} else if(Ob == 7) {
					preliminary.dataObj.Ob = 7;
					$('.waste-title li').eq(1).css({ "color": "rgb(179,21,24)", "border-bottom": "2px solid rgb(179,21,24)" });
					$('.waste-title li').eq(0).css({ "color": "", "border-bottom": "none" });
					$('.waste-title li').eq(2).css({ "color": "", "border-bottom": "none" });
				}
						console.log('localCity', localCity)
				
				$.ajax({
					type: "post",
					url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
					async: true,
					data: {
						"type": Ob,
						"size": size,
						"localcity": localCity,
						"tradeName": species,
						"steelMill": steelMill,
						"disassembleFactory": factory
					},
					dataType: "json",
					success: function(msg) {
						console.log('msg', msg)
						$(".list-title-box").hide();
						preliminary.dataObj.currentPage = 1;
						preliminary.dataObj.bbbb = true;
						preliminary.numpag(msg);
						preliminary.btn_judge();
						preliminary.Jump_page_number();
						$('.pageg').html(preliminary.dataObj.numPerPage);
						$('.waste-search').html("");
						$('.hang button').eq(0).css('background', 'rgb(240,175,101)');
						if(Ob == 1) {
							$('.waste-search').append('<select class="whole-country"><option value="">请选择</option></select><span>品种</span><select class="Varieties"><option value="">请选择</option></select><span>材质</span><input type="text" class="cz" /><span>钢厂</span><input type="text" class="gc" /><span>仓库</span><input type="text" class="ck" /><button>找货</button>');
							$('.Varieties').append('<option value="重型废钢">重型废钢</option><option value="统料废钢">统料废钢</option><option value="中型废钢">中型废钢</option><option value="薄型废钢">薄型废钢</option><option value="小型废钢">小型废钢</option>');
							$('.whole-country').append('<option value="TIANJIN">天津市</option><option value="BEIJING">北京市</option><option value="SHANGHAI">上海市</option><option value="GUANGZHOU">广州市</option><option value="SHENZHEN">深圳市</option><option value="SHIJIAZHUANG">石家庄</option>')
							$('.Varieties').val(species ? species : "")
							$('.whole-country').val(localCity ? localCity : "");
							$('.gc').val(steelMill ? steelMill : "")
						} else if(Ob == 2) {
							$('.waste-search').append('<select class="whole-country"><option value="">请选择</option></select><span>品种</span><select class="household-electrical-appliances"><option value="">请选择</option></select><span>规格</span><select class="gui"><option value="">请选择</option></select><span>拆解厂</span><input type="text" class="cj" /><button>找货</button>')
							$('.household-electrical-appliances').append('<option value="废旧洗衣机">废旧洗衣机</option><option value="废旧电冰箱">废旧电冰箱</option><option value="废旧空调器">废旧空调器</option><option value="废旧计算机">废旧计算机</option><option value="废旧电冰柜">废旧电冰柜</option><option value="废旧电视机">废旧电视机</option>');
							$('.whole-country').append('<option value="TIANJIN">天津市</option><option value="BEIJING">北京市</option><option value="SHANGHAI">上海市</option><option value="GUANGZHOU">广州市</option><option value="SHENZHEN">深圳市</option><option value="SHIJIAZHUANG">石家庄</option>')
							$('.whole-country').val(localCity ? localCity : "");
							$('.household-electrical-appliances').val(species ? species : "")
							$('.cj').val(factory ? factory : "")
							$.ajax({
								type: "post",
								url: "http://47.93.102.34:8088/cmscm/webshop/showSizeAp",
								async: true,
								data: {
									"species": species
								},
								success: function(ags) {

									var Data = ags[0].content;
									$('.gui').html("");
									$('.gui').append($('<option value="">请选择</option>'))
									for(var i = 0; i < Data.length; i++) {
										$('.gui').append('<option value="' + Data[i] + '">' + Data[i] + '</option>');
									}
									$('.gui').val(size)

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
							$('.list-title').css({ "display": "none" });
							$('.list-title-wrap').css({ "display": "none" });
							$('.list-title1').css({ "display": "block" });
							$('.list-title-wrap1').css({ "display": "block" });
							for(var i = 0; i < Content_data.length; i++) {
								$('.list-title-wrap1').append('<div class="resource_btnList1"><div class="waste-data1"><div>' + (i + 1) + '</div><div>' + Content_data[i].shopCode + '</div><div>' + Content_data[i].disassembleFactory + '</div><div>' + Content_data[i].city + '</div><div>' + Content_data[i].typeO + '</div><div>' + Content_data[i].specification + '</div><div>' + Content_data[i].unitPrice + '</div><div>' + Content_data[i].state + '</div><div class="choose"><div>选购</div></div></div><div>');
							}
						} else {
							$('.list-title').css({ "display": "block" });
							$('.list-title-wrap').css({ "display": "block" });
							$('.list-title1').css({ "display": "none" });
							$('.list-title-wrap1').css({ "display": "none" });
							for(var i = 0; i < Content_data.length; i++) {
								$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
							}
						}
						//点击搜索时的数据
						$('.waste-search button').click(function() {
							$('.list-title-wrap').html("");
							var Pm = $('.ipt-brand').val();
							var Gc = $('.gc').val();
							if(Ob == 1) {
								aaa(Pm, Gc);
							} else if(Ob == 2) {
								aaa();
							} else {
								aaa();
							}

							function aaa(pm, gc) {
								$(".list-title-box").show().css({ "text-align": "center", "margin": "100px 0" });
								var obj;
								if(Ob == 2) {
									obj = { "type": 2, "localCity": $('.whole-country').val(), "size": $('.gui').val(), "specise": $('.household-electrical-appliances').val(), "disassembleFactory": $('.cj').val() }
								} else if(Ob == 1) {
									obj = { "type": 1, "localCity": $('.whole-country').val(), "tradeName": $('.Varieties').val(), "steelMill": $('.gc').val() };
								} else {
									obj = { "type": 7, "localCity": $('.whole-country').val(), "tradeName": $('.Varieties').val(), "steelMill": $('.gc').val() };
								}
								$.ajax({
									type: "post",
									url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
									async: true,
									data: obj,
									success: function(ags) {
										$(".list-title-box").hide();
										preliminary.dataObj.currentPage = 1;
										preliminary.numpag(ags);
										preliminary.btn_judge();
										preliminary.Jump_page_number();
										$('.list-title-wrap').html('');
										$('.list-title-wrap1').html('');
										$('.pageg').html(preliminary.dataObj.numPerPage);
										preliminary.dataObj.bbbb = false;
										var Content_data = ags[0].content;
										if(Ob == 2) {
											for(var i = 0; i < Content_data.length; i++) {
												$('.list-title-wrap1').append('<div class="resource_btnList1"><div class="waste-data1"><div>' + (i + 1) + '</div><div>' + Content_data[i].shopCode + '</div><div>' + Content_data[i].disassembleFactory + '</div><div>' + Content_data[i].city + '</div><div>' + Content_data[i].typeO + '</div><div>' + Content_data[i].specification + '</div><div>' + Content_data[i].unitPrice + '</div><div>' + Content_data[i].state + '</div><div class="choose"><div>选购</div></div></div><div>');
											}
										} else {
											for(var i = 0; i < Content_data.length; i++) {
												$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
											}
										}
										$('.hang button').eq(0).css('background', 'rgb(240,175,101)');
									},
									error: function(err) {}
								});
							}
						})
					},
					error: function(err) {
						console.log(err)
					}
				});
			} else {
				$.ajax({
					type: "get",
					url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
					async: true,
					data: {
						"type": Ob,
						"size": '',
						"localCity": '',
						"tradeName": '',
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
									$('.gui').append('<option value="">请选择</option>');
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
							$('.list-title').css({ "display": "none" });
							$('.list-title-wrap').css({ "display": "none" });
							$('.list-title1').css({ "display": "block" });
							$('.list-title-wrap1').css({ "display": "block" });
							for(var i = 0; i < Content_data.length; i++) {
								$('.list-title-wrap1').append('<div class="resource_btnList1"><div class="waste-data1"><div>' + (i + 1) + '</div><div>' + Content_data[i].shopCode + '</div><div>' + Content_data[i].disassembleFactory + '</div><div>' + Content_data[i].city + '</div><div>' + Content_data[i].typeO + '</div><div>' + Content_data[i].specification + '</div><div>' + Content_data[i].unitPrice + '</div><div>' + Content_data[i].state + '</div><div class="choose"><div>选购</div></div></div><div>');
							}
						} else {
							$('.list-title').css({ "display": "block" });
							$('.list-title-wrap').css({ "display": "block" });
							$('.list-title1').css({ "display": "none" });
							$('.list-title-wrap1').css({ "display": "none" });
							for(var i = 0; i < Content_data.length; i++) {
								$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
							}
						}
						//点击搜索时的数据
						$('.waste-search button').click(function() {
							$('.list-title-wrap').html("");
							var Pm = $('.ipt-brand').val();
							var Gc = $('.gc').val();
							if(Ob == 1) {
								aaa(Pm, Gc);
							} else if(Ob == 2) {
								aaa();
							} else {
								aaa();
							}

							function aaa(pm, gc) {
								var obj;
								if(Ob == 2) {
									obj = { "type": 2, "localCity": $('.whole-country').val(), "size": $('.gui').val(), "specise": $('.household-electrical-appliances').val(), "disassembleFactory": $('.cj').val() }
								} else if(Ob == 1) {
									obj = { "type": 1, "localCity": $('.whole-country').val(), "tradeName": $('.Varieties').val(), "steelMill": $('.gc').val() };
								} else {
									obj = { "type": 7, "localCity": $('.whole-country').val(), "tradeName": $('.Varieties').val(), "steelMill": $('.gc').val() };
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
										console.log($('.whole-country').val());
										if(Ob == 2) {
											for(var i = 0; i < Content_data.length; i++) {
												$('.list-title-wrap1').append('<div class="resource_btnList1"><div class="waste-data1"><div>' + (i + 1) + '</div><div>' + Content_data[i].shopCode + '</div><div>' + Content_data[i].disassembleFactory + '</div><div>' + Content_data[i].city + '</div><div>' + Content_data[i].typeO + '</div><div>' + Content_data[i].specification + '</div><div>' + Content_data[i].unitPrice + '</div><div>' + Content_data[i].state + '</div><div class="choose"><div>选购</div></div></div><div>');
											}
										} else {
											for(var i = 0; i < Content_data.length; i++) {
												$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
											}
										}
										$('.hang button').eq(0).css('background', 'rgb(240,175,101)');
									},
									error: function(err) {}
								});
							}
						})
					},
					error: function(err) {
						console.log(err)
					}
				});
			}
		},
		//废家电  废钢铁  废纸  点击时 初始化
		Clik: function() {
			//废钢铁
			$('.steel-a').click(function() {
				$(".list-title-box").show().css({ "text-align": "center", "margin": "100px 0" });
				preliminary.dataObj.Ob = 1;
				preliminary.dataObj.currentPage = 1;
				$('.waste-title li').eq(0).css({ "color": "rgb(179,21,24)", "border-bottom": "2px solid rgb(179,21,24)" });
				$('.waste-title li').eq(1).css({ "color": "", "border-bottom": "none" });
				$('.waste-title li').eq(2).css({ "color": "", "border-bottom": "none" });
				$('.paging ul').html("");
				$('.waste-search').html("");
				$('.list-title-wrap').html("");
				$('.hang').html('');
				$('.pageg').html(preliminary.dataObj.numPerPage);
				preliminary.clickAjax(1);
			})
			//废纸
			$('.waste-paper').click(function() {
				$(".list-title-box").show().css({ "text-align": "center", "margin": "100px 0" });
				preliminary.dataObj.Ob = 7;
				preliminary.dataObj.currentPage = 1;
				$('.paging ul').html("");
				$('.waste-search').html("");
				$('.list-title-wrap').html("");
				$('.hang').html('');
				$('.waste-title li').eq(1).css({ "color": "rgb(179,21,24)", "border-bottom": "2px solid rgb(179,21,24)" });
				$('.waste-title li').eq(0).css({ "color": "", "border-bottom": "none" });
				$('.waste-title li').eq(2).css({ "color": "", "border-bottom": "none" });
				$('.pageg').html(preliminary.dataObj.numPerPage);
				preliminary.clickAjax(7);
			})
			//废家电
			$('.Waste-home-appliance').click(function() {
				$(".list-title-box").show().css({ "text-align": "center", "margin": "100px 0" });
				preliminary.dataObj.Ob = 2;
				preliminary.dataObj.currentPage = 1;
				$('.paging ul').html("");
				$('.waste-search').html("");
				$('.list-title-wrap').html("");
				$('.hang').html('');
				$('.waste-title li').eq(0).css({ "color": "", "border-bottom": "none" });
				$('.waste-title li').eq(1).css({ "color": "", "border-bottom": "none" });
				$('.waste-title li').eq(2).css({ "color": "rgb(179,21,24)", "border-bottom": "2px solid rgb(179,21,24)" });
				$('.pageg').html(preliminary.dataObj.numPerPage);
				preliminary.clickAjax(2);
			})
		},
		//点击下一页  上一页
		nextA: function() {
			//下一页
			$('.paging .nextPage').click(function() {
				if(preliminary.dataObj.bbbb == true) {
					preliminary.dataObj.currentPage++;
					var postData;
					if(preliminary.dataObj.Ob==1){
						postData = {
							"type": preliminary.dataObj.Ob,
							"currentPage": preliminary.dataObj.currentPage,
							"localcity": preliminary.dataObj.localCity,
							"tradeName": preliminary.dataObj.species,
							"steelMill": preliminary.dataObj.steelMill
						}
					}else if(preliminary.dataObj.Ob==2){
						postData = {
							"type": preliminary.dataObj.Ob,
							"currentPage": preliminary.dataObj.currentPage,
							"localcity": preliminary.dataObj.localCity,
							"specise": preliminary.dataObj.species,
							"size": preliminary.dataObj.size,
							"disassembleFactory": preliminary.dataObj.disassembleFactory
						}
					}else if(preliminary.dataObj.Ob==7){
						alert(7)
					}
					$(".list-title-box").show().css({ "text-align": "center", "margin": "100px 0" });
					console.log('postData', postData)
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
							console.log('Content_data', Content_data)
							if(Content_data.length == 0) { return }
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
					$(".list-title-box").show().css({ "text-align": "center", "margin": "100px 0" });
					preliminary.dataObj.currentPage++;
					var obj;
					if(preliminary.dataObj.Ob == 2) {
						obj = { "type": 2, "localCity": $('.whole-country').val(), "specise": $('.household-electrical-appliances').val(), "size": $('.gui').val(), "disassembleFactory": $('.cj').val(), "currentPage": preliminary.dataObj.currentPage }
					} else if(preliminary.dataObj.Ob == 1) {
						obj = { "type": 1, "localCity": $('.whole-country').val(), "tradeName": $('.Varieties').val(), "steelMill": $('.gc').val(), "currentPage": preliminary.dataObj.currentPage };
					} else {
						obj = { "type": 7, "localCity": $('.whole-country').val(), "tradeName": $('.Varieties').val(), "steelMill": $('.gc').val(), "currentPage": preliminary.dataObj.currentPage };
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
				$(".list-title-box").show().css({ "text-align": "center", "margin": "100px 0" });
				if(preliminary.dataObj.bbbb == true) {

					preliminary.dataObj.currentPage--;
					var postData;
					if(preliminary.dataObj.Ob==1){
						postData = {
							"type": preliminary.dataObj.Ob,
							"currentPage": preliminary.dataObj.currentPage,
							"localcity": preliminary.dataObj.localCity,
							"tradeName": preliminary.dataObj.species,
							"steelMill": preliminary.dataObj.steelMill
						}
					}else if(preliminary.dataObj.Ob==2){
						postData = {
							"type": preliminary.dataObj.Ob,
							"currentPage": preliminary.dataObj.currentPage,
							"localcity": preliminary.dataObj.localCity,
							"specise": preliminary.dataObj.species,
							"size": preliminary.dataObj.size,
							"disassembleFactory": preliminary.dataObj.disassembleFactory
						}
					}else if(preliminary.dataObj.Ob==7){
						alert(7)
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
							if(Content_data.length == 0) { return }
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
						obj = { "type": 2, "localCity": $('.whole-country').val(), "specise": $('.household-electrical-appliances').val(), "size": $('.gui').val(), "disassembleFactory": $('.cj').val(), "currentPage": preliminary.dataObj.currentPage }
					} else if(preliminary.dataObj.Ob == 1) {
						obj = { "type": 1, "localCity": $('.whole-country').val(), "tradeName": $('.Varieties').val(), "steelMill": $('.gc').val(), "currentPage": preliminary.dataObj.currentPage };
					} else {
						obj = { "type": 7, "localCity": $('.whole-country').val(), "tradeName": $('.Varieties').val(), "steelMill": $('.gc').val(), "currentPage": preliminary.dataObj.currentPage };
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
//				$(".list-title-box").show().css({ "text-align": "center", "margin": "100px 0" });
				$(".list-title-box").addClass('loading_pic');
				var postData;
					if(preliminary.dataObj.Ob==1){
						postData = {
							"type": preliminary.dataObj.Ob,
							"currentPage": preliminary.dataObj.currentPage,
							"localcity": preliminary.dataObj.localCity,
							"tradeName": preliminary.dataObj.species,
							"steelMill": preliminary.dataObj.steelMill
						}
					}else if(preliminary.dataObj.Ob==2){
						postData = {
							"type": preliminary.dataObj.Ob,
							"currentPage": preliminary.dataObj.currentPage,
							"localcity": preliminary.dataObj.localCity,
							"specise": preliminary.dataObj.species,
							"size": preliminary.dataObj.size,
							"disassembleFactory": preliminary.dataObj.disassembleFactory
						}
					}else if(preliminary.dataObj.Ob==7){
						alert(7)
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
							if(Content_data.length == 0) { return }
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
						obj = { "type": 2, "localCity": $('.whole-country').val(), "specise": $('.household-electrical-appliances').val(), "size": $('.gui').val(), "disassembleFactory": $('.cj').val(), "currentPage": preliminary.dataObj.currentPage }
					} else if(preliminary.dataObj.Ob == 1) {
						obj = { "type": 1, "localCity": $('.whole-country').val(), "tradeName": $('.Varieties').val(), "steelMill": $('.gc').val(), "currentPage": preliminary.dataObj.currentPage };
					} else {
						obj = { "type": 7, "localCity": $('.whole-country').val(), "tradeName": $('.Varieties').val(), "steelMill": $('.gc').val(), "currentPage": preliminary.dataObj.currentPage };
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
			//点击跳转页
			$('.goNumPage').unbind('click').click(function() {
				$(".list-title-box").show().css({ "text-align": "center", "margin": "100px 0" });
				var val = $('.numPageInp').val();
				if(val < 1) {
					val = 1;
				} else if(val > preliminary.dataObj.numPerPage) {
					val = preliminary.dataObj.numPerPage;
				}
				preliminary.dataObj.currentPage = val;
				var postData;
					if(preliminary.dataObj.Ob==1){
						postData = {
							"type": preliminary.dataObj.Ob,
							"currentPage": preliminary.dataObj.currentPage,
							"localCity": preliminary.dataObj.localCity,
							"tradeName": preliminary.dataObj.species,
							"steelMill": preliminary.dataObj.steelMill
						}
					}else if(preliminary.dataObj.Ob==2){
						postData = {
							"type": preliminary.dataObj.Ob,
							"currentPage": preliminary.dataObj.currentPage,
							"localCity": preliminary.dataObj.localCity,
							"specise": preliminary.dataObj.species,
							"size": preliminary.dataObj.size,
							"disassembleFactory": preliminary.dataObj.disassembleFactory
						}
					}else if(preliminary.dataObj.Ob==7){
						alert(7)
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
							if(Content_data.length == 0) { return }
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
						obj = { "type": 2, "localCity": $('.whole-country').val(), "specise": $('.household-electrical-appliances').val(), "size": $('.gui').val(), "disassembleFactory": $('.cj').val(), "currentPage": preliminary.dataObj.currentPage }
					} else if(preliminary.dataObj.Ob == 1) {
						obj = { "type": 1, "localCity": $('.whole-country').val(), "tradeName": $('.Varieties').val(), "steelMill": $('.gc').val(), "currentPage": preliminary.dataObj.currentPage };
					} else {
						obj = { "type": 7, "localCity": $('.whole-country').val(), "tradeName": $('.Varieties').val(), "steelMill": $('.gc').val(), "currentPage": preliminary.dataObj.currentPage };
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
				type: "get",
				url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
				async: true,
				data: {
					"type": Ob,
					"size": '',
					"localCity": '',
					"tradeName": '',
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
						$('.list-title').css({ "display": "none" });
						$('.list-title-wrap').css({ "display": "none" });
						$('.list-title1').css({ "display": "block" });
						$('.list-title-wrap1').css({ "display": "block" });
						for(var i = 0; i < Content_data.length; i++) {
							$('.list-title-wrap1').append('<div class="resource_btnList1"><div class="waste-data1"><div>' + (i + 1) + '</div><div>' + Content_data[i].shopCode + '</div><div>' + Content_data[i].disassembleFactory + '</div><div>' + Content_data[i].city + '</div><div>' + Content_data[i].typeO + '</div><div>' + Content_data[i].specification + '</div><div>' + Content_data[i].unitPrice + '</div><div>' + Content_data[i].state + '</div><div class="choose"><div>选购</div></div></div><div>');
						}
					} else {
						$('.list-title').css({ "display": "block" });
						$('.list-title-wrap').css({ "display": "block" });
						$('.list-title1').css({ "display": "none" });
						$('.list-title-wrap1').css({ "display": "none" });
						for(var i = 0; i < Content_data.length; i++) {
							$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
						}
					}
					//点击搜索时的数据
					$('.waste-search button').click(function() {
						$(".list-title-box").show().css({ "text-align": "center", "margin": "100px 0" });
						$('.list-title-wrap').html("");
						var Pm = $('.ipt-brand').val();
						var Gc = $('.gc').val();
						if(Ob == 1) {
							aaa(Pm, Gc);
						} else if(Ob == 2) {
							aaa();
						} else {
							aaa();
						}

						function aaa(pm, gc) {
							var obj;
							if(Ob == 2) {
								obj = { "type": 2, "localCity": $('.whole-country').val(), "size": $('.gui').val(), "specise": $('.household-electrical-appliances').val(), "disassembleFactory": $('.cj').val() }
							} else if(Ob == 1) {
								obj = { "type": 1, "localCity": $('.whole-country').val(), "tradeName": $('.Varieties').val(), "steelMill": $('.gc').val() };
							} else {
								obj = { "type": 7, "localCity": $('.whole-country').val(), "tradeName": $('.Varieties').val(), "steelMill": $('.gc').val() };
							}
							$.ajax({
								type: "post",
								url: "http://47.93.102.34:8088/cmscm/webshop/showShangCheng",
								async: true,
								data: obj,
								success: function(ags) {
									$('.list-title-box').hide()
									preliminary.dataObj.currentPage = 1;
									preliminary.numpag(ags);
									preliminary.btn_judge();
									preliminary.Jump_page_number();
									$('.list-title-wrap').html('');
									$('.list-title-wrap1').html('');
									$('.pageg').html(preliminary.dataObj.numPerPage);
									preliminary.dataObj.bbbb = false;
									var Content_data = ags[0].content;
									console.log($('.whole-country').val());
									if(Ob == 2) {
										for(var i = 0; i < Content_data.length; i++) {
											$('.list-title-wrap1').append('<div class="resource_btnList1"><div class="waste-data1"><div>' + (i + 1) + '</div><div>' + Content_data[i].shopCode + '</div><div>' + Content_data[i].disassembleFactory + '</div><div>' + Content_data[i].city + '</div><div>' + Content_data[i].typeO + '</div><div>' + Content_data[i].specification + '</div><div>' + Content_data[i].unitPrice + '</div><div>' + Content_data[i].state + '</div><div class="choose"><div>选购</div></div></div><div>');
										}
									} else {
										for(var i = 0; i < Content_data.length; i++) {
											$('.list-title-wrap').append('<div class="resource_btnList"><div class="waste-data"><div>' + (i + 1) + '</div><div>' + Content_data[i].code + '</div><div>' + Content_data[i].factory + '</div><div>' + Content_data[i].localCity + '</div><div>' + Content_data[i].type + '</div><div>' + Content_data[i].species + '</div><div>' + Content_data[i].sizeDes + '</div><div>' + Content_data[i].price + '</div><div>' + Content_data[i].size + '</div><div class="choose"><div>选购</div></div></div><div>');
										}
									}
									$('.hang button').eq(0).css('background', 'rgb(240,175,101)');
								},
								error: function(err) {}
							});
						}
					})
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
})