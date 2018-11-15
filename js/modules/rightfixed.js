define(['jquery'], function(rightfixed) {
	function loadrightfixed() {
		$(".float_box").load("html/rightfiixed.html", function() {
			$(".float_box #gotop").click(function() {
				$('body,html').animate({
					scrollTop: 0
				}, 1000);
			});
			//购物车显示商品详情
			var timer;
			var oD1 = document.querySelector(".carfa .zhe1");
			var oD2 = document.querySelector(".carfa .carshow");
			oD2.onmousemove = oD1.onmouseover = function() {
				clearTimeout(timer);
				oD2.style.display = 'block';
			}
			oD1.onmouseout = function() {
				timer = setTimeout(function() {
					oD2.style.display = "none";
				}, 30)
			}
			oD2.onmouseout = function() {
				timer = setTimeout(function() {
					oD2.style.display = "none"
				}, 30)
			};
			$.get("data/list.json").done(function(data) {
				var ul = document.querySelector(".carfa .carshow ul");
				var apro = getCookie("car").split("&");
				for(var i = 0; i < apro.length; i++) {
					var pro = apro[i].split("|");
					var info = find(data.drug, pro[0]);
					var li = document.createElement("li");
					var p = document.createElement("p");
					p.innerHTML = "<img src='" + info.imgUrl + "' />";
					li.appendChild(p);
					var span = document.createElement("span");
					span.innerHTML = "￥<i>" + info.onePrice + "</i>*"+pro[1];
					li.appendChild(span);
					var span1 = document.createElement("span");
					span1.innerHTML = "<a href='details.html' target='_blank'>"+info.title+"</a>";
					li.appendChild(span1);
					ul.appendChild(li);
				}
				var n = $(".carfa .carshow ul").children().length;
				$(".carfa .dingw").html(n);
			});
		});
	};
	return {
		loadrightfixed: loadrightfixed,
	};
});