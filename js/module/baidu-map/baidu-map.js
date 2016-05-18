define(function(require,module,exports){
	var m = require("mui");
	var em = document.getElementById("map");
	var map = null;

	function createButtonsSubView(){
		debugger;
	    // 创建加载内容窗口
	    var topoffset='44px';
	    if(plus.navigator.isImmersedStatusbar()){// 兼容immersed状态栏模式
	        topoffset=(Math.round(plus.navigator.getStatusbarHeight())+44)+'px';
	    }
	    var wsub=plus.webview.create('baidu-map-buttons.html','sub',{
	    		top:topoffset,
		    	height:'50px',
		    	position:'absolute',
		    	scrollIndicator:'none',
		    	background:'transparent'
	    	});
	    var ws = plus.webview.currentWebview();
	    ws.append(wsub);
	}
	//采用subpages创建子页面
	m.init({
			swipeBack:true, //启用右滑关闭功能
			subpages:[{
			      url:'baidu-map-buttons.html',
			      //id:'baidu-map-buttons.html',
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
		  //map.hide();
		  var wvs  = window.plus.webview.all();
		  for(var i=0; i < wvs.length; i++){
		  	console.log(wvs[i].getURL());
		  }	
	});
	
	function location(){
		debugger;
		plus.maps.Map.geocode("湘雅路87号",{city:"长沙"},function(event){
		
			var address = event.address;  // 转换后的地理位置
				debugger;
			var point = event.coord;  // 转换后的坐标信息
			var coordType = event.coordType;	// 转换后的坐标系类型
			map.setCenter(point);
			alert("Coord:"+JSON.stringify(point)+"   "+coordType);
		},function(e){
			debugger;
			alert("Failed:"+JSON.stringify(e));
		});
		
		//map.showUserLocation(true);
	}
	return  {
		'location':location
	}
});