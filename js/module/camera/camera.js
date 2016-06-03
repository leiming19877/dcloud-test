define(function(require, module, exports) {
	var m = require("mui");
	var vue = require("vue");
	var funcitonList = m("#function-list");
	var gentry = null; //图标文件夹对象
	var entries = new Array();
	m.init({
		swipeBack: true //启用右滑关闭功能
	});

	// H5 plus事件处理
	function plusReady() {
		var loadingWin = plus.nativeUI.showWaiting("加载中...");
		// 获取摄像头目录对象
		plus.io.resolveLocalFileSystemURL("_doc/", function(entry) {
			entry.getDirectory("camera", {
				create: true
			}, function(dir) {
				gentry = dir;
				var reader = gentry.createReader();
				reader.readEntries(function(list) {
					pictures.entries = list;
					window.setTimeout(function(){
						loadingWin.close();
					},2000);
				}, function(e) {
					m.alert("读取录音列表失败：" + e.message);
				});
			}, function(e) {
				m.alert(e.message);
			});
		}, function(e) {
			alert(e.message);
		});
	}
	m.plusReady(plusReady);

	var listPicturesTpl = require("./list-pictures.html");

	vue.filter('imageUrl', function(e) {
			debugger;
			return e.toLocalURL();
		})
		// 定义
	var picturesComponent = vue.extend({
		// 声明 props
		props: ['entries'],
		template: listPicturesTpl,
		methods: {
			removePicture: function(e) {
				var self = this;
				e.remove(function(entry){
					self.entries.$remove(e);
				},function(e){
					m.alert("删除失败，失败原因："+e.message);
				});
			}
		}

	});

	// 注册
	vue.component('pictures-component', picturesComponent);

	var pictures = new vue({
		el: '#pictures',
		data: {
			'entries': entries
		}
	});
	// 拍照
	function capurteImage() {
		plus.nativeUI.toast("开始拍照：");
		var cmr = plus.camera.getCamera();
		cmr.captureImage(function(p) {
			plus.io.resolveLocalFileSystemURL(p, function(entry) {
				pictures.entries.push(entry);
			}, function(e) {
				m.alert("读取拍照文件错误：" + e.message);
			});
		}, function(e) {
			m.alert("失败：" + e.message);
		}, {
			filename: "_doc/camera/",
			index: 1
		});
	}
	document.getElementById("caputre-btn").addEventListener("click", capurteImage, false);
	document.getElementById("clear-pictures-btn").addEventListener("click", function(){
		gentry.removeRecursively(function(et){
			pictures.entries = new Array();
		},
		function(e){
			m.alert("失败：" + e.message);
		});
	}, false);
});