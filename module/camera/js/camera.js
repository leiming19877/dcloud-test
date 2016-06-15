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
		var loadingWin = plus.nativeUI.showWaiting("加载中...", {
			back: 'none'
		});
		// 获取摄像头目录对象
		plus.io.resolveLocalFileSystemURL("_doc/", function(entry) {
			entry.getDirectory("camera", {
				create: true
			}, function(dir) {
				gentry = dir;
				var reader = gentry.createReader();
				reader.readEntries(function(list) {
					pictures.entries = list;
					window.setTimeout(function() {
						loadingWin.close();
					}, 2000);
				}, function(e) {
					m.alert("读取照片表失败：" + e.message);
				});
			}, function(e) {
				m.alert(e.message);
			});
		}, function(e) {
			alert(e.message);
		});

		/*m.back = function(){
			alert("BackButton Key pressed!");
		};*/
	}
	m.plusReady(plusReady);

	var listPicturesTpl = require("./list-pictures.html");

	// 定义
	var picturesComponent = vue.extend({
		// 声明 props
		props: ['entries'],
		template: listPicturesTpl,
		methods: {
			previewImage: function(e) {
				var url = "image-preview.html";
				var imageUrl = e.toLocalURL();
				var view = plus.webview.create(url, url, {
					hardwareAccelerated: true,
					scrollIndicator: 'none',
					scalable: true,
					bounce: "all"
				}, {
					'imageUrl': imageUrl
				});
				/*w.addEventListener("loaded", function() {
					w.evalJS("loadMedia('" + li.entry.toLocalURL() + "')");
					//w.evalJS( "loadMedia(\""+"http://localhost:13131/_doc/camera/"+name+"\")" );
				}, false);
			*/
				view.show("pop-in");
			},
			removePicture: function(e) {
				var self = this;
				self.entries.$remove(e);
				e.remove(function(entry) {
					
				}, function(e) {
					//m.alert("删除失败，失败原因：" + e.message);
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
			//没有拍时就不提示什么了
			//m.alert("失败：" + e.message);
		}, {
			filename: "_doc/camera/",
			index: 1
		});
	}
	//var lfs = null; // 保留上次选择图片列表
	// 从相册添加文件
	function pickGallery() {
		plus.gallery.pick(function(p) {
			//lfs = p;
			if (p.files) {
				for (var i in p.files) {
					console.log(p.files[i]);
					plus.io.resolveLocalFileSystemURL(p.files[i], function(entry) {
						pictures.entries.push(entry);
					}, function(e) {

					});
				}
			} else {
				plus.io.resolveLocalFileSystemURL(p, function(entry) {
					pictures.entries.push(entry);
				}, function(e) {
					m.alert("读取拍照文件错误：" + e.message);
				});
			}

		}, {
			filter: 'image',
			multiple: true,
			filename: '_doc/camera/',
			maximum: 3,
			system: false,
			//selected:lfs,
			onmaxed: function() {
				plus.nativeUI.alert("最多选择5张图片。")
			}
		});
	}
	// 上传文件
	function upload() {
		if (pictures.entries.length <= 0) {
			plus.nativeUI.alert("没有添加上传文件！");
			return;
		}
		var url = "http://10.10.11.163:8081/html5/UploaderServlet";
		var wt = plus.nativeUI.showWaiting("上传中...", {
			back: 'none'
		});
		var task = plus.uploader.createUpload(url, {
				method: "POST",
				timeout:0
			},
			function(t, status) { //上传完成
				wt.close();
				if (status == 200) {
					plus.nativeUI.alert("上传成功：" + t.responseText);
				} else {
					plus.nativeUI.alert("上传失败：" + status);
				}
			}
		);
		task.addData("uid", getUid());
		for (var i = 0; i < pictures.entries.length; i++) {
			var f = pictures.entries[i];
			task.addFile(f.toLocalURL(), {
				key: f.name
			});
		}
		task.start();
	}
	// 产生一个随机数
	function getUid() {
		return Math.floor(Math.random() * 100000000 + 10000000).toString();
	}
	//回退前阻止
/*	m.options.beforeback = function() {
		alert("BackButton Key pressed!");
		return false;
	};*/

	document.getElementById("caputre-btn").addEventListener("click", capurteImage, false);
	document.getElementById("gallery-btn").addEventListener("click", pickGallery, false);
	document.getElementById("upload-pictures-btn").addEventListener("click", upload, false);
	document.getElementById("clear-pictures-btn").addEventListener("click", function() {
		if (pictures.entries.length > 0) {
			pictures.entries = new Array();
		}
		gentry.getMetadata(function(mtadata) {
			if (mtadata.fileCount > 0) {
				//删除_doc/camera目录下所有照片
				gentry.removeRecursively(function(et) {

					},
					function(e) {
						m.alert("清空失败失败原因" + e.message);
					});
			}
		}, function(e) {

		}, false);

	}, false);
	//end eventListener
});