define(function(require, module, exports) {
	var m = require("mui");
	var vue = require("vue");
	var funcitonList = m("#function-list");
	var gentry = null;//图标文件夹对象
	var entries = null;
	m.init({
		swipeBack: true //启用右滑关闭功能
	});
	
	// H5 plus事件处理
	function plusReady() {
		// 获取摄像头目录对象
		plus.io.resolveLocalFileSystemURL("_doc/", function(entry) {
			entry.getDirectory("camera", {
				create: true
			}, function(dir) {
				gentry = dir;
			}, function(e) {
				m.alert(e.message);
			});
		}, function(e) {
			alert(e.message);
		});
	}

});