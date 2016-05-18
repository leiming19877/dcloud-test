define(function(require,module,exports){
	var m = require("mui");
	var funcitonList = m("#function-list");
	m.init({
			 swipeBack:true //启用右滑关闭功能
	});
	funcitonList.on("tap","a",function(){
		var id = this.dataset.id;
		m.openWindow({
						'url': this.href,
						'id': id,
						'show': {
							aniShow: "pop-in"
						},
						'waiting': {
							autoShow: false
						}
					});
	});
});
