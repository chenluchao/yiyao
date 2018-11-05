requirejs.config({
	baseUrl: "js",
	paths: {
		baiduT: "plugins/baiduTemplate",
		page: "plugins/jPages",
		extend: "plugins/jquery.extend",
		jquery: "libs/jquery.min",
		lazy: "plugins/lazyload.min",
		swiper: "plugins/swiper.min",
		header: "modules/header",
		footer:"modules/footer",
	},
	shim: {
		baiduT: {
			exports: "baidu"
		},
		page: {
			deps: ["jquery"]
		},
		extend: {
			deps: ["jquery"]
		},
		jquery: {
			exports: "jQuery"
		},
		lazy: {
			deps: ["jquery"]
		},
		swiper: {
			exports: "Swiper",
			deps: ["jquery"]
		},
		//			header:{
		//				exports:"header",
		//				deps:["jquery"]
		//			}
	}
});
requirejs(["jquery", "swiper", "baiduT", "header","footer","extend","lazy", "page"], function($, swiper, baidu, header,footer) {
	//头部警告栏
	$(".close_jing").click(function() {
		$(".jinggao").animate({
			height: 0
		})
	});
	header.loadheader();
	var ipt = document.querySelector(".search input[type=text]");
	var but = document.querySelector(".search input[type=button]");
	var ul = document.querySelector(".search ul");
	
	ipt.oninput=function(){
			jsonp("https://suggest.taobao.com/sug",{
				code:"utf-8",
				q:ipt.value,
				callback:"jsonp123",
				area:"b2c"
			},function(data){
				ul.innerHTML = "";
				data = data.result;
				data.forEach(function(ele,index){
					var li = document.createElement("li");
					li.innerHTML = "<a href='https://s.taobao.com/search?q="+ele[0]+"' target='_blank'>"+ele[0]+"</a>";
					ul.appendChild(li);
				});
			});
			var url1='https://s.taobao.com/search?q='+ipt.value;
			$(".search .go").click(function(){
				$(this).attr({
				href:url1
			});
			});
	}
	//	轮播图左侧导航栏
	$(".fenlei").tab("active", "mouseenter");
	$(".fenlei").mouseleave(function() {
		$(".fenlei .tab_but a").removeClass("active");
		$(".fenlei .tab_show div").removeClass("active");
	});
	$(".fenlei .tab_but a li").hover(function() {
		$(this).stop().animate({
			"margin-left": 5
		}, 300);
	}, function() {
		$(this).stop().animate({
			"margin-left": 0
		});
	});
	//轮播图
	var swiper1 = new swiper('#swiper1', {
		loop: true,
		autoplay: true,
		speed: 800,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
	//轮播图鼠标移入移除效果
	$('.swiper-slide').mouseenter(function() {
		swiper1.autoplay.stop();
	});
	$('.swiper-slide').mouseleave(function() {
		swiper1.autoplay.start();
	});
	//在线咨询
	$(".tab").tab("active", "click");
	var s;
	$(".wenzen img").hover(function() {
		s = $(this).attr("src");
		$(this).attr('src', $(this).attr("data-src"));
	}, function() {
		$(this).attr('src', s);
	});
	$(".fuwu .itu i").hover(function() {
		$(this).stop().animate({
			"margin-top": 12
		}, 200);
	}, function() {
		$(this).stop().animate({
			"margin-top": 20
		}, 0);
	});
	$(".fenlei .tab_show").load("html/erji_show.html");
	//楼层
	$('.floor_ctrl>div').click(function() { //点击按钮设置卷去高度
		var top = $('.floor>div').eq($(this).index()).offset().top;
		$('body,html').stop().animate({
			scrollTop: top
		});
	});
	$(window).scroll(function() { //卷去高度改变，设置按钮高亮。
		var scroll = $('html,body').scrollTop();
		var top1 = $('.floor>div').eq(0).offset().top;
		var top2 = $('.floor>div').eq(8).offset().top + 300;
		if(scroll >= top1 && scroll <= top2) {
			$('.floor_ctrl>div').css({
				display: "block"
			})
		} else {
			$('.floor_ctrl>div').css({
				display: "none"
			})
		}
		$('.floor_ctrl>div').hover(function() {
			$(this).addClass("showit").siblings().removeClass("showit");
		}, function() {
			$(this).removeClass("showit");
		})
		$('.floor>div').each(function(index, ele) {
			if(scroll >= $(ele).offset().top) {
				$('.floor_ctrl>div').eq($(ele).index()).addClass('active').siblings().removeClass("active");
			}
		});
	});
	function clock() {
		var se = document.querySelector(".clock-s");
		var ho = document.querySelector(".clock-h");
		var date = new Date();
		var s = 3;
		var h = 0.1;
		var seconds = date.getSeconds() * 6;
		var minutes = date.getMinutes() * 6 + seconds / 360 * 6;
		var hours = date.getHours() * 30 + minutes / 360 * 30;
		se.style.transform += "rotate(" + s + "deg)";
		ho.style.transform = "rotate(" + seconds + "deg)";
	}
	setInterval(clock, 100);
	var mi = document.querySelector(".clock-m");
	mi.style.transform += "rotate(" + 20 + "deg)";
	clock();
	//加载楼层1-9
	var swiper3 = new swiper('#swiper3', {
		loop: true,
		autoplay: true,
		speed: 800,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
	//轮播图鼠标移入移除效果
	$('.swiper-slide').mouseenter(function() {
		swiper3.autoplay.stop();
	});
	$('.swiper-slide').mouseleave(function() {
		swiper3.autoplay.start();
	});
	var swiper9 = new swiper('#swiper9', {
		loop: true,
		autoplay: true,
		speed: 800,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
	//轮播图鼠标移入移除效果
	$('.swiper-slide').mouseenter(function() {
		swiper9.autoplay.stop();
	});
	$('.swiper-slide').mouseleave(function() {
		swiper9.autoplay.start();
	});
	var swiper6 = new swiper('#swiper6', {
		loop: true,
		autoplay: true,
		speed: 800,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
	//轮播图鼠标移入移除效果
	$('.swiper-slide').mouseenter(function() {
		swiper6.autoplay.stop();
	});
	$('.swiper-slide').mouseleave(function() {
		swiper6.autoplay.start();
	});
	//友情链接选项卡
	$(".friend .tab").tab("active", "mouseenter");
	//加载尾部
	footer.loadfooter();
});