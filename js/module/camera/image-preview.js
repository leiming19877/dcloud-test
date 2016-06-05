define(function(require, module, exports) {
	var m = require("mui");
	var imagePreview = document.getElementById("image-preview");
	var loadingWin = null;
	m.init({
		swipeBack: true //启用右滑关闭功能
	});

	function imageLoaded() {
		loadingWin.close();
	}

	function imageLoadedError() {
		plus.nativeUI.alert("无效的图片资源", function() {
			m.back();
		});
	}
	
	imagePreview.addEventListener("load", imageLoaded, false);
	imagePreview.addEventListener("error", imageLoadedError, false);

	// H5 plus事件处理
	function plusReady() {
		loadingWin = plus.nativeUI.showWaiting("加载中...", {
			back: 'none'
		});
		var view = plus.webview.currentWebview();
		imagePreview.src = view.imageUrl;
	}

	m.plusReady(plusReady);
});