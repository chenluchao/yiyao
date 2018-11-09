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
		//我的购物车
		//全选功能
		$(".tab_show #quanx").click(function(){
			//如果全选按钮没被激活则激活全部按钮
			if(!($(this).hasClass("gou"))){
				$(".tab_show #quanx").addClass("gou");
				$(".maincar .zhong").addClass("gou");
				$(".carfixed .zhong").addClass("gou");
				//全选计算全部重量
					//获取总重量按钮内的值
				var zz =parseFloat($(".carfoot ul li:nth-of-type(1)").children().children().html());
				//将所有的商品的价格全部遍历相加到总重量中
				$(".buyshow ul li .gou").each(function(){
					zz+=parseFloat($(this).parent().parent().children().eq(5).children().html())
				});
				//将计算完的总重量添加到显示区域
				$(".carfoot ul li:nth-of-type(1)").children().children().html(Number(zz).toFixed(2));
				$(".carfixed>p").children().eq(0).html(Number(zz).toFixed(2));
				//全选价格
					//获取总价钱按钮内的值
				var zq =parseFloat($(".carfoot ul li:nth-of-type(4)").children().children().html());
				//利用遍历将所有商品的价格和计算出来
				$(".buyshow ul li .gou").each(function(){
					zq+=parseFloat($(this).parent().parent().children().eq(7).children().children().html())
				});
				//将总价格添加到显示区域
				$(".carfoot ul li:nth-of-type(4)").children().children().html(Number(zq).toFixed(2));
				$(".carfixed>p").children().eq(3).children().children().html(Number(zq).toFixed(2));
			}else{
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
		$(".maincar .zhong").click(function(){
			if(!($(this).hasClass("gou"))){
				$(this).addClass("gou");
				//选中单个商品时计算下方要显示的所选中商品的重量和
				var dz=parseFloat($(this).parent().parent().children().eq(5).children().html());
				var zz=parseFloat($(".carfoot ul li:nth-of-type(1)").children().children().html());
				zz+=dz;
				$(".carfoot ul li:nth-of-type(1)").children().children().html(Number(zz).toFixed(2));
				$(".carfixed>p").children().eq(0).html(Number(zz).toFixed(2));
				//选中单个商品下方计算选中商品的价格和
				var dq=parseFloat($(this).parent().parent().children().eq(7).children().children().html());
				var zq=parseFloat($(".carfoot ul li:nth-of-type(4)").children().children().html());
				zq+=dq;
				$(".carfoot ul li:nth-of-type(4)").children().children().html(Number(zq).toFixed(2));
				$(".carfixed>p").children().eq(3).children().children().html(Number(zq).toFixed(2));
			}else{
				$(this).removeClass("gou");
				//计算去除某商品后的的总重量
				var dz=parseFloat($(this).parent().parent().children().eq(5).children().html());
				var zz=parseFloat($(".carfoot ul li:nth-of-type(1)").children().children().html());
				zz-=dz;
				$(".carfoot ul li:nth-of-type(1)").children().children().html(Number(zz).toFixed(2));
				$(".carfixed>p").children().eq(0).html(Number(zz).toFixed(2));
				//计算去除某商品后的的总钱
				var dq=parseFloat($(this).parent().parent().children().eq(7).children().children().html());
				var zq=parseFloat($(".carfoot ul li:nth-of-type(4)").children().children().html());
				zq-=dq;
				$(".carfoot ul li:nth-of-type(4)").children().children().html(Number(zq).toFixed(2));
				$(".carfixed>p").children().eq(3).children().children().html(Number(zq).toFixed(2));
			}
			if($(".buyshow .gou").length==$(".buyshow ul").length){
				$(".tab_show .zhong").addClass("gou");
			}else{
				$(".tab_show #quanx").removeClass("gou");
			}
			if($(".buyshow .gou").length==0){
				$(".maincar .zhong").removeClass("gou");
			}
		});
		//商品数目加减操作
		$(".buyshow ul li .jian").click(function(){
			var qians = $(this).parent().parent().children().eq(7).children().children().html();
			var shu=$(this).parent().children().eq(1).attr("value");
			var danjia=qians/shu;
			var zzl=$(this).parent().parent().children().eq(5).children().html();
			var dzl=zzl/shu;
			var dangqz=parseFloat($(this).parent().parent().children().eq(5).children().html());
			shu--;
			if(shu<=0){
				alert("您将删此商品");
				$(this).parent().parent().remove();
			}else{
				$(this).parent().children().eq(1).attr("value",shu);
			}
			$(this).parent().parent().children().eq(7).children().children().html(Number(danjia*shu).toFixed(2));
			$(this).parent().parent().children().eq(5).children().html(Number(dzl*shu).toFixed(2));
		});
		$(".buyshow ul li .jia").click(function(){
			var qians1 = $(this).parent().parent().children().eq(7).children().children().html();
			var shu=$(this).parent().children().eq(1).attr("value");
			var danjia1=qians1/shu;
			var zzl1=$(this).parent().parent().children().eq(5).children().html();
			var dzl1=zzl1/shu;
			shu++;
			if(shu>=99){
				$(this).parent().children().eq(1).attr("value","99");
				alert("商品数目已达最大购买上限")
			}else{
				$(this).parent().children().eq(1).attr("value",shu);
			}
			$(this).parent().parent().children().eq(7).children().children().html(Number(danjia1*shu).toFixed(2));
			$(this).parent().parent().children().eq(5).children().html(Number(dzl1*shu).toFixed(2));
		});
		//删除
		$(".buyshow ul li a.shanchu").click(function(){
			$(this).parent().parent().remove();
		});
		//滚动距离小于某数值时下方固定区域
		var top=$(".carfixed").offset().top;//如果将此放入onscroll内则发生颤抖现象
		window.onscroll=function(){
			//获取窗口高度
			if (window.innerHeight){
				winHeight = window.innerHeight;
			}
			else if ((document.body) && (document.body.clientHeight)){
				winHeight = document.body.clientHeight;
			}
			if($(window).scrollTop()<=(top-winHeight)){
				$(".carfixed").css({
					position:"fixed",
					bottom:"0"
				});
			}else{
				$(".carfixed").css({
					position:"relative",
				});
			};
	};
});
