$(function(){
	var obj = {
		AJAX1:function(){
			$.ajax({
			type:"post",
			url:"http://47.93.102.34:8088/cmscm/rank/showCompanyRank",
			async:true,
			data:{
                rankFlag:0
			},
			success:function(msg){
				var Data = msg[0].content;
				console.log(Data);
				for(var i=0;i<Data.length;i++){
					if(i<3){
						$('.Production-ranking').append('<tr><td><i></i></td><td>'+Data[i].companyName+'</td><td>'+Data[i].statOrder+'</td></tr>');
					}else{
						$('.Production-ranking').append('<tr><td><span>'+(i+1)+'</span></td><td>'+Data[i].companyName+'</td><td>'+Data[i].statOrder+'</td></tr>')
					}
				}
				
			}
		})
		},
		AJAX2:function(){
			$.ajax({
			type:"post",
			url:"http://47.93.102.34:8088/cmscm/rank/showCompanyRank",
			async:true,
			data:{
                rankFlag:0
			},
			success:function(msg){
                var Data = msg[0].content;
                console.log(Data);
				if(Data.length==0){
					return;
				}
				for(var i=0;i<Data.length;i++){
					if(i<3){
						$('.Production-ranking1').append('<tr><td><i></i></td><td>'+Data[i].companyName+'</td><td>'+Data[i].statOrder+'</td></tr>');
					}else{
						$('.Production-ranking1').append('<tr><td><span>'+(i+1)+'</span></td><td>'+Data[i].companyName+'</td><td>'+Data[i].statOrder+'</td></tr>')
					}
				}
			}
		})
		},
		AJAX3:function(){
			$.ajax({
			type:"post",
			url:"http://47.93.102.34:8088/cmscm/rank/showSumStat",
			async:true,
			data:{},
			success:function(data){
				var data = data[0].content;
				$('.ton').html(data.statBuy);
				$('.amount').html(data.statPrice);
				$('.single ').html(data.statOrder);
			}
		})
		},
		AJAX_steel:function(){
			$.ajax({
			type:"post",
			url:"http://47.93.102.34:8088/cmscm/rank/showRealTimeQuotes",
			async:true,
			data:{
				type:1
			},
			success:function(data){
				var data = data[0].content;
				
				for(var i=0;i<data.length;i++){
					$('.steel_1').append('<tr><td>'+data[i].species+'</td><td>'+data[i].area+'</td><td>'+data[i].unitPrice+'</td><td>'+data[i].companyName+'</td></tr>')
				}
			}
		})
		},
		AJAX_steel_z:function(){
			$.ajax({
			type:"post",
			url:"http://47.93.102.34:8088/cmscm/rank/showRealTimeQuotes",
			async:true,
			data:{
				type:7
			},
			success:function(data){
				var data = data[0].content;
				for(var i=0;i<data.length;i++){
					$('.steel_2').append('<tr><td>'+data[i].species+'</td><td>'+data[i].area+'</td><td>'+data[i].unitPrice+'</td><td>'+data[i].companyName+'</td></tr>');
				}
			}
		})
		},
		AJAX_steel_q:function(){
			$.ajax({
			type:"post",
			url:"http://47.93.102.34:8088/cmscm/rank/showRealTimeQuotesJD",
			async:true,
			data:{
			},
			success:function(data){
				var data = data[0].content;
				for(var i=0;i<data.length;i++){
					$('.steel_3').append('<tr><td>'+data[i].species+'</td><td>'+data[i].area+'</td><td>'+data[i].unitPrice+'</td><td>'+data[i].companyName+'</td></tr>');
				}
			}
		})
		}
}
	obj.AJAX1();
	obj.AJAX2();
	obj.AJAX3();
	obj.AJAX_steel();
	obj.AJAX_steel_z();
	obj.AJAX_steel_q();
})
