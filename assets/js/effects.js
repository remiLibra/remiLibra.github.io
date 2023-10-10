// JavaScript Document
var _selectObj = 0;
$(document).ready(function(){
	window.winwidth = $(window).width();
	window.winheight = $(window).height();
	
	if(window.winwidth>1024){
		$(".pageBox").css("height",$(window).height());
	}
	//第四屏
	if($(".page4").length>0){
		if(window.winwidth>1024){
			var _mapW = $(".page4 .map").height()/1310*1588;
			$(".page4 .map").css({
				"width":_mapW,
				"left":(window.winwidth-390-_mapW)/2
			});
		}else{
			var _mapH = $(".page4 .map").width()/1588*1310;
			$(".page4 .map").css({
				"height":_mapH
			});
		}
		$(".page4 .change .tab a").click(function(){
			var _font = $(this).prevAll("font").length,
				_index = $(this).index()-_font;
			$(".page4 .change .tab a").removeClass("active").eq(_index).addClass("active");
			$(".page4 .change .box").hide().eq(_index).fadeIn();
		});
		/*$(".page4 .change .ipt input").focus(function(){
			if($(this).val() == '请输入您的位置'){
				$(this).val('');
			}
		});
		$(".page4 .change .ipt input").eq(0).blur(function(){
			if($(this).val() == ''){
				$(this).val('请输入您的位置');
			}
		});
		$(".page4 .change select").change(function(){
			$(this).prevAll("span").html($(this).val());
		});*/
		scrollbind($(".page4 .change .box.first"));
		scrollbind($(".page4 .change .box.last"));
		$(".page4 .change .box.last").hide();
	}
	
	//页面滚动
	if($(".pageBox").length>0){
		$(window).bind('hashchange',function(){
			/*_pUrl = window.location.hash.split("/");
			urlSwitch();
			pageTo(_pageNum);*/
		});
		window._mousewheelScroll = 0;
		var _pageNum = 0,
			_pageLen = $(".pageBox").length-1,
			_pageThumb = _pageLen+1,
			_out = _default = 0,
			pageOut,
			pageDot;
		_pUrl = window.location.hash.split("/");
		urlSwitch = function(){
			switch(_pUrl[1]){
				case 'Home':
				  _pageNum = 0;
				  break;
				case 'About':
				  _pageNum = 1;
				  break;
				case 'News':
				  _pageNum = 2;
				  break;
				case 'School':
				  _pageNum = 3;
				  break;
				case 'Video':
				  _pageNum = 4;
				  break;
				case 'Product':
				  _pageNum = 5;
				  break;
				case 'Contact':
				  _pageNum = 6;
				  break;
				default:
				  _pageNum = 0;
				  break;
			}
		}
		urlSwitch();
		numSwitch = function(){
			switch(_pageNum){
				case 0:
				  return '#/Home/'
				  break;
				case 1:
				  return '#/About/'
				  break;
				case 2:
				  return '#/News/'
				  break;
				case 3:
				  return '#/School/'
				  break;
				case 4:
				  return '#/Video/'
				  break;
				case 5:
				  return '#/Product/'
				  break;
				case 6:
				  return '#/Contact/'
				  break;
				default:
				  return ''
				  break;
			}
		}
		window._animateName = "fadeIn fadeInRight fadeInLeft fadeInUp fadeInDown zoomIn hidden";
		//翻页动画
		window._switch = numSwitch(_pageNum);
		pageTurning = function(num){
		  $(".pagenow").removeClass(window._animateName).removeClass("scaleIn");
		  clearInterval(pageOut);
		  clearInterval(pageDot);
		  menuid = _pageNum;
		  var _pBox = $(".pageBox").eq(_pageNum).find(".pagenow"),
			  _pBoxLen = _pBox.length;
		  if(_pageNum>0){
			  $(".header,.rightMenu").addClass("fixed");
		  }else{
			  $(".header,.rightMenu").removeClass("fixed");
		  }
		  $(".header .menu li").removeClass("active").eq(_pageNum).addClass("active");
		  if(num==0){
			  for(var n=0;n<_pBoxLen;n++){
				 var _pBoxItem = _pBox.eq(n);
					 _date = _pBoxItem.attr("data-rel");
				 _pBoxItem.removeClass(_animateName).addClass(_date);
			  }
			  pageOut = setTimeout('$(".pagenow,.header").removeClass(window._animateName);',1500);
			  pageDot = setTimeout('$(".pagenow").removeClass("scaleIn");',2400);
		  }
		  window._switch = numSwitch(_pageNum);
		  if(_default>0){
		  	window.top.location.href = "http://"+window.top.location.host+""+window.location.pathname+window._switch;
		  }
		  _default++;
		}
		$(window).bind("scroll",function(){
			var _windowTop = $(window).scrollTop();
			if(_mousewheelScroll==0){
				pageScroll(_windowTop);
			}
			if(window.winwidth<640){
				$(".bodyWindow.fwcx").css("top",$(window).scrollTop()+50);
			}else{
				$(".bodyWindow.fwcx").css("top",$(window).scrollTop()+window.winheight/2-200);
			}
		});
		$(".viewport").mouseover(function(){
			_out = 1;
		});
		$(".viewport").mouseleave(function(){
			_out = 0;
		});
		$(".pagesize").mousewheel(function(event,delta){
			if(_out==0&&window.winwidth>1024){
				event.preventDefault();
				if(delta==-1&&_mousewheelScroll==0){
					pageUp();
				}else if(delta==1&&_mousewheelScroll==0){
					pageDown();
				}
			}
		});
		pageTime = function(){
			setTimeout('_mousewheelScroll=0',500);
		}
		pageTo = function(num){
			if(_mousewheelScroll==0){
				_mousewheelScroll++;
				menuid = _pageNum = num;
				var _offset = $(".page"+(_pageNum+1)).offset().top;
				if($(window).width()<768){
					_offset-=70
				}
				$("html,body").stop().animate({
					scrollTop:_offset
				},500,function(){
					pageTime();
				});
				pageTurning(0);
			}
		}
		pageTo(_pageNum);
		if(_pUrl[1]!=undefined){
			//正式var _iframeUrl = window.location.hash.split("#")[1];
			if(window.location.hash.split(window._switch)[1]==undefined){
				var _iframeUrl = window.location.hash.split("#")[1];
			}else{
				var _iframeUrl = "/"+window.location.hash.split(window._switch)[1];
			}
			var _iframeWidth = _iframeUrl.split("?");
			if(_iframeWidth[1]!=undefined){
				loadIframe(_iframeWidth[0],_iframeWidth[1]);
			}
		}
		var _numItem1 = parseFloat($(".page4 .numBox .item").eq(0).find("h4 font").html()),
			_numItem2 = parseFloat($(".page4 .numBox .item").eq(1).find("h4 font").html()),
			_numItem3 = parseFloat($(".page4 .numBox .item").eq(2).find("h4 font").html()),
			_numItemTo1 = _numItemTo2 = _numItemTo3 = _numItemNow = 0;
		numItem = function(){
			if(_numItemTo1<=_numItem1){
				$(".page4 .numBox .item").eq(0).find("h4 font").html(_numItemTo1);
				_numItemTo1++;
				_numItemNow = 1;
			}
			if(_numItemTo3<=_numItem3){
				$(".page4 .numBox .item").eq(2).find("h4 font").html(_numItemTo3.toFixed(1));
				_numItemTo3+=0.1;
				_numItemNow = 1;
			}else if($(".page4 .numBox .item").eq(2).find("h4 font").html().split(".")[1] == '0'){
				$(".page4 .numBox .item").eq(2).find("h4 font").html(_numItemTo3.toFixed(0));
			}
			if(_numItemTo2<=_numItem2){
				$(".page4 .numBox .item").eq(1).find("h4 font").html(_numItemTo2);
				_numItemTo2++;
				_numItemNow = 1;
			}
			if(_numItemNow==1){
				setTimeout('numItem()',10);
				_numItemNow = 0;
			}
		}
		pageUp = function(){
			_mousewheelScroll++;
			if(_pageNum == 3 && $(".page4 .numBox.show").length<=0){
				$(".page4 .numBox").addClass("show");
				$(".page4 .map,.page4 .change").addClass("totop");
				_numItemTo1 = _numItem1 - 100;
				_numItemTo2 = _numItem2 - 100;
				_numItemTo3 = _numItem3 - 10;
				numItem();
				pageTime();
			}else if(_pageNum<_pageLen){
				_pageNum++;
				$("html,body").stop().animate({
					scrollTop:window.winheight*_pageNum
				},500,function(){
					pageTime();
					$(".page4 .numBox").removeClass("show");
					$(".page4 .map,.page4 .change").removeClass("totop");
				});
				pageTurning(0);
			}else if(_pageNum==_pageLen){
				_pageNum++;
				$("html,body").stop().animate({
					scrollTop:$(".main").height()
				},1000,function(){
					pageTime();
					$(".page4 .numBox").removeClass("show");
					$(".page4 .map,.page4 .change").removeClass("totop");
				});
				pageTurning(0);
			}else{
				pageTime();
			}
		}
		pageDown = function(){
			_mousewheelScroll++;
			if(_pageNum>0){
				_pageNum--;
				$("html,body").stop().animate({
					scrollTop:window.winheight*_pageNum
				},500,function(){
					$(".page4 .numBox").removeClass("show");
					$(".page4 .map,.page4 .change").removeClass("totop");
					pageTime();
				});
				pageTurning(0);
			}else{
				pageTime();
			}
		}
		pageScroll = function(_top){
			_pageNum = Math.floor(_top/window.winheight);
		}
	}
	//页面大小
	$(window).resize(function(){
		window.winwidth = $(window).width();
		window.winheight = $(window).height();
		if(window.winwidth>1024){
			$(".banner,.pageBox").css("height",$(window).height());
		}else{
			$(".banner,.pageBox").removeAttr("style");
		}
		if(window.winwidth>1024){
			var _mapW = $(".page4 .map").height()/1310*1588;
			$(".page4 .map").css({
				"width":_mapW,
				"left":(window.winwidth-390-_mapW)/2
			});
		}else{
			var _mapH = $(".page4 .map").width()/1588*1310;
			$(".page4 .map").css({
				"height":_mapH
			});
		}
	});
	
	
});
