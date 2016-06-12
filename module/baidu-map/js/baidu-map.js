define(function(require,module,exports){
	var m = require("mui");
	var em = document.getElementById("map");
	var map = null;

	//采用subpages创建子页面
	m.init({
			swipeBack:true, //启用右滑关闭功能
			subpages:[{
			      url:'baidu-map-buttons.html',
			      styles:{
			        top:'44px',
			    	height:'50px',
			    	position:'absolute',
			    	scrollIndicator:'none',
			    	background:'transparent'
			      }
			    }]
		});
	m.plusReady(function(){
		  //createButtonsSubView();
		  map = new plus.maps.Map("map",{
		  	'position':'static'
		  });
		  //切换到用户所在城市
		  map.getUserLocation(function(state,pos){
				if(0==state){
					map.setCenter(pos);
				}
			});
//		  var wvs  = window.plus.webview.all();
//		  for(var i=0; i < wvs.length; i++){
//		  	console.log(wvs[i].getURL());
//		  }	
	});
	
	function location(){
			map.showUserLocation( true );
			map.getUserLocation(function(state,pos){
				console.log("定位");
				if(0==state){
					map.setCenter(pos);
					plus.nativeUI.toast("定位成功");
				}else{
					plus.nativeUI.toast("定位失败");
				}
			});
	}
	
	function showUserPostion(){
		plus.nativeUI.showWaiting("获取坐标中...");
		map.getUserLocation(function(state,pos){
			plus.nativeUI.closeWaiting();
				if(0==state){
					map.setCenter(pos);
					var str = "经度："+pos.getLng();
					str+="\n纬度："+pos.getLat();
					plus.nativeUI.alert(str,function(){},"提示","确定")
				}else{
					plus.nativeUI.alert("定位失败",function(){},"提示","确定")
				}
			});
	}
	
	function showUserAddress() {
		console.log("显示地址");
		plus.nativeUI.showWaiting("定位中...");
		var startDate = new Date();
		plus.geolocation.getCurrentPosition(function(p) {
			plus.nativeUI.closeWaiting();
			var endDate = new Date();
			console.log("显示地址成功,耗时时长（ms）："+(endDate.getTime() - startDate.getTime()));
			var str="坐标类型："+p.coordsType;
			str+="\n经度："+p.coords.longitude;
			str+="\n纬度："+p.coords.latitude;
			if(p.addresses){
				str+="\n地址："+p.addresses;
			}else{
				str+="\n地址：定位获取失败";
			}
			plus.nativeUI.alert(str,function(){},"提示","确定")
		}, function(e) {
			 plus.nativeUI.closeWaiting();
			 console.log("失败");
			 plus.nativeUI.alert("定位失败",function(){},"提示","确定")
		},{ 
			enableHighAccuracy:true,
			timeout:10000,
			maximumAge:1000,
			provider:'baidu'
			});
	}
	return  {
		'location':location,
		'showUserPostion':showUserPostion,
		'showUserAddress':showUserAddress
	}
});