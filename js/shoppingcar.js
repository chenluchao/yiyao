requirejs.config({
	baseUrl: "js",
	paths: {
		extend: "plugins/jquery.extend",
		jquery: "libs/jquery.min",
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
requirejs(["jquery","extend",], function($){
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
		$(".tab").tab("active","click");
});
