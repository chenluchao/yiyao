requirejs.config({
	baseUrl: "js",
	paths: {
		jquery: "libs/jquery.min",
		cookie: "plugins/cookie",
	},
	shim: {
		jquery: {
			exports: "jQuery"
		},
	}
});
requirejs(["jquery", "cookie"], function($) {
	var flag1 = false;
	var flag2 = false;
	var flag3 = false;
	var flag4 = false;
	//电话框
	$(".reg_form .dianhua").focus(function() {
		//聚焦时不能为空提示的相关边框颜色回归默认
		$(this).parent().css({
			border: "1px solid #0083ce"
		});
		//聚焦时不能为空提示隐藏
		$(this).parent().children().eq(2).css({
			display: "none"
		});
		//聚焦时手机号格式不正确提示隐藏
		$(this).parent().siblings().css({
			display: "none"
		});
		//聚焦时隐藏验证成功提示
		$(this).parent().children().eq(3).css({
			display: "none"
		});
	});
	$(".reg_form .dianhua").blur(function() {
		//失焦时判断是否为空
		if($(this).val() == "") {
			flag1 = false;
			//输入为空时边框颜色变化
			$(this).parent().css({
				border: "#ffaa00 1px solid"
			});
			//输入为空时提示信息显示
			$(this).parent().children().eq(2).css({
				display: "inline-block"
			});
		} else { //输入不为空时判断是否格式合法
			//如果格式错误显示提示信息且边框颜色改变
			if(!((/^[1][3-8]{1}[0-9]{9}$/).test($(this).val()))) {
				//显示提示信息
				flag1 = false;
				$(this).parent().siblings().css({
					display: "block"
				});
				//边框颜色改变
				$(this).parent().css({
					border: "#e72418 1px solid"
				});
			} else {
				//验证成功
				flag1 = true;
				$(this).parent().children().eq(3).css({
					display: "inline-block"
				})
			}
		}
	});

	//密码框
	$(".reg_form .mi").focus(function() {
		//聚焦时不能为空提示的相关边框颜色回归默认
		$(this).parent().css({
			border: "1px solid #0083ce"
		})
		//聚焦时不能为空提示隐藏
		$(this).parent().children().eq(2).css({
			display: "none"
		});
		//聚焦时手机号格式不正确提示隐藏
		$(this).parent().parent().children().eq(1).css({
			display: "none"
		});
		//聚焦时隐藏验证成功提示
		$(this).parent().children().eq(3).css({
			display: "none"
		});
		//聚焦时隐藏密码不是6-20位的提示
		$(this).parent().parent().children().eq(3).css({
			display: "none"
		});
		//聚焦时隐藏设置密码提示
		$(this).parent().parent().children().eq(2).css({
			display: "none"
		});
	});
	$(".reg_form .mi").blur(function() {
		//失焦时判断是否为空
		if($(this).val() == "") {
			flag2 = false;
			//输入为空时边框颜色变化
			$(this).parent().css({
				border: "#ffaa00 1px solid"
			});
			//输入为空时提示信息显示
			$(this).parent().children().eq(2).css({
				display: "inline-block"
			});
			//失焦时如果密码框为空则显示密码设置提示
			$(this).parent().parent().children().eq(2).css({
				display: "block"
			});
		} else { //输入不为空时判断是否格式合法
			//如果格式错误显示提示信息且边框颜色改变
			if(!(/^.{6,20}$/.test($(this).val()))) {
				flag2 = false;
				//密码不是6-20位时提示信息
				$(this).parent().parent().children().eq(3).css({
					display: "block"
				});
				//边框颜色
				$(this).parent().css({
					border: "#e72418 1px solid"
				});
			} else {
				if((/^\d{6,20}$/).test($(this).val()) || (/^[A-Za-z]{6,20}$/).test($(this).val())) {
					flag2 = false;
					//显示提示信息
					$(this).parent().parent().children().eq(1).css({
						display: "block"
					});
					//边框颜色改变
					$(this).parent().css({
						border: "#e72418 1px solid"
					});
				} else {
					flag2 = true;
					//验证成功
					$(this).parent().children().eq(3).css({
						display: "inline-block"
					})
				}
			}
		};
	});
	//再次输入密码
	$(".reg_form .qmi").focus(function() {
		$(this).parent().parent().children().eq(1).css({
			display: "none"
		});
		$(this).parent().children().eq(2).css({
			display: "none"
		});
		$(this).parent().children().eq(3).css({
			display: "none"
		});
		$(this).parent().parent().children().eq(2).css({
			display: "none"
		});
	});
	$(".reg_form .qmi").blur(function() {

		if($(this).val() == "") {

			$(this).parent().parent().children().eq(1).css({
				display: "block"
			});
			$(this).parent().children().eq(2).css({
				display: "inline-block"
			});
			flag3 = false;
		} else {
			if($(this).val() == $(".mi").val()) {
				flag3 = true;
				$(this).parent().children().eq(3).css({
					display: "inline-block"
				});
			} else {

				$(this).parent().parent().children().eq(2).css({
					display: "block"
				});
				flag3 = false;
			}
		}
	});
	//同意协议
	$(".agree input[type='checkbox']").bind("input propertychange", function() {
		if($(this).is(":checked")) {
			flag4 = true;
			$(".agree p i").css({
				display: "none"
			});
		} else {

			$(".agree p i").css({
				display: "inline-block"
			});
			flag4 = false;
		}
	});

	$(".reg_form input[type=submit]").click(function() {
		if(flag1 && flag2 && flag3 && flag4) {
			var name = $(".reg_form .dianhua").val();
			var face = $(".reg_form .face").val();
			var pas = $(".reg_form .mi").val();
			$.ajax({
				type: "post",
				url: "api/register.php",
				data: {
					uname: name,
					password: pas,
					uface: face,
				},
				dataType: "json",
				success: function(data) {
					if(data.errorCode == 1002) {
						alert("账户已存在");
					} else if(data.errorCode == 1000) {
						alert("注册成功");
						var logz = getCookie("log");
						//如果没有log这个cookie则设置该cookie并且把点击的商品添加进去
						if(!logz) {
							setCookie("log", data.info.uname + "|" + data.errorCode, 1);
						} else { //如果已经有log这个cookie则先清除后再重新设置cookie
							removeCookie("log");
							setCookie("log", data.info.uname + "|" + data.errorCode, 1);
						}
						window.location.replace("index.html");
					}
				}
			});
		}
	});
}); 