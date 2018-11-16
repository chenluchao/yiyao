requirejs.config({
	baseUrl: "js",
	paths: {
		baiduT: "plugins/baiduTemplate",
		page: "plugins/jPages",
		extend: "plugins/jquery.extend",
		jquery: "libs/jquery.min",
		swiper: "plugins/swiper.min",
		header: "modules/header",
		footer: "modules/footer",
		rightfixed: "modules/rightfixed",
		cookie: "plugins/cookie"
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
		swiper: {
			exports: "Swiper",
			deps: ["jquery"]
		},
	}
});
requirejs(["jquery", "swiper", "baiduT", "header", "footer", "rightfixed", "extend", "page", "cookie"], function($, swiper, baidu, header, footer, rightfixed) {
	header.loadheader();
	//吸頂搜索框
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
	window.onscroll = function() {
		if($(window).scrollTop() >= 275) {
			$(".xdbox").css({
				display: "block"
			});

		} else {
			$(".xdbox").css({
				display: "none"
			});
		};
	};
	$(".choose dl dt i").click(function() {
		$(this).parent().parent().toggleClass("active").siblings().removeClass("active");
	});
	//多选区域
	//点击多选按钮展开多选框
	$(".screen .xianshi input").click(function() {
		$(this).parent().css({
			display: "none"
		});
		$(this).parent().siblings().css({
			display: "block"
		});
	});
	//点击取消按钮收起多选框
	$(".screen p input.qx").click(function() {
		$(this).parent().siblings().removeClass("xuanz");
		$(this).parent().parent().removeClass("gaiqd");
		$(this).parent().parent().css({
			display: "none"
		});
		$(this).parent().parent().siblings().css({
			display: "block"
		});
	});
	//进行多选
	$(".screen .yinchang span:nth-of-type(n+2)").click(function() {
		if($(this).hasClass("xuanz")) {
			$(this).removeClass("xuanz");
			if($(this).siblings(".xuanz").length==0){
				$(this).parent().removeClass("gaiqd");
			}
		} else {
			$(this).addClass("xuanz").parent().addClass("gaiqd")
		}
	});
	//排序中的选择
	$(".zhonghe a").click(function() {
		$(this).toggleClass("xs");
	});
	//列表内容
	$.get("data/list.json").done(function(data) {
		$("#baidut").html(baidu.template("temp", data));
		$("#pages").jPages({
			containerID: "container",
			first: "首页",
			last: "尾页",
			previous: "上一页",
			next: "下一页",
			perPage: 12
		});
		//关于cookie
		
		
		
		
		//生成新详情页
		//定义数组用以存储获取的所有查看详情button按钮
		var xqbut=[];
		xqbut = $(".container li").find(":button:first");
		for(var i = 0; i < data.drug.length; i++) {
			xqbut[i].index = data.drug[i].itemId;
		}
		//点击查看详情跳转到该商品
		$(".container li").find(":button:first").click(function() {
			var det = getCookie("det");
			if(!det){
				setCookie("det", this.index,1);
			}else{
				removeCookie("det");
				setCookie("det", this.index,1);
			}
		});
		//点击列表内非查看详情按钮跳转到该商品
		var xqbutd=[];
		xqbutd = $(".container li .godet");
		for(var i = 0; i < data.drug.length; i++) {
			xqbutd[i].index = data.drug[i].itemId;
		}
		$(".container li .godet").click(function() {
			var det = getCookie("det");
			if(!det){
				setCookie("det", this.index,1);
			}else{
				removeCookie("det");
				setCookie("det", this.index,1);
			}
		});
		
		//定义数组用以存储获取的所有button按钮
		var arr = [];
		arr = $(".container li").find(":button:last");
		//给每一个button按钮添加index属性
		for(var i = 0; i < data.drug.length; i++) {
			arr[i].index = data.drug[i].itemId;
		}
		//给button按钮添加点击设置cookie事件
		$(".container li").find(":button:last").click(function() {
			var car = getCookie("car");
			//如果没有car这个cookie则设置该cookie并且把点击的商品添加进去
			if(!car) {
				setCookie("car", this.index + "|1", 7);
			} else { //如果已经有car这个cookie
				if(!findRepeat(this.index)) { //如果之前没有点击当前点击的按钮则则添加进cookie
					setCookie("car", car + "&" + this.index + "|1", 7);
				} else { //如果之前已经添加过该商品
					var carpros = car.split("&"); //将整个car拆分
					for(var i = 0; i < carpros.length; i++) {
						var pro = carpros[i].split("|");
						if(this.index == pro[0]) { //找到当前点击的商品的index并将其数目加1
							pro[1]++;
							carpros.splice(i, 1, pro.join("|")); //加1后将更改后的该商品重新以|连接成为表示该商品的cookie段
						}
					}
					setCookie("car", carpros.join("&"), 7); //将操作完的所有商品重新连接成为一个新的完整的coolie以&连接
				}
			}

		});
		//价格筛选
		$(".zhonghe>p input:nth-of-type(2)").focus(function() {
			$(this).blur(function() {
				var x = parseInt($(".zhonghe>p input:nth-of-type(1)").val());
				var d = parseInt($(".zhonghe>p input:nth-of-type(2)").val());
				for(var i = 0; i < data.drug.length; i++) {
					if(parseInt(data.drug[i].onePrice) <= x || parseInt(data.drug[i].onePrice) >= d) {
						$(arr[i]).parent().parent().css({
							display: "none"
						})
					};
				};
			});
		});
	});

	//模块化加载尾部
	footer.loadfooter();
	//模块化加载右侧导航栏
	rightfixed.loadrightfixed();
});