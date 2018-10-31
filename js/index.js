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
	$(".close_jing").click(function(){
		$(".jinggao").animate({
			height:0
		})
	})
	$(".head .box .dizhi ul li i").click(function(){
		$(".head .box .ieam").html(this.innerHTML)
		$(".head .box .dizhi").css({
			display:"none"
		})
	})
	
	
});
window.onload=function(){
	var timer;
	var oD1=document.querySelector(".head .box .ieam")
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
	}
};