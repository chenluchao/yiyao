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
		lazy: {
			deps: ["jquery"]
		},
		swiper: {
			exports: "Swiper",
			deps: ["jquery"]
		},
	}
});
requirejs(["jquery", "swiper", "baiduT", "header", "footer", "rightfixed", "extend", "lazy", "page", "cookie"], function($, swiper, baidu, header, footer, rightfixed) {
	header.loadheader();
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
	//点击添加减少商品数目
	$(".number i").eq(0).click(function(){
		var add = $(".number input").val();
		add++;
		$(".number input").val(add);
	});
	$(".number i").eq(1).click(function(){
		var add = $(".number input").val();
		if(add<=1){
			$(".number input").val("1");
		}else{
			add--;
			$(".number input").val(add);
		}
	});
	//立即扫码效果实现
	$(".mabao b").hover(function(){
		$(".xqmid .mama").css({
			display:"block"
		}).stop().animate({
			top:65
		},600)
	},function(){
		$(".xqmid .mama").stop().animate({
			top:30
		},500);
		setTimeout(function(){
			$(".xqmid .mama").css({
				display:"none"
			})
		},600)
	});
	$(".xqmid .addcar").click(function(){
		$(".xqmid .succes").css({
			display:"block"
		});
		var addnum=$(".xqmid .number input").val();
		$(".xqmid .succes .addnum span").html(addnum);
		
		var allmon=parseInt($(".xqmid .number input").val())*parseFloat($(".xqmid p:nth-of-type(4) i b").html())
		$(".xqmid .succes .allmon span i").html(allmon);
	});
	$(".xqmid .succes .close").click(function(){
		$(".xqmid .succes").css({
			display:"none"
		})
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
			magnifier: "#magnifier1", //最外层的大容器
			width: 300, //承载容器宽
			height: 300, //承载容器高
			moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
			zoom: 2 //缩放比例
		};
		var _magnifier = magnifier(magnifierConfig);
	});
	$(".tab").tab("active", "click");
	//留言区
	var current_btn = document.querySelector(".current_comm .comm_ipt .button button");
	var current_ipt = document.querySelector(".current_comm .comm_ipt .input input");
	var comm_list = document.querySelector(".comm_list");
	current_btn.onclick = function() {
		if(current_ipt.value.trim()) {
			createComm(current_ipt.value);
		} else {
			alert("请输入评论内容");
		}
		current_ipt.value = "";
	}

	function createComm(str) {
		var comm_item = document.createElement("div");
		comm_item.className = "comm_item";
		comm_list.appendChild(comm_item);
		//custom_comm
		var custom_comm = document.createElement("div");
		custom_comm.className = "custom_comm";
		comm_item.appendChild(custom_comm);
		var custom_text = document.createElement("div");
		custom_text.className = "custom_text";
		custom_comm.appendChild(custom_text);
		var custom_text_i = document.createElement("i");
		custom_text_i.innerHTML = "评论";
		custom_text.appendChild(custom_text_i);
		var custom_text_mh = document.createTextNode("：");
		custom_text.appendChild(custom_text_mh);
		var custom_text_span = document.createElement("span");
		custom_text_span.innerHTML = str;
		custom_text.appendChild(custom_text_span);
		var custiom_time = document.createElement("div");
		custiom_time.className = "custiom_time";
		custom_comm.appendChild(custiom_time);
		var custiom_time_span = document.createElement("span");
		var date = new Date();
		custiom_time_span.innerHTML = add0(date.getMonth() + 1) + "月" + add0(date.getDate()) + "日 " + add0(date.getHours()) + ":" + add0(date.getMinutes());
		custiom_time.appendChild(custiom_time_span);
		var custiom_time_i = document.createElement("i");
		custiom_time_i.innerHTML = "回复";
		custiom_time.appendChild(custiom_time_i);
		var repeat_ipt = document.createElement("div");
		repeat_ipt.className = "repeat_ipt";
		custom_comm.appendChild(repeat_ipt);
		var repeat_ipt_input = document.createElement("div");
		repeat_ipt_input.className = "input";
		repeat_ipt.appendChild(repeat_ipt_input);
		var repeat_ipt_input_input = document.createElement("input");
		repeat_ipt_input_input.setAttribute("type", "text");
		repeat_ipt_input.appendChild(repeat_ipt_input_input);
		var repeat_ipt_button = document.createElement("div");
		repeat_ipt_button.className = "button";
		repeat_ipt.appendChild(repeat_ipt_button);
		var repeat_ipt_button_button = document.createElement("button");
		repeat_ipt_button_button.innerHTML = "发表"
		repeat_ipt_button.appendChild(repeat_ipt_button_button);

		custiom_time_i.onclick = function() {
			if(repeat_ipt.getAttribute("data-show")) {
				repeat_ipt.removeAttribute("data-show");
			} else {
				repeat_ipt.setAttribute("data-show", "show");
			}
		}
		repeat_ipt_button_button.onclick = function() {
			if(repeat_ipt_input_input.value.trim()) {
				createComm(repeat_ipt_input_input.value);
			} else {
				alert("请输入提问内容");
			}
			repeat_ipt_input_input.value = "";
			repeat_ipt.removeAttribute("data-show");
		}

	}

	function add0(num) {
		if(num < 10) return "0" + num;
		return num;
	}
	//模块化加载尾部
	footer.loadfooter();
	//模块化加载右侧导航栏
	rightfixed.loadrightfixed();
	//点击加入购物车改变cookie值
	window.onload = function() {
		$.get("data/list.json").done(function() {
			$(".xqmid").children().eq(4).click(function() {
				var car = getCookie("car");
				if(!car) {
					setCookie("car", this.index + "|1", 7);
				}else{
					if(!findRepeat(this.index)) {
						setCookie("car", car + "&" + this.index + "|1", 7);
					} else {
						var carpros = car.split("&");
						for(var i = 0; i < carpros.length; i++) {
							var pro = carpros[i].split("|");
							if(this.index == pro[0]) {
								pro[1]++;
								carpros.splice(i, 1, pro.join("|"));
							}
						}
						setCookie("car", carpros.join("&"), 7)
					}
				}
			});
		});

	}
});