define(['jquery'], function($) {
	function loadheader() {
		$(".loadhead").load("html/header.html", function() {
			//改变头部地址显示
			$(".head .box .dizhi ul li i").click(function() {
				$(".head .box .ieam").html(this.innerHTML)
				$(".head .box .dizhi").css({
					display: "none"
				});
			});
			show();
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