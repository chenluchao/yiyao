requirejs.config({
	baseUrl:"js/plugins",
	paths:{
		baiduT:"baiduTemplate",
		page:"jPages",
		extend:"jquery.extend",
		jquery:"jquery.min",
		lazy:"lazyload.min",
		swiper:"swiper.min"
	},
	shim:{
		baiduT:{
			exports:"baidu"
		},
		page:{
			deps:["jquery"]
		},
		extend:{
			deps:["jquery"]
		},
		jquery:{
			exports:"jQuery"
		},
		lazy:{
			deps:["jquery"]
		},
		swiper:{
			exports:"Swiper",
			deps:["jquery"]
		}
	}
});

requirejs(["jquery","swiper","baiduT","extend","lazy","page"],function($,swiper,baidu){
	//头部警告栏
	$(".close_jing").click(function(){
		$(".jinggao").animate({
			height:0
		})
	})
	//改变头部地址显示
	$(".head .box .dizhi ul li i").click(function(){
		$(".head .box .ieam").html(this.innerHTML)
		$(".head .box .dizhi").css({
			display:"none"
		})
	});
//	轮播图左侧导航栏
	$(".fenlei").tab("active","mouseenter");
	$(".fenlei").mouseleave(function(){
		$(".fenlei .tab_but a").removeClass("active");
		$(".fenlei .tab_show div").removeClass("active");
	});
	$(".fenlei .tab_but a li").hover(function(){
		$(this).stop().animate({
			"margin-left":20
		});
	},function(){
		$(this).stop().animate({
			"margin-left":0
		});
	});
	//轮播图
	var swiper = new swiper('.swiper-container', {
    	loop:true,
    	autoplay:true,
    	speed:800,
    	pagination: {
        el: '.swiper-pagination',
        clickable:true,
      },
    });
    //轮播图鼠标移入移除效果
    $('.swiper-slide').mouseenter(function () {
  		swiper.autoplay.stop();
	});
	$('.swiper-slide').mouseleave(function () {
   		swiper.autoplay.start();
	})
});

//源生
window.onload=function(){
	//头部地址二级菜单
	var timer;
	var yesno=document.querySelector(".yesno");
	var myyao=document.querySelector(".myyao");
	var oD1=document.querySelector(".head .box .ieam");
	var oD2=document.querySelector(".head .box .dizhi");
	oD2.onmousemove=oD1.onmouseover=function (){
		clearTimeout(timer);
		oD2.style.display='block';
	}
	oD1.onmouseout=function(){
		timer=setTimeout(function(){
			oD2.style.display="none";
		},500)
	}
	oD2.onmouseout=function(){
		timer = setTimeout(function(){
			oD2.style.display="none"
		},500)
	};
	//头部我的一药二级菜单
	var timer1;
	myyao.onmouseover=yesno.onmouseover=function (){
		clearTimeout(timer1);
		myyao.style.display='block';
		$(".yesno").css({
			background:"#fff"
		})
	}
	yesno.onmouseout=function(){
		timer1=setTimeout(function(){
			myyao.style.display="none";
			$(".yesno").css({
				background:"#f1f1f1"
		})
		},50)
	}
	myyao.onmouseout=function(){
		timer1 = setTimeout(function(){
			myyao.style.display="none";
			$(".yesno").css({
				background:"#f1f1f1"
		})
		},50)
	}
	//头部二维码二级菜单
	var timer2;
	var app_dis=document.querySelector(".app_dis");
	var app_show=document.querySelector(".app_show");
	app_show.onmouseover=app_dis.onmouseover=function (){
		clearTimeout(timer1);
		app_show.style.display='block';
	}
	app_dis.onmouseout=function(){
		timer1=setTimeout(function(){
			app_show.style.display="none";
		},50)
	}
	app_show.onmouseout=function(){
		timer1 = setTimeout(function(){
			app_show.style.display="none";
		},50)
	}
};