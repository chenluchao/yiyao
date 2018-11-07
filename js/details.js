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
		rightfixed:"modules/rightfixed"
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
requirejs(["jquery", "swiper", "baiduT", "header", "footer","rightfixed", "extend", "lazy", "page"], function($, swiper, baidu, header, footer,rightfixed) {
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
	};
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
	$(".fenlei .tab_show").load("html/details_erji_show.html", function() {
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
	//放大镜
	$(function() {
		var magnifierConfig = {
			magnifier : "#magnifier1",//最外层的大容器
			width : 300,//承载容器宽
			height : 300,//承载容器高
			moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
			zoom : 2//缩放比例
		};
		var _magnifier = magnifier(magnifierConfig);
	});
	$(".tab").tab("active","click");
	//模块化加载尾部
	footer.loadfooter();
	//模块化加载右侧导航栏
	rightfixed.loadrightfixed();
});
