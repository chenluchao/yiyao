requirejs.config({
	baseUrl: "js",
	paths: {
		extend: "plugins/jquery.extend",
		jquery: "libs/jquery.min",
		cookie:"plugins/cookie"
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
requirejs(["jquery", "extend","cookie"], function($){
	$(".log_form .tab").tab("active","click");
	$(".ysy input").focus(function(){
		$(this).parent().css({
			border:"#0083ce 1px solid"
		});
	});
	$(".ysy input").blur(function(){
		$(this).parent().css({
			border:"1px solid #e6e6e6"
		});
	});
	$("#tis input").focus(function(){
		$(this).parent().siblings().css({
			display:"none"
		});
	});
	$("#tis input").blur(function(){
		if(!(/^1{1}[3-8]{1}[0-9]{9}$/.test($(this).val()))&&($(this).val()!="")){
			$(this).parent().siblings().css({
				display:"inline-block"
			});
		}
	});
	
});