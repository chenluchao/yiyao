define(['jquery'], function($) {
	function loadheader() {
		$(".head").load("html/header.html", function() {
			//改变头部地址显示
			$(".head .box .dizhi ul li i").click(function() {
				$(".head .box .ieam").html(this.innerHTML)
				$(".head .box .dizhi").css({
					display: "none"
				});
			});
			show();
		});	
	}
	function show() {
		//头部地址二级菜单
		var timer;
		var yesno = document.querySelector(".yesno");
		var myyao = document.querySelector(".myyao");
		var oD1 = document.querySelector(".head .box .ieam");
		var oD2 = document.querySelector(".head .box .dizhi");
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
			}, 50)
		}
		//头部二维码二级菜单
		var timer2;
		var app_dis = document.querySelector(".app_dis");
		var app_show = document.querySelector(".app_show");
		app_show.onmouseover = app_dis.onmouseover = function() {
			clearTimeout(timer1);
			app_show.style.display = 'block';
		}
		app_dis.onmouseout = function() {
			timer1 = setTimeout(function() {
				app_show.style.display = "none";
			}, 50)
		}
		app_show.onmouseout = function() {
			timer1 = setTimeout(function() {
				app_show.style.display = "none";
			}, 50)
		}
	}
	
	return {
		loadheader: loadheader,
		 
	}
});