$(function(){
	ajax(1);
	function ajax(num){
		$.ajax({
			type:"post",
			url:"http://47.93.102.34:8088/cmscm/webshop/showShouYeGT",
			async:true,
			data:{
				"type":num
			},
			success:function(data){
				var data = data[0].content;
//				console.log(data);
				for(var i=0;i<data.length;i++){
					// console.log(data[i].speciesList)
					for(var j=0;j<=data[i].speciesList.length;j++){
						// console.log(data[i].speciesList[j])
					}
				}
			}
		});
	}
})
