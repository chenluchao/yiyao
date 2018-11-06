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
		footer: "modules/footer",
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
	}
});
requirejs(["jquery", "swiper", "baiduT", "header", "footer", "extend", "lazy", "page"], function($, swiper, baidu, header, footer) {
	header.loadheader();
	var ipt = document.querySelector(".search input[type=text]");
	var but = document.querySelector(".search input[type=button]");
	var ul = document.querySelector(".search ul");

	ipt.oninput = function() {
		jsonp("https://suggest.taobao.com/sug", {
			code: "utf-8",
			q: ipt.value,
			callback: "jsonp123",
			area: "b2c"
		}, function(data) {
			ul.innerHTML = "";
			data = data.result;
			data.forEach(function(ele, index) {
				var li = document.createElement("li");
				li.innerHTML = "<a href='https://s.taobao.com/search?q=" + ele[0] + "' target='_blank'>" + ele[0] + "</a>";
				ul.appendChild(li);
			});
		});
		var url1 = 'https://s.taobao.com/search?q=' + ipt.value;
		$(".search .go").click(function() {
			$(this).attr({
				href: url1
			});
		});
	}
	var ipt1 = document.querySelector("#xdb input[type=text]");
	var but1 = document.querySelector("#xdb input[type=button]");
	var ul1 = document.querySelector("#xdb ul");
	ipt1.oninput = function() {
		jsonp("https://suggest.taobao.com/sug", {
			code: "utf-8",
			q: ipt1.value,
			callback: "jsonp123",
			area: "b2c"
		}, function(data) {
			ul1.innerHTML = "";
			data = data.result;
			data.forEach(function(ele, index) {
				var li = document.createElement("li");
				li.innerHTML = "<a href='https://s.taobao.com/search?q=" + ele[0] + "' target='_blank'>" + ele[0] + "</a>";
				ul1.appendChild(li);
			});
		});
		var url2 = 'https://s.taobao.com/search?q=' + ipt1.value;
		$(".search .go").click(function() {
			$(this).attr({
				href: url2
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
	//三级列表
	$(".fenlei .tab_show").load("html/erji_show.html", function() {
		var timer2;
		$(".headnav .nav a:first-child").hover(function() {
			$("#nav .fenlei .tab_but").css({
				display: "block"
			});
		}, function() {
			timer2 = setTimeout(function() {
				$("#nav .fenlei .tab_but").css({
					display: "none"
				});
			}, 100)
		});
		$("#nav .fenlei").hover(function() {
			clearTimeout(timer2);
		}, function() {
			$("#nav .fenlei .tab_but").css({
				display: "none"
			})
		})
	});
	//吸顶效果
	window.onscroll=function(){
		if($(window).scrollTop()>=275){
			$(".xdbox").css({
				display:"block"
			});
			
		}else{
			$(".xdbox").css({
				display:"none"
			});
		};
	};
	$(".choose dl dt i").click(function(){
		$(this).parent().parent().toggleClass("active").siblings().removeClass("active");
	});
//多选区域
	//点击多选按钮展开多选框
	$(".screen .xianshi input").click(function(){
		$(this).parent().css({
			display:"none"
		});
		$(this).parent().siblings().css({
			display:"block"
		});
	});
	//点击取消按钮收起多选框
	$(".screen p input.qx").click(function(){
		$(this).parent().siblings().removeClass("xuanz");
		$(this).parent().parent().removeClass("gaiqd");
		$(this).parent().parent().css({
			display:"none"
		});
		$(this).parent().parent().siblings().css({
			display:"block"
		});
	});
	//进行多选
	$(".screen .yinchang span:nth-of-type(n+2)").click(function(){
		if($(this).hasClass("xuanz")){
			$(this).removeClass("xuanz").parent().removeClass("gaiqd");
		}else{
			$(this).addClass("xuanz").parent().addClass("gaiqd")
		}
	});
	//排序中的选择
	$(".zhonghe a").click(function(){
		$(this).toggleClass("xs");
	});
	//列表内容
	$.get("data/list.json").done(function(data){
			$("#baidut").html(baidu.template("temp",data));
			$("#pages").jPages({
				containerID:"container",
				first:"首页",
				last:"尾页",
				previous:"上一页",
				next:"下一页",
				perPage:10
			});
		});
		footer.loadfooter();
});