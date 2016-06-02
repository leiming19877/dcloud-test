 (function(global, undefined) {
	 //如果seajs 没有加载
	 if (!global.seajs && !global.config) {
		  return
		}
	 var seajs  = global.seajs;
	  seajs.config({
	        alias: { 
	            'zepto': 'zepto/zepto.min.js',
	            'mui':'mui/mui.js',
	            'vue':'vue/vue-1.0.24.js'
	            },
	        preload: [
	                 ],//预先加载
	        //map,批量更新时间戳，用于更新缓存
	        //map: [[/^(.*\.(?:css|js|tpl|html))(.*)$/i, '$1?v=1.1.1']], 
	        map: [[/^(.*\.(?:css|js|tpl|html))(.*)$/i, '$1?v='+Math.random()]],  
	        charset: 'utf-8', // 文件编码
	        debug:true
	    });
	   //基础路径
	   var userAgent = navigator.userAgent;
	   if(userAgent.indexOf("Html5Plus")  !== -1 ){
	   	 seajs.config({base: '../www/js'});
	   }else{
	   	  seajs.config({base:'/dcloud-test/js'}); 
	   }
 })(this);
