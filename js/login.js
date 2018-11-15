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
	$(".log_form .tab").tab("active", "click");
	$(".ysy input").focus(function() {
		$(this).parent().css({
			border: "#0083ce 1px solid"
		});
	});
	$(".ysy input").blur(function() {
		$(this).parent().css({
			border: "1px solid #e6e6e6"
		});
	});
	$("#tis input").focus(function() {
		$(this).parent().siblings().css({
			display: "none"
		});
	});
	$("#tis input").blur(function() {
		if(!(/^1{1}[3-8]{1}[0-9]{9}$/.test($(this).val())) && ($(this).val() != "")) {
			$(this).parent().siblings().css({
				display: "inline-block"
			});
		}
	});
	$(".tab_show .login input[type=submit").click(function() {
		var dname = $(".tab_show .login input[type=text]").val();
		var dpas = $(".tab_show .login input[type=password]").val();
		$.ajax({
			type: "get",
			url: "api/login.php",
			contentType: "application/json",
			data: {
				uname: dname,
				password: dpas,
			},
			success: function(data) {
				var a = $.parseJSON(data)
				if(a.errorCode == 0) {
					alert("登录成功!");
					//设置cookie
					var log = getCookie("log");
					//如果没有log这个cookie则设置该cookie并且把点击的商品添加进去
					if(!log) {
						setCookie("log",a.info.uname+"|"+a.errorCode, 1);
					} else { //如果已经有log这个cookie则先清除后再重新设置cookie
						removeCookie("log");
						setCookie("log",a.info.uname+"|"+a.errorCode, 1);
					}
					window.location.replace("index.html");
				} else if(a.errorCode == 1001) {
					alert("数据库链接错误")
				} else if(a.errorCode == 1002) {
					alert("账户不存在")
				} else if(a.errorCode == 1003) {
					alert("密码错误")
				}
			}
		});
		return false;
	});

});