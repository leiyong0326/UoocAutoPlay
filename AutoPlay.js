window.countRun = 0;
window.countInit = 0;
window.wait = 2000;
console.log('start run.');
window.setInterval(function() {
	//如果播放器已初始化完毕
	if (videojs.getPlayers().player != undefined) {
		if(!videojs.getPlayers().player.executeFlag){
			videojs.getPlayers().player.executeFlag = 1;
			window.countInit += 1;
			console.log(Date()+'->countInit:'+window.countInit);
			//清理鼠标移出事件
			$("html").off("mouseleave blur visibilitychange");
			var funObj = {};
	    	funObj.speed = function(){
	    		window.setTimeout(function() {
	    			console.log(Date()+'->2倍速度');
	                $('.vjs-menu').find('ul[role="menu"]').first().find('li').first().trigger('click')
	            },window.wait);
	    	};
	        funObj.ng = function(){
	        	window.setTimeout(function() {
	    			console.log(Date()+'->播放下一个');
		            var ng_scope = $('div[class="basic ng-scope"]');
		            if (ng_scope.length > 0) {
		                ng_scope.first().trigger('click');
		                funObj.speed();//调用二倍
		            }else{
		            	funObj.uncomplete();//打开下一个章节
		            }
	                
	            },window.wait);
	        };
	        funObj.uncomplete = function(){
	        	window.setTimeout(function() {
	    			console.log(Date()+'->下一个子节点');
		        	var ng_binging = $('div[class="basic uncomplete"]').find('div[class="oneline ng-binding"]');
		            if (ng_binging.length > 0) {
		                ng_binging.first().trigger('click');
		                funObj.ng();//调用播放
		            }else{
						funObj.chapterUncomplete();//下一个大主章节
		            }
		        },window.wait);
	        };
	        funObj.chapterUncomplete = function(){
	    		console.log(Date()+'->下一个章节');
	        	var chapter_uncomplete = $('div[class="basic chapter uncomplete"]');
	        	if (chapter_uncomplete.length > 0) {
	        		chapter_uncomplete.first().trigger('click');
	        		funObj.uncomplete();//打开子节点
	        	}else{
	        		alert('end');
	        	}
	        };
	        //添加暂停事件
			videojs.getPlayers().player.on("pause",
			    function() {
					window.countRun += 1;
				    console.log(Date()+'->countRun:'+window.countRun);
			        funObj.ng();
			    });
			funObj.speed();
			videojs.getPlayers().player.play();
		}
	}
},window.wait);
