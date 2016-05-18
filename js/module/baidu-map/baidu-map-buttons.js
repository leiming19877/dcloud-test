define(function(require,module,exports){
	var m = require("mui");
	var locationBtn = document.getElementById("location-btn");

	locationBtn.addEventListener("click",function(){
		var wv = window.plus.webview.getWebviewById('baidu-map.html');
		wv.evalJS("baiduMap.location();");
	},false)
	
	
});