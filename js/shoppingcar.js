requirejs.config({
	baseUrl: "js",
	paths: {
		extend: "plugins/jquery.extend",
		jquery: "libs/jquery.min",
		cookie: "plugins/cookie"
	},
	shim: {
		extend: {
			deps: ["jquery"]
		},
		jquery: {
			exports: "jQuery"
		},
	}
});
requirejs(["jquery", "extend", "cookie"], function($) {
	if(getCookie("log")) {
		var logins = getCookie("log").split("|");
		if(logins[1] == 0) {
			$(".head_a .blue").css({
				display: "none"
			});
			$(".head_a #user").css({
				display: "inline-block"
			}).html(logins[0])
		} else {
			$(".head_a .login").css({
				display: "inline-block"
			});
			$(".head_a #user").css({
				display: "none"
			})
		}
	}

	$(".head .dizhi ul li i").click(function() {
		$(".head .ieam").html(this.innerHTML)
		$(".head .dizhi").css({
			display: "none"
		});
	});
	//头部地址二级菜单
	var timer;
	var yesno = document.querySelector(".yesno");
	var myyao = document.querySelector(".myyao");
	var oD1 = document.querySelector(".head .ieam");
	var oD2 = document.querySelector(".head .dizhi");
	oD2.onmousemove = oD1.onmouseover = function() {
		clearTimeout(timer);
		oD2.style.display = 'block';
	}
	oD1.onmouseout = function() {
		timer = setTimeout(function() {
			oD2.style.display = "none";
		}, 500)
	}
	oD2.onmouseout = function() {
		timer = setTimeout(function() {
			oD2.style.display = "none"
		}, 500)
	};
	//头部我的一药二级菜单
	var timer1;
	myyao.onmouseover = yesno.onmouseover = function() {
		clearTimeout(timer1);
		myyao.style.display = 'block';
		$(".yesno").css({
			background: "#fff"
		})
	}
	yesno.onmouseout = function() {
		timer1 = setTimeout(function() {
			myyao.style.display = "none";
			$(".yesno").css({
				background: "#f1f1f1"
			})
		}, 50)
	}
	myyao.onmouseout = function() {
		timer1 = setTimeout(function() {
			myyao.style.display = "none";
			$(".yesno").css({
				background: "#f1f1f1"
			})
		}, 50);
	};
	//购物车/需求清单
	$(".tab").tab("active", "click");
	//通过cookie的值动态生成购物车内的商品列表
	$.get("data/list.json").done(function(data) {
		var buy = document.querySelector(".maincar .buyshow");
		if(getCookie("car")) {
			var apro = getCookie("car").split("&");
			for(var i = 0; i < apro.length; i++) {
				var pro = apro[i].split("|");
				var info = find(data.drug, pro[0]);
				var ul = document.createElement("ul");
				var li0 = document.createElement("li");
				var span = document.createElement("span");
				span.className = "zhong";
				li0.appendChild(span);
				ul.appendChild(li0);
				var li1 = document.createElement("li");
				li1.innerHTML = "<img src='" + info.imgUrl + "' />"
				ul.appendChild(li1);
				var li2 = document.createElement("li");
				li2.innerHTML = "<span class='name'>" + info.title + "</span><button>修改<button>";
				ul.appendChild(li2);
				var li3 = document.createElement("li");
				li3.innerHTML = "<span>&yen<i class='qian'>" + info.onePrice + "</i></span>";
				ul.appendChild(li3);
				var li4 = document.createElement("li");
				li4.innerHTML = "<input class='jian' type='button' onclick='changeNum(" + pro[0] + ",-1)' /><input class='geshu' type='text' value='" + pro[1] + "' disabled='disabled' /><input class='jia' type='button' onclick='changeNum(" + pro[0] + ",1)' />";
				ul.appendChild(li4);
				var li5 = document.createElement("li");
				var z = Number(info.kg * pro[1]).toFixed(2);
				li5.innerHTML = "<span>" + z + "</span>Kg";
				ul.appendChild(li5);
				var li6 = document.createElement("li");
				li6.innerHTML = "有货";
				ul.appendChild(li6);
				var li7 = document.createElement("li");
				var q = Number(info.onePrice * pro[1]).toFixed(2);
				li7.innerHTML = "<span>&yen<i>" + q + "</i></span>";
				ul.appendChild(li7);
				var li8 = document.createElement("li");
				li8.innerHTML = "<a href='javascript:;'>收藏</a><a href='javascript:;' class='shanchu' onclick='changeNum(" + pro[0] + ",-999999)'>删除</a><a href='javascript:;'>找相似</a>";
				ul.appendChild(li8);
				buy.appendChild(ul);
			}
		}

		//删除选中的商品
		$(".carfixed>ul>li:nth-of-type(2)").click(function() {
			var apro = getCookie("car").split("&");
			for(var i = 0; i <= apro.length; i++) {
				var pro = apro[i].split("|");
				if($(".buyshow ul").eq(i).children().eq(0).children().hasClass("gou")) {
					changeNum(pro[0], -999999)
				}
			}
		});
		//全选功能
		$(".tab_show #quanx").click(function() {
			//如果全选按钮没被激活则激活全部按钮
			if(!($(this).hasClass("gou"))) {
				$(".tab_show #quanx").addClass("gou");
				$(".maincar .zhong").addClass("gou");
				$(".carfixed .zhong").addClass("gou");
				//全选计算全部重量
				//获取总重量按钮内的值
				var zz = parseFloat($(".carfoot ul li:nth-of-type(1)").children().children().html());
				zz = 0;
				//将所有的商品的价格全部遍历相加到总重量中
				$(".buyshow ul li .gou").each(function() {
					zz += parseFloat($(this).parent().parent().children().eq(5).children().html())
				});
				//将计算完的总重量添加到显示区域
				$(".carfoot ul li:nth-of-type(1)").children().children().html(Number(zz).toFixed(2));
				$(".carfixed>p").children().eq(0).html(Number(zz).toFixed(2));
				//全选价格
				//获取总价钱按钮内的值
				var zq = parseFloat($(".carfoot ul li:nth-of-type(4)").children().children().html());
				zq = 0;
				//利用遍历将所有商品的价格和计算出来
				$(".buyshow ul li .gou").each(function() {
					zq += parseFloat($(this).parent().parent().children().eq(7).children().children().html())
				});
				//将总价格添加到显示区域
				$(".carfoot ul li:nth-of-type(4)").children().children().html(Number(zq).toFixed(2));
				$(".carfixed>p").children().eq(3).children().children().html(Number(zq).toFixed(2));
			} else {
				//如果全选按钮已经被激活则取消全部按钮全选状态
				$(".tab_show #quanx").removeClass("gou");
				$(".maincar .zhong").removeClass("gou");
				$(".carfixed .zhong").removeClass("gou");
				//将总价格和总价钱全部归零
				$(".carfoot ul li:nth-of-type(1)").children().children().html("0.00");
				$(".carfoot ul li:nth-of-type(4)").children().children().html("0.00");
				$(".carfoot ul li:nth-of-type(4)").children().children().html("0.00");
				$(".carfixed>p").children().eq(3).children().children().html("0.00");
			}
		});
		//单个商品的选择
		$(".maincar .zhong").click(function() {
			if(!($(this).hasClass("gou"))) {
				$(this).addClass("gou");
				//选中单个商品时计算下方要显示的所选中商品的重量和
				var dz = parseFloat($(this).parent().parent().children().eq(5).children().html());
				var zz = parseFloat($(".carfoot ul li:nth-of-type(1)").children().children().html());
				zz += dz;
				$(".carfoot ul li:nth-of-type(1)").children().children().html(Number(zz).toFixed(2));
				$(".carfixed>p").children().eq(0).html(Number(zz).toFixed(2));
				//选中单个商品下方计算选中商品的价格和
				var dq = parseFloat($(this).parent().parent().children().eq(7).children().children().html());
				var zq = parseFloat($(".carfoot ul li:nth-of-type(4)").children().children().html());
				zq += dq;
				$(".carfoot ul li:nth-of-type(4)").children().children().html(Number(zq).toFixed(2));
				$(".carfixed>p").children().eq(3).children().children().html(Number(zq).toFixed(2));
			} else {
				$(this).removeClass("gou");
				//计算去除某商品后的的总重量
				var dz = parseFloat($(this).parent().parent().children().eq(5).children().html());
				var zz = parseFloat($(".carfoot ul li:nth-of-type(1)").children().children().html());
				zz -= dz;
				$(".carfoot ul li:nth-of-type(1)").children().children().html(Number(zz).toFixed(2));
				$(".carfixed>p").children().eq(0).html(Number(zz).toFixed(2));
				//计算去除某商品后的的总钱
				var dq = parseFloat($(this).parent().parent().children().eq(7).children().children().html());
				var zq = parseFloat($(".carfoot ul li:nth-of-type(4)").children().children().html());
				zq -= dq;
				$(".carfoot ul li:nth-of-type(4)").children().children().html(Number(zq).toFixed(2));
				$(".carfixed>p").children().eq(3).children().children().html(Number(zq).toFixed(2));
			}
			if($(".buyshow .gou").length == $(".buyshow ul").length) {
				$(".tab_show .zhong").addClass("gou");
			} else {
				$(".tab_show #quanx").removeClass("gou");
			}
			if($(".buyshow .gou").length == 0) {
				$(".maincar .zhong").removeClass("gou");
			}
		});
		//滚动距离小于某数值时下方固定区域
		var top = $(".carfixed").offset().top;
		window.onscroll = function() {
			//获取窗口高度
			if(window.innerHeight) {
				winHeight = window.innerHeight;
			} else if((document.body) && (document.body.clientHeight)) {
				winHeight = document.body.clientHeight;
			}
			if($(window).scrollTop() <= (top - winHeight)) {
				$(".carfixed").css({
					position: "fixed",
					bottom: "0"
				});
			} else {
				$(".carfixed").css({
					position: "relative",
				});
			};
		};
	});
});