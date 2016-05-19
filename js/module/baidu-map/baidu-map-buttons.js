define(function(require,module,exports){
	var m = require("mui");
	var locationBtn = document.getElementById("location-btn");
	
	var showUserPositionBtn = document.getElementById("show-user-position-btn");
	var showUserAddressBtn = document.getElementById("show-user-address-btn");

	locationBtn.addEventListener("click",function(){
		debugger;
		var wv = window.plus.webview.currentWebview().opener();
		wv.evalJS("baiduMap.location();");
	},false);
	
	showUserPositionBtn.addEventListener("click",function(){
		var wv = window.plus.webview.currentWebview().opener();
		wv.evalJS("baiduMap.showUserPostion();");
	},false);
	
	showUserAddressBtn.addEventListener("click",function(){
		var wv = window.plus.webview.currentWebview().opener();
		wv.evalJS("baiduMap.showUserAddress();");
	},false);
	
});